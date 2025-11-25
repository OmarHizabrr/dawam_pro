import { DayEvaluation, ScheduleType } from '../types/models';
import { scheduleRepository } from '../repositories/ScheduleRepository';
import { leaveRepository } from '../repositories/LeaveRepository';
import { exemptionRepository } from '../repositories/ExemptionRepository';
import { attendanceRepository } from '../repositories/AttendanceRepository';
import { deductionRulesRepository } from '../repositories/DeductionRulesRepository';
import { leaveBalanceRepository } from '../repositories/LeaveBalanceRepository';
import { parseISO, differenceInMinutes, format } from 'date-fns';

export class DayEvaluationService {
  /**
   * حساب حالة يوم واحد بشكل كامل
   */
  async evaluateDay(employeeId: string, date: string): Promise<DayEvaluation> {
    const evaluation: DayEvaluation = {
      date,
      employee_id: employeeId,
      status: 'absent',
      worked_minutes: 0,
      required_minutes: 0,
      late_minutes: 0,
      early_leave_minutes: 0,
      deduction_minutes: 0,
      deduction_amount: 0,
      leave_balance_deducted: 0,
      notes: [],
    };

    // الخطوة 1: جلب جدول الدوام الفعّال
    const schedule = await scheduleRepository.getActiveSchedule(employeeId, date);
    evaluation.schedule = schedule || undefined;

    // الخطوة 2: جلب الإعفاء الفعّال
    const exemption = await exemptionRepository.getActiveExemption(employeeId, date);
    evaluation.exemption = exemption || undefined;

    // الخطوة 3: جلب الإجازة الفعّالة
    const leave = await leaveRepository.getActiveLeave(employeeId, date);
    evaluation.leave = leave || undefined;

    // الخطوة 4: جلب سجل البصمة
    const attendance = await attendanceRepository.getByDate(employeeId, date);
    evaluation.attendance = attendance || undefined;

    // الخطوة 5: جلب قواعد الخصم الفعّالة
    const deductionRules = await deductionRulesRepository.getActiveRules(employeeId, date);
    evaluation.deduction_rules = deductionRules || undefined;

    // الخطوة 6: تحديد نوع اليوم وحسابه
    if (leave) {
      await this.handleLeave(evaluation, leave);
    } else if (exemption) {
      await this.handleExemption(evaluation, exemption);
    } else if (attendance) {
      await this.handleAttendance(evaluation, schedule, deductionRules);
    } else {
      await this.handleAbsence(evaluation, deductionRules);
    }

    return evaluation;
  }

  /**
   * معالجة حالة الإجازة
   */
  private async handleLeave(
    evaluation: DayEvaluation,
    leave: NonNullable<DayEvaluation['leave']>
  ): Promise<void> {
    evaluation.status = 'leave';
    evaluation.notes.push(`إجازة: ${leave.type}`);

    // خصم من رصيد الإجازة
    const balanceResult = await leaveBalanceRepository.deductBalance(
      evaluation.employee_id,
      leave.type,
      leave.minutes
    );

    if (balanceResult.success) {
      evaluation.leave_balance_deducted = balanceResult.deducted;
      evaluation.notes.push(`تم خصم ${balanceResult.deducted} دقيقة من الرصيد`);

      // إذا كان هناك متبقي ولم يُسمح بالسحب على المكشوف
      const remaining = leave.minutes - balanceResult.deducted;
      if (remaining > 0) {
        const balance = await leaveBalanceRepository.getBalance(
          evaluation.employee_id,
          leave.type
        );

        if (balance && balance.deduct_from_salary_when_empty) {
          evaluation.deduction_minutes = remaining;
          evaluation.notes.push(`سيتم خصم ${remaining} دقيقة من الراتب (نفاد الرصيد)`);
        }
      }
    } else {
      // لا يوجد رصيد - خصم كامل من الراتب
      evaluation.deduction_minutes = leave.minutes;
      evaluation.notes.push('لا يوجد رصيد - سيتم خصم كامل من الراتب');
    }

    // إذا كان هناك تجاوز لسياسة الخصم
    if (leave.deduction_override) {
      evaluation.notes.push(`تجاوز سياسة الخصم: ${leave.deduction_override}`);
    }
  }

  /**
   * معالجة حالة الإعفاء
   */
  private async handleExemption(
    evaluation: DayEvaluation,
    exemption: NonNullable<DayEvaluation['exemption']>
  ): Promise<void> {
    evaluation.status = 'exempt';
    evaluation.notes.push(`إعفاء: ${exemption.type}`);

    if (exemption.effect_on_pay === 'no_deduction') {
      evaluation.notes.push('لا يوجد خصم من الراتب');
      evaluation.worked_minutes = evaluation.required_minutes;
    } else if (exemption.effect_on_pay === 'partial_deduction') {
      evaluation.notes.push('خصم جزئي من الراتب');
      // يمكن تخصيص النسبة حسب الحاجة
      evaluation.deduction_minutes = evaluation.required_minutes * 0.5;
    }

    if (exemption.requires_approval && !exemption.approved_by) {
      evaluation.notes.push('⚠️ يحتاج موافقة مشرف');
    }
  }

  /**
   * معالجة حالة الحضور
   */
  private async handleAttendance(
    evaluation: DayEvaluation,
    schedule: DayEvaluation['schedule'],
    deductionRules: DayEvaluation['deduction_rules']
  ): Promise<void> {
    const attendance = evaluation.attendance!;

    if (!attendance.check_in || !attendance.check_out) {
      evaluation.status = 'partial';
      evaluation.notes.push('بصمة غير مكتملة');
      return;
    }

    // حساب الدقائق المنجزة
    const checkIn = parseISO(attendance.check_in);
    const checkOut = parseISO(attendance.check_out);
    evaluation.worked_minutes = differenceInMinutes(checkOut, checkIn);

    // حساب الدقائق المطلوبة
    if (schedule) {
      evaluation.required_minutes = this.calculateRequiredMinutes(schedule);
    } else {
      evaluation.notes.push('⚠️ لا يوجد جدول دوام محدد');
      evaluation.required_minutes = 480; // افتراضي 8 ساعات
    }

    // حساب التأخر
    if (schedule && schedule.type === 'fixed_hours' && schedule.config.start_time) {
      const scheduleStart = parseISO(`${evaluation.date}T${schedule.config.start_time}:00`);
      const lateMinutes = differenceInMinutes(checkIn, scheduleStart);

      if (lateMinutes > 0) {
        const graceMinutes = deductionRules?.late_grace_minutes || 0;
        if (lateMinutes > graceMinutes) {
          evaluation.late_minutes = lateMinutes - graceMinutes;
          evaluation.notes.push(`تأخر ${evaluation.late_minutes} دقيقة`);
        }
      }
    }

    // حساب الخروج المبكر
    if (schedule && schedule.type === 'fixed_hours' && schedule.config.end_time) {
      const scheduleEnd = parseISO(`${evaluation.date}T${schedule.config.end_time}:00`);
      const earlyMinutes = differenceInMinutes(scheduleEnd, checkOut);

      if (earlyMinutes > 0) {
        const graceMinutes = deductionRules?.early_leave_grace_minutes || 0;
        if (earlyMinutes > graceMinutes) {
          evaluation.early_leave_minutes = earlyMinutes - graceMinutes;
          evaluation.notes.push(`خروج مبكر ${evaluation.early_leave_minutes} دقيقة`);
        }
      }
    }

    // حساب الخصم
    if (evaluation.worked_minutes < evaluation.required_minutes) {
      const shortage = evaluation.required_minutes - evaluation.worked_minutes;
      evaluation.deduction_minutes = shortage;
      evaluation.notes.push(`نقص ${shortage} دقيقة`);
    }

    // تطبيق سياسة التأخر
    if (evaluation.late_minutes > 0 && deductionRules) {
      evaluation.deduction_minutes += this.applyDeductionPolicy(
        evaluation.late_minutes,
        deductionRules.late_policy,
        evaluation.required_minutes
      );
    }

    // تطبيق سياسة الخروج المبكر
    if (evaluation.early_leave_minutes > 0 && deductionRules) {
      evaluation.deduction_minutes += this.applyDeductionPolicy(
        evaluation.early_leave_minutes,
        deductionRules.early_leave_policy,
        evaluation.required_minutes
      );
    }

    if (evaluation.worked_minutes >= evaluation.required_minutes && evaluation.deduction_minutes === 0) {
      evaluation.status = 'present';
    } else {
      evaluation.status = 'partial';
    }
  }

  /**
   * معالجة حالة الغياب
   */
  private async handleAbsence(
    evaluation: DayEvaluation,
    deductionRules: DayEvaluation['deduction_rules']
  ): Promise<void> {
    evaluation.status = 'absent';
    evaluation.notes.push('غياب بدون بصمة');

    if (deductionRules) {
      evaluation.deduction_minutes = evaluation.required_minutes;
      evaluation.notes.push(`سياسة الخصم: ${deductionRules.absence_without_permission}`);
    } else {
      evaluation.deduction_minutes = evaluation.required_minutes;
      evaluation.notes.push('سيتم خصم يوم كامل');
    }
  }

  /**
   * حساب الدقائق المطلوبة حسب نوع الجدول
   */
  private calculateRequiredMinutes(schedule: NonNullable<DayEvaluation['schedule']>): number {
    switch (schedule.type) {
      case 'daily_hours':
        return (schedule.config.required_hours || 8) * 60;
      
      case 'fixed_hours':
        if (schedule.config.start_time && schedule.config.end_time) {
          const start = parseISO(`2000-01-01T${schedule.config.start_time}:00`);
          const end = parseISO(`2000-01-01T${schedule.config.end_time}:00`);
          return differenceInMinutes(end, start);
        }
        return 480; // افتراضي 8 ساعات
      
      case 'shifts':
        if (schedule.config.shifts) {
          return schedule.config.shifts.reduce((total, shift) => {
            const start = parseISO(`2000-01-01T${shift.start}:00`);
            const end = parseISO(`2000-01-01T${shift.end}:00`);
            return total + differenceInMinutes(end, start);
          }, 0);
        }
        return 480;
      
      case 'flexible_core_time':
        if (schedule.config.core_hours) {
          const start = parseISO(`2000-01-01T${schedule.config.core_hours.start}:00`);
          const end = parseISO(`2000-01-01T${schedule.config.core_hours.end}:00`);
          return differenceInMinutes(end, start);
        }
        return 480;
      
      default:
        return 480;
    }
  }

  /**
   * تطبيق سياسة الخصم
   */
  private applyDeductionPolicy(
    minutes: number,
    policy: string,
    totalRequired: number
  ): number {
    switch (policy) {
      case 'no_deduction':
        return 0;
      
      case 'deduct_full_day':
        return totalRequired;
      
      case 'deduct_half_day':
        return totalRequired / 2;
      
      case 'proportional':
        return minutes;
      
      default:
        return minutes;
    }
  }
}

export const dayEvaluationService = new DayEvaluationService();


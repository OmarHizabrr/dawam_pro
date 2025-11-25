import { PayrollCalculation, DayEvaluation, PaymentCycle } from '../types/models';
import { dayEvaluationService } from './DayEvaluationService';
import { payrollRepository } from '../repositories/PayrollRepository';
import { eachDayOfInterval, format, parseISO, differenceInDays } from 'date-fns';

export class PayrollService {
  /**
   * حساب الراتب لفترة معينة
   */
  async calculatePayroll(
    employeeId: string,
    periodStart: string,
    periodEnd: string
  ): Promise<PayrollCalculation> {
    const startDate = parseISO(periodStart);
    const endDate = parseISO(periodEnd);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // جلب ملف الراتب الفعّال
    const payrollProfile = await payrollRepository.getActiveProfile(
      employeeId,
      periodStart
    );

    if (!payrollProfile) {
      throw new Error(`No active payroll profile found for employee ${employeeId}`);
    }

    const calculation: PayrollCalculation = {
      employee_id: employeeId,
      period_start: periodStart,
      period_end: periodEnd,
      base_salary: payrollProfile.base_salary,
      currency: payrollProfile.currency,
      total_days: days.length,
      present_days: 0,
      absent_days: 0,
      leave_days: 0,
      exempt_days: 0,
      partial_days: 0,
      total_worked_minutes: 0,
      total_required_minutes: 0,
      total_deduction_minutes: 0,
      total_deduction_amount: 0,
      gross_salary: 0,
      net_salary: 0,
      day_evaluations: [],
      adjustments: [],
    };

    // حساب كل يوم في الفترة
    for (const day of days) {
      const dateStr = format(day, 'yyyy-MM-dd');
      const evaluation = await dayEvaluationService.evaluateDay(employeeId, dateStr);
      
      calculation.day_evaluations.push(evaluation);

      // تحديث الإحصائيات
      switch (evaluation.status) {
        case 'present':
          calculation.present_days++;
          break;
        case 'absent':
          calculation.absent_days++;
          break;
        case 'leave':
          calculation.leave_days++;
          break;
        case 'exempt':
          calculation.exempt_days++;
          break;
        case 'partial':
          calculation.partial_days++;
          break;
      }

      calculation.total_worked_minutes += evaluation.worked_minutes;
      calculation.total_required_minutes += evaluation.required_minutes;
      calculation.total_deduction_minutes += evaluation.deduction_minutes;
    }

    // حساب الراتب
    calculation.gross_salary = this.calculateGrossSalary(
      calculation,
      payrollProfile.salary_calculation_method
    );

    // حساب الخصومات
    calculation.total_deduction_amount = this.calculateDeductionAmount(
      calculation.total_deduction_minutes,
      calculation.total_required_minutes,
      calculation.gross_salary
    );

    calculation.net_salary = calculation.gross_salary - calculation.total_deduction_amount;

    return calculation;
  }

  /**
   * حساب الراتب الإجمالي
   */
  private calculateGrossSalary(
    calculation: PayrollCalculation,
    method: string
  ): number {
    switch (method) {
      case 'working_days':
        // حسب أيام العمل الفعلية
        const workingDays = calculation.present_days + calculation.partial_days + calculation.leave_days;
        const dailyRate = calculation.base_salary / calculation.total_days;
        return dailyRate * workingDays;
      
      case 'calendar_days':
        // حسب أيام التقويم
        return calculation.base_salary;
      
      case 'fixed_amount':
        // مبلغ ثابت
        return calculation.base_salary;
      
      default:
        return calculation.base_salary;
    }
  }

  /**
   * حساب مبلغ الخصم
   */
  private calculateDeductionAmount(
    deductionMinutes: number,
    totalRequiredMinutes: number,
    grossSalary: number
  ): number {
    if (totalRequiredMinutes === 0) {
      return 0;
    }

    // حساب قيمة الدقيقة
    const minuteValue = grossSalary / totalRequiredMinutes;
    
    // حساب المبلغ المخصوم
    return minuteValue * deductionMinutes;
  }

  /**
   * حساب الراتب حسب دورة الدفع
   */
  async calculatePayrollByCycle(
    employeeId: string,
    cycle: PaymentCycle,
    referenceDate?: string
  ): Promise<PayrollCalculation> {
    const date = referenceDate ? parseISO(referenceDate) : new Date();
    const { start, end } = this.getCyclePeriod(cycle, date);

    return this.calculatePayroll(
      employeeId,
      format(start, 'yyyy-MM-dd'),
      format(end, 'yyyy-MM-dd')
    );
  }

  /**
   * الحصول على فترة الدورة
   */
  private getCyclePeriod(
    cycle: PaymentCycle,
    date: Date
  ): { start: Date; end: Date } {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    switch (cycle) {
      case 'daily':
        return {
          start: new Date(year, month, day),
          end: new Date(year, month, day),
        };
      
      case 'weekly':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return { start: weekStart, end: weekEnd };
      
      case '10_days':
        const periodStart = day <= 10 ? 1 : day <= 20 ? 11 : 21;
        const periodEnd = day <= 10 ? 10 : day <= 20 ? 20 : new Date(year, month + 1, 0).getDate();
        return {
          start: new Date(year, month, periodStart),
          end: new Date(year, month, periodEnd),
        };
      
      case 'biweekly':
        const biweekStart = new Date(date);
        biweekStart.setDate(date.getDate() - (date.getDate() <= 15 ? date.getDate() - 1 : date.getDate() - 16));
        const biweekEnd = new Date(biweekStart);
        biweekEnd.setDate(biweekStart.getDate() + 13);
        return { start: biweekStart, end: biweekEnd };
      
      case 'monthly':
        return {
          start: new Date(year, month, 1),
          end: new Date(year, month + 1, 0),
        };
      
      case 'quarterly':
        const quarter = Math.floor(month / 3);
        return {
          start: new Date(year, quarter * 3, 1),
          end: new Date(year, (quarter + 1) * 3, 0),
        };
      
      case 'yearly':
        return {
          start: new Date(year, 0, 1),
          end: new Date(year, 11, 31),
        };
      
      default:
        return {
          start: new Date(year, month, 1),
          end: new Date(year, month + 1, 0),
        };
    }
  }
}

export const payrollService = new PayrollService();


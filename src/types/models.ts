/**
 * أنواع البيانات للنظام
 * جميع الأنواع مبنية على التحليل المقدم
 */

// ========== الموظف ==========
export interface Employee {
  id: string;
  name: string;
  hire_date: string; // ISO date string
  currency: string; // YER, USD, etc.
  status: 'active' | 'inactive' | 'suspended';
  createdAt?: string;
  updatedAt?: string;
}

// ========== جدول دوام الموظف ==========
export type ScheduleType = 
  | 'fixed_hours'      // من-إلى (مثل 8:00 - 16:00)
  | 'daily_hours'      // عدد ساعات (مثل 8 ساعات)
  | 'shifts'           // نوبات متعددة
  | 'free_mode'        // احتساب الساعات فقط
  | 'flexible_core_time'; // مرن مع ساعات أساسية

export interface ScheduleConfig {
  required_hours?: number;        // للـ daily_hours
  start_time?: string;            // للـ fixed_hours (HH:mm)
  end_time?: string;              // للـ fixed_hours (HH:mm)
  shifts?: Array<{                // للـ shifts
    start: string;
    end: string;
  }>;
  core_hours?: {                  // للـ flexible_core_time
    start: string;
    end: string;
  };
}

export interface EmployeeSchedule {
  id: string;
  employee_id: string;
  start_date: string;             // ISO date string
  end_date: string | null;         // null = لا نهاية
  type: ScheduleType;
  config: ScheduleConfig;
  createdAt?: string;
  updatedAt?: string;
}

// ========== قواعد الخصم ==========
export type DeductionPolicy = 
  | 'no_deduction'
  | 'deduct_full_day'
  | 'deduct_half_day'
  | 'proportional'
  | 'fixed_amount';

export interface DeductionRules {
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string | null;
  absence_with_permission: DeductionPolicy;
  absence_without_permission: DeductionPolicy;
  late_grace_minutes: number;      // دقائق السماح للتأخر
  late_policy: DeductionPolicy;
  early_leave_grace_minutes: number;
  early_leave_policy: DeductionPolicy;
  createdAt?: string;
  updatedAt?: string;
}

// ========== الإعفاءات ==========
export type ExemptionType = 
  | 'fingerprint_exempt'      // إعفاء من البصمة
  | 'attendance_exempt'        // إعفاء من الحضور
  | 'deduction_exempt'         // إعفاء من الخصم
  | 'schedule_exempt';         // إعفاء من جدول الدوام

export type ExemptionScope = 
  | 'full_day'
  | 'partial'
  | 'time_range';

export type VerificationMethod = 
  | 'supervisor_approval'
  | 'manager_approval'
  | 'automatic'
  | 'document_required';

export interface Exemption {
  id: string;
  employee_id: string;
  type: ExemptionType;
  start_date: string;
  end_date: string;
  scope: ExemptionScope;
  verification_method: VerificationMethod;
  effect_on_pay: 'no_deduction' | 'partial_deduction' | 'full_deduction';
  requires_approval: boolean;
  approved_by?: string;
  approved_at?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ========== الإجازات ==========
export type LeaveType = 
  | 'annual_leave'                    // إجازة سنوية
  | 'casual_leave'                    // إجازة عادية
  | 'sick_leave'                      // إجازة مرضية
  | 'fingerprint_exemption_leave'     // إجازة إعفاء بصمة
  | 'remote_work_leave'               // إجازة عمل عن بُعد
  | 'special_reason_leave'            // إجازة لسبب خاص
  | 'emergency_leave';                // إجازة طارئة

export interface Leave {
  id: string;
  employee_id: string;
  type: LeaveType;
  start_date: string;
  end_date: string;
  minutes: number;                    // عدد الدقائق (480 = يوم كامل)
  authorized: boolean;
  authorized_by?: string;
  authorized_at?: string;
  deduction_override?: DeductionPolicy; // تجاوز سياسة الخصم
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ========== أرصدة الإجازات ==========
export type RechargeCycle = 
  | 'yearly'      // سنوي
  | 'monthly'     // شهري
  | 'quarterly'   // ربع سنوي
  | 'none';       // لا يوجد إعادة تعبئة

export interface LeaveBalance {
  employee_id: string;
  leave_type: LeaveType;
  balance_minutes: number;            // الرصيد بالدقائق
  recharge_cycle: RechargeCycle;
  last_recharge_date?: string;        // آخر تاريخ إعادة تعبئة
  next_recharge_date?: string;        // تاريخ إعادة التعبئة القادمة
  allow_overdraft: boolean;           // السماح بالسحب على المكشوف
  is_active: boolean;                 // تفعيل/إيقاف هذا النوع من الإجازات
  deduct_from_salary_when_empty: boolean; // خصم من الراتب عند انتهاء الرصيد
  requires_supervisor_approval: boolean;   // يحتاج موافقة مشرف
  createdAt?: string;
  updatedAt?: string;
}

// ========== الحضور ==========
export interface AttendanceLog {
  id: string;
  employee_id: string;
  date: string;                       // YYYY-MM-DD
  check_in: string | null;            // ISO datetime string
  check_out: string | null;           // ISO datetime string
  total_minutes?: number;              // إجمالي الدقائق المحسوبة
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ========== الرواتب ==========
export type PaymentCycle = 
  | 'daily'
  | 'weekly'
  | '10_days'
  | 'biweekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly';

export type SalaryCalculationMethod = 
  | 'working_days'      // حسب أيام العمل
  | 'calendar_days'     // حسب أيام التقويم
  | 'fixed_amount';     // مبلغ ثابت

export interface PayrollProfile {
  id: string;
  employee_id: string;
  base_salary: number;
  currency: string;
  payment_cycle: PaymentCycle;
  salary_calculation_method: SalaryCalculationMethod;
  start_date: string;
  end_date: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// ========== حساب يوم واحد ==========
export interface DayEvaluation {
  date: string;                       // YYYY-MM-DD
  employee_id: string;
  schedule?: EmployeeSchedule;        // جدول الدوام الفعّال
  exemption?: Exemption;             // الإعفاء الفعّال
  leave?: Leave;                      // الإجازة الفعّالة
  attendance?: AttendanceLog;        // سجل البصمة
  deduction_rules?: DeductionRules;   // قواعد الخصم الفعّالة
  
  // النتيجة
  status: 'present' | 'absent' | 'leave' | 'exempt' | 'partial';
  worked_minutes: number;             // الدقائق المنجزة
  required_minutes: number;           // الدقائق المطلوبة
  late_minutes: number;              // دقائق التأخر
  early_leave_minutes: number;        // دقائق الخروج المبكر
  deduction_minutes: number;          // الدقائق المخصومة
  deduction_amount: number;           // المبلغ المخصوم
  leave_balance_deducted: number;     // الدقائق المخصومة من رصيد الإجازة
  notes: string[];
}

// ========== حساب الراتب ==========
export interface PayrollCalculation {
  employee_id: string;
  period_start: string;
  period_end: string;
  base_salary: number;
  currency: string;
  
  // الإحصائيات
  total_days: number;
  present_days: number;
  absent_days: number;
  leave_days: number;
  exempt_days: number;
  partial_days: number;
  
  // الحسابات
  total_worked_minutes: number;
  total_required_minutes: number;
  total_deduction_minutes: number;
  total_deduction_amount: number;
  
  // النتيجة النهائية
  gross_salary: number;
  net_salary: number;
  
  // التفاصيل
  day_evaluations: DayEvaluation[];
  adjustments: Array<{
    type: 'bonus' | 'deduction' | 'advance' | 'other';
    amount: number;
    description: string;
  }>;
}


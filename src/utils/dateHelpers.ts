import { format, parseISO, isValid } from 'date-fns';

/**
 * مساعدات للتعامل مع التواريخ
 */

/**
 * تحويل تاريخ إلى صيغة YYYY-MM-DD
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  return format(dateObj, 'yyyy-MM-dd');
}

/**
 * التحقق من صحة تاريخ
 */
export function isValidDate(date: string): boolean {
  try {
    const parsed = parseISO(date);
    return isValid(parsed);
  } catch {
    return false;
  }
}

/**
 * الحصول على تاريخ اليوم بصيغة YYYY-MM-DD
 */
export function getTodayDate(): string {
  return formatDate(new Date());
}

/**
 * إضافة أيام لتاريخ
 */
export function addDays(date: string, days: number): string {
  const dateObj = parseISO(date);
  dateObj.setDate(dateObj.getDate() + days);
  return formatDate(dateObj);
}


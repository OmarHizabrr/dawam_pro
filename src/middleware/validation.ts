import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

/**
 * Middleware للتحقق من صحة البيانات باستخدام Zod
 */
export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation error',
          details: error.errors,
        });
      } else {
        next(error);
      }
    }
  };
}

/**
 * Schemas للتحقق من البيانات
 */
export const employeeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  hire_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  currency: z.string().min(1, 'Currency is required'),
  status: z.enum(['active', 'inactive', 'suspended']),
});

export const attendanceSchema = z.object({
  employee_id: z.string().min(1, 'Employee ID is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  check_in: z.string().optional().nullable(),
  check_out: z.string().optional().nullable(),
});


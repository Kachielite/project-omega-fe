import { z } from 'zod';
import { ITaskPriority, ITaskStatus } from '@/features/task/interfaces';

export const taskCreationSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .max(100, 'Task title must be at most 100 characters'),
  description: z.string().optional(),
  due_date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
  priority: z.enum(ITaskPriority),
  status: z.enum(ITaskStatus).optional(),
  tags: z.array(z.number()).optional(),
  project_id: z.number().optional(),
});

export type TaskCreationSchemaType = z.infer<typeof taskCreationSchema>;

export const taskUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .max(100, 'Task title must be at most 100 characters')
    .optional(),
  description: z.string().optional(),
  due_date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' })
    .optional(),
  priority: z.enum(ITaskPriority).optional(),
  status: z.enum(ITaskStatus).optional(),
  tags: z.array(z.number()).optional(),
});

export type TaskUpdateSchemaType = z.infer<typeof taskUpdateSchema>;

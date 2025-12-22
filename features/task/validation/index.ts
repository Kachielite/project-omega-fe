import { z } from 'zod';
import { ITaskPriority, ITaskStatus } from '@/features/task/interfaces';

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

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
  tags: z.array(tagSchema).optional(),
  project_id: z.number().optional(),
});

export type TaskCreationSchemaType = z.infer<typeof taskCreationSchema>;

// TODO: Add project once project feature is implemented
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
  tags: z.array(tagSchema).optional(),
});

export type TaskUpdateSchemaType = z.infer<typeof taskUpdateSchema>;

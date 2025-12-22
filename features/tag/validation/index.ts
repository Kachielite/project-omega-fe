import { z } from 'zod';

export const tagCreationSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(30, 'Tag name must be at most 30 characters'),
});

export type TagCreationSchemaType = z.infer<typeof tagCreationSchema>;

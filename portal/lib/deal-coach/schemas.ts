import { z } from 'zod';

export const dealCoachRequestSchema = z.object({
  dealType: z.enum(['ma', 'ipo', 'debt', 'restructuring', 'lbo', 'other']),
  role: z.enum(['analyst', 'associate', 'intern', 'other']),
  description: z.string().min(100, 'Please provide at least 100 characters describing the deal'),
  keyMetrics: z.string().min(10, 'Please include some key metrics'),
  previousQuestions: z.string().optional(),
});

export const dealCoachResponseSchema = z.object({
  peReframing: z.string(),
  prepQuestions: z.array(z.object({
    question: z.string(),
    framework: z.string(),
    sampleAnswer: z.string(),
  })),
  metricsToKnow: z.array(z.string()),
  discussionPoints: z.array(z.string()),
});

export type DealCoachRequest = z.infer<typeof dealCoachRequestSchema>;
export type DealCoachResponse = z.infer<typeof dealCoachResponseSchema>;

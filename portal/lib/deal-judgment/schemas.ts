import { z } from 'zod';

export const dealJudgmentGradeSchema = z.object({
  scenarioId: z.string().min(1),
  decision: z.enum(['invest', 'pass']),
  reasoning: z.string().min(50, 'Please provide at least 50 characters of reasoning'),
});

export const dealFeedbackSchema = z.object({
  overallGrade: z.enum(['A', 'B', 'C', 'D', 'F']),
  decisionCorrect: z.boolean(),
  thesisQuality: z.number().min(0).max(100),
  riskIdentification: z.number().min(0).max(100),
  redFlagDetection: z.number().min(0).max(100),
  commentary: z.string(),
  strengthsIdentified: z.array(z.string()),
  missedPoints: z.array(z.string()),
});

export type DealJudgmentRequest = z.infer<typeof dealJudgmentGradeSchema>;
export type DealFeedback = z.infer<typeof dealFeedbackSchema>;

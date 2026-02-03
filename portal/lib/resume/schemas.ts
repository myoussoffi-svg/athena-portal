import { z } from 'zod';

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

export const RESUME_QUOTA_LIMIT = 10;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const MIN_WORD_COUNT = 50;

// Accepted content type for Word documents
export const ACCEPTED_CONTENT_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

// ─────────────────────────────────────────────────────────────
// REQUEST VALIDATION SCHEMAS
// ─────────────────────────────────────────────────────────────

export const resumeSubmitRequestSchema = z.object({
  resumeObjectKey: z.string().min(1, 'Resume object key is required'),
  resumeFileName: z.string().min(1, 'Resume file name is required'),
  trackSlug: z.string().min(1, 'Track slug is required'),
});

export type ResumeSubmitRequest = z.infer<typeof resumeSubmitRequestSchema>;

export const resumeUploadRequestSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  contentType: z.literal(ACCEPTED_CONTENT_TYPE),
  fileSizeBytes: z
    .number()
    .min(1, 'File cannot be empty')
    .max(MAX_FILE_SIZE_BYTES, `File must be under ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`),
  trackSlug: z.string().min(1, 'Track slug is required'),
});

export type ResumeUploadRequest = z.infer<typeof resumeUploadRequestSchema>;

// ─────────────────────────────────────────────────────────────
// DOCUMENT VALIDATION SCHEMA
// ─────────────────────────────────────────────────────────────

export const docMetadataSchema = z.object({
  wordCount: z.number().min(MIN_WORD_COUNT, 'Resume appears too short'),
});

export type DocMetadata = z.infer<typeof docMetadataSchema>;

// ─────────────────────────────────────────────────────────────
// FEEDBACK JSON SCHEMA (Claude Response)
// ─────────────────────────────────────────────────────────────

const categoryScoresSchema = z.object({
  format: z.number().min(0).max(100),
  education: z.number().min(0).max(100),
  experience: z.number().min(0).max(100),
  skills: z.number().min(0).max(100),
  writing: z.number().min(0).max(100),
});

const priorityFixSchema = z.object({
  title: z.string().min(1),
  why: z.string().min(1),
  effortMinutes: z.number().min(1).max(60),
  exampleFix: z.string().min(1),
});

const rewrittenBulletSchema = z.object({
  section: z.string().min(1),
  before: z.string().min(1),
  after: z.string().min(1),
  why: z.string().min(1),
  patternTag: z.enum(['weak_verb', 'no_quantification', 'vague', 'too_long', 'grammar', 'sparse_section', 'other']),
});

const spellingIssueSchema = z.object({
  text: z.string(),
  suggestion: z.string(),
  context: z.string(),
});

const grammarIssueSchema = z.object({
  text: z.string(),
  suggestion: z.string(),
  context: z.string(),
});

const formattingIssueSchema = z.object({
  issue: z.string(),
  location: z.string(),
  fix: z.string(),
});

const quantificationOpportunitySchema = z.object({
  bullet: z.string(),
  suggestion: z.string(),
});

const sparseRoleSchema = z.object({
  company: z.string(),
  bulletCount: z.number(),
  recommendation: z.string(),
});

const flagsSchema = z.object({
  spellingIssues: z.array(spellingIssueSchema),
  grammarIssues: z.array(grammarIssueSchema),
  formattingIssues: z.array(formattingIssueSchema),
  quantificationOpportunities: z.array(quantificationOpportunitySchema),
  sparseRoles: z.array(sparseRoleSchema).optional(),
});

const nextScorePlanSchema = z.object({
  currentScore10: z.number().min(1).max(10),
  nextScore10: z.number().min(1).max(10),
  topChangesToReachNext: z.array(z.string()).min(1).max(5),
});

export const resumeFeedbackJsonSchema = z.object({
  // Scoring
  overallScore10: z.number().min(1).max(10),
  categoryScores: categoryScoresSchema,
  hireReadiness: z.enum(['ready', 'almost', 'needs_work']),

  // Priority fixes (top 5, actionable)
  priorityFixes: z.array(priorityFixSchema).min(1).max(5),

  // Bullet rewrites (copy-paste ready)
  rewrittenBullets: z.array(rewrittenBulletSchema),

  // Issues flagged
  flags: flagsSchema,

  // Path to next score
  nextScorePlan: nextScorePlanSchema,

  // Summary
  topStrengths: z.array(z.string()).min(1).max(5),
  summary: z.string().min(10).max(500),
});

export type ResumeFeedbackJson = z.infer<typeof resumeFeedbackJsonSchema>;
export type CategoryScores = z.infer<typeof categoryScoresSchema>;
export type PriorityFix = z.infer<typeof priorityFixSchema>;
export type RewrittenBullet = z.infer<typeof rewrittenBulletSchema>;
export type Flags = z.infer<typeof flagsSchema>;
export type NextScorePlan = z.infer<typeof nextScorePlanSchema>;

// ─────────────────────────────────────────────────────────────
// ERROR CODES
// ─────────────────────────────────────────────────────────────

export const RESUME_ERROR_CODES = {
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  TOO_MANY_PAGES: 'TOO_MANY_PAGES',
  EXTRACTION_FAILED: 'EXTRACTION_FAILED',
  ANALYSIS_FAILED: 'ANALYSIS_FAILED',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
} as const;

export type ResumeErrorCode = (typeof RESUME_ERROR_CODES)[keyof typeof RESUME_ERROR_CODES];

// ─────────────────────────────────────────────────────────────
// API RESPONSE TYPES
// ─────────────────────────────────────────────────────────────

export interface QuotaResponse {
  used: number;
  limit: number;
  remaining: number;
}

export interface UploadResponse {
  uploadUrl: string;
  objectKey: string;
  expiresAt: string;
}

export interface SubmitResponse {
  feedbackId: string;
  status: 'pending';
}

export interface FeedbackStatusResponse {
  id: string;
  status: 'pending' | 'uploading' | 'extracting' | 'analyzing' | 'complete' | 'failed';
  errorMessage?: string;
  feedback?: ResumeFeedbackJson;
  scores?: {
    overall: number;
    format: number;
    education: number;
    experience: number;
    skills: number;
    writing: number;
  };
  submittedAt?: string;
  completedAt?: string;
}

export interface ResumeErrorResponse {
  error: string;
  code: ResumeErrorCode;
  details?: Record<string, unknown>;
}

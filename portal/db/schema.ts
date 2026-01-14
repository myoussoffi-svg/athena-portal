import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  uniqueIndex,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

export const attemptStatusEnum = pgEnum('attempt_status', [
  'in_progress',
  'processing',
  'complete',
  'abandoned',
  'failed',
]);

export const processingStageEnum = pgEnum('processing_stage', [
  'upload_pending',
  'upload_verified',
  'transcribing',
  'segmenting',
  'evaluating',
  'finalizing',
]);

export const hireInclinationEnum = pgEnum('hire_inclination', [
  'hire',
  'borderline',
  'no_hire',
]);

export const integrityStatusEnum = pgEnum('integrity_status', [
  'clean',
  'flagged',
  'unknown',
]);

export const lockReasonEnum = pgEnum('lock_reason', [
  'abandoned',
  'cooldown',
  'admin_hold',
]);

export const unlockDecisionEnum = pgEnum('unlock_decision', [
  'pending',
  'approved',
  'denied',
]);

export const viewerRoleEnum = pgEnum('viewer_role', ['admin', 'viewer']);

export const accessTypeEnum = pgEnum('access_type', [
  'video_view',
  'transcript_view',
  'feedback_view',
]);

// ─────────────────────────────────────────────────────────────
// INTERVIEW ATTEMPTS
// ─────────────────────────────────────────────────────────────

export const interviewAttempts = pgTable(
  'interview_attempts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    candidateId: text('candidate_id').notNull(),
    attemptNumber: integer('attempt_number').notNull(),

    // Status
    status: attemptStatusEnum('status').notNull().default('in_progress'),
    processingStage: processingStageEnum('processing_stage'),
    lastStageUpdatedAt: timestamp('last_stage_updated_at', { withTimezone: true }),

    // Video storage
    videoObjectKey: text('video_object_key'),
    videoExpiresAt: timestamp('video_expires_at', { withTimezone: true }),
    videoDeleted: boolean('video_deleted').notNull().default(false),

    // Segments (permanent)
    segments: jsonb('segments'),

    // Evaluation (permanent)
    feedbackJson: jsonb('feedback_json'),
    hireInclination: hireInclinationEnum('hire_inclination'),

    // Integrity (nullable + versioned)
    integrityLog: jsonb('integrity_log'),
    integritySchemaVersion: text('integrity_schema_version'),
    integrityStatus: integrityStatusEnum('integrity_status'),

    // Versioning
    promptVersionId: text('prompt_version_id').notNull(),
    evaluatorVersionId: text('evaluator_version_id').notNull(),

    // Timestamps
    startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
    submittedAt: timestamp('submitted_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),

    // Error tracking
    errorMessage: text('error_message'),
    errorCode: text('error_code'),
    retryCount: integer('retry_count').notNull().default(0),
  },
  (table) => [
    // Partial unique index: one active attempt per candidate
    // This prevents race conditions at the DB level
    uniqueIndex('idx_one_active_attempt_per_candidate')
      .on(table.candidateId)
      .where(sql`status IN ('in_progress', 'processing')`),
    // Index for querying by candidate
    index('idx_attempts_candidate').on(table.candidateId),
    // Index for cleanup job
    index('idx_attempts_video_expiry').on(table.videoExpiresAt).where(sql`video_deleted = false`),
  ]
);

// ─────────────────────────────────────────────────────────────
// CANDIDATE LOCKOUTS
// ─────────────────────────────────────────────────────────────

export const candidateLockouts = pgTable('candidate_lockouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  candidateId: text('candidate_id').notNull().unique(),

  // Lockout state
  isLocked: boolean('is_locked').notNull().default(false),
  lockReason: lockReasonEnum('lock_reason'),
  lockedAt: timestamp('locked_at', { withTimezone: true }),
  lockedUntil: timestamp('locked_until', { withTimezone: true }),

  // Unlock request
  unlockRequestText: text('unlock_request_text'),
  unlockRequestedAt: timestamp('unlock_requested_at', { withTimezone: true }),
  unlockDecision: unlockDecisionEnum('unlock_decision'),
  unlockDecidedBy: text('unlock_decided_by'),
  unlockDecidedAt: timestamp('unlock_decided_at', { withTimezone: true }),
  unlockDecisionNote: text('unlock_decision_note'),

  // Counters - updated transactionally
  totalAttempts: integer('total_attempts').notNull().default(0),
  abandonedAttempts: integer('abandoned_attempts').notNull().default(0),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ─────────────────────────────────────────────────────────────
// PROMPT VERSIONS
// ─────────────────────────────────────────────────────────────

export const promptVersions = pgTable('prompt_versions', {
  id: text('id').primaryKey(), // e.g. "2024-01-v1"
  prompts: jsonb('prompts').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// ─────────────────────────────────────────────────────────────
// EVALUATOR VERSIONS
// ─────────────────────────────────────────────────────────────

export const evaluatorVersions = pgTable('evaluator_versions', {
  id: text('id').primaryKey(), // e.g. "2024-01-v1"
  systemPrompt: text('system_prompt').notNull(),
  outputSchema: jsonb('output_schema').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// ─────────────────────────────────────────────────────────────
// ACTIVE VERSIONS (Singleton table)
// ─────────────────────────────────────────────────────────────

export const activeVersions = pgTable(
  'active_versions',
  {
    id: integer('id').primaryKey().default(1),
    activePromptVersionId: text('active_prompt_version_id')
      .notNull()
      .references(() => promptVersions.id),
    activeEvaluatorVersionId: text('active_evaluator_version_id')
      .notNull()
      .references(() => evaluatorVersions.id),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    updatedBy: text('updated_by').notNull(),
  },
  (table) => [
    // Enforce singleton: only id=1 allowed
    check('singleton_check', sql`${table.id} = 1`),
  ]
);

// ─────────────────────────────────────────────────────────────
// INTERVIEW VIEWERS (Admins and Viewers)
// ─────────────────────────────────────────────────────────────

export const interviewViewers = pgTable(
  'interview_viewers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    role: viewerRoleEnum('role').notNull(),
    addedBy: text('added_by').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // One entry per user
    uniqueIndex('idx_viewer_user').on(table.userId),
  ]
);

// ─────────────────────────────────────────────────────────────
// VIDEO ACCESS LOG (Audit trail)
// ─────────────────────────────────────────────────────────────

export const videoAccessLog = pgTable(
  'video_access_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    attemptId: uuid('attempt_id')
      .notNull()
      .references(() => interviewAttempts.id),
    viewerUserId: text('viewer_user_id').notNull(),
    accessedAt: timestamp('accessed_at', { withTimezone: true }).notNull().defaultNow(),
    accessType: accessTypeEnum('access_type').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
  },
  (table) => [
    index('idx_access_log_attempt').on(table.attemptId),
    index('idx_access_log_viewer').on(table.viewerUserId),
    index('idx_access_log_time').on(table.accessedAt),
  ]
);

// ─────────────────────────────────────────────────────────────
// TYPE EXPORTS
// ─────────────────────────────────────────────────────────────

export type InterviewAttempt = typeof interviewAttempts.$inferSelect;
export type NewInterviewAttempt = typeof interviewAttempts.$inferInsert;

export type CandidateLockout = typeof candidateLockouts.$inferSelect;
export type NewCandidateLockout = typeof candidateLockouts.$inferInsert;

export type PromptVersion = typeof promptVersions.$inferSelect;
export type EvaluatorVersion = typeof evaluatorVersions.$inferSelect;

export type InterviewViewer = typeof interviewViewers.$inferSelect;
export type VideoAccessLogEntry = typeof videoAccessLog.$inferSelect;

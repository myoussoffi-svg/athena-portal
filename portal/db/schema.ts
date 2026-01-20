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

export const quizDifficultyEnum = pgEnum('quiz_difficulty', [
  'easy',
  'medium',
  'hard',
]);

export const quizQuestionTypeEnum = pgEnum('quiz_question_type', [
  'conceptual',
  'formulaic',
  'judgmental',
  'edge-case',
]);

export const quizAnswerEnum = pgEnum('quiz_answer', ['A', 'B', 'C', 'D']);

export const resumeStatusEnum = pgEnum('resume_status', [
  'pending',
  'uploading',
  'extracting',
  'analyzing',
  'complete',
  'failed',
]);

export const outreachStatusEnum = pgEnum('outreach_status', [
  'identified',   // Found this person, haven't reached out yet
  'contacted',    // Initial email sent
  'responded',    // Got a response (positive or scheduling)
  'scheduled',    // Call is on the calendar
  'spoke',        // Had the conversation
  'advocate',     // They've agreed to help (referral, intro, etc.)
  'stale',        // No response after 2 follow-ups, moved on
]);

export const connectionTypeEnum = pgEnum('connection_type', [
  'alumni',
  'referral',
  'cold',
  'event',
  'other',
]);

export const contactRoleEnum = pgEnum('contact_role', [
  'analyst',
  'associate',
  'vp',
  'director',
  'md',
  'other',
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
// LESSON COMPLETIONS (Progress Tracking)
// ─────────────────────────────────────────────────────────────

export const lessonCompletions = pgTable(
  'lesson_completions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),

    // Content identifiers (matches filesystem structure)
    trackSlug: text('track_slug').notNull(),
    moduleSlug: text('module_slug').notNull(),
    lessonSlug: text('lesson_slug').notNull(),

    // Completion timestamp
    completedAt: timestamp('completed_at', { withTimezone: true }).notNull().defaultNow(),

    // Metadata
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // One completion per user per lesson
    uniqueIndex('idx_lesson_completion_unique').on(
      table.userId,
      table.trackSlug,
      table.moduleSlug,
      table.lessonSlug
    ),
    // Query by user
    index('idx_lesson_completion_user').on(table.userId),
    // Query by track/module for progress calculation
    index('idx_lesson_completion_track_module').on(table.userId, table.trackSlug, table.moduleSlug),
  ]
);

// ─────────────────────────────────────────────────────────────
// QUIZ QUESTIONS
// ─────────────────────────────────────────────────────────────

export const quizQuestions = pgTable(
  'quiz_questions',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    // Question identifier
    questionId: text('question_id').notNull().unique(), // e.g., 'acc-001', 'val-015'
    moduleSlug: text('module_slug').notNull(), // 'accounting-foundations', 'valuation-modeling', 'lbos-advanced-topics'

    // Question content
    question: text('question').notNull(),
    optionA: text('option_a').notNull(),
    optionB: text('option_b').notNull(),
    optionC: text('option_c').notNull(),
    optionD: text('option_d').notNull(),
    correctAnswer: quizAnswerEnum('correct_answer').notNull(),
    explanation: text('explanation').notNull(),

    // Classification
    difficulty: quizDifficultyEnum('difficulty').notNull(),
    questionType: quizQuestionTypeEnum('question_type').notNull(),
    topic: text('topic'), // Sub-topic for filtering (optional)

    // Metadata
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('idx_quiz_questions_module').on(table.moduleSlug),
    index('idx_quiz_questions_difficulty').on(table.moduleSlug, table.difficulty),
    index('idx_quiz_questions_type').on(table.moduleSlug, table.questionType),
  ]
);

// ─────────────────────────────────────────────────────────────
// QUIZ ATTEMPTS (User Answers)
// ─────────────────────────────────────────────────────────────

export const quizAttempts = pgTable(
  'quiz_attempts',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    // User and question reference
    userId: text('user_id').notNull(), // Clerk user ID
    questionId: text('question_id').notNull().references(() => quizQuestions.questionId),
    moduleSlug: text('module_slug').notNull(),

    // Answer data
    selectedAnswer: quizAnswerEnum('selected_answer').notNull(),
    isCorrect: boolean('is_correct').notNull(),

    // Timestamps
    attemptedAt: timestamp('attempted_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // Index for querying user's attempts
    index('idx_quiz_attempts_user').on(table.userId),
    // Index for querying user's attempts by module
    index('idx_quiz_attempts_user_module').on(table.userId, table.moduleSlug),
    // Index for getting wrong answers for review mode
    index('idx_quiz_attempts_wrong').on(table.userId, table.isCorrect),
    // Index for getting latest attempt per question
    index('idx_quiz_attempts_user_question').on(table.userId, table.questionId),
  ]
);

// ─────────────────────────────────────────────────────────────
// RESUME FEEDBACK
// ─────────────────────────────────────────────────────────────

export const resumeFeedback = pgTable(
  'resume_feedback',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    trackSlug: text('track_slug').notNull(),

    // File reference (no raw text stored for privacy)
    resumeObjectKey: text('resume_object_key'),
    resumeFileName: text('resume_file_name'),

    // Non-PII metadata
    pageCount: integer('page_count'),
    wordCount: integer('word_count'),

    // Processing status
    status: resumeStatusEnum('status').notNull().default('pending'),
    errorMessage: text('error_message'),

    // Scores (denormalized for quick queries)
    overallScore10: integer('overall_score_10'), // 1-10
    scoreFormat: integer('score_format'), // 0-100
    scoreEducation: integer('score_education'), // 0-100
    scoreExperience: integer('score_experience'), // 0-100
    scoreSkills: integer('score_skills'), // 0-100
    scoreWriting: integer('score_writing'), // 0-100

    // Feedback (contains only analyzed bullets, not full resume text)
    feedbackJson: jsonb('feedback_json'),

    // Timestamps
    submittedAt: timestamp('submitted_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    r2DeletedAt: timestamp('r2_deleted_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // Index for quota queries (count non-failed submissions per user)
    index('idx_resume_feedback_user').on(table.userId),
    // Index for querying by track
    index('idx_resume_feedback_track').on(table.userId, table.trackSlug),
    // Index for status queries
    index('idx_resume_feedback_status').on(table.status),
  ]
);

// ─────────────────────────────────────────────────────────────
// OUTREACH CONTACTS
// ─────────────────────────────────────────────────────────────

export const outreachContacts = pgTable(
  'outreach_contacts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),

    // Contact info (manual entry only)
    name: text('name').notNull(),
    firm: text('firm').notNull(),
    role: contactRoleEnum('role'),
    email: text('email'), // Optional - user may not have it yet
    linkedinUrl: text('linkedin_url'), // LinkedIn profile URL for fetching context

    // Connection context
    connectionType: connectionTypeEnum('connection_type'),
    connectionNote: text('connection_note'), // "Met at GS info session", "Referred by John"

    // Status tracking
    status: outreachStatusEnum('status').notNull().default('identified'),

    // Timestamps for follow-up tracking
    lastContactDate: timestamp('last_contact_date', { withTimezone: true, mode: 'date' }),
    followUpDue: timestamp('follow_up_due', { withTimezone: true, mode: 'date' }),

    // Notes (freeform)
    notes: text('notes'),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('idx_outreach_contacts_user').on(table.userId),
    index('idx_outreach_contacts_follow_up').on(table.userId, table.followUpDue),
    index('idx_outreach_contacts_status').on(table.userId, table.status),
  ]
);

// ─────────────────────────────────────────────────────────────
// OUTREACH USER SETTINGS
// ─────────────────────────────────────────────────────────────

export const outreachSettings = pgTable(
  'outreach_settings',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull().unique(),

    // User profile for email generation
    userName: text('user_name'),
    userSchool: text('user_school'),
    userYear: text('user_year'), // "Junior", "Senior", etc.
    userMajor: text('user_major'),
    userInterest: text('user_interest'), // "Tech coverage", "Healthcare M&A", etc.

    // Rate limiting
    emailGenerationsToday: integer('email_generations_today').notNull().default(0),
    lastGenerationDate: timestamp('last_generation_date', { withTimezone: true, mode: 'date' }),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('idx_outreach_settings_user').on(table.userId),
  ]
);

// ─────────────────────────────────────────────────────────────
// TYPE EXPORTS
// ─────────────────────────────────────────────────────────────

export type LessonCompletion = typeof lessonCompletions.$inferSelect;
export type NewLessonCompletion = typeof lessonCompletions.$inferInsert;

export type InterviewAttempt = typeof interviewAttempts.$inferSelect;
export type NewInterviewAttempt = typeof interviewAttempts.$inferInsert;

export type CandidateLockout = typeof candidateLockouts.$inferSelect;
export type NewCandidateLockout = typeof candidateLockouts.$inferInsert;

export type PromptVersion = typeof promptVersions.$inferSelect;
export type EvaluatorVersion = typeof evaluatorVersions.$inferSelect;

export type InterviewViewer = typeof interviewViewers.$inferSelect;
export type VideoAccessLogEntry = typeof videoAccessLog.$inferSelect;

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type NewQuizQuestion = typeof quizQuestions.$inferInsert;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type NewQuizAttempt = typeof quizAttempts.$inferInsert;

export type ResumeFeedback = typeof resumeFeedback.$inferSelect;
export type NewResumeFeedback = typeof resumeFeedback.$inferInsert;

export type OutreachContact = typeof outreachContacts.$inferSelect;
export type NewOutreachContact = typeof outreachContacts.$inferInsert;

export type OutreachSettings = typeof outreachSettings.$inferSelect;
export type NewOutreachSettings = typeof outreachSettings.$inferInsert;

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

export const purchaseStatusEnum = pgEnum('purchase_status', [
  'active',       // Paid and has access
  'refunded',     // Admin issued refund, access revoked
  'disputed',     // Chargeback filed, access revoked
]);

export const adminActionTypeEnum = pgEnum('admin_action_type', [
  'grant_access',    // Manually granted access (e.g., free access, comp)
  'revoke_access',   // Manually revoked access
  'issue_refund',    // Processed refund via Stripe
  'resolve_dispute', // Resolved a chargeback
]);

export const contactRoleEnum = pgEnum('contact_role', [
  'analyst',
  'associate',
  'vp',
  'director',
  'md',
  'other',
]);

export const emailFormatTypeEnum = pgEnum('email_format_type', [
  'first.last',     // john.doe@bank.com
  'flast',          // jdoe@bank.com
  'firstlast',      // johndoe@bank.com
  'first_last',     // john_doe@bank.com
  'lastf',          // doej@bank.com
  'first',          // john@bank.com
]);

export const outreachActivityTypeEnum = pgEnum('outreach_activity_type', [
  'contact_added',
  'email_sent',
  'response_received',
  'call_scheduled',
  'call_completed',
  'became_advocate',
]);

export const achievementTypeEnum = pgEnum('achievement_type', [
  // Milestones
  'first_contact',
  'first_10_emails',
  'contacts_50',
  'emails_100',
  // Consistency
  'streak_2_weeks',
  'streak_4_weeks',
  'streak_8_weeks',
  'streak_12_weeks',
  // Volume
  'contacts_10',
  'contacts_25',
  'contacts_100',
  'emails_25',
  'emails_50',
  'emails_200',
]);

// ─────────────────────────────────────────────────────────────
// BANK EMAIL FORMATS
// ─────────────────────────────────────────────────────────────

export const bankEmailFormats = pgTable(
  'bank_email_formats',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    bankName: text('bank_name').notNull(),
    bankNameNormalized: text('bank_name_normalized').notNull(), // lowercase, no spaces
    emailFormat: emailFormatTypeEnum('email_format').notNull(),
    domain: text('domain').notNull(), // e.g., gs.com, morganstanley.com
    aliases: jsonb('aliases').default(sql`'[]'::jsonb`), // alternate bank names
    isVerified: boolean('is_verified').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('idx_bank_email_formats_normalized').on(table.bankNameNormalized),
    index('idx_bank_email_formats_domain').on(table.domain),
  ]
);

// ─────────────────────────────────────────────────────────────
// OUTREACH ACTIVITY LOG (for gamification)
// ─────────────────────────────────────────────────────────────

export const outreachActivityLog = pgTable(
  'outreach_activity_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    activityType: outreachActivityTypeEnum('activity_type').notNull(),
    contactId: uuid('contact_id').references(() => outreachContacts.id, { onDelete: 'set null' }),
    pointsEarned: integer('points_earned').notNull().default(0),
    occurredAt: timestamp('occurred_at', { withTimezone: true }).notNull().defaultNow(),
    weekId: text('week_id').notNull(), // ISO week format: '2024-W05'
  },
  (table) => [
    index('idx_activity_log_user').on(table.userId),
    index('idx_activity_log_week').on(table.userId, table.weekId),
    index('idx_activity_log_occurred').on(table.userId, table.occurredAt),
  ]
);

// ─────────────────────────────────────────────────────────────
// USER ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────

export const userAchievements = pgTable(
  'user_achievements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    achievementType: achievementTypeEnum('achievement_type').notNull(),
    earnedAt: timestamp('earned_at', { withTimezone: true }).notNull().defaultNow(),
    rewardUnlocked: text('reward_unlocked'), // Optional reward description
    celebrationShown: boolean('celebration_shown').notNull().default(false),
  },
  (table) => [
    uniqueIndex('idx_user_achievements_unique').on(table.userId, table.achievementType),
    index('idx_user_achievements_user').on(table.userId),
  ]
);

// ─────────────────────────────────────────────────────────────
// OUTREACH WEEKLY STATS (aggregation for performance)
// ─────────────────────────────────────────────────────────────

export const outreachWeeklyStats = pgTable(
  'outreach_weekly_stats',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    weekId: text('week_id').notNull(), // ISO week format: '2024-W05'
    contactsAdded: integer('contacts_added').notNull().default(0),
    emailsSent: integer('emails_sent').notNull().default(0),
    responsesReceived: integer('responses_received').notNull().default(0),
    callsScheduled: integer('calls_scheduled').notNull().default(0),
    callsCompleted: integer('calls_completed').notNull().default(0),
    advocatesGained: integer('advocates_gained').notNull().default(0),
    totalPoints: integer('total_points').notNull().default(0),
    activeDays: jsonb('active_days').default(sql`'[]'::jsonb`), // Array of day numbers (0-6)
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('idx_weekly_stats_user_week').on(table.userId, table.weekId),
    index('idx_weekly_stats_user').on(table.userId),
  ]
);

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

    // Screenshot for visual formatting analysis (optional)
    screenshotObjectKey: text('screenshot_object_key'),
    screenshotContentType: text('screenshot_content_type'),

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

    // New: Parsed name fields for email generation
    firstName: text('first_name'),
    lastName: text('last_name'),

    // New: Email generation tracking
    emailGenerated: boolean('email_generated').notNull().default(false), // Was email auto-generated?
    emailVerified: boolean('email_verified').notNull().default(false), // Has user verified/corrected email?

    // New: Import batch tracking
    importBatchId: uuid('import_batch_id'), // Links contacts from same import

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
    index('idx_outreach_contacts_import_batch').on(table.importBatchId),
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
    userPreviousExperience: text('user_previous_experience'), // "Goldman Sachs SA '24, Deloitte intern '23"
    userHometown: text('user_hometown'), // "Dallas, TX" for regional connections

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
// PRODUCTS (Course catalog)
// ─────────────────────────────────────────────────────────────

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    // Product identifier (matches course/track slug)
    slug: text('slug').notNull().unique(), // 'ib-interview-prep', 'pe-interview-prep'
    name: text('name').notNull(),          // 'Investment Banking Interview Prep'
    description: text('description'),

    // Pricing
    priceUsdCents: integer('price_usd_cents').notNull(), // 28500 = $285.00

    // Stripe references
    stripeProductId: text('stripe_product_id'),
    stripePriceId: text('stripe_price_id'),

    // State
    isActive: boolean('is_active').notNull().default(true),

    // What this product grants access to (track slugs)
    // For bundles, this can contain multiple slugs
    grantedTrackSlugs: jsonb('granted_track_slugs').notNull().default(sql`'[]'::jsonb`),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('idx_products_active').on(table.isActive),
  ]
);

// ─────────────────────────────────────────────────────────────
// PURCHASES (User entitlements)
// ─────────────────────────────────────────────────────────────

export const purchases = pgTable(
  'purchases',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    // User reference (Clerk user ID)
    userId: text('user_id').notNull(),

    // Product reference
    productId: uuid('product_id').notNull().references(() => products.id),

    // Stripe references
    stripeCustomerId: text('stripe_customer_id'),
    stripePaymentIntentId: text('stripe_payment_intent_id'),
    stripeCheckoutSessionId: text('stripe_checkout_session_id'),

    // Amount paid (for refund reference)
    amountPaidCents: integer('amount_paid_cents').notNull(),

    // Status
    status: purchaseStatusEnum('status').notNull().default('active'),

    // Timestamps
    purchasedAt: timestamp('purchased_at', { withTimezone: true }).notNull().defaultNow(),
    refundedAt: timestamp('refunded_at', { withTimezone: true }),
    disputedAt: timestamp('disputed_at', { withTimezone: true }),

    // For future use: expiring access
    expiresAt: timestamp('expires_at', { withTimezone: true }), // null = lifetime

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // Index for checking user access
    index('idx_purchases_user').on(table.userId),
    index('idx_purchases_user_status').on(table.userId, table.status),
    // Index for Stripe webhook lookups
    index('idx_purchases_checkout_session').on(table.stripeCheckoutSessionId),
    index('idx_purchases_payment_intent').on(table.stripePaymentIntentId),
  ]
);

// ─────────────────────────────────────────────────────────────
// ADMIN ACTIONS LOG (Audit trail)
// ─────────────────────────────────────────────────────────────

export const adminActions = pgTable(
  'admin_actions',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    // Who performed the action
    adminUserId: text('admin_user_id').notNull(),

    // What action
    actionType: adminActionTypeEnum('action_type').notNull(),

    // Target user
    targetUserId: text('target_user_id').notNull(),

    // Related purchase (if applicable)
    purchaseId: uuid('purchase_id').references(() => purchases.id),

    // Details
    reason: text('reason'), // Why the action was taken
    notes: text('notes'),   // Additional context

    // Stripe refund reference (if applicable)
    stripeRefundId: text('stripe_refund_id'),
    refundAmountCents: integer('refund_amount_cents'),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('idx_admin_actions_target').on(table.targetUserId),
    index('idx_admin_actions_admin').on(table.adminUserId),
    index('idx_admin_actions_purchase').on(table.purchaseId),
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

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Purchase = typeof purchases.$inferSelect;
export type NewPurchase = typeof purchases.$inferInsert;

export type AdminAction = typeof adminActions.$inferSelect;
export type NewAdminAction = typeof adminActions.$inferInsert;

export type BankEmailFormat = typeof bankEmailFormats.$inferSelect;
export type NewBankEmailFormat = typeof bankEmailFormats.$inferInsert;

export type OutreachActivityLog = typeof outreachActivityLog.$inferSelect;
export type NewOutreachActivityLog = typeof outreachActivityLog.$inferInsert;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type NewUserAchievement = typeof userAchievements.$inferInsert;

export type OutreachWeeklyStats = typeof outreachWeeklyStats.$inferSelect;
export type NewOutreachWeeklyStats = typeof outreachWeeklyStats.$inferInsert;

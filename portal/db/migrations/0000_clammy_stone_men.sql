CREATE TYPE "public"."access_type" AS ENUM('video_view', 'transcript_view', 'feedback_view');--> statement-breakpoint
CREATE TYPE "public"."attempt_status" AS ENUM('in_progress', 'processing', 'complete', 'abandoned', 'failed');--> statement-breakpoint
CREATE TYPE "public"."hire_inclination" AS ENUM('hire', 'borderline', 'no_hire');--> statement-breakpoint
CREATE TYPE "public"."integrity_status" AS ENUM('clean', 'flagged', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."lock_reason" AS ENUM('abandoned', 'cooldown', 'admin_hold');--> statement-breakpoint
CREATE TYPE "public"."processing_stage" AS ENUM('upload_pending', 'upload_verified', 'transcribing', 'segmenting', 'evaluating', 'finalizing');--> statement-breakpoint
CREATE TYPE "public"."unlock_decision" AS ENUM('pending', 'approved', 'denied');--> statement-breakpoint
CREATE TYPE "public"."viewer_role" AS ENUM('admin', 'viewer');--> statement-breakpoint
CREATE TABLE "active_versions" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"active_prompt_version_id" text NOT NULL,
	"active_evaluator_version_id" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text NOT NULL,
	CONSTRAINT "singleton_check" CHECK ("active_versions"."id" = 1)
);
--> statement-breakpoint
CREATE TABLE "candidate_lockouts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" text NOT NULL,
	"is_locked" boolean DEFAULT false NOT NULL,
	"lock_reason" "lock_reason",
	"locked_at" timestamp with time zone,
	"locked_until" timestamp with time zone,
	"unlock_request_text" text,
	"unlock_requested_at" timestamp with time zone,
	"unlock_decision" "unlock_decision",
	"unlock_decided_by" text,
	"unlock_decided_at" timestamp with time zone,
	"unlock_decision_note" text,
	"total_attempts" integer DEFAULT 0 NOT NULL,
	"abandoned_attempts" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "candidate_lockouts_candidate_id_unique" UNIQUE("candidate_id")
);
--> statement-breakpoint
CREATE TABLE "evaluator_versions" (
	"id" text PRIMARY KEY NOT NULL,
	"system_prompt" text NOT NULL,
	"output_schema" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" text NOT NULL,
	"attempt_number" integer NOT NULL,
	"status" "attempt_status" DEFAULT 'in_progress' NOT NULL,
	"processing_stage" "processing_stage",
	"last_stage_updated_at" timestamp with time zone,
	"video_object_key" text,
	"video_expires_at" timestamp with time zone,
	"video_deleted" boolean DEFAULT false NOT NULL,
	"segments" jsonb,
	"feedback_json" jsonb,
	"hire_inclination" "hire_inclination",
	"integrity_log" jsonb,
	"integrity_schema_version" text,
	"integrity_status" "integrity_status",
	"prompt_version_id" text NOT NULL,
	"evaluator_version_id" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"submitted_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"error_message" text,
	"error_code" text,
	"retry_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_viewers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"role" "viewer_role" NOT NULL,
	"added_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_completions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"track_slug" text NOT NULL,
	"module_slug" text NOT NULL,
	"lesson_slug" text NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prompt_versions" (
	"id" text PRIMARY KEY NOT NULL,
	"prompts" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_access_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"attempt_id" uuid NOT NULL,
	"viewer_user_id" text NOT NULL,
	"accessed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"access_type" "access_type" NOT NULL,
	"ip_address" text,
	"user_agent" text
);
--> statement-breakpoint
ALTER TABLE "active_versions" ADD CONSTRAINT "active_versions_active_prompt_version_id_prompt_versions_id_fk" FOREIGN KEY ("active_prompt_version_id") REFERENCES "public"."prompt_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "active_versions" ADD CONSTRAINT "active_versions_active_evaluator_version_id_evaluator_versions_id_fk" FOREIGN KEY ("active_evaluator_version_id") REFERENCES "public"."evaluator_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_access_log" ADD CONSTRAINT "video_access_log_attempt_id_interview_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."interview_attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_one_active_attempt_per_candidate" ON "interview_attempts" USING btree ("candidate_id") WHERE status IN ('in_progress', 'processing');--> statement-breakpoint
CREATE INDEX "idx_attempts_candidate" ON "interview_attempts" USING btree ("candidate_id");--> statement-breakpoint
CREATE INDEX "idx_attempts_video_expiry" ON "interview_attempts" USING btree ("video_expires_at") WHERE video_deleted = false;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_viewer_user" ON "interview_viewers" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_lesson_completion_unique" ON "lesson_completions" USING btree ("user_id","track_slug","module_slug","lesson_slug");--> statement-breakpoint
CREATE INDEX "idx_lesson_completion_user" ON "lesson_completions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_lesson_completion_track_module" ON "lesson_completions" USING btree ("user_id","track_slug","module_slug");--> statement-breakpoint
CREATE INDEX "idx_access_log_attempt" ON "video_access_log" USING btree ("attempt_id");--> statement-breakpoint
CREATE INDEX "idx_access_log_viewer" ON "video_access_log" USING btree ("viewer_user_id");--> statement-breakpoint
CREATE INDEX "idx_access_log_time" ON "video_access_log" USING btree ("accessed_at");
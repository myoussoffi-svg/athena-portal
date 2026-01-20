-- Add resume_feedback table for the Resume Feedback feature
-- Allows users to upload resumes and receive AI-powered IB-specific feedback

CREATE TYPE "public"."resume_status" AS ENUM('pending', 'uploading', 'extracting', 'analyzing', 'complete', 'failed');

CREATE TABLE "resume_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"track_slug" text NOT NULL,
	"resume_object_key" text,
	"resume_file_name" text,
	"page_count" integer,
	"word_count" integer,
	"status" "resume_status" DEFAULT 'pending' NOT NULL,
	"error_message" text,
	"overall_score_10" integer,
	"score_format" integer,
	"score_education" integer,
	"score_experience" integer,
	"score_skills" integer,
	"score_writing" integer,
	"feedback_json" jsonb,
	"submitted_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"r2_deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX "idx_resume_feedback_user" ON "resume_feedback" USING btree ("user_id");
CREATE INDEX "idx_resume_feedback_track" ON "resume_feedback" USING btree ("user_id","track_slug");
CREATE INDEX "idx_resume_feedback_status" ON "resume_feedback" USING btree ("status");

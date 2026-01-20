CREATE TYPE "public"."connection_type" AS ENUM('alumni', 'referral', 'cold', 'event', 'other');--> statement-breakpoint
CREATE TYPE "public"."contact_role" AS ENUM('analyst', 'associate', 'vp', 'director', 'md', 'other');--> statement-breakpoint
CREATE TYPE "public"."outreach_status" AS ENUM('identified', 'contacted', 'responded', 'scheduled', 'spoke', 'advocate', 'stale');--> statement-breakpoint
CREATE TABLE "outreach_contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"firm" text NOT NULL,
	"role" "contact_role",
	"email" text,
	"connection_type" "connection_type",
	"connection_note" text,
	"status" "outreach_status" DEFAULT 'identified' NOT NULL,
	"last_contact_date" timestamp with time zone,
	"follow_up_due" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outreach_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"user_name" text,
	"user_school" text,
	"user_year" text,
	"user_major" text,
	"user_interest" text,
	"email_generations_today" integer DEFAULT 0 NOT NULL,
	"last_generation_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "outreach_settings_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE INDEX "idx_outreach_contacts_user" ON "outreach_contacts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_outreach_contacts_follow_up" ON "outreach_contacts" USING btree ("user_id","follow_up_due");--> statement-breakpoint
CREATE INDEX "idx_outreach_contacts_status" ON "outreach_contacts" USING btree ("user_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_outreach_settings_user" ON "outreach_settings" USING btree ("user_id");
CREATE TYPE "public"."achievement_type" AS ENUM('first_contact', 'first_10_emails', 'contacts_50', 'emails_100', 'streak_2_weeks', 'streak_4_weeks', 'streak_8_weeks', 'streak_12_weeks', 'contacts_10', 'contacts_25', 'contacts_100', 'emails_25', 'emails_50', 'emails_200');--> statement-breakpoint
CREATE TYPE "public"."admin_action_type" AS ENUM('grant_access', 'revoke_access', 'issue_refund', 'resolve_dispute');--> statement-breakpoint
CREATE TYPE "public"."email_format_type" AS ENUM('first.last', 'flast', 'firstlast', 'first_last', 'lastf', 'first');--> statement-breakpoint
CREATE TYPE "public"."outreach_activity_type" AS ENUM('contact_added', 'email_sent', 'response_received', 'call_scheduled', 'call_completed', 'became_advocate');--> statement-breakpoint
CREATE TYPE "public"."purchase_status" AS ENUM('active', 'refunded', 'disputed');--> statement-breakpoint
CREATE TABLE "admin_actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_user_id" text NOT NULL,
	"action_type" "admin_action_type" NOT NULL,
	"target_user_id" text NOT NULL,
	"purchase_id" uuid,
	"reason" text,
	"notes" text,
	"stripe_refund_id" text,
	"refund_amount_cents" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bank_email_formats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bank_name" text NOT NULL,
	"bank_name_normalized" text NOT NULL,
	"email_format" "email_format_type" NOT NULL,
	"domain" text NOT NULL,
	"aliases" jsonb DEFAULT '[]'::jsonb,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outreach_activity_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"activity_type" "outreach_activity_type" NOT NULL,
	"contact_id" uuid,
	"points_earned" integer DEFAULT 0 NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"week_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outreach_weekly_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"week_id" text NOT NULL,
	"contacts_added" integer DEFAULT 0 NOT NULL,
	"emails_sent" integer DEFAULT 0 NOT NULL,
	"responses_received" integer DEFAULT 0 NOT NULL,
	"calls_scheduled" integer DEFAULT 0 NOT NULL,
	"calls_completed" integer DEFAULT 0 NOT NULL,
	"advocates_gained" integer DEFAULT 0 NOT NULL,
	"total_points" integer DEFAULT 0 NOT NULL,
	"active_days" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price_usd_cents" integer NOT NULL,
	"stripe_product_id" text,
	"stripe_price_id" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"granted_track_slugs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"product_id" uuid NOT NULL,
	"stripe_customer_id" text,
	"stripe_payment_intent_id" text,
	"stripe_checkout_session_id" text,
	"amount_paid_cents" integer NOT NULL,
	"status" "purchase_status" DEFAULT 'active' NOT NULL,
	"purchased_at" timestamp with time zone DEFAULT now() NOT NULL,
	"refunded_at" timestamp with time zone,
	"disputed_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"achievement_type" "achievement_type" NOT NULL,
	"earned_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reward_unlocked" text,
	"celebration_shown" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "outreach_contacts" ADD COLUMN "first_name" text;--> statement-breakpoint
ALTER TABLE "outreach_contacts" ADD COLUMN "last_name" text;--> statement-breakpoint
ALTER TABLE "outreach_contacts" ADD COLUMN "email_generated" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "outreach_contacts" ADD COLUMN "email_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "outreach_contacts" ADD COLUMN "import_batch_id" uuid;--> statement-breakpoint
ALTER TABLE "resume_feedback" ADD COLUMN "screenshot_object_key" text;--> statement-breakpoint
ALTER TABLE "resume_feedback" ADD COLUMN "screenshot_content_type" text;--> statement-breakpoint
ALTER TABLE "admin_actions" ADD CONSTRAINT "admin_actions_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outreach_activity_log" ADD CONSTRAINT "outreach_activity_log_contact_id_outreach_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."outreach_contacts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_admin_actions_target" ON "admin_actions" USING btree ("target_user_id");--> statement-breakpoint
CREATE INDEX "idx_admin_actions_admin" ON "admin_actions" USING btree ("admin_user_id");--> statement-breakpoint
CREATE INDEX "idx_admin_actions_purchase" ON "admin_actions" USING btree ("purchase_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_bank_email_formats_normalized" ON "bank_email_formats" USING btree ("bank_name_normalized");--> statement-breakpoint
CREATE INDEX "idx_bank_email_formats_domain" ON "bank_email_formats" USING btree ("domain");--> statement-breakpoint
CREATE INDEX "idx_activity_log_user" ON "outreach_activity_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_activity_log_week" ON "outreach_activity_log" USING btree ("user_id","week_id");--> statement-breakpoint
CREATE INDEX "idx_activity_log_occurred" ON "outreach_activity_log" USING btree ("user_id","occurred_at");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_weekly_stats_user_week" ON "outreach_weekly_stats" USING btree ("user_id","week_id");--> statement-breakpoint
CREATE INDEX "idx_weekly_stats_user" ON "outreach_weekly_stats" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_products_active" ON "products" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_purchases_user" ON "purchases" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_purchases_user_status" ON "purchases" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "idx_purchases_checkout_session" ON "purchases" USING btree ("stripe_checkout_session_id");--> statement-breakpoint
CREATE INDEX "idx_purchases_payment_intent" ON "purchases" USING btree ("stripe_payment_intent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_achievements_unique" ON "user_achievements" USING btree ("user_id","achievement_type");--> statement-breakpoint
CREATE INDEX "idx_user_achievements_user" ON "user_achievements" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_outreach_contacts_import_batch" ON "outreach_contacts" USING btree ("import_batch_id");
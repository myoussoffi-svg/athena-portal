-- First drop the singleton constraint
ALTER TABLE "active_versions" DROP CONSTRAINT IF EXISTS "singleton_check";

-- Delete existing row (there can only be one due to singleton)
-- We'll re-seed with track-specific entries after migration
DELETE FROM "active_versions";

-- Change id type from integer to uuid
ALTER TABLE "active_versions" ALTER COLUMN "id" SET DATA TYPE uuid USING gen_random_uuid();
ALTER TABLE "active_versions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- Add track_slug column
ALTER TABLE "active_versions" ADD COLUMN "track_slug" text NOT NULL;

-- Add other columns that were picked up in the diff
ALTER TABLE "outreach_settings" ADD COLUMN IF NOT EXISTS "user_previous_experience" text;
ALTER TABLE "outreach_settings" ADD COLUMN IF NOT EXISTS "user_hometown" text;

-- Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS "idx_active_versions_track" ON "active_versions" USING btree ("track_slug");
ALTER TABLE "active_versions" ADD CONSTRAINT "active_versions_track_slug_unique" UNIQUE("track_slug");

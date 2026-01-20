-- Migration: Fix module slugs after folder rename
-- The module folders were renamed/swapped:
-- - Old `02-accounting-foundations` -> New `03-accounting-foundations`
-- - Old `03-valuation-modeling` -> New `02-valuation-modeling`

-- We need to swap the slugs in quiz_questions and quiz_attempts tables
-- Using a temporary value to avoid conflicts during the swap

-- Step 1: quiz_questions table
UPDATE quiz_questions SET module_slug = 'TEMP-accounting-foundations' WHERE module_slug = '02-accounting-foundations';
UPDATE quiz_questions SET module_slug = '02-valuation-modeling' WHERE module_slug = '03-valuation-modeling';
UPDATE quiz_questions SET module_slug = '03-accounting-foundations' WHERE module_slug = 'TEMP-accounting-foundations';

-- Step 2: quiz_attempts table
UPDATE quiz_attempts SET module_slug = 'TEMP-accounting-foundations' WHERE module_slug = '02-accounting-foundations';
UPDATE quiz_attempts SET module_slug = '02-valuation-modeling' WHERE module_slug = '03-valuation-modeling';
UPDATE quiz_attempts SET module_slug = '03-accounting-foundations' WHERE module_slug = 'TEMP-accounting-foundations';

-- Step 3: lesson_completions table (also uses module_slug)
UPDATE lesson_completions SET module_slug = 'TEMP-accounting-foundations' WHERE module_slug = '02-accounting-foundations';
UPDATE lesson_completions SET module_slug = '02-valuation-modeling' WHERE module_slug = '03-valuation-modeling';
UPDATE lesson_completions SET module_slug = '03-accounting-foundations' WHERE module_slug = 'TEMP-accounting-foundations';

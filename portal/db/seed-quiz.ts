/**
 * Quiz Seed Script
 * Imports quiz questions from JSON seed files into the database
 *
 * Run with: npx tsx db/seed-quiz.ts
 */

import { config } from 'dotenv';
import * as path from 'path';

// Load environment variables
config({ path: path.join(process.cwd(), '.env.local') });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as fs from 'fs';
import { quizQuestions, quizAttempts } from './schema';

// Quiz seed file paths
const SEED_FILES = [
  // IB course quizzes
  'lib/interview/knowledge-base/quiz-seeds-accounting.json',
  'lib/interview/knowledge-base/quiz-seeds-valuation.json',
  'lib/interview/knowledge-base/quiz-seeds-lbo.json',
  // PE course quizzes
  'db/seeds/quiz-seeds-pe-recruiting.json',
  'db/seeds/quiz-seeds-pe-sources-uses.json',
  'db/seeds/quiz-seeds-pe-debt-returns.json',
  'db/seeds/quiz-seeds-pe-paper-lbo.json',
  'db/seeds/quiz-seeds-pe-advanced-modeling.json',
  'db/seeds/quiz-seeds-pe-case-studies.json',
  'db/seeds/quiz-seeds-pe-fit-walkthrough.json',
];

// Map JSON module names to database module slugs (with numeric prefixes)
const MODULE_SLUG_MAP: Record<string, string> = {
  // IB course modules
  'accounting-foundations': '02-accounting-foundations',
  'valuation-modeling': '03-valuation-modeling',
  'lbos-advanced-topics': '04-lbos-advanced-topics',
  // PE course modules
  'pe-recruiting-mechanics': '01-pe-recruiting-mechanics',
  'lbo-sources-uses': '02-lbo-sources-uses',
  'lbo-debt-returns': '03-lbo-debt-returns',
  'paper-lbo-tests': '04-paper-lbo-tests',
  'advanced-pe-modeling': '05-advanced-pe-modeling',
  'case-studies-judgment': '06-case-studies-judgment',
  'deal-walkthroughs-fit': '07-deal-walkthroughs-fit',
};

interface QuizSeedQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'conceptual' | 'formulaic' | 'judgmental' | 'edge-case';
  topic?: string;
}

interface QuizSeedFile {
  module: string;
  title: string;
  questions: QuizSeedQuestion[];
}

async function seedQuiz() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client);

  console.log('Starting quiz seed...\n');

  // Clear existing data to allow re-seeding with updated slugs
  // Must clear attempts first due to foreign key constraint
  console.log('Clearing existing quiz data...');
  await db.delete(quizAttempts);
  console.log('  ✓ Cleared quiz attempts');
  await db.delete(quizQuestions);
  console.log('  ✓ Cleared quiz questions\n');

  let totalInserted = 0;
  let totalSkipped = 0;

  for (const seedFile of SEED_FILES) {
    const filePath = path.join(process.cwd(), seedFile);

    if (!fs.existsSync(filePath)) {
      console.log(`  Skipping ${seedFile} (file not found)`);
      continue;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const seedData: QuizSeedFile = JSON.parse(fileContent);

    const moduleSlug = MODULE_SLUG_MAP[seedData.module] || seedData.module;
    console.log(`Processing: ${seedData.title} (${seedData.questions.length} questions)`);

    for (const q of seedData.questions) {
      try {
        await db.insert(quizQuestions).values({
          questionId: q.id,
          moduleSlug,
          question: q.question,
          optionA: q.options.A,
          optionB: q.options.B,
          optionC: q.options.C,
          optionD: q.options.D,
          correctAnswer: q.correct,
          explanation: q.explanation,
          difficulty: q.difficulty,
          questionType: q.type,
          topic: q.topic || null,
        }).onConflictDoNothing();

        totalInserted++;
      } catch {
        // Question already exists (unique constraint on questionId)
        totalSkipped++;
      }
    }

    console.log(`  ✓ Processed ${seedData.questions.length} questions\n`);
  }

  console.log('─────────────────────────────────');
  console.log(`Quiz seed complete!`);
  console.log(`  Inserted: ${totalInserted} questions`);
  console.log(`  Skipped: ${totalSkipped} (already exist)`);

  await client.end();
  process.exit(0);
}

seedQuiz().catch((error) => {
  console.error('Quiz seed failed:', error);
  process.exit(1);
});

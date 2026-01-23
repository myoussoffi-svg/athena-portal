import type { CategoryScores } from './schemas';

// Category weights (must sum to 100)
// Focus on content quality and writing - not formatting minutiae
const WEIGHTS = {
  format: 15,      // Only major formatting issues matter (reduced from 25)
  education: 0,    // Education section not scored - school/GPA shouldn't affect score
  experience: 40,  // Descriptive content + specific examples (increased)
  skills: 5,       // Technical skills section is minor
  writing: 40,     // Spelling, grammar, professional tone - most important
} as const;

// Verify weights sum to 100 at compile time
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _weightSum: 100 = (WEIGHTS.format +
  WEIGHTS.education +
  WEIGHTS.experience +
  WEIGHTS.skills +
  WEIGHTS.writing) as 100;

/**
 * Calculate weighted average score from category scores
 * @param scores Category scores (0-100 each)
 * @returns Weighted average (0-100)
 */
export function calculateWeightedScore(scores: CategoryScores): number {
  const weighted =
    scores.format * WEIGHTS.format +
    scores.education * WEIGHTS.education +
    scores.experience * WEIGHTS.experience +
    scores.skills * WEIGHTS.skills +
    scores.writing * WEIGHTS.writing;

  return weighted / 100;
}

/**
 * Convert weighted score (0-100) to 1-10 scale
 * Uses fixed thresholds for deterministic, reproducible scoring
 * @param weighted Weighted average score (0-100)
 * @returns Score on 1-10 scale
 */
export function toScore10(weighted: number): number {
  if (weighted >= 95) return 10;
  if (weighted >= 88) return 9;
  if (weighted >= 80) return 8;
  if (weighted >= 72) return 7;
  if (weighted >= 64) return 6;
  if (weighted >= 56) return 5;
  if (weighted >= 48) return 4;
  if (weighted >= 40) return 3;
  if (weighted >= 30) return 2;
  return 1;
}

/**
 * Determine hire readiness based on overall score
 * @param score10 Score on 1-10 scale
 * @returns Hire readiness level
 */
export function determineHireReadiness(score10: number): 'ready' | 'almost' | 'needs_work' {
  if (score10 >= 8) return 'ready';
  if (score10 >= 6) return 'almost';
  return 'needs_work';
}

/**
 * Calculate the overall score from category scores
 * This is the main function to use for scoring
 * @param scores Category scores (0-100 each)
 * @returns Object with weighted score, 1-10 score, and hire readiness
 */
export function calculateOverallScore(scores: CategoryScores): {
  weightedScore: number;
  score10: number;
  hireReadiness: 'ready' | 'almost' | 'needs_work';
} {
  const weightedScore = calculateWeightedScore(scores);
  const score10 = toScore10(weightedScore);
  const hireReadiness = determineHireReadiness(score10);

  return { weightedScore, score10, hireReadiness };
}

/**
 * Get the score thresholds for reaching the next score level
 * @param currentScore10 Current score on 1-10 scale
 * @returns Threshold needed for next score, or null if at max
 */
export function getNextScoreThreshold(currentScore10: number): number | null {
  const thresholds: Record<number, number> = {
    1: 30,
    2: 40,
    3: 48,
    4: 56,
    5: 64,
    6: 72,
    7: 80,
    8: 88,
    9: 95,
    10: null as unknown as number,
  };
  return thresholds[currentScore10] ?? null;
}

/**
 * Get category weights for display
 */
export function getCategoryWeights(): typeof WEIGHTS {
  return WEIGHTS;
}

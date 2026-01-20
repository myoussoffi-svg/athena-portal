/**
 * Pre-analyzer for heuristic checks before LLM evaluation
 * Performs text-based analysis without requiring Claude Vision
 */

export interface PreAnalysisResult {
  // Contact info detection
  hasEmail: boolean;
  hasPhone: boolean;
  hasLinkedIn: boolean;

  // Structure detection
  sectionHeaders: string[];
  bulletCount: number;

  // Consistency checks
  dateFormats: string[];
  bulletPunctuation: {
    withPeriod: number;
    withoutPeriod: number;
    inconsistent: boolean;
  };

  // Red flags
  weakVerbs: string[];
  vaguePhrases: string[];
  firstPersonPronouns: string[];

  // Positive indicators
  quantifiedBullets: number;
  financeBuzzwords: string[];
  actionVerbs: string[];
}

// Weak verbs that should be replaced
const WEAK_VERBS = [
  'helped',
  'assisted',
  'worked on',
  'was responsible for',
  'participated in',
  'contributed to',
  'involved in',
  'supported',
  'aided',
  'handled',
];

// Vague phrases to flag
const VAGUE_PHRASES = [
  'various',
  'multiple',
  'different',
  'many',
  'several',
  'etc',
  'and more',
  'duties included',
  'responsibilities included',
  'day-to-day',
  'miscellaneous',
];

// Strong IB action verbs
const STRONG_VERBS = [
  'built',
  'constructed',
  'created',
  'developed',
  'analyzed',
  'evaluated',
  'conducted',
  'performed',
  'spearheaded',
  'led',
  'managed',
  'directed',
  'collaborated',
  'presented',
  'pitched',
  'drafted',
  'modeled',
  'structured',
  'executed',
  'negotiated',
];

// Finance buzzwords to reward
const FINANCE_BUZZWORDS = [
  'ebitda',
  'irr',
  'capex',
  'dcf',
  'm&a',
  'lbo',
  'ipo',
  'valuation',
  'accretion',
  'dilution',
  'synergies',
  'pro forma',
  'due diligence',
  'comparable',
  'precedent',
  'leverage',
  'multiple',
  'cash flow',
  'revenue',
  'margin',
  'acquisition',
  'merger',
  'capital markets',
  'equity',
  'debt',
  'financing',
];

// Common section headers
const SECTION_HEADERS = [
  'education',
  'experience',
  'work experience',
  'professional experience',
  'skills',
  'activities',
  'extracurricular',
  'leadership',
  'additional',
  'interests',
  'certifications',
  'awards',
  'honors',
  'projects',
];

/**
 * Perform heuristic pre-analysis on resume text
 */
export function analyzeResume(text: string): PreAnalysisResult {
  const lowerText = text.toLowerCase();
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  // Contact info detection
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const hasLinkedIn = /linkedin\.com/i.test(text) || /linkedin/i.test(text);

  // Section headers detection
  const sectionHeaders = SECTION_HEADERS.filter((header) => {
    const regex = new RegExp(`^${header}`, 'im');
    return regex.test(text);
  });

  // Bullet detection (lines starting with • or -)
  const bulletLines = lines.filter((line) =>
    /^[•\-–—*▪︎◦○]/.test(line) || /^\d+[.)]\s/.test(line)
  );
  const bulletCount = bulletLines.length;

  // Date format detection
  const dateFormats: string[] = [];
  if (/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/i.test(text)) {
    dateFormats.push('Month YYYY');
  }
  if (/\b\d{1,2}\/\d{4}\b/.test(text)) {
    dateFormats.push('MM/YYYY');
  }
  if (/\b\d{4}\s*[-–]\s*(Present|\d{4})\b/i.test(text)) {
    dateFormats.push('YYYY - YYYY');
  }
  if (/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i.test(text)) {
    dateFormats.push('Full Month YYYY');
  }

  // Bullet punctuation consistency
  const bulletsWithPeriod = bulletLines.filter((b) => /\.\s*$/.test(b)).length;
  const bulletsWithoutPeriod = bulletLines.length - bulletsWithPeriod;
  const bulletPunctuation = {
    withPeriod: bulletsWithPeriod,
    withoutPeriod: bulletsWithoutPeriod,
    inconsistent: bulletsWithPeriod > 0 && bulletsWithoutPeriod > 0 &&
      Math.min(bulletsWithPeriod, bulletsWithoutPeriod) > 2,
  };

  // Weak verbs detection
  const weakVerbs = WEAK_VERBS.filter((verb) => {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    return regex.test(lowerText);
  });

  // Vague phrases detection
  const vaguePhrases = VAGUE_PHRASES.filter((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    return regex.test(lowerText);
  });

  // First person pronouns
  const firstPersonPronouns: string[] = [];
  if (/\bI\b/.test(text)) firstPersonPronouns.push('I');
  if (/\bmy\b/i.test(text)) firstPersonPronouns.push('my');
  if (/\bme\b/i.test(text)) firstPersonPronouns.push('me');

  // Quantified bullets (contain numbers, $, %)
  const quantifiedBullets = bulletLines.filter((b) =>
    /\$[\d,]+|\d+%|\d{2,}[kmb]?|\d+x/i.test(b)
  ).length;

  // Finance buzzwords found
  const financeBuzzwords = FINANCE_BUZZWORDS.filter((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return regex.test(lowerText);
  });

  // Strong action verbs found
  const actionVerbs = STRONG_VERBS.filter((verb) => {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    return regex.test(lowerText);
  });

  return {
    hasEmail,
    hasPhone,
    hasLinkedIn,
    sectionHeaders,
    bulletCount,
    dateFormats,
    bulletPunctuation,
    weakVerbs,
    vaguePhrases,
    firstPersonPronouns,
    quantifiedBullets,
    financeBuzzwords,
    actionVerbs,
  };
}

/**
 * Get formatting issues from pre-analysis
 */
export function getFormattingIssues(analysis: PreAnalysisResult): Array<{
  issue: string;
  location: string;
  fix: string;
}> {
  const issues: Array<{ issue: string; location: string; fix: string }> = [];

  if (!analysis.hasEmail) {
    issues.push({
      issue: 'Missing email address',
      location: 'Header/Contact Info',
      fix: 'Add your professional email address',
    });
  }

  // Phone number is optional - not flagged as an issue
  // (hasPhone is still tracked in pre-analysis for informational purposes)

  if (analysis.dateFormats.length > 1) {
    issues.push({
      issue: `Inconsistent date formats: ${analysis.dateFormats.join(', ')}`,
      location: 'Throughout resume',
      fix: 'Use consistent date format (e.g., "Month YYYY" everywhere)',
    });
  }

  if (analysis.bulletPunctuation.inconsistent) {
    issues.push({
      issue: 'Inconsistent bullet punctuation',
      location: 'Experience bullets',
      fix: 'Either end all bullets with periods or none',
    });
  }

  if (analysis.firstPersonPronouns.length > 0) {
    issues.push({
      issue: `First-person pronouns found: ${analysis.firstPersonPronouns.join(', ')}`,
      location: 'Throughout resume',
      fix: 'Remove first-person pronouns (I, my, me) - use implied subject',
    });
  }

  return issues;
}

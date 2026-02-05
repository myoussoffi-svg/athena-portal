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

  // Formatting detection
  sectionHeadersAllCaps: boolean;
  sectionHeadersFound: Array<{ header: string; isAllCaps: boolean; line: string }>;
  contactOnSingleLine: boolean;
  hasSubBullets: boolean;
  estimatedRolesWithBulletCounts: Array<{ role: string; bulletCount: number }>;

  // Bullet quality detection
  verboseBullets: Array<{ bullet: string; wordCount: number; issueType: 'too_long' | 'run_on' | 'multiple_ideas' }>;
  avgBulletLength: number;

  // Deal/project organization detection
  hasDealBasedOrganization: boolean;
  dealKeywordsFound: string[];

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

  // Check if contact info is on a single line (good) vs multiple lines (bad)
  const contactOnSingleLine = checkContactOnSingleLine(text, hasEmail, hasPhone);

  // Section headers detection with ALL CAPS check
  const sectionHeadersFound: Array<{ header: string; isAllCaps: boolean; line: string }> = [];
  const sectionHeaders: string[] = [];

  for (const header of SECTION_HEADERS) {
    // Look for the header in various formats
    for (const line of lines) {
      const lineLower = line.toLowerCase();
      // Check if line starts with or is the header (with some flexibility)
      if (lineLower.startsWith(header) || lineLower === header ||
          lineLower.includes(header) && line.length < 50) {
        const isAllCaps = line === line.toUpperCase() && /[A-Z]/.test(line);
        sectionHeadersFound.push({
          header,
          isAllCaps,
          line: line.substring(0, 50), // Truncate for storage
        });
        sectionHeaders.push(header);
        break;
      }
    }
  }

  // Check if ALL section headers are in caps
  const sectionHeadersAllCaps = sectionHeadersFound.length > 0 &&
    sectionHeadersFound.every((h) => h.isAllCaps);

  // Bullet detection (lines starting with • or -)
  const bulletLines = lines.filter((line) =>
    /^[•\-–—*▪︎◦○]/.test(line) || /^\d+[.)]\s/.test(line)
  );
  const bulletCount = bulletLines.length;

  // Sub-bullet detection (indented bullets with ○ or similar)
  const hasSubBullets = lines.some((line) =>
    /^\s+[○◦▪]/.test(line) || /^\s{2,}[•\-]/.test(line)
  );

  // Estimate roles and their bullet counts
  const estimatedRolesWithBulletCounts = estimateRolesWithBullets(lines);

  // Analyze bullet quality - detect verbose/run-on bullets
  const { verboseBullets, avgBulletLength } = analyzeBulletQuality(bulletLines);

  // Detect deal/project-based organization
  const { hasDealBasedOrganization, dealKeywordsFound } = detectDealOrganization(text, lines);

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
    sectionHeadersAllCaps,
    sectionHeadersFound,
    contactOnSingleLine,
    hasSubBullets,
    estimatedRolesWithBulletCounts,
    verboseBullets,
    avgBulletLength,
    hasDealBasedOrganization,
    dealKeywordsFound,
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
 * Detect if resume uses deal/project-based organization (IB best practice)
 */
function detectDealOrganization(text: string, lines: string[]): {
  hasDealBasedOrganization: boolean;
  dealKeywordsFound: string[];
} {
  const dealKeywordsFound: string[] = [];

  // Patterns that indicate deal/project organization
  const dealPatterns = [
    /project\s+[a-z]+:/i,                    // "Project Quasar:", "Project Sunshine:"
    /select\s+transaction/i,                  // "Select Transaction Experience"
    /\$[\d.]+[mb].*(?:merger|acquisition|advisory|deal)/i,  // Deal size with deal type
    /(?:sell-side|buy-side)\s+advisory/i,    // Advisory type
    /(?:m&a|merger|acquisition|ipo|spac|pipe)\s+(?:for|with|involving)/i,
    /transaction\s+experience/i,
  ];

  for (const pattern of dealPatterns) {
    if (pattern.test(text)) {
      const match = text.match(pattern);
      if (match) {
        dealKeywordsFound.push(match[0].substring(0, 40));
      }
    }
  }

  // Also check for bold project headers (common pattern: bullet with bold text followed by description)
  const projectHeaderPattern = /[•\-]\s*\*?\*?[A-Z][a-zA-Z\s]+:/;
  for (const line of lines) {
    if (projectHeaderPattern.test(line) && line.length < 100) {
      dealKeywordsFound.push(line.substring(0, 50));
    }
  }

  // Consider it deal-based if we find 2+ indicators
  const hasDealBasedOrganization = dealKeywordsFound.length >= 2;

  return { hasDealBasedOrganization, dealKeywordsFound: [...new Set(dealKeywordsFound)].slice(0, 5) };
}

/**
 * Analyze bullet quality - detect verbose, run-on, or multi-idea bullets
 */
function analyzeBulletQuality(bulletLines: string[]): {
  verboseBullets: Array<{ bullet: string; wordCount: number; issueType: 'too_long' | 'run_on' | 'multiple_ideas' }>;
  avgBulletLength: number;
} {
  const verboseBullets: Array<{ bullet: string; wordCount: number; issueType: 'too_long' | 'run_on' | 'multiple_ideas' }> = [];

  let totalWords = 0;

  for (const bullet of bulletLines) {
    // Remove bullet character and trim
    const cleanBullet = bullet.replace(/^[•\-–—*▪︎◦○]\s*/, '').trim();
    const words = cleanBullet.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    totalWords += wordCount;

    // Check for issues
    let issueType: 'too_long' | 'run_on' | 'multiple_ideas' | null = null;

    // Too long: Over 40 words is definitely too verbose for a single bullet
    if (wordCount > 40) {
      issueType = 'too_long';
    }
    // Run-on sentences: Multiple semicolons or periods within the bullet
    else if ((cleanBullet.match(/;/g) || []).length >= 2) {
      issueType = 'run_on';
    }
    // Multiple distinct ideas: Contains patterns like "Created X. Built Y" or "X; Y; Z"
    else if (/\.\s+[A-Z]/.test(cleanBullet) && wordCount > 25) {
      issueType = 'multiple_ideas';
    }
    // Also flag bullets over 35 words with semicolons as run-on
    else if (wordCount > 35 && cleanBullet.includes(';')) {
      issueType = 'run_on';
    }

    if (issueType) {
      verboseBullets.push({
        bullet: cleanBullet.substring(0, 100) + (cleanBullet.length > 100 ? '...' : ''),
        wordCount,
        issueType,
      });
    }
  }

  const avgBulletLength = bulletLines.length > 0 ? totalWords / bulletLines.length : 0;

  return { verboseBullets, avgBulletLength };
}

/**
 * Check if contact info (email, phone) appears to be on a single line
 */
function checkContactOnSingleLine(text: string, hasEmail: boolean, hasPhone: boolean): boolean {
  if (!hasEmail && !hasPhone) return true; // Can't check

  const lines = text.split('\n');
  for (const line of lines) {
    const lineHasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(line);
    const lineHasPhone = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(line);

    // If both are on the same line, that's good formatting
    if (hasEmail && hasPhone && lineHasEmail && lineHasPhone) {
      return true;
    }
    // If we only have one, check if it's with location/other contact info
    if ((hasEmail && !hasPhone && lineHasEmail) || (hasPhone && !hasEmail && lineHasPhone)) {
      // Check if the line also contains location indicators (good sign of single-line contact)
      if (/\|/.test(line) || /,\s*[A-Z]{2}\s*\d{5}/.test(line)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Estimate roles/companies and their bullet counts from text structure
 */
function estimateRolesWithBullets(lines: string[]): Array<{ role: string; bulletCount: number }> {
  const roles: Array<{ role: string; bulletCount: number }> = [];
  let currentRole: string | null = null;
  let currentBulletCount = 0;

  // Patterns that indicate a role/company line
  const rolePatterns = [
    // Company Name followed by location
    /^([A-Z][A-Za-z\s&.,]+(?:LLC|Inc|Corp|Company|Fund|Advisors|Partners|Group|Committee|Bank|Capital)?)\s+[A-Z][a-z]+,?\s*[A-Z]{2}$/,
    // Line with a date range at the end
    /^(.+?)\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}/i,
    // Title patterns
    /^((?:Summer\s+)?(?:Analyst|Intern|Associate|Manager|Director|VP|Consultant|Engineer|Developer))/i,
  ];

  for (const line of lines) {
    const isBullet = /^[•\-–—*▪︎◦○]/.test(line) || /^\d+[.)]\s/.test(line);
    const isSubBullet = /^\s+[○◦▪]/.test(line) || /^\s{2,}[•\-]/.test(line);

    if (isBullet || isSubBullet) {
      currentBulletCount++;
    } else {
      // Check if this looks like a new role/company
      let isNewRole = false;
      for (const pattern of rolePatterns) {
        if (pattern.test(line)) {
          isNewRole = true;
          break;
        }
      }

      // Also consider: short line (< 60 chars) with mostly caps or title case
      if (!isNewRole && line.length < 60 && line.length > 5) {
        const words = line.split(/\s+/);
        const capsOrTitleCase = words.filter(w =>
          w === w.toUpperCase() || (w[0] === w[0]?.toUpperCase() && w.length > 1)
        ).length;
        if (capsOrTitleCase >= words.length * 0.7) {
          isNewRole = true;
        }
      }

      if (isNewRole) {
        // Save previous role
        if (currentRole && currentBulletCount > 0) {
          roles.push({ role: currentRole, bulletCount: currentBulletCount });
        }
        currentRole = line.substring(0, 40); // Truncate
        currentBulletCount = 0;
      }
    }
  }

  // Don't forget the last role
  if (currentRole && currentBulletCount > 0) {
    roles.push({ role: currentRole, bulletCount: currentBulletCount });
  }

  return roles;
}

/**
 * Get content quality issues from pre-analysis
 * Focused on actionable improvements for bullet content, not formatting
 */
export function getFormattingIssues(analysis: PreAnalysisResult): Array<{
  issue: string;
  location: string;
  fix: string;
}> {
  const issues: Array<{ issue: string; location: string; fix: string }> = [];

  // === WRITING QUALITY (most valuable feedback) ===

  if (analysis.weakVerbs.length > 0) {
    issues.push({
      issue: `Consider stronger action verbs to replace: ${analysis.weakVerbs.slice(0, 4).join(', ')}`,
      location: 'Experience bullets',
      fix: 'Try: Built, Analyzed, Developed, Led, Created, Modeled, Structured, Executed',
    });
  }

  if (analysis.firstPersonPronouns.length > 0) {
    issues.push({
      issue: `First-person pronouns found (${analysis.firstPersonPronouns.join(', ')})`,
      location: 'Throughout resume',
      fix: 'Use implied subject: "Led team..." instead of "I led team..."',
    });
  }

  // === QUANTIFICATION ===

  if (analysis.bulletCount > 0) {
    const quantificationRate = analysis.quantifiedBullets / analysis.bulletCount;
    if (quantificationRate < 0.25) {
      issues.push({
        issue: `Opportunity to add more metrics (${analysis.quantifiedBullets} of ${analysis.bulletCount} bullets quantified)`,
        location: 'Experience bullets',
        fix: 'Add numbers where possible: deal sizes ($), percentages, counts, or time saved',
      });
    }
  }

  // === BULLET STRUCTURE (only flag severe cases) ===

  if (analysis.verboseBullets.length >= 2) {
    const runOnBullets = analysis.verboseBullets.filter(b => b.issueType === 'run_on' || b.issueType === 'too_long');
    if (runOnBullets.length >= 2) {
      issues.push({
        issue: `${runOnBullets.length} bullets could be more concise`,
        location: 'Experience bullets',
        fix: 'Consider breaking long bullets into focused points (one idea per bullet)',
      });
    }
  }

  return issues;
}

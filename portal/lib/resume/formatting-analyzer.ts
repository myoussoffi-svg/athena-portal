/**
 * Formatting analyzer that extracts style information from .docx files
 * by parsing the underlying XML structure.
 *
 * A .docx file is a ZIP archive containing XML files:
 * - word/document.xml: Main content with inline formatting
 * - word/styles.xml: Style definitions
 * - word/settings.xml: Document settings
 */

import JSZip from 'jszip';

export interface FontInfo {
  name: string;
  size?: number; // in points
  locations: string[]; // where this font appears
}

export interface MarginInfo {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  unit: 'inches' | 'twips';
}

export interface SectionFormatting {
  name: string;
  bulletCount: number;
  hasSubBullets: boolean;
  avgBulletLength: number;
}

export interface FormattingAnalysis {
  // Document-level
  fonts: FontInfo[];
  primaryFont: string | null;
  margins: MarginInfo | null;

  // Structure
  hasHeaderSection: boolean;
  hasCenteredName: boolean;
  hasContactLine: boolean;
  sectionHeaders: string[];
  usesAllCapsHeaders: boolean;
  hasUnderlinedHeaders: boolean;

  // Content density
  experienceSections: SectionFormatting[];
  rolesWithFewBullets: string[]; // Roles with < 3 bullets
  hasSubBullets: boolean;

  // Issues found
  formattingIssues: FormattingIssue[];
}

export interface FormattingIssue {
  category: 'font' | 'margins' | 'structure' | 'density' | 'headers' | 'alignment';
  severity: 'critical' | 'major' | 'minor';
  issue: string;
  recommendation: string;
  location?: string;
}

// Montana Resume Standard (the gold standard)
const FORMATTING_STANDARD = {
  fonts: {
    acceptable: ['times new roman', 'times', 'garamond', 'georgia', 'cambria', 'calibri', 'arial'],
    preferred: ['times new roman', 'garamond'],
  },
  margins: {
    min: 0.5, // inches
    max: 1.0,
    ideal: 0.7,
  },
  structure: {
    minBulletsPerRole: 3,
    idealBulletsPerRole: 4,
    shouldHaveSubBullets: true,
  },
  headers: {
    shouldBeAllCaps: true,
    shouldBeUnderlined: true,
    shouldBeBold: true,
  },
};

/**
 * Extract formatting information from a .docx buffer
 */
export async function analyzeDocxFormatting(docBuffer: Buffer): Promise<FormattingAnalysis> {
  const zip = await JSZip.loadAsync(docBuffer);

  // Read the main document XML
  const documentXml = await zip.file('word/document.xml')?.async('string');
  const stylesXml = await zip.file('word/styles.xml')?.async('string');

  if (!documentXml) {
    throw new Error('Invalid .docx file: missing document.xml');
  }

  const analysis: FormattingAnalysis = {
    fonts: [],
    primaryFont: null,
    margins: null,
    hasHeaderSection: false,
    hasCenteredName: false,
    hasContactLine: false,
    sectionHeaders: [],
    usesAllCapsHeaders: false,
    hasUnderlinedHeaders: false,
    experienceSections: [],
    rolesWithFewBullets: [],
    hasSubBullets: false,
    formattingIssues: [],
  };

  // Parse fonts
  analysis.fonts = extractFonts(documentXml, stylesXml);
  analysis.primaryFont = analysis.fonts.length > 0 ? analysis.fonts[0].name : null;

  // Parse margins
  analysis.margins = extractMargins(documentXml);

  // Parse structure
  const structureInfo = analyzeStructure(documentXml);
  analysis.hasHeaderSection = structureInfo.hasHeaderSection;
  analysis.hasCenteredName = structureInfo.hasCenteredName;
  analysis.hasContactLine = structureInfo.hasContactLine;
  analysis.sectionHeaders = structureInfo.sectionHeaders;
  analysis.usesAllCapsHeaders = structureInfo.usesAllCapsHeaders;
  analysis.hasUnderlinedHeaders = structureInfo.hasUnderlinedHeaders;

  // Parse content density
  const densityInfo = analyzeContentDensity(documentXml);
  analysis.experienceSections = densityInfo.sections;
  analysis.rolesWithFewBullets = densityInfo.rolesWithFewBullets;
  analysis.hasSubBullets = densityInfo.hasSubBullets;

  // Generate issues based on analysis
  analysis.formattingIssues = generateFormattingIssues(analysis);

  return analysis;
}

/**
 * Extract font information from document XML
 */
function extractFonts(documentXml: string, stylesXml?: string): FontInfo[] {
  const fontCounts: Map<string, { count: number; locations: string[] }> = new Map();

  // Look for font declarations in document: <w:rFonts w:ascii="Times New Roman" .../>
  const fontMatches = documentXml.matchAll(/<w:rFonts[^>]*w:ascii="([^"]+)"[^>]*\/?>/gi);
  for (const match of fontMatches) {
    const fontName = match[1].toLowerCase();
    const existing = fontCounts.get(fontName) || { count: 0, locations: [] };
    existing.count++;
    fontCounts.set(fontName, existing);
  }

  // Also check w:hAnsi attribute
  const hAnsiFontMatches = documentXml.matchAll(/<w:rFonts[^>]*w:hAnsi="([^"]+)"[^>]*\/?>/gi);
  for (const match of hAnsiFontMatches) {
    const fontName = match[1].toLowerCase();
    const existing = fontCounts.get(fontName) || { count: 0, locations: [] };
    existing.count++;
    fontCounts.set(fontName, existing);
  }

  // Check styles.xml for default fonts
  if (stylesXml) {
    const stylesFontMatches = stylesXml.matchAll(/<w:rFonts[^>]*w:ascii="([^"]+)"[^>]*\/?>/gi);
    for (const match of stylesFontMatches) {
      const fontName = match[1].toLowerCase();
      const existing = fontCounts.get(fontName) || { count: 0, locations: ['default style'] };
      existing.count += 10; // Weight default styles more heavily
      fontCounts.set(fontName, existing);
    }
  }

  // Sort by frequency and return
  return Array.from(fontCounts.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .map(([name, info]) => ({
      name,
      locations: info.locations,
    }));
}

/**
 * Extract margin information from document XML
 */
function extractMargins(documentXml: string): MarginInfo | null {
  // Look for page margin settings: <w:pgMar w:top="1440" w:right="1440" .../>
  // Values are in twips (1 inch = 1440 twips)
  const marginMatch = documentXml.match(
    /<w:pgMar[^>]*w:top="(\d+)"[^>]*w:right="(\d+)"[^>]*w:bottom="(\d+)"[^>]*w:left="(\d+)"[^>]*\/?>/i
  );

  if (!marginMatch) {
    // Try alternate attribute order
    const altMatch = documentXml.match(/<w:pgMar[^>]*\/?>/i);
    if (altMatch) {
      const topMatch = altMatch[0].match(/w:top="(\d+)"/);
      const rightMatch = altMatch[0].match(/w:right="(\d+)"/);
      const bottomMatch = altMatch[0].match(/w:bottom="(\d+)"/);
      const leftMatch = altMatch[0].match(/w:left="(\d+)"/);

      if (topMatch || rightMatch || bottomMatch || leftMatch) {
        return {
          top: topMatch ? parseInt(topMatch[1]) / 1440 : undefined,
          right: rightMatch ? parseInt(rightMatch[1]) / 1440 : undefined,
          bottom: bottomMatch ? parseInt(bottomMatch[1]) / 1440 : undefined,
          left: leftMatch ? parseInt(leftMatch[1]) / 1440 : undefined,
          unit: 'inches',
        };
      }
    }
    return null;
  }

  return {
    top: parseInt(marginMatch[1]) / 1440,
    right: parseInt(marginMatch[2]) / 1440,
    bottom: parseInt(marginMatch[3]) / 1440,
    left: parseInt(marginMatch[4]) / 1440,
    unit: 'inches',
  };
}

/**
 * Analyze document structure (headers, sections, etc.)
 */
function analyzeStructure(documentXml: string): {
  hasHeaderSection: boolean;
  hasCenteredName: boolean;
  hasContactLine: boolean;
  sectionHeaders: string[];
  usesAllCapsHeaders: boolean;
  hasUnderlinedHeaders: boolean;
} {
  const result = {
    hasHeaderSection: false,
    hasCenteredName: false,
    hasContactLine: false,
    sectionHeaders: [] as string[],
    usesAllCapsHeaders: false,
    hasUnderlinedHeaders: false,
  };

  // Check for centered paragraphs at the start (name)
  const centeredMatch = documentXml.match(/<w:jc\s+w:val="center"\s*\/>/i);
  result.hasCenteredName = !!centeredMatch;

  // Check for contact info patterns (email, phone)
  const hasEmail = /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(documentXml);
  const hasPhone = /\(\d{3}\)\s*\d{3}[-.]?\d{4}|\d{3}[-.]?\d{3}[-.]?\d{4}/.test(documentXml);
  result.hasContactLine = hasEmail || hasPhone;
  result.hasHeaderSection = result.hasCenteredName && result.hasContactLine;

  // Extract section headers (look for ALL CAPS text followed by content)
  // Common headers: EDUCATION, EXPERIENCE, WORK EXPERIENCE, SKILLS, ACTIVITIES
  const commonHeaders = [
    'EDUCATION', 'EXPERIENCE', 'WORK EXPERIENCE', 'PROFESSIONAL EXPERIENCE',
    'WORK EXPERIENCE & LEADERSHIP EXPERIENCE', 'SKILLS', 'ACTIVITIES',
    'ACTIVITIES & INTERESTS', 'LEADERSHIP', 'PROJECTS', 'CERTIFICATIONS'
  ];

  for (const header of commonHeaders) {
    if (documentXml.includes(header)) {
      result.sectionHeaders.push(header);
    }
  }

  // Check if headers are all caps
  result.usesAllCapsHeaders = result.sectionHeaders.length > 0 &&
    result.sectionHeaders.every(h => h === h.toUpperCase());

  // Check for underline formatting on headers (w:u element)
  // This is a simplification - would need more context to be precise
  const hasUnderline = /<w:u\s+w:val="single"\s*\/>/.test(documentXml);
  result.hasUnderlinedHeaders = hasUnderline;

  return result;
}

/**
 * Analyze content density (bullets per role, sub-bullets, etc.)
 */
function analyzeContentDensity(documentXml: string): {
  sections: SectionFormatting[];
  rolesWithFewBullets: string[];
  hasSubBullets: boolean;
} {
  const result = {
    sections: [] as SectionFormatting[],
    rolesWithFewBullets: [] as string[],
    hasSubBullets: false,
  };

  // Count bullet points (look for list formatting or bullet characters)
  // In OOXML, bullets are often <w:numPr> elements or literal bullet chars
  const bulletMatches = documentXml.match(/<w:numPr>/gi) || [];
  const bulletCharMatches = documentXml.match(/[•◦○▪]/g) || [];
  // Note: totalBullets could be used for density scoring in future
  void (bulletMatches.length + bulletCharMatches.length);

  // Check for nested list levels (sub-bullets)
  // Look for ilvl > 0 (indentation level)
  const subBulletMatch = documentXml.match(/<w:ilvl\s+w:val="([1-9])"\s*\/>/i);
  result.hasSubBullets = !!subBulletMatch;

  // For now, return basic info
  // In a full implementation, we'd parse the document structure more thoroughly
  // to extract text content and detect role patterns

  return result;
}

/**
 * Generate formatting issues based on analysis vs standard
 */
function generateFormattingIssues(analysis: FormattingAnalysis): FormattingIssue[] {
  const issues: FormattingIssue[] = [];

  // Check font
  if (analysis.primaryFont) {
    const fontLower = analysis.primaryFont.toLowerCase();
    const isPreferred = FORMATTING_STANDARD.fonts.preferred.some(f => fontLower.includes(f));
    const isAcceptable = FORMATTING_STANDARD.fonts.acceptable.some(f => fontLower.includes(f));

    if (!isAcceptable) {
      issues.push({
        category: 'font',
        severity: 'major',
        issue: `Non-standard font detected: "${analysis.primaryFont}"`,
        recommendation: 'Use Times New Roman or Garamond for a professional IB resume',
      });
    } else if (!isPreferred) {
      issues.push({
        category: 'font',
        severity: 'minor',
        issue: `Font "${analysis.primaryFont}" is acceptable but not preferred`,
        recommendation: 'Consider Times New Roman or Garamond for the most traditional IB look',
      });
    }
  }

  // Check margins
  if (analysis.margins) {
    const margins = analysis.margins;
    const checkMargin = (value: number | undefined, name: string) => {
      if (value === undefined) return;
      if (value < FORMATTING_STANDARD.margins.min) {
        issues.push({
          category: 'margins',
          severity: 'major',
          issue: `${name} margin too narrow (${value.toFixed(2)}" < ${FORMATTING_STANDARD.margins.min}")`,
          recommendation: `Set ${name.toLowerCase()} margin to at least ${FORMATTING_STANDARD.margins.min}" for readability`,
        });
      } else if (value > FORMATTING_STANDARD.margins.max) {
        issues.push({
          category: 'margins',
          severity: 'minor',
          issue: `${name} margin too wide (${value.toFixed(2)}" > ${FORMATTING_STANDARD.margins.max}")`,
          recommendation: `Reduce ${name.toLowerCase()} margin to ${FORMATTING_STANDARD.margins.ideal}" to fit more content`,
        });
      }
    };

    checkMargin(margins.top, 'Top');
    checkMargin(margins.bottom, 'Bottom');
    checkMargin(margins.left, 'Left');
    checkMargin(margins.right, 'Right');
  }

  // Check header structure
  if (!analysis.hasCenteredName) {
    issues.push({
      category: 'structure',
      severity: 'major',
      issue: 'Name should be centered at top of resume',
      recommendation: 'Center your name in a larger font (18-20pt) at the top',
    });
  }

  if (!analysis.hasContactLine) {
    issues.push({
      category: 'structure',
      severity: 'critical',
      issue: 'Missing contact information',
      recommendation: 'Add a centered contact line with: City, State | Phone | Email',
    });
  }

  // Check section headers
  if (!analysis.usesAllCapsHeaders && analysis.sectionHeaders.length > 0) {
    issues.push({
      category: 'headers',
      severity: 'minor',
      issue: 'Section headers should be in ALL CAPS',
      recommendation: 'Format section headers (EDUCATION, EXPERIENCE, etc.) in ALL CAPS with bold and underline',
    });
  }

  // Check content density
  if (analysis.rolesWithFewBullets.length > 0) {
    for (const role of analysis.rolesWithFewBullets) {
      issues.push({
        category: 'density',
        severity: 'major',
        issue: `"${role}" has too few bullet points`,
        recommendation: `Add 3-5 detailed bullets describing your responsibilities and achievements at ${role}`,
        location: role,
      });
    }
  }

  if (!analysis.hasSubBullets) {
    issues.push({
      category: 'density',
      severity: 'minor',
      issue: 'No sub-bullets detected',
      recommendation: 'Use sub-bullets (○) to add detail under main accomplishments, showing depth of work',
    });
  }

  return issues;
}

/**
 * Compare a resume's formatting against the Montana standard
 * Returns a score (0-100) and list of issues
 */
export function scoreFormatting(analysis: FormattingAnalysis): {
  score: number;
  summary: string;
  criticalIssues: FormattingIssue[];
  majorIssues: FormattingIssue[];
  minorIssues: FormattingIssue[];
} {
  const criticalIssues = analysis.formattingIssues.filter(i => i.severity === 'critical');
  const majorIssues = analysis.formattingIssues.filter(i => i.severity === 'major');
  const minorIssues = analysis.formattingIssues.filter(i => i.severity === 'minor');

  // Calculate score
  let score = 100;
  score -= criticalIssues.length * 25;
  score -= majorIssues.length * 10;
  score -= minorIssues.length * 3;
  score = Math.max(0, Math.min(100, score));

  // Generate summary
  let summary = '';
  if (score >= 90) {
    summary = 'Excellent formatting that matches IB standards.';
  } else if (score >= 75) {
    summary = 'Good formatting with minor improvements needed.';
  } else if (score >= 60) {
    summary = 'Formatting needs work to meet IB standards.';
  } else {
    summary = 'Significant formatting issues that need attention.';
  }

  return {
    score,
    summary,
    criticalIssues,
    majorIssues,
    minorIssues,
  };
}

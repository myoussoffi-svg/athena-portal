/**
 * Email Format Utility
 * Generates email addresses based on bank-specific email format patterns
 */

export type EmailFormatType =
  | 'first.last'     // john.doe@bank.com
  | 'flast'          // jdoe@bank.com
  | 'firstlast'      // johndoe@bank.com
  | 'first_last'     // john_doe@bank.com
  | 'lastf'          // doej@bank.com
  | 'first';         // john@bank.com

export interface EmailGenerationResult {
  email: string;
  format: EmailFormatType;
  confidence: 'high' | 'medium' | 'low';
  bankMatched: boolean;
}

/**
 * Normalize a name for email generation
 * Handles accents, hyphens, spaces, suffixes
 */
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z]/g, ''); // Remove non-alpha characters
}

/**
 * Parse a full name into first and last name components
 */
export function parseName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 0) {
    return { firstName: '', lastName: '' };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }

  // Handle common suffixes
  const suffixes = ['jr', 'jr.', 'sr', 'sr.', 'ii', 'iii', 'iv', 'phd', 'md', 'esq', 'cfa', 'cpa'];
  let lastIndex = parts.length - 1;

  while (lastIndex > 0 && suffixes.includes(parts[lastIndex].toLowerCase().replace('.', ''))) {
    lastIndex--;
  }

  // First name is always first part
  const firstName = parts[0];

  // Last name is the last non-suffix part
  const lastName = parts[lastIndex];

  return { firstName, lastName };
}

/**
 * Generate an email address based on format type
 */
export function generateEmail(
  firstName: string,
  lastName: string,
  domain: string,
  format: EmailFormatType
): string {
  const first = normalizeName(firstName);
  const last = normalizeName(lastName);

  if (!first || !last) {
    return '';
  }

  let localPart = '';

  switch (format) {
    case 'first.last':
      localPart = `${first}.${last}`;
      break;
    case 'flast':
      localPart = `${first[0]}${last}`;
      break;
    case 'firstlast':
      localPart = `${first}${last}`;
      break;
    case 'first_last':
      localPart = `${first}_${last}`;
      break;
    case 'lastf':
      localPart = `${last}${first[0]}`;
      break;
    case 'first':
      localPart = first;
      break;
    default:
      localPart = `${first}.${last}`;
  }

  return `${localPart}@${domain}`;
}

/**
 * Normalize bank name for matching
 */
export function normalizeBankName(bankName: string): string {
  return bankName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric
    .replace(/partners|advisory|capital|group|inc|llc|corp|co|and/g, '') // Remove common suffixes
    .trim();
}

/**
 * Generate email with confidence score based on bank lookup result
 */
export function generateEmailWithConfidence(
  firstName: string,
  lastName: string,
  bank: { format: EmailFormatType; domain: string; isVerified: boolean } | null
): EmailGenerationResult {
  if (!bank) {
    // No bank found - use most common format (first.last) with low confidence
    return {
      email: '', // Don't generate if bank not found
      format: 'first.last',
      confidence: 'low',
      bankMatched: false,
    };
  }

  const email = generateEmail(firstName, lastName, bank.domain, bank.format);

  return {
    email,
    format: bank.format,
    confidence: bank.isVerified ? 'high' : 'medium',
    bankMatched: true,
  };
}

/**
 * Parse a CSV or Excel row into contact fields
 */
export interface ParsedContactRow {
  firstName: string;
  lastName: string;
  fullName: string;
  bank: string;
  role?: string;
  email?: string;
  linkedinUrl?: string;
  connectionType?: string;
  notes?: string;
}

/**
 * Map common CSV header variations to our field names
 */
export function normalizeHeader(header: string): string {
  const h = header.toLowerCase().trim();

  // Name variations
  if (['first name', 'firstname', 'first', 'given name'].includes(h)) return 'firstName';
  if (['last name', 'lastname', 'last', 'surname', 'family name'].includes(h)) return 'lastName';
  if (['full name', 'fullname', 'name', 'contact name'].includes(h)) return 'fullName';

  // Bank/Company variations
  if (['bank', 'company', 'firm', 'employer', 'organization', 'org'].includes(h)) return 'bank';

  // Role variations
  if (['role', 'title', 'position', 'job title', 'level'].includes(h)) return 'role';

  // Email variations
  if (['email', 'email address', 'e-mail'].includes(h)) return 'email';

  // LinkedIn variations
  if (['linkedin', 'linkedin url', 'linkedin profile', 'profile url'].includes(h)) return 'linkedinUrl';

  // Connection type variations
  if (['connection', 'connection type', 'source', 'how we met'].includes(h)) return 'connectionType';

  // Notes variations
  if (['notes', 'comments', 'description', 'memo'].includes(h)) return 'notes';

  return h;
}

/**
 * Parse role string to our enum value
 */
export function parseRole(roleStr: string): string | undefined {
  const r = roleStr.toLowerCase().trim();

  if (r.includes('analyst') && !r.includes('associate')) return 'analyst';
  if (r.includes('associate')) return 'associate';
  if (r.includes('vp') || r.includes('vice president')) return 'vp';
  if (r.includes('director') && !r.includes('managing')) return 'director';
  if (r.includes('md') || r.includes('managing director')) return 'md';
  if (r.includes('partner') || r.includes('principal')) return 'md';

  return 'other';
}

/**
 * Parse connection type string to our enum value
 */
export function parseConnectionType(typeStr: string): string | undefined {
  const t = typeStr.toLowerCase().trim();

  if (t.includes('alumni') || t.includes('school')) return 'alumni';
  if (t.includes('referral') || t.includes('referred')) return 'referral';
  if (t.includes('cold') || t.includes('linkedin')) return 'cold';
  if (t.includes('event') || t.includes('conference') || t.includes('info session')) return 'event';

  return 'other';
}

import { z } from 'zod';

// ─────────────────────────────────────────────────────────────
// ENUMS (matching database)
// ─────────────────────────────────────────────────────────────

export const outreachStatusValues = [
  'identified',
  'contacted',
  'responded',
  'scheduled',
  'spoke',
  'advocate',
  'stale',
] as const;

export const connectionTypeValues = [
  'alumni',
  'referral',
  'cold',
  'event',
  'other',
] as const;

export const contactRoleValues = [
  'analyst',
  'associate',
  'vp',
  'director',
  'md',
  'other',
] as const;

export type OutreachStatus = typeof outreachStatusValues[number];
export type ConnectionType = typeof connectionTypeValues[number];
export type ContactRole = typeof contactRoleValues[number];

// ─────────────────────────────────────────────────────────────
// CONTACT SCHEMAS
// ─────────────────────────────────────────────────────────────

// LinkedIn URL validation
const linkedinUrlSchema = z.string().url().refine(
  (url) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname === 'linkedin.com' || parsed.hostname === 'www.linkedin.com';
    } catch {
      return false;
    }
  },
  { message: 'Must be a valid LinkedIn URL' }
).optional().or(z.literal(''));

export const createContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  firm: z.string().min(1, 'Firm is required').max(100),
  role: z.enum(contactRoleValues).optional(),
  email: z.string().email().optional().or(z.literal('')),
  linkedinUrl: linkedinUrlSchema,
  connectionType: z.enum(connectionTypeValues).optional(),
  connectionNote: z.string().max(500).optional(),
  notes: z.string().max(2000).optional(),
});

export const updateContactSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  firm: z.string().min(1).max(100).optional(),
  role: z.enum(contactRoleValues).nullable().optional(),
  email: z.string().email().optional().or(z.literal('')).nullable(),
  linkedinUrl: linkedinUrlSchema.nullable(),
  connectionType: z.enum(connectionTypeValues).nullable().optional(),
  connectionNote: z.string().max(500).nullable().optional(),
  status: z.enum(outreachStatusValues).optional(),
  lastContactDate: z.string().datetime().nullable().optional(),
  followUpDue: z.string().datetime().nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;

// ─────────────────────────────────────────────────────────────
// SETTINGS SCHEMAS
// ─────────────────────────────────────────────────────────────

export const updateSettingsSchema = z.object({
  userName: z.string().max(100).optional(),
  userSchool: z.string().max(100).optional(),
  userYear: z.string().max(50).optional(),
  userMajor: z.string().max(100).optional(),
  userInterest: z.string().max(200).optional(),
  userPreviousExperience: z.string().max(500).optional(), // "Goldman Sachs SA '24, Deloitte intern '23"
  userHometown: z.string().max(100).optional(), // "Dallas, TX"
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;

// ─────────────────────────────────────────────────────────────
// EMAIL GENERATION SCHEMAS
// ─────────────────────────────────────────────────────────────

export const emailTemplateTypes = [
  'initial-alumni',
  'initial-referral',
  'initial-cold',
  'initial-event',
  'follow-up-first',
  'follow-up-second',
  'thank-you',
  'scheduling-reply',
] as const;

export type EmailTemplateType = typeof emailTemplateTypes[number];

export const generateEmailSchema = z.object({
  contactId: z.string().uuid(),
  templateType: z.enum(emailTemplateTypes),
  additionalContext: z.string().max(500).optional(),
});

export type GenerateEmailInput = z.infer<typeof generateEmailSchema>;

export const generatedEmailSchema = z.object({
  subject: z.string().max(200),
  body: z.string().max(1500),
});

export type GeneratedEmail = z.infer<typeof generatedEmailSchema>;

// ─────────────────────────────────────────────────────────────
// API RESPONSE TYPES
// ─────────────────────────────────────────────────────────────

export interface ContactListResponse {
  contacts: ContactWithMeta[];
  total: number;
  followUpsDue: number;
}

export interface ContactWithMeta {
  id: string;
  name: string;
  firm: string;
  role: ContactRole | null;
  email: string | null;
  linkedinUrl: string | null;
  connectionType: ConnectionType | null;
  connectionNote: string | null;
  status: OutreachStatus;
  lastContactDate: string | null;
  followUpDue: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  isFollowUpDue: boolean;
  daysSinceContact: number | null;
  // New fields for bulk import
  firstName: string | null;
  lastName: string | null;
  emailGenerated: boolean;
  emailVerified: boolean;
  importBatchId: string | null;
}

// ─────────────────────────────────────────────────────────────
// BULK IMPORT SCHEMAS
// ─────────────────────────────────────────────────────────────

export const importContactRowSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  bank: z.string().min(1),
  role: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  connectionType: z.string().optional(),
  notes: z.string().optional(),
});

export type ImportContactRow = z.infer<typeof importContactRowSchema>;

export interface ImportPreviewRow extends ImportContactRow {
  rowNumber: number;
  generatedEmail: string | null;
  emailConfidence: 'high' | 'medium' | 'low';
  bankMatched: boolean;
  errors: string[];
  warnings: string[];
}

export interface ImportPreviewResponse {
  rows: ImportPreviewRow[];
  totalRows: number;
  validRows: number;
  errorRows: number;
  banksMatched: number;
  banksUnmatched: string[];
}

export const confirmImportSchema = z.object({
  rows: z.array(z.object({
    firstName: z.string(),
    lastName: z.string(),
    bank: z.string(),
    email: z.string().optional(),
    role: z.string().optional(),
    linkedinUrl: z.string().optional(),
    connectionType: z.string().optional(),
    notes: z.string().optional(),
    useGeneratedEmail: z.boolean().default(true),
  })),
});

export type ConfirmImportInput = z.infer<typeof confirmImportSchema>;

// ─────────────────────────────────────────────────────────────
// GAMIFICATION SCHEMAS
// ─────────────────────────────────────────────────────────────

export const outreachActivityTypes = [
  'contact_added',
  'email_sent',
  'response_received',
  'call_scheduled',
  'call_completed',
  'became_advocate',
] as const;

export type OutreachActivityType = typeof outreachActivityTypes[number];

export const achievementTypes = [
  // Milestones
  'first_contact',
  'first_10_emails',
  'contacts_50',
  'emails_100',
  // Consistency
  'streak_2_weeks',
  'streak_4_weeks',
  'streak_8_weeks',
  'streak_12_weeks',
  // Volume
  'contacts_10',
  'contacts_25',
  'contacts_100',
  'emails_25',
  'emails_50',
  'emails_200',
] as const;

export type AchievementType = typeof achievementTypes[number];

export interface GamificationStats {
  totalPoints: number;
  currentWeekPoints: number;
  currentStreak: number; // Consecutive active weeks
  longestStreak: number;
  totalContactsAdded: number;
  totalEmailsSent: number;
  totalResponses: number;
  totalCalls: number;
  achievements: Achievement[];
  nextMilestone: NextMilestone | null;
  weeklyActivity: WeeklyActivity[];
  uncelebratedAchievements?: Achievement[]; // Achievements that need celebration modal
}

export interface Achievement {
  type: AchievementType;
  earnedAt: string;
  celebrationShown: boolean;
  title: string;
  description: string;
  icon: string;
}

export interface NextMilestone {
  type: AchievementType;
  title: string;
  description: string;
  currentProgress: number;
  targetProgress: number;
  percentComplete: number;
}

export interface WeeklyActivity {
  weekId: string;
  weekLabel: string; // "Jan 15 - 21"
  contactsAdded: number;
  emailsSent: number;
  points: number;
  activeDays: number[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string; // Anonymized or real name based on opt-in
  totalPoints: number;
  currentStreak: number;
  isCurrentUser: boolean;
}

export interface LeaderboardResponse {
  allTime: LeaderboardEntry[];
  thisMonth: LeaderboardEntry[];
  streaks: LeaderboardEntry[];
  userRank: {
    allTime: number | null;
    thisMonth: number | null;
    streaks: number | null;
  };
}

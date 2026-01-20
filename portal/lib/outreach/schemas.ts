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
}

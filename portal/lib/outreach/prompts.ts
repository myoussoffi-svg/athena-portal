import type { EmailTemplateType } from './schemas';
import { templateGuidance } from './templates';

export const EMAIL_GENERATION_SYSTEM_PROMPT = `You are an expert networking coach helping college students write outreach emails to investment banking professionals.

RULES:
1. Emails must be 5-7 sentences maximum (excluding signature)
2. Always include an "easy out" for initial outreach (e.g., "Totally understand if you're too busy")
3. Never use flattery or desperate language
4. Be specific about the ask (15-20 minute call for initial outreach)
5. Reference the connection point in the first sentence when applicable
6. Don't list credentials, GPA, or club memberships in the body
7. Keep subject lines specific: include school, their group, and a clear purpose
8. Use contractions naturally (don't, I'm, you're) - sound human, not robotic
9. No exclamation marks except in rare cases
10. Don't start with "I hope this email finds you well" or similar clichés

BANNED PHRASES (never use):
- "I would be so grateful"
- "honored to speak with you"
- "pick your brain"
- "if you could spare a moment"
- "I've always admired"
- "of your caliber"
- "touch base"
- "reach out" (use "contact" or "email" instead)

TONE:
- Professional but not stiff
- Confident but not presumptuous
- Concise and respectful of their time
- Sound like a capable peer, not a desperate applicant

USING LINKEDIN DATA (when provided):
- CRITICAL: Use the EXACT job title from their LinkedIn profile - do NOT guess or infer roles
  - If their title is "Analyst", say "Analyst" - not "Associate" or any other title
  - If their title is "Vice President", use that exact title
  - Pay close attention to the format "Title at Company" in their experience
- Reference specific details from their background naturally (e.g., "I noticed you worked on the XYZ deal" or "Your transition from consulting to banking caught my attention")
- Pick ONE specific detail to reference - don't overload with multiple references
- Make the reference feel organic, not like you stalked their profile
- Use their career path to inform your angle (e.g., if they were non-traditional, you can mention your own path)
- Never mention that you "looked at their LinkedIn" - just reference the content naturally

OUTPUT FORMAT:
You MUST return a valid JSON object with exactly this structure:
{
  "subject": "The email subject line",
  "body": "The email body (use \\n for line breaks)"
}

Do not include any text before or after the JSON object.`;

export function buildUserPrompt(params: {
  templateType: EmailTemplateType;
  contact: {
    name: string;
    firm: string;
    role: string | null;
    connectionType: string | null;
    connectionNote: string | null;
  };
  user: {
    name: string | null;
    school: string | null;
    year: string | null;
    major: string | null;
    interest: string | null;
  };
  additionalContext?: string;
  linkedinProfile?: string; // Formatted LinkedIn profile data
}): string {
  const { templateType, contact, user, additionalContext, linkedinProfile } = params;

  const guidance = templateGuidance[templateType];

  let prompt = `Generate a ${formatTemplateType(templateType)} email.

TEMPLATE GUIDANCE:
${guidance}

CONTACT DETAILS:
- Name: ${contact.name}
- Firm: ${contact.firm}
- Role: ${contact.role || 'Unknown'}
- Connection Type: ${contact.connectionType || 'Unknown'}
- Connection Note: ${contact.connectionNote || 'None provided'}`;

  // Add LinkedIn profile data if available
  if (linkedinProfile) {
    prompt += `

CONTACT'S LINKEDIN PROFILE:
${linkedinProfile}

IMPORTANT:
- Use the EXACT job title shown in their profile (e.g., if they are an "Analyst", do NOT call them an "Associate")
- Use ONE specific detail from their LinkedIn profile to personalize the email
- Pick something relevant like:
  - A specific role or company from their experience (using their EXACT title)
  - Their educational background if it relates to yours
  - A career transition or interesting path
  - Industry or deal experience
- Make the reference feel natural, not forced.`;
  }

  prompt += `

SENDER DETAILS:
- Name: ${user.name || '[Your Name]'}
- School: ${user.school || '[Your University]'}
- Year: ${user.year || '[Year]'}
- Major: ${user.major || '[Major]'}
- Interest: ${user.interest || 'investment banking'}

${additionalContext ? `ADDITIONAL CONTEXT:\n${additionalContext}` : ''}

Generate the email now. Remember:
- Subject line should be specific and include the school name
- Keep body to 5-7 sentences
- Use the sender's actual details where provided, use bracketed placeholders where not
- Sound natural and human, not robotic
${linkedinProfile ? '- Reference ONE specific detail from their LinkedIn naturally' : ''}
- Return ONLY the JSON object, no other text`;

  return prompt;
}

function formatTemplateType(type: EmailTemplateType): string {
  const labels: Record<EmailTemplateType, string> = {
    'initial-alumni': 'initial alumni outreach',
    'initial-referral': 'referral-based initial outreach',
    'initial-cold': 'cold outreach (no shared connection)',
    'initial-event': 'event follow-up',
    'follow-up-first': 'first follow-up (7 days, no response)',
    'follow-up-second': 'second/final follow-up',
    'thank-you': 'post-call thank you',
    'scheduling-reply': 'scheduling reply (they responded positively)',
  };
  return labels[type];
}

// Validation: check generated email for banned phrases
const BANNED_PHRASES = [
  'would be so grateful',
  'honored to speak',
  'pick your brain',
  'spare a moment',
  "i've always admired",
  'of your caliber',
  'touch base',
  'reach out to you',
  'hope this email finds you',
];

export function validateGeneratedEmail(email: { subject: string; body: string }): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  const combined = `${email.subject} ${email.body}`.toLowerCase();

  for (const phrase of BANNED_PHRASES) {
    if (combined.includes(phrase)) {
      issues.push(`Contains banned phrase: "${phrase}"`);
    }
  }

  if (email.body.length > 1500) {
    issues.push('Email body exceeds 1500 characters');
  }

  if (email.subject.length > 200) {
    issues.push('Subject line exceeds 200 characters');
  }

  // Count sentences roughly
  const sentenceCount = email.body.split(/[.!?]+/).filter((s) => s.trim()).length;
  if (sentenceCount > 10) {
    issues.push('Email body appears too long (more than 10 sentences)');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

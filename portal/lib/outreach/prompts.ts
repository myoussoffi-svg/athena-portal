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

CRITICAL - NEVER GUESS GROUPS/PRACTICES/DIVISIONS:
- NEVER guess or infer specific groups, practices, divisions, or coverage areas
  - Do NOT assume someone is in "restructuring", "M&A", "healthcare", "TMT", "sponsors", etc. unless EXPLICITLY stated
  - Even if a bank is known for a particular practice (e.g., Houlihan Lokey for restructuring), do NOT assume the contact works in that practice
- If the group/practice/division is NOT explicitly provided:
  - Use generic language: "investment banking", "your team", "your group"
  - Or omit the group reference entirely
  - NEVER fill in with a guess based on the bank's reputation
- Only mention specific groups/practices when:
  - It appears explicitly in their LinkedIn title (e.g., "Analyst, M&A Group")
  - It's explicitly stated in the contact details or connection notes
- Getting the group wrong is WORSE than being generic - it shows you didn't do proper research

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
    previousExperience: string | null;
    hometown: string | null;
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
- NEVER guess their group, practice, division, or coverage area unless EXPLICITLY stated in their profile
  - Do NOT assume someone is in "restructuring", "M&A", "healthcare", etc. based on the bank's reputation
  - If no group is specified, use generic terms like "investment banking" or "your team"
- Use ONE specific detail from their LinkedIn profile to personalize the email
- Pick something relevant like:
  - A specific role or company from their experience (using their EXACT title)
  - Their educational background if it relates to yours
  - A career transition or interesting path
  - Industry or deal experience (only if explicitly mentioned)
- Make the reference feel natural, not forced.`;
  }

  prompt += `

SENDER DETAILS:
- Name: ${user.name || '[Your Name]'}
- School: ${user.school || '[Your University]'}
- Year: ${user.year || '[Year]'}
- Major: ${user.major || '[Major]'}
- Interest: ${user.interest || 'investment banking'}
${user.previousExperience ? `- Previous Experience: ${user.previousExperience}` : ''}
${user.hometown ? `- Hometown: ${user.hometown}` : ''}

${additionalContext ? `ADDITIONAL CONTEXT:\n${additionalContext}` : ''}

${linkedinProfile && (user.previousExperience || user.hometown || user.school) ? `FINDING COMMONALITIES:
Look for genuine, noteworthy connections between the sender and contact. Only mention if BOTH sides explicitly support it.

WORTH MENTIONING:
- Same school (exact match) - e.g., "As a Michigan alum..."
- Same city/hometown (exact city match only, NOT same state) - e.g., both from "Dallas" specifically
- Same previous employer - e.g., sender interned at Deloitte, contact worked at Deloitte
- Non-traditional major (Biology, Engineering, Art History, etc.) - shows similar unconventional path
  Example: "I noticed you studied biology before transitioning to banking - I'm navigating a similar path..."
- Same fraternity/sorority - mention naturally, NOT "as a fellow brother/sister" (too cheesy)
  Example: "I saw you were in Sigma Chi at USC - I'm in the Michigan chapter..."

DO NOT MENTION (too generic/expected):
- Traditional finance majors (Economics, Finance, Business, Accounting) - expected in banking, not noteworthy
- Same state but different cities - "fellow Texan" is too vague
- Same club at different schools - "Finance Club" at different schools is not a real connection
- Both interested in "investment banking" or "M&A" - obviously, that's why they're reaching out
- Both studied "business" - too generic

RULES:
- Only mention ONE commonality - pick the strongest, most specific one
- If no genuine commonality exists, skip this entirely and focus on interest in the firm/role
- When in doubt, leave it out - a wrong assumption is worse than being generic
` : ''}

Generate the email now. Remember:
- Subject line should be specific and include the school name
- Keep body to 5-7 sentences
- Use the sender's actual details where provided, use bracketed placeholders where not
- Sound natural and human, not robotic
${linkedinProfile ? '- Reference ONE specific detail from their LinkedIn naturally' : ''}
- NEVER guess groups/practices/divisions - if not explicitly provided, use generic language or omit
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

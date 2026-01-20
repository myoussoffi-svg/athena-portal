import type { EmailTemplateType } from './schemas';

export interface EmailTemplate {
  id: EmailTemplateType;
  name: string;
  description: string;
  category: 'initial' | 'follow-up' | 'post-call';
  requiresConnectionType?: string[]; // Only show for certain connection types
}

export const emailTemplates: EmailTemplate[] = [
  // Initial outreach
  {
    id: 'initial-alumni',
    name: 'Initial - Alumni',
    description: 'First outreach to someone from your school',
    category: 'initial',
    requiresConnectionType: ['alumni'],
  },
  {
    id: 'initial-referral',
    name: 'Initial - Referral',
    description: 'Someone suggested you reach out to this person',
    category: 'initial',
    requiresConnectionType: ['referral'],
  },
  {
    id: 'initial-cold',
    name: 'Initial - Cold',
    description: 'No obvious connection, genuine interest in their work',
    category: 'initial',
    requiresConnectionType: ['cold', 'other'],
  },
  {
    id: 'initial-event',
    name: 'Initial - Event Follow-up',
    description: 'Met at info session or recruiting event',
    category: 'initial',
    requiresConnectionType: ['event'],
  },

  // Follow-ups
  {
    id: 'follow-up-first',
    name: 'First Follow-up',
    description: 'Gentle bump after 7 days with no response',
    category: 'follow-up',
  },
  {
    id: 'follow-up-second',
    name: 'Second Follow-up',
    description: 'Final attempt with easy out',
    category: 'follow-up',
  },

  // Post-call
  {
    id: 'thank-you',
    name: 'Thank You',
    description: 'After a networking call',
    category: 'post-call',
  },
  {
    id: 'scheduling-reply',
    name: 'Scheduling Reply',
    description: 'When they respond positively, propose times',
    category: 'post-call',
  },
];

export function getTemplatesForContact(connectionType: string | null): EmailTemplate[] {
  return emailTemplates.filter((template) => {
    // Follow-up and post-call templates are always available
    if (!template.requiresConnectionType) return true;
    // Initial templates depend on connection type
    if (!connectionType) return template.category !== 'initial';
    return template.requiresConnectionType.includes(connectionType);
  });
}

export function getTemplateById(id: EmailTemplateType): EmailTemplate | undefined {
  return emailTemplates.find((t) => t.id === id);
}

// Template structure guidance (used in LLM prompt)
export const templateGuidance: Record<EmailTemplateType, string> = {
  'initial-alumni': `
Alumni outreach email structure:
1. Open with shared school connection
2. Mention their graduation year and current role
3. Brief intro of yourself (year, school, interest)
4. Ask for 15-20 minute call
5. Easy out ("Completely understand if you're too busy")
`,
  'initial-referral': `
Referral-based outreach structure:
1. Lead with who referred you
2. Mention what referrer said about them
3. Brief intro of yourself
4. Ask for 15 minute call
5. "Please say hi to [referrer] for me"
`,
  'initial-cold': `
Cold outreach structure:
1. Explain how you found them (researching their group)
2. Reference something specific from their background
3. Brief intro of yourself
4. Ask for 15-20 minute call
5. Easy out
`,
  'initial-event': `
Event follow-up structure:
1. Reference the specific event and when you met
2. Mention something from your conversation
3. Express interest in learning more
4. Ask for a call to continue the conversation
5. Easy out
`,
  'follow-up-first': `
First follow-up structure:
- Keep shorter than original email
- "Just wanted to bump this to the top of your inbox"
- Reiterate flexibility on timing
- Don't repeat your whole background
`,
  'follow-up-second': `
Second follow-up structure:
- Acknowledge they're busy
- Explicit permission not to respond
- "Circling back one more time"
- Easy out: "If you're too busy, no need to reply"
`,
  'thank-you': `
Thank-you email structure:
1. Thank them for their time
2. Reference something specific they said
3. Mention a concrete takeaway or action you'll take
4. Keep it brief (3-4 sentences)
`,
  'scheduling-reply': `
Scheduling reply structure:
1. Express thanks for getting back
2. Offer 3-4 specific time slots
3. Include early morning and evening options
4. Ask if they prefer to call you or vice versa
5. Include your phone number
`,
};

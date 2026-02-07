/**
 * Quick Email Templates
 * Pre-written templates for instant copy-to-clipboard without API calls
 */

export interface QuickTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string;
  tags: ('alumni' | 'cold' | 'referral' | 'follow-up')[];
}

export const QUICK_TEMPLATES: QuickTemplate[] = [
  // Alumni Templates
  {
    id: 'alumni-intro',
    name: 'Alumni Introduction',
    description: 'First outreach to a fellow alum',
    tags: ['alumni'],
    subject: 'Fellow [School] Student Interested in [Bank] IB',
    body: `Hi [First Name],

I hope this message finds you well. My name is [Your Name], and I'm a [Your Year] at [Your School] majoring in [Your Major]. I came across your profile while researching [Bank]'s investment banking division and was excited to see a fellow [School] alum.

I'm very interested in pursuing a career in investment banking, particularly in [Coverage Area/Group]. I would greatly appreciate the opportunity to learn about your experience at [Bank] and any advice you might have for someone starting out.

Would you have 15-20 minutes for a brief call in the coming weeks? I'm flexible on timing and happy to work around your schedule.

Thank you for your time, and I look forward to hearing from you.

Best regards,
[Your Name]`,
  },
  {
    id: 'alumni-specific-group',
    name: 'Alumni - Specific Group Interest',
    description: 'When you know their exact group',
    tags: ['alumni'],
    subject: '[School] [Year] Interested in [Bank] [Group]',
    body: `Hi [First Name],

I'm [Your Name], a [Your Year] at [Your School] studying [Your Major]. I noticed you're currently in [Group] at [Bank], and as a fellow [School] alum, I wanted to reach out.

I've been following [Group]'s recent work on [Recent Deal/Transaction] and am particularly interested in [Specific Aspect]. Your career path from [School] to [Bank] is exactly the trajectory I'm hoping to follow.

If you have a few minutes in the coming weeks, I would love to hear about your experience in [Group] and what the recruiting process was like. I'm happy to work around your schedule.

Thank you so much for considering this request.

Best,
[Your Name]`,
  },

  // Cold Outreach Templates
  {
    id: 'cold-intro',
    name: 'Cold Introduction',
    description: 'First outreach to someone you don\'t know',
    tags: ['cold'],
    subject: '[Your School] Student Interested in [Bank] Investment Banking',
    body: `Hi [First Name],

My name is [Your Name], and I'm a [Your Year] at [Your School] pursuing a career in investment banking. I came across your profile while researching [Bank]'s [Group/Division] and was impressed by your background.

I'm particularly interested in [Coverage Area] and have been following [Bank]'s work in the space, including [Recent Deal/Transaction]. I would greatly value the opportunity to learn more about your experience and any insights you might have for someone breaking into the industry.

Would you be open to a brief 15-minute call? I understand you're busy and am happy to accommodate your schedule.

Thank you for your time.

Best regards,
[Your Name]`,
  },
  {
    id: 'cold-linkedin-connect',
    name: 'Cold - LinkedIn Connection',
    description: 'After connecting on LinkedIn',
    tags: ['cold'],
    subject: 'Following Up on LinkedIn Connection',
    body: `Hi [First Name],

Thank you for accepting my connection request on LinkedIn. I'm [Your Name], a [Your Year] at [Your School], and I'm very interested in learning more about investment banking at [Bank].

Your experience in [Group/Coverage Area] is particularly relevant to my interests, and I would really appreciate any insights you could share about your path to [Bank] and your day-to-day experience.

Would you have 15 minutes for a quick call in the coming weeks? I'm flexible on timing.

Thank you for considering this request.

Best,
[Your Name]`,
  },

  // Referral Templates
  {
    id: 'referral-intro',
    name: 'Referral Introduction',
    description: 'When someone referred you',
    tags: ['referral'],
    subject: '[Referrer Name] Suggested I Reach Out - [Your School] Student',
    body: `Hi [First Name],

[Referrer Name] suggested I reach out to you regarding investment banking opportunities at [Bank]. I'm [Your Name], a [Your Year] at [Your School] majoring in [Your Major].

[Referrer Name] spoke very highly of you and mentioned that you might be able to share insights about the [Group] team and the recruiting process at [Bank]. I'm particularly interested in [Coverage Area] and have been preparing extensively for IB recruiting.

Would you have time for a brief call in the coming weeks? I would greatly appreciate any advice you could share.

Thank you for your time, and please give my best to [Referrer Name].

Best regards,
[Your Name]`,
  },

  // Follow-up Templates
  {
    id: 'follow-up-first',
    name: 'First Follow-up',
    description: '1 week after initial email',
    tags: ['follow-up'],
    subject: 'Re: [Original Subject]',
    body: `Hi [First Name],

I wanted to follow up on my email from last week. I understand you're busy, but I remain very interested in learning about your experience at [Bank].

If you have a few minutes for a brief call, I would really appreciate it. I'm happy to work around your schedule.

Thank you again for your time.

Best,
[Your Name]`,
  },
  {
    id: 'follow-up-second',
    name: 'Second Follow-up',
    description: '2 weeks after initial email',
    tags: ['follow-up'],
    subject: 'Re: [Original Subject]',
    body: `Hi [First Name],

I hope this message finds you well. I'm following up one more time on my previous emails about learning more about investment banking at [Bank].

I completely understand if you're too busy to connect. If there's anyone else on your team you think might be open to a brief conversation, I would be grateful for an introduction.

Either way, thank you for your time, and I wish you all the best.

Best regards,
[Your Name]`,
  },
  {
    id: 'thank-you-call',
    name: 'Thank You After Call',
    description: 'Send immediately after a networking call',
    tags: ['follow-up'],
    subject: 'Thank You - Great Speaking with You',
    body: `Hi [First Name],

Thank you so much for taking the time to speak with me today. I really appreciated hearing about your experience at [Bank], particularly your insights on [Specific Topic Discussed].

Your advice about [Specific Advice] was especially helpful, and I'll definitely [Action You'll Take].

Please don't hesitate to reach out if there's ever anything I can do to return the favor. I'll keep you posted on my recruiting progress.

Thanks again, and I hope we can stay in touch.

Best,
[Your Name]`,
  },
];

/**
 * Get a template by ID
 */
export function getTemplateById(id: string): QuickTemplate | undefined {
  return QUICK_TEMPLATES.find((t) => t.id === id);
}

/**
 * Get templates by tag
 */
export function getTemplatesByTag(tag: QuickTemplate['tags'][number]): QuickTemplate[] {
  return QUICK_TEMPLATES.filter((t) => t.tags.includes(tag));
}

/**
 * Fill template placeholders with actual values
 */
export interface TemplateFillData {
  contactFirstName?: string;
  contactLastName?: string;
  contactFullName?: string;
  bank?: string;
  group?: string;
  coverageArea?: string;
  userName?: string;
  userSchool?: string;
  userYear?: string;
  userMajor?: string;
  referrerName?: string;
  recentDeal?: string;
}

export function fillTemplate(template: QuickTemplate, data: TemplateFillData): { subject: string; body: string } {
  const replacements: Record<string, string> = {
    '[First Name]': data.contactFirstName || '[First Name]',
    '[Last Name]': data.contactLastName || '[Last Name]',
    '[Contact Name]': data.contactFullName || data.contactFirstName || '[Contact Name]',
    '[Bank]': data.bank || '[Bank]',
    '[Group]': data.group || '[Group]',
    '[Group/Division]': data.group || '[Group/Division]',
    '[Group/Coverage Area]': data.group || data.coverageArea || '[Group/Coverage Area]',
    '[Coverage Area]': data.coverageArea || '[Coverage Area]',
    '[Coverage Area/Group]': data.coverageArea || data.group || '[Coverage Area/Group]',
    '[Your Name]': data.userName || '[Your Name]',
    '[School]': data.userSchool || '[School]',
    '[Your School]': data.userSchool || '[Your School]',
    '[Your Year]': data.userYear || '[Your Year]',
    '[Year]': data.userYear || '[Year]',
    '[Your Major]': data.userMajor || '[Your Major]',
    '[Referrer Name]': data.referrerName || '[Referrer Name]',
    '[Recent Deal/Transaction]': data.recentDeal || '[Recent Deal/Transaction]',
    '[Recent Deal]': data.recentDeal || '[Recent Deal]',
    '[Specific Topic Discussed]': '[Specific Topic Discussed]',
    '[Specific Advice]': '[Specific Advice]',
    '[Action You\'ll Take]': '[Action You\'ll Take]',
    '[Specific Aspect]': '[Specific Aspect]',
    '[Original Subject]': '[Original Subject]',
  };

  let subject = template.subject;
  let body = template.body;

  for (const [placeholder, value] of Object.entries(replacements)) {
    subject = subject.split(placeholder).join(value);
    body = body.split(placeholder).join(value);
  }

  return { subject, body };
}

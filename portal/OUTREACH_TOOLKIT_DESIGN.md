# Outreach Toolkit Design

## Philosophy

This is a **discipline and coaching layer**, NOT a CRM.

It exists to:
- Enforce the best practices taught in the Outreach Masterclass
- Help students stay organized without context-switching to spreadsheets
- Generate high-quality, copy-paste-ready outreach emails
- Surface follow-up reminders so nothing falls through the cracks

It does NOT:
- Send emails
- Enrich contact data
- Sync with Gmail/Outlook
- Track email opens or responses automatically
- Provide analytics dashboards
- Import contacts from LinkedIn

---

## Data Model

### `outreachContacts` Table

```sql
CREATE TABLE outreach_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,

  -- Contact info (manual entry only)
  name TEXT NOT NULL,
  firm TEXT NOT NULL,
  role TEXT,                          -- "Analyst", "Associate", "VP", etc.
  email TEXT,                         -- Optional - user may not have it yet

  -- Connection context
  connection_type TEXT,               -- "alumni", "referral", "cold", "event"
  connection_note TEXT,               -- "Met at GS info session", "Referred by John"

  -- Status tracking (opinionated states)
  status TEXT NOT NULL DEFAULT 'identified',
  -- States: identified → contacted → responded → scheduled → spoke → advocate → stale

  -- Timestamps
  last_contact_date DATE,
  follow_up_due DATE,

  -- Notes (freeform)
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_outreach_contacts_user ON outreach_contacts(user_id);
CREATE INDEX idx_outreach_contacts_follow_up ON outreach_contacts(user_id, follow_up_due)
  WHERE follow_up_due IS NOT NULL;
```

### Status State Machine

```
identified     → User found this person, hasn't reached out yet
contacted      → Initial email sent
responded      → Got a response (positive or scheduling)
scheduled      → Call is on the calendar
spoke          → Had the conversation
advocate       → They've agreed to help (referral, intro, etc.)
stale          → No response after 2 follow-ups, moved on
```

### Constraints (Enforced in Code)

- Max 100 contacts per user (prevents hoarding)
- Status transitions are validated (can't go backward except stale→contacted for retry)
- Follow-up due dates auto-calculated based on status:
  - contacted → +7 days
  - responded → +3 days (schedule quickly!)
  - scheduled → call date
  - spoke → +14 days (thank you follow-up check)

---

## UI Design

### Location

`/track/investment-banking-interview-prep/outreach` (new page)

Accessible from:
- Track page hero section (card next to Resume Feedback)
- Outreach Masterclass module page (contextual link)

### Views

#### 1. Dashboard View (Default)

```
┌─────────────────────────────────────────────────────────────┐
│  Outreach Tracker                              [+ Add Contact] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ⚠️ FOLLOW-UPS DUE                                            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Sarah Chen (GS TMT) - contacted 7 days ago              │ │
│  │ [Send Follow-up] [Mark Responded] [Mark Stale]          │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Mike Johnson (Evercore M&A) - responded, schedule!      │ │
│  │ [Mark Scheduled] [Generate Reply]                       │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ALL CONTACTS (47)                     [Filter by status ▼]  │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Name          │ Firm       │ Status    │ Last Contact   ││
│  ├──────────────────────────────────────────────────────────┤│
│  │ Sarah Chen    │ GS TMT     │ contacted │ Jan 12         ││
│  │ Mike Johnson  │ Evercore   │ responded │ Jan 15         ││
│  │ ...           │            │           │                ││
│  └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

#### 2. Add/Edit Contact Modal

```
┌─────────────────────────────────────────────────────────────┐
│  Add Contact                                          [×]   │
├─────────────────────────────────────────────────────────────┤
│  Name *                                                      │
│  [_____________________]                                    │
│                                                               │
│  Firm *                                                      │
│  [_____________________]                                    │
│                                                               │
│  Role                                                        │
│  [Analyst ▼]  (Analyst, Associate, VP, Director, MD, Other) │
│                                                               │
│  Email (optional)                                            │
│  [_____________________]                                    │
│                                                               │
│  How do you know them?                                       │
│  [Alumni ▼]  (Alumni, Referral, Cold, Event, Other)         │
│                                                               │
│  Connection note                                             │
│  [Same school, graduated 2023_____________]                 │
│                                                               │
│                              [Cancel]  [Save Contact]        │
└─────────────────────────────────────────────────────────────┘
```

#### 3. Email Generator (Slide-out Panel)

```
┌─────────────────────────────────────────────────────────────┐
│  Generate Email for Sarah Chen                        [×]   │
├─────────────────────────────────────────────────────────────┤
│  Template                                                    │
│  [Initial Outreach - Alumni ▼]                              │
│                                                               │
│  Your Details (remembered)                                   │
│  School: [Michigan___________]                              │
│  Year: [Junior___]                                          │
│  Target: [Tech coverage______]                              │
│                                                               │
│  ───────────────────────────────────────────────────────────│
│                                                               │
│  GENERATED EMAIL                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Subject: Michigan Junior - Quick Question About GS TMT  ││
│  │                                                          ││
│  │ Hi Sarah,                                                ││
│  │                                                          ││
│  │ I found your profile through the Michigan alumni network ││
│  │ and noticed you joined Goldman's TMT group after         ││
│  │ graduating in 2023. I'm a junior at Michigan recruiting  ││
│  │ for IB this summer and am particularly interested in     ││
│  │ tech coverage.                                           ││
│  │                                                          ││
│  │ Would you have 15-20 minutes for a quick call in the    ││
│  │ next few weeks?                                          ││
│  │                                                          ││
│  │ Totally understand if your schedule doesn't allow.       ││
│  │ Thanks either way.                                       ││
│  │                                                          ││
│  │ Best,                                                    ││
│  │ [Your Name]                                              ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  [Copy to Clipboard]  [Regenerate]  [Mark as Contacted]      │
└─────────────────────────────────────────────────────────────┘
```

---

## Template Library

Hardcoded templates (not user-editable, opinionated):

### Initial Outreach
1. **Alumni** - Shared school connection
2. **Referral** - Someone suggested you reach out
3. **Cold** - No obvious connection, genuine interest
4. **Event** - Met at info session/recruiting event

### Follow-ups
5. **First Follow-up** - Gentle bump after 7 days
6. **Second Follow-up** - Final attempt with easy out

### Post-Call
7. **Thank You** - After a networking call
8. **Scheduling Reply** - When they respond positively

---

## LLM Prompt Design

### System Prompt

```
You are an expert networking coach helping college students write outreach emails to investment banking professionals.

RULES:
1. Emails must be 5-7 sentences maximum
2. Always include an "easy out" (e.g., "Totally understand if you're too busy")
3. Never use flattery or desperate language
4. Be specific about the ask (15-20 minute call)
5. Reference the connection point in the first sentence
6. Don't list credentials, GPA, or club memberships
7. Keep subject lines specific: include school, their group, and a clear purpose

TONE:
- Professional but not stiff
- Confident but not presumptuous
- Concise and respectful of their time

OUTPUT FORMAT:
Return a JSON object:
{
  "subject": "...",
  "body": "..."
}
```

### User Prompt Template

```
Generate a {template_type} email.

CONTACT:
- Name: {contact_name}
- Firm: {firm}
- Role: {role}
- Connection: {connection_type} - {connection_note}

SENDER:
- School: {user_school}
- Year: {user_year}
- Interest: {user_interest}
- Name: {user_name}

{additional_context}
```

### Guardrails

- Output validated with Zod schema (must have subject + body)
- Body length checked (reject if > 1000 chars)
- Scan for banned phrases: "I would be so grateful", "honored to speak", "pick your brain"
- Rate limit: 20 generations per day per user

---

## API Routes

```
/api/outreach/
├── contacts/
│   ├── route.ts          GET (list), POST (create)
│   └── [id]/
│       └── route.ts      GET, PATCH, DELETE
├── generate/
│   └── route.ts          POST (generate email)
└── settings/
    └── route.ts          GET, PATCH (user's school, year, etc.)
```

---

## Scope Guardrails

### What We WON'T Build

1. **Email sending** - Copy to clipboard only
2. **Contact enrichment** - No LinkedIn scraping, no Apollo integration
3. **Email tracking** - No open rates, no read receipts
4. **Calendar integration** - User manages their own calendar
5. **Import/Export** - No CSV import, no bulk operations
6. **Analytics** - No charts, no conversion funnels
7. **Team features** - Single user only
8. **Reminders via email/SMS** - In-app only
9. **Custom templates** - Opinionated library only
10. **Contact recommendations** - User finds their own contacts

### Why These Limits

- Keeps the tool complementary to Gmail, Apollo, LinkedIn
- Prevents scope creep into CRM territory
- Forces focus on the coaching/discipline value
- Reduces maintenance burden
- Avoids privacy/compliance complexity

---

## Implementation Phases

### Phase 1: Core Tracker (MVP)
- Database table
- CRUD API routes
- Contact list UI
- Add/Edit modal
- Status updates
- Follow-up due dates (calculated)

### Phase 2: Email Generator
- Template library (hardcoded)
- LLM generation endpoint
- Generation UI panel
- Copy to clipboard
- User settings (school, year, interest)

### Phase 3: Polish
- Follow-up reminders banner
- Filter by status
- Keyboard shortcuts
- Mobile responsive

---

## File Structure

```
app/
├── track/[trackSlug]/outreach/
│   ├── page.tsx                    # Server component (auth check)
│   └── OutreachDashboard.tsx       # Client component (main UI)

components/outreach/
├── ContactList.tsx
├── ContactCard.tsx
├── AddContactModal.tsx
├── EditContactModal.tsx
├── EmailGenerator.tsx
├── FollowUpBanner.tsx
├── StatusBadge.tsx
└── index.ts

lib/outreach/
├── templates.ts                    # Hardcoded email templates
├── prompts.ts                      # LLM system prompts
├── schemas.ts                      # Zod schemas
└── status-machine.ts               # Status transition logic

app/api/outreach/
├── contacts/
│   ├── route.ts
│   └── [id]/route.ts
├── generate/route.ts
└── settings/route.ts
```

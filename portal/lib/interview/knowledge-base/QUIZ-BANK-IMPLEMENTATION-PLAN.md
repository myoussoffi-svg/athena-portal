# Quiz Bank Implementation Plan

## Overview

Build a multiple-choice quiz bank system for the 3 technical modules:
- Accounting Foundations
- Valuation & Modeling
- LBOs & Advanced Topics

---

## User Requirements Recap

1. **Format:** Multiple choice A-D
2. **Immediate Feedback:** Show correct/incorrect immediately after answering
3. **Wrong Answer Explanations:** Thorough explanations when wrong
4. **Progress Tracking:** Archive all answers in database
5. **Review Mode:** "Review Mistakes" study mode for wrong answers
6. **Question Types:** Conceptual, Formulaic, Judgmental, Edge Cases
7. **Difficulty Levels:** Easy, Medium, Hard
8. **Access Point:** Module page, below the lessons list
9. **Volume:** 100-200 questions per module

---

## Proposed Architecture

### Database Schema

```sql
-- Quiz Questions Table
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY,
  module_slug VARCHAR(100) NOT NULL,  -- 'accounting-foundations', 'valuation-modeling', 'lbos-advanced-topics'
  question_id VARCHAR(50) UNIQUE NOT NULL,  -- 'acc-001', 'val-001', etc.
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL,  -- 'A', 'B', 'C', 'D'
  explanation TEXT NOT NULL,
  difficulty VARCHAR(20) NOT NULL,  -- 'easy', 'medium', 'hard'
  question_type VARCHAR(20) NOT NULL,  -- 'conceptual', 'formulaic', 'judgmental', 'edge-case'
  topic VARCHAR(100),  -- sub-topic for filtering
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Quiz Attempts Table
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,  -- Clerk user ID
  question_id VARCHAR(50) NOT NULL REFERENCES quiz_questions(question_id),
  module_slug VARCHAR(100) NOT NULL,
  selected_answer CHAR(1) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_quiz_questions_module ON quiz_questions(module_slug);
CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_user_module ON quiz_attempts(user_id, module_slug);
CREATE INDEX idx_quiz_attempts_wrong ON quiz_attempts(user_id, is_correct) WHERE is_correct = FALSE;
```

### API Routes

```
POST   /api/quiz/[moduleSlug]/attempt     - Submit an answer
GET    /api/quiz/[moduleSlug]/questions   - Get questions (with filters)
GET    /api/quiz/[moduleSlug]/progress    - Get user's progress stats
GET    /api/quiz/[moduleSlug]/review      - Get wrong answers for review
```

### UI Components

```
components/quiz/
├── QuizLauncher.tsx        - Entry point card on module page
├── QuizContainer.tsx       - Main quiz wrapper (handles state)
├── QuestionCard.tsx        - Single question display
├── AnswerOptions.tsx       - A-D answer buttons
├── FeedbackDisplay.tsx     - Correct/Wrong + explanation
├── ProgressBar.tsx         - Quiz progress indicator
├── QuizResults.tsx         - Summary after completing set
├── ReviewMode.tsx          - Study wrong answers mode
└── QuizFilters.tsx         - Filter by difficulty/type
```

---

## User Flow

### 1. Starting Quiz (from Module Page)

```
[Module Page]
  └── Lessons List
  └── [Quiz Bank Section]
       ├── "Practice Quiz" button → Start new quiz session
       ├── Progress indicator (e.g., "45/100 questions attempted")
       ├── "Review Mistakes" button → Jump to wrong answers
       └── Stats: Accuracy %, Questions by difficulty
```

### 2. Quiz Session Flow

```
[Quiz Page: /track/[trackSlug]/[moduleSlug]/quiz]

Step 1: Question Display
┌─────────────────────────────────────────┐
│ Question 1 of 20          [Easy] [Conceptual]
│─────────────────────────────────────────│
│ What is the fundamental accounting      │
│ equation?                               │
│                                         │
│ ○ A) Assets = Liabilities + Revenue     │
│ ○ B) Assets = Liabilities + Equity      │
│ ○ C) Assets + Liabilities = Equity      │
│ ○ D) Revenue - Expenses = Net Income    │
│                                         │
│            [Submit Answer]              │
└─────────────────────────────────────────┘

Step 2: After Selection (Before Submit)
- Selected answer highlighted
- Submit button enabled

Step 3: After Submit (Feedback)
┌─────────────────────────────────────────┐
│ ✓ Correct!                              │
│                                         │
│ The fundamental accounting equation is  │
│ Assets = Liabilities + Shareholders'    │
│ Equity. This equation must always       │
│ balance...                              │
│                                         │
│            [Next Question]              │
└─────────────────────────────────────────┘

OR

┌─────────────────────────────────────────┐
│ ✗ Incorrect                             │
│                                         │
│ You selected: A                         │
│ Correct answer: B                       │
│                                         │
│ The fundamental accounting equation is  │
│ Assets = Liabilities + Shareholders'    │
│ Equity. This equation must always       │
│ balance, representing that all assets   │
│ are financed either by debt (liabilities)│
│ or equity...                            │
│                                         │
│            [Next Question]              │
└─────────────────────────────────────────┘
```

### 3. Quiz Completion

```
┌─────────────────────────────────────────┐
│ Quiz Complete!                          │
│─────────────────────────────────────────│
│ Score: 16/20 (80%)                      │
│                                         │
│ By Difficulty:                          │
│   Easy: 8/8 (100%)                      │
│   Medium: 6/8 (75%)                     │
│   Hard: 2/4 (50%)                       │
│                                         │
│ [Review Wrong Answers]  [New Quiz]      │
│ [Back to Module]                        │
└─────────────────────────────────────────┘
```

### 4. Review Mistakes Mode

```
┌─────────────────────────────────────────┐
│ Review Mistakes (4 questions)           │
│─────────────────────────────────────────│
│ Shows only previously wrong answers     │
│ User re-attempts each question          │
│ Updates progress when answered correctly│
│                                         │
│ Filter options:                         │
│ [All] [This Session] [Last 7 Days]      │
└─────────────────────────────────────────┘
```

---

## Quiz Configuration Options

### Starting a Quiz Session

User can configure:
1. **Number of questions:** 10, 20, 50, or All
2. **Difficulty filter:** Easy, Medium, Hard, or Mixed
3. **Question type:** Conceptual, Formulaic, Judgmental, Edge Case, or Mixed
4. **Mode:**
   - New Questions (not yet attempted)
   - All Questions (random from pool)
   - Review Mistakes (only wrong answers)

### Default Quiz

- 20 questions
- Mixed difficulty (weighted: 30% easy, 50% medium, 20% hard)
- Mixed question types
- Prioritizes unanswered questions

---

## Module Page Integration

### Location on Module Page

```tsx
// app/track/[trackSlug]/[moduleSlug]/page.tsx

<Section title="Modules">
  <TrackModuleList ... />
</Section>

<Section title="Practice">
  {/* Existing Interview Simulator Link */}
</Section>

{/* NEW: Quiz Bank Section */}
<Section title="Quiz Bank" subtitle="Test your knowledge">
  <QuizLauncher
    moduleSlug={moduleSlug}
    trackSlug={trackSlug}
  />
</Section>
```

### QuizLauncher Component

Shows:
- Total questions available
- User's progress (attempted/total)
- Accuracy percentage
- Quick-start buttons (Start Quiz, Review Mistakes)
- Link to full quiz page with filters

---

## File Structure

```
app/
├── api/
│   └── quiz/
│       └── [moduleSlug]/
│           ├── questions/route.ts    - GET questions
│           ├── attempt/route.ts      - POST answer
│           ├── progress/route.ts     - GET user progress
│           └── review/route.ts       - GET wrong answers
│
└── track/
    └── [trackSlug]/
        └── [moduleSlug]/
            └── quiz/
                └── page.tsx          - Quiz UI page

components/
└── quiz/
    ├── QuizLauncher.tsx
    ├── QuizContainer.tsx
    ├── QuestionCard.tsx
    ├── AnswerOptions.tsx
    ├── FeedbackDisplay.tsx
    ├── ProgressBar.tsx
    ├── QuizResults.tsx
    ├── ReviewMode.tsx
    └── QuizFilters.tsx

db/
└── schema.ts                         - Add quiz tables

lib/
└── quiz/
    ├── types.ts                      - TypeScript types
    ├── queries.ts                    - Database queries
    └── seed.ts                       - Import from JSON seeds
```

---

## Implementation Phases

### Phase 1: Database & API (Backend)
1. Add quiz tables to Drizzle schema
2. Run migration
3. Create API routes for questions, attempts, progress
4. Create seed script to import JSON questions

### Phase 2: Quiz UI (Frontend)
1. Build QuizLauncher component for module page
2. Build quiz page with QuestionCard, AnswerOptions
3. Build FeedbackDisplay for immediate feedback
4. Build QuizResults for completion summary

### Phase 3: Progress & Review (Enhanced Features)
1. Build progress tracking display
2. Build Review Mistakes mode
3. Add filtering by difficulty/type
4. Add quiz configuration options

### Phase 4: Polish
1. Style refinements (match Athena visual system)
2. Mobile responsiveness
3. Keyboard navigation
4. Performance optimization

---

## Questions for Review

1. **Quiz Access:** Should quiz be accessible only after completing all lessons, or available anytime?

2. **Question Randomization:** Should questions be randomized each session, or follow a fixed order?

3. **Retake Policy:** Can users retake questions they got correct? Or only wrong ones?

4. **Scoring Display:** Show running score during quiz, or only at end?

5. **Time Limits:** Any time limit per question or per quiz session?

6. **Streak/Gamification:** Add streaks, badges, or other gamification elements?

---

## Technical Decisions

### Already Decided
- PostgreSQL (Neon) with Drizzle ORM
- Clerk for authentication
- Next.js App Router
- Server Components where possible

### Recommendations
- Store questions in DB (not just JSON) for query flexibility
- Use optimistic updates for snappy UX
- Batch progress saves to reduce DB calls
- Cache question sets with React Query or similar

---

## Estimated Implementation

- Phase 1 (Backend): Foundation work
- Phase 2 (Frontend): Core quiz experience
- Phase 3 (Enhanced): Review mode and filtering
- Phase 4 (Polish): Final refinements

Ready to proceed once you approve this plan.

# Athena Master Content Spec (Governing Constitution)

## 1. Purpose of This Document
This document is the authoritative governing specification for all educational content produced for Athena. Its purpose is to ensure consistency, rigor, and differentiation across all courses while allowing depth to vary by audience and use case.

Claude Code must treat this document as a binding constitution. When generating, editing, or expanding content, Claude must follow the rules, constraints, and standards defined here.

This spec exists to prevent:
- Fluff or generic explanations
- Inconsistent depth across courses
- Interview-prep content bleeding into associate-level training
- Over-summarization instead of true teaching

---

## 2. Athena Philosophy

### 2.1 What Athena Is
Athena is a professional-grade finance education platform designed to prepare candidates and associates for real evaluation moments:
- Interviews
- Case studies
- Investment committee discussions
- Deal execution responsibilities

Athena prioritizes:
- Signal over coverage
- Judgment over memorization
- Explanation over lists
- Professional tone over motivational language

### 2.2 What Athena Is Not
Athena is not:
- A Q&A dump
- A cheatsheet or flashcard app
- A motivational or career-coaching product
- A generic "finance 101" explainer

---

## 3. Course Types and Intended Outcomes

Athena contains three distinct course types. Claude must respect these boundaries strictly.

### 3.1 Investment Banking Interview Prep
Target user: Undergraduate students and early professionals recruiting for IB roles.

Primary goal: Enable students to confidently and correctly answer all standard IB interview questions.

Backbone authority: 400 Investment Banking Interview Questions Guide.

Depth standard:
- Conceptual clarity
- Interview framing
- Escalation readiness

Forbidden:
- Real-world associate workflows
- Deal execution depth
- IC-level judgment discussions

---

### 3.2 Private Equity Interview Prep
Target user: IB analysts recruiting for private equity roles.

Primary goal: Enable candidates to pass PE interviews, including technical screens, LBOs, and case studies.

Backbone authority: Peak Frameworks Private Equity Recruiting Guide.

Depth standard:
- Interview-grade LBO intuition
- Case judgment under pressure
- Structured deal walkthroughs

Forbidden:
- Full diligence workflows
- Live-deal execution mechanics
- Post-close operational ownership

---

### 3.3 Advanced Private Equity Deal Training
Target user: Incoming or current PE associates.

Primary goal: Prepare associates to perform at a high level on live deals and in IC contexts.

Backbone authority: Athena proprietary associate curriculum (deal lifecycle based).

Depth standard:
- Real-world decision-making
- Tradeoffs, ambiguity, and prioritization
- Associate-level accountability

Required:
- Judgment calls
- Synthesis under uncertainty
- Communication for VPs, partners, and IC

---

## 4. Module and Lesson Design Rules

### 4.1 Modules
A module represents a distinct professional skill or cognitive job.

Modules must not:
- Be purely chronological unless justified
- Mix unrelated skills
- Serve as arbitrary containers

Module count is course-dependent and intentional.

---

### 4.2 Lessons
A lesson is the atomic unit of learning.

Each lesson must map to:
- A recognizable interview question archetype, OR
- A real on-the-job task an associate must perform

If a lesson does not clearly map to one of the above, it should not exist.

---

## 5. Mandatory Lesson Template

Every lesson file must follow this structure exactly:

1. Title
   Clear, professional, specific. No marketing language.

2. Learning Objectives
   - 3–5 bullets
   - Outcome-oriented
   - Verbs like: explain, evaluate, diagnose, defend

3. Written Guide
   Structured sections that:
   - Explain why the concept exists
   - Explain how it is used in practice
   - Highlight common mistakes and misconceptions

4. Video Placeholder
   - Video title
   - Bullet outline of what the video would cover
   - Suggested length (minutes)

5. Key Takeaways
   - 4–6 bullets
   - Clear, distilled, reusable

---

## 6. Tone and Voice Requirements

All content must be:
- Professional
- Direct
- Neutral in tone
- Free of hype or motivational language

Avoid:
- "Crush your interview"
- "Ace this question"
- "Secret tricks"

Preferred tone:
Calm, confident, technically precise, and respectful of the reader's intelligence.

---

## 7. Depth and Rigor Standards

### 7.1 Explanation > Enumeration
Do not list facts without explanation.

Every list must be supported by:
- Rationale
- Context
- Consequences

---

### 7.2 Escalation Awareness
Lessons should anticipate follow-up questions:
- What happens if assumptions change?
- Where does this break down?
- How would this differ in another context?

---

## 8. Forbidden Behaviors (Hard Rules)

Claude must not:
- Copy or closely paraphrase proprietary guides
- Use generic filler phrases
- Summarize entire topics in one paragraph
- Introduce content not aligned to the course's target audience

If uncertain, Claude must choose depth over breadth.

---

## 9. Metadata and Frontend Compatibility

All courses, modules, and lessons must include structured metadata (YAML) that supports:
- Ordering
- Estimated time
- Prerequisites
- Access control by course plan

Metadata must be clean, minimal, and frontend-readable.

---

## 10. Future-Proofing (Testing & Exams)

Although v1 does not include quizzes or exams, all content must be written so that:
- Questions can be derived directly from lessons
- Case prompts can map to modules
- Pass/fail gating can be layered on later

Claude should assume all content may later be evaluated under timed, graded conditions.

---

## 11. Final Instruction to Claude

When generating content for Athena:
- Follow this spec strictly
- Do not infer missing rules
- Ask for clarification only if absolutely necessary

This document supersedes all other instructions unless explicitly overridden.

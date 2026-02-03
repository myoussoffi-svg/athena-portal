# Athena IB Course Launch Roadmap

**Goal:** Ship Investment Banking Interview Prep course on `learn.athena.pe` with working payments, access control, and interview simulator.

**Current State:** ~90% complete. Core infrastructure working locally. Interview simulator 95% done.

**Subdomain:** `learn.athena.pe`

---

## Phase 1: Production Infrastructure (Do First)
*Without this, nothing else matters.*

### 1.1 Subdomain & DNS Setup
- [ ] Add DNS record in your domain registrar (likely where athena.pe is registered)
  - Type: CNAME
  - Name: `learn`
  - Value: `cname.vercel-dns.com`
- [ ] Add `learn.athena.pe` as custom domain in Vercel project settings
- [ ] Verify SSL certificate provisioned (automatic on Vercel)
- [ ] Test: `https://learn.athena.pe` loads (even if errors, DNS is working)

### 1.2 Production Environment Variables
- [ ] Create production env in Vercel dashboard:
  ```
  NEXT_PUBLIC_APP_URL=https://learn.athena.pe
  DATABASE_URL=<production Neon connection string>

  # Clerk (Production instance)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
  CLERK_SECRET_KEY=sk_live_...

  # Stripe (Live mode)
  STRIPE_SECRET_KEY=sk_live_...
  STRIPE_WEBHOOK_SECRET=whsec_...
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

  # AI Services
  ANTHROPIC_API_KEY=<production key>
  OPENAI_API_KEY=<production key>

  # Cloudflare R2
  R2_ACCESS_KEY_ID=...
  R2_SECRET_ACCESS_KEY=...
  R2_BUCKET_NAME=...
  R2_ACCOUNT_ID=...
  R2_PUBLIC_URL=...

  # Inngest
  INNGEST_EVENT_KEY=...
  INNGEST_SIGNING_KEY=...

  # Content path
  CONTENT_ROOT=./content
  ```

### 1.3 Clerk Production Setup
- [ ] Create Production instance in Clerk dashboard (separate from dev)
- [ ] Add `learn.athena.pe` to allowed origins
- [ ] Set sign-in redirect URL: `https://learn.athena.pe/sign-in`
- [ ] Enable auth methods (email, Google, etc.)
- [ ] Copy production keys to Vercel env vars

### 1.4 Stripe Production Setup
- [ ] Switch to Live mode in Stripe dashboard
- [ ] Create webhook endpoint: `https://learn.athena.pe/api/stripe/webhook`
- [ ] Subscribe to events: `checkout.session.completed`, `charge.refunded`, `charge.dispute.created`
- [ ] Copy webhook signing secret to Vercel env vars
- [ ] Verify IB Prep product exists ($265) or create it
- [ ] Run `db/update-stripe-ids.ts` to sync product/price IDs

### 1.5 Database Production Setup
- [ ] Verify Neon production database exists and is accessible
- [ ] Run Drizzle migrations: `npx drizzle-kit push`
- [ ] Seed products: `npx tsx db/seed-products.ts`
- [ ] Seed interview prompts/evaluator: `npx tsx db/seed.ts`

### 1.6 Inngest Production Setup
- [ ] Create Inngest account/app for production
- [ ] Add Inngest env vars to Vercel
- [ ] Verify functions are registered after deploy

**Checkpoint:** Deploy to Vercel, site loads at `learn.athena.pe`, can sign in.

---

## Phase 2: Code Fixes (Before Any Sales)
*These prevent broken experiences or security issues.*

### 2.1 Feature Flag Enforcement on Course Pages
- [ ] Update `/app/courses/[courseSlug]/page.tsx` to check `isTrackVisible()`
- [ ] Return 404 or redirect for hidden courses (PE, Advanced)
- [ ] Test: `/courses/private-equity-interview-prep` should 404

### 2.2 Wire Course Page to Database
- [ ] Replace hardcoded `COURSES` object with database query
- [ ] Fetch product by slug from `products` table
- [ ] Handle product not found (404)
- [ ] Ensures price changes don't require code deploys

### 2.3 Interview Simulator - Complete Missing Pieces
*Core simulator is 95% done. Need to finish:*

**Unlock Request API (~2 hours):**
- [ ] Create `POST /api/interview/unlock-request` endpoint
- [ ] Accept `{ reason: string }` in request body
- [ ] Update `candidateLockouts` record with request text and timestamp
- [ ] Return success message to user
- [ ] Wire up the button in `InterviewLanding.tsx` (currently has TODO)

**Cooldown Auto-Lock (~1 hour):**
- [ ] When attempt is abandoned, set `lockedUntil` to 24 hours from now
- [ ] Update in `lib/inngest-functions.ts` where abandoned attempts are marked
- [ ] Lockout message should show time remaining

**Test Full Flow:**
- [ ] Start interview → answer all 14 questions → submit
- [ ] Verify transcription completes (check Inngest dashboard)
- [ ] Verify evaluation completes and feedback appears
- [ ] Test lockout scenario (abandon interview, verify locked)

### 2.4 Content Verification
- [ ] Run through each of the 4 modules, open every lesson
- [ ] Verify: no placeholder text, no broken markdown, no 404s
- [ ] Ensure lessons render correctly with all interactive blocks
- [ ] Document any content gaps

**Checkpoint:** All code fixes deployed. Interview simulator works end-to-end.

---

## Phase 3: End-to-End Testing (Before Public Launch)
*Verify everything works with real money and real users.*

### 3.1 Purchase Flow Test
- [ ] Create new account on production (use personal email)
- [ ] Go to `/courses/investment-banking-interview-prep`
- [ ] Click "Enroll Now" → complete Stripe checkout with real card
- [ ] Verify: redirected to success page
- [ ] Verify: can access `/track/investment-banking-interview-prep`
- [ ] Verify: purchase record in database
- [ ] Refund yourself in Stripe dashboard
- [ ] Verify: access revoked after webhook processes

### 3.2 Interview Simulator Test
- [ ] As a paying user, go to interview simulator
- [ ] Complete full interview (all 14 questions)
- [ ] Verify: video uploads to R2
- [ ] Verify: transcription runs (check Inngest)
- [ ] Verify: evaluation completes with hire/borderline/no_hire
- [ ] Verify: results page shows structured feedback

### 3.3 Mobile Testing
- [ ] Test lesson pages on iPhone Safari
- [ ] Test lesson pages on Android Chrome
- [ ] Test purchase flow on mobile
- [ ] Note: Interview simulator may show mobile warning (expected)

### 3.4 Progress Tracking
- [ ] Mark a lesson complete
- [ ] Refresh page → still complete
- [ ] Log out, log back in → still complete

### 3.5 Edge Cases
- [ ] Already enrolled user clicks "Enroll" → should redirect to course
- [ ] User without purchase tries `/track/...` → redirects to purchase
- [ ] Hidden course URL → 404

### 3.6 Legal Pages
- [ ] `/terms` loads with content
- [ ] `/privacy` loads with content
- [ ] `/refund-policy` loads with content

**Checkpoint:** Full confidence in production system. Ready for real customers.

---

## Phase 4: Framer Integration
*Connect main athena.pe site to course portal.*

### 4.1 Add Education Nav Link
- [ ] In Framer, add "Education" or "Learn" to main nav
- [ ] Link to `https://learn.athena.pe`
- [ ] Or link directly to `https://learn.athena.pe/courses/investment-banking-interview-prep`

### 4.2 Optional: Promotional Section
- [ ] Add section on athena.pe home page promoting the course
- [ ] Brief description, price, CTA button
- [ ] Link to course purchase page

**Checkpoint:** Users can discover course from athena.pe.

---

## Phase 5: Post-Launch Improvements
*Not blocking launch. Do after revenue flowing.*

### 5.1 Email Notifications
- [ ] Set up Resend account
- [ ] Purchase confirmation email
- [ ] Welcome email with course access instructions

### 5.2 Admin Dashboard Improvements
- [ ] View all purchases
- [ ] Customer lookup
- [ ] Interview unlock approval UI
- [ ] Video review interface

### 5.3 Interview Simulator Enhancements
- [ ] Interview history page (past attempts)
- [ ] Retake countdown timer UI
- [ ] Transcript editing before evaluation

### 5.4 Sales Page Enhancements
- [ ] Video hero / course preview
- [ ] Testimonials (once you have students)
- [ ] FAQ section

---

## Launch Checklist Summary

### Must Have (Blocking Launch)
- [x] Stripe integration working
- [x] Access control working
- [x] Lesson UI complete
- [x] Auth (Clerk) working
- [x] Interview simulator core (recording, transcription, evaluation)
- [ ] **DNS: `learn.athena.pe` pointing to Vercel**
- [ ] **Production env vars configured**
- [ ] **Clerk production instance configured**
- [ ] **Stripe live mode + webhook configured**
- [ ] **Database seeded (products, prompts)**
- [ ] **Feature flags enforced on course pages**
- [ ] **Course page fetches from database**
- [ ] **Interview unlock request API**
- [ ] **Content verified (no broken lessons)**
- [ ] **One successful test purchase**
- [ ] **One successful interview completion**

### Should Have (Before Public Announce)
- [ ] Mobile tested on real devices
- [ ] Progress tracking verified
- [ ] Edge cases tested
- [ ] Legal pages verified
- [ ] Framer nav link added

### Nice to Have (Post-Launch)
- [ ] Email notifications
- [ ] Admin dashboard improvements
- [ ] Interview history page
- [ ] Sales page enhancements

---

## Work Sequence

| Order | Task | Est. Effort |
|-------|------|-------------|
| 1 | DNS + Vercel domain setup | 30 min |
| 2 | Production env vars in Vercel | 30 min |
| 3 | Clerk production setup | 30 min |
| 4 | Stripe live mode + webhook | 30 min |
| 5 | Database migrations + seed | 30 min |
| 6 | Inngest production setup | 30 min |
| 7 | Deploy and verify site loads | 15 min |
| 8 | Feature flag enforcement (code) | 1 hour |
| 9 | Course page from database (code) | 1-2 hours |
| 10 | Interview unlock request API (code) | 1-2 hours |
| 11 | Cooldown auto-lock timing (code) | 30 min |
| 12 | Content verification | 1-2 hours |
| 13 | E2E purchase test | 30 min |
| 14 | E2E interview test | 30 min |
| 15 | Mobile testing | 30 min |
| 16 | Framer nav link | 15 min |

**Total estimated: 10-12 hours of focused work**

---

## Current Session Focus

Ready to start? Recommended order:
1. **Infrastructure first** (DNS, Vercel, env vars) - you may need to wait for DNS propagation
2. **Code fixes** (feature flags, course page DB, interview API) - while DNS propagates
3. **Testing** (once deployed to production)
4. **Framer** (final step)

Let me know which phase you want to tackle first!

---
title: "Comparable Companies Analysis"
subtitle: "Build a trading comps table and value a company like a banker"
type: case-study
---

Comparable companies analysis—"trading comps"—is the most common valuation methodology in investment banking. Unlike a DCF, which requires forecasting cash flows years into the future, comps let the market tell you what similar companies are worth today. The logic is simple: if Company A trades at 10x EBITDA and your target looks similar, your target should trade around 10x too.

But "similar" is where the art comes in. This case study walks through building a real comps analysis, selecting peers thoughtfully, and defending your valuation in an interview.

---

## The Setup

You're an analyst on a sell-side M&A deal. The client is considering selling their business, and the MD wants a quick comps analysis to establish a valuation range before the pitch.

**TargetCo: Regional IT Services Company**

**Business Profile:**
- Provides managed IT services to mid-market companies
- $150M revenue, $30M EBITDA (20% margin)
- Growing 8% annually
- Primarily U.S.-based, some recurring revenue from contracts

**Your Task:**
1. Select an appropriate peer universe
2. Calculate relevant trading multiples
3. Apply the multiples to value TargetCo
4. Present a valuation range

**Available Public Comps (you've screened these):**

```calculation
title: "Screened Public Comparable Companies"
given:
  - "TargetCo: $150M revenue, $30M EBITDA, 20% margin, 8% growth"
steps:
  - "Cognizant: Revenue $19.4B, EBITDA $3.5B, Margin 18%, Growth 3%, EV $35B"
  - "EPAM Systems: Revenue $4.8B, EBITDA $720M, Margin 15%, Growth 12%, EV $11B"
  - "Globant: Revenue $2.1B, EBITDA $315M, Margin 15%, Growth 18%, EV $7.5B"
  - "Perficient: Revenue $920M, EBITDA $165M, Margin 18%, Growth 10%, EV $2.8B"
  - "Grid Dynamics: Revenue $320M, EBITDA $45M, Margin 14%, Growth 15%, EV $850M"
  - "CBIZ: Revenue $1.6B, EBITDA $240M, Margin 15%, Growth 9%, EV $3.2B"
result: "Six public IT services companies identified as potential peers"
```

Work through each step yourself before revealing the solutions.

---

## Step-by-Step Walkthrough

```accordion-step
id: step-1-peer-selection
stepNumber: 1
title: Evaluate and Select the Peer Universe
challenge: |
  Not all "similar" companies make good comps. Review the six companies above and decide which ones to include in your peer set.

  Consider these factors:
  - Business model similarity
  - Size comparability (revenue scale)
  - Growth profile
  - Margin profile
  - Geographic focus

  Which companies would you include? Which would you exclude and why?
hint: Think about size differential. If a company is 100x larger than your target, does it really trade the same way? Also consider business mix—is CBIZ really a pure-play IT services company?
solution: |
  **Selection Criteria:**

  ```calculation
  title: "Peer Selection Criteria"
  given:
    - "Business model: Same services? Same customer type?"
    - "Size: Larger companies often trade at premiums (liquidity, diversification)"
    - "Growth rate: High-growth companies trade at higher multiples"
    - "Margins: Profitability signals business quality"
    - "Geography: Different markets have different dynamics"
  steps:
    - "Each factor affects comparability and multiple relevance"
  result: "All five factors must be evaluated for each potential peer"
  ```

  **Evaluating Each Company:**

  ```calculation
  title: "Peer Universe Evaluation"
  given:
    - "TargetCo: $150M revenue, 20% margin, 8% growth"
  steps:
    - "Cognizant: Borderline — Too large ($19B vs. $150M), but relevant industry"
    - "EPAM Systems: Include — IT services, reasonable size differential, good growth"
    - "Globant: Include — Digital services, high growth, relevant business"
    - "Perficient: Best comp — Mid-market IT services, similar size and margins"
    - "Grid Dynamics: Include — Closest in size, IT services focus"
    - "CBIZ: Borderline — More diversified (accounting, insurance), less pure-play IT"
  result: "Selected Peer Set: EPAM, Globant, Perficient, Grid Dynamics"
  note: "Exclude Cognizant (too large, distorts averages) and CBIZ (different business mix)"
  ```

  We exclude Cognizant (too large, distorts averages) and CBIZ (different business mix). In practice, you might include them in a broader set and show both.

  **Interview tip:** Always be ready to defend your peer selection. "Why did you exclude Cognizant?" — "At $19B revenue versus our target's $150M, the size differential is over 100x. Larger companies typically trade at premiums due to liquidity and diversification, which would inflate our valuation."
```

```accordion-step
id: step-2-calculate-multiples
stepNumber: 2
title: Calculate Trading Multiples
challenge: |
  Using your selected peer set (EPAM, Globant, Perficient, Grid Dynamics), calculate the EV/Revenue and EV/EBITDA multiples for each company.

  Then calculate the summary statistics: mean, median, low, and high for each multiple.

  **Hint:** The data you need is in the setup table above.
hint: EV/Revenue = Enterprise Value / Revenue. EV/EBITDA = Enterprise Value / EBITDA. For EPAM: $11B / $4.8B = 2.3x revenue, $11B / $720M = 15.3x EBITDA.
solution: |
  **Comps Table:**

  ```calculation
  title: "Trading Multiples for Selected Peers"
  given:
    - "EPAM Systems: EV $11.0B, Revenue $4.8B, EBITDA $720M, Growth 12%"
    - "Globant: EV $7.5B, Revenue $2.1B, EBITDA $315M, Growth 18%"
    - "Perficient: EV $2.8B, Revenue $920M, EBITDA $165M, Growth 10%"
    - "Grid Dynamics: EV $850M, Revenue $320M, EBITDA $45M, Growth 15%"
  steps:
    - "EPAM Systems: EV/Revenue = 2.3x, EV/EBITDA = 15.3x"
    - "Globant: EV/Revenue = 3.6x, EV/EBITDA = 23.8x"
    - "Perficient: EV/Revenue = 3.0x, EV/EBITDA = 17.0x"
    - "Grid Dynamics: EV/Revenue = 2.7x, EV/EBITDA = 18.9x"
  result: "Multiples range from 2.3x-3.6x Revenue and 15.3x-23.8x EBITDA"
  ```

  **Summary Statistics:**

  ```calculation
  title: "Comps Summary Statistics"
  given:
    - "EV/Revenue multiples: 2.3x, 2.7x, 3.0x, 3.6x"
    - "EV/EBITDA multiples: 15.3x, 17.0x, 18.9x, 23.8x"
  steps:
    - "EV/Revenue — Mean: 2.9x, Median: 2.9x, Low: 2.3x, High: 3.6x"
    - "EV/EBITDA — Mean: 18.8x, Median: 18.0x, Low: 15.3x, High: 23.8x"
  result: "Median EV/Revenue = 2.9x, Median EV/EBITDA = 18.0x"
  ```

  **Key observation:** There's meaningful dispersion in the multiples. Globant trades at nearly 24x EBITDA while EPAM trades at just over 15x. Understanding why is critical for applying the right multiple to TargetCo.
```

```accordion-step
id: step-3-understand-drivers
stepNumber: 3
title: Understand Why Multiples Differ
challenge: |
  Before applying multiples, you need to understand what drives the variance in your peer set.

  - Why does Globant trade at 23.8x EBITDA (highest)?
  - Why does EPAM trade at 15.3x EBITDA (lowest)?
  - Where should TargetCo fit given its 8% growth and 20% margins?

  Think about what factors would push TargetCo's multiple above or below the peer median.
hint: Growth is typically the strongest driver of valuation multiples. Compare each company's growth rate to their multiple. Also consider margin quality and any company-specific factors.
solution: |
  **Why Globant trades at 23.8x EBITDA (highest):**
  - 18% revenue growth (highest in set)
  - Strong positioning in digital transformation
  - Higher growth commands higher multiple

  **Why EPAM trades at 15.3x EBITDA (lowest):**
  - 12% growth is solid but lower than Globant
  - Larger scale means less upside potential
  - Eastern European delivery exposure (geopolitical discount)

  **Where does TargetCo fit?**
  - 8% growth is **below all comps** (suggests discount)
  - 20% margin is **best-in-class** (suggests premium)
  - Smallest by far (could go either way—size discount or scarcity premium)

  **The judgment call:** TargetCo has lower growth than all comps but better margins. A reasonable approach is to apply a multiple below the median—perhaps 14-16x EBITDA—reflecting the growth differential while crediting the margins.

  **This is what separates good analysts from great ones:** You don't just pick the median. You understand why the median is what it is, and adjust thoughtfully for your target's specific profile.
```

```accordion-step
id: step-4-apply-multiples
stepNumber: 4
title: Apply Multiples to Value TargetCo
challenge: |
  Now apply your selected multiples to TargetCo's financials:
  - Revenue: $150M
  - EBITDA: $30M

  Calculate a valuation range using both EV/EBITDA and EV/Revenue multiples. Consider where in the range TargetCo should fall given its profile (lower growth, higher margins, smaller size).

  What enterprise value range would you recommend?
hint: Use the low, median, and high multiples from your comps. For EV/EBITDA: Low = 15x, Median = 18x, High = 22x. Multiply each by $30M EBITDA.
solution: |
  **Valuation Matrix:**

  ```calculation
  title: "EV/EBITDA Valuation Range"
  given:
    - "TargetCo EBITDA: $30M"
    - "Peer multiples: Low 15x, Median 18x, High 22x"
  steps:
    - "Low (15x): $30M x 15 = $450M"
    - "Median (18x): $30M x 18 = $540M"
    - "High (22x): $30M x 22 = $660M"
  result: "EV/EBITDA implied range: $450M - $660M"
  ```

  ```calculation
  title: "EV/Revenue Valuation Range"
  given:
    - "TargetCo Revenue: $150M"
    - "Peer multiples: Low 2.3x, Median 2.9x, High 3.5x"
  steps:
    - "Low (2.3x): $150M x 2.3 = $345M"
    - "Median (2.9x): $150M x 2.9 = $435M"
    - "High (3.5x): $150M x 3.5 = $525M"
  result: "EV/Revenue implied range: $345M - $525M"
  ```

  **Triangulating the Range:**

  The EV/EBITDA range of $450-660M seems wide. Given TargetCo's profile:
  - Below-average growth → lean toward lower end
  - Above-average margins → some offset
  - Small size → potential illiquidity discount

  **Recommended Range:** $425M - $525M (roughly 14-17.5x EBITDA)

  This implies applying a ~15-20% discount to the peer median to reflect the growth differential.

  **Sensitivity insight:** Each 1x turn of EBITDA multiple = ~$30M of value. If you can argue for 16x vs 15x, that's $30M more for your client.
```

```accordion-step
id: step-5-present-analysis
stepNumber: 5
title: Present the Analysis
challenge: |
  You need to present your valuation to the MD. Prepare a concise summary that includes:

  1. Your valuation range with supporting multiples
  2. Why you chose that range (vs. the peer median)
  3. Key sensitivities the client should understand
  4. How this might compare to other methodologies (DCF, precedents)

  Write this as you would say it in a meeting.
hint: Lead with the answer, then support it. MDs don't want you to walk through your entire process—they want the punchline first, then the reasoning.
solution: |
  **Valuation Summary: TargetCo**

  "Based on trading comparables of public IT services companies, we estimate TargetCo's enterprise value at **$425-525 million**, representing:

  - **14.0x - 17.5x LTM EBITDA** (vs. peer median of 18.0x)
  - **2.8x - 3.5x LTM Revenue** (vs. peer median of 2.9x)

  The discount to peer median multiples reflects TargetCo's below-average growth rate (8% vs. peer average of 14%), partially offset by best-in-class EBITDA margins (20% vs. peer average of 16%).

  **Key sensitivities:**
  - Each 1x turn of EBITDA multiple = ~$30M of value
  - Strategic premium potential if acquirer has synergies
  - Private company discount may apply (no public liquidity)

  **Cross-check:** We'd want to triangulate this with a DCF and precedent transactions. If the DCF shows $480M, that convergence gives us confidence. If it shows $350M, we need to understand the disconnect."
```

---

## Building the Comps Table: Detailed Mechanics

In practice, you'll need to calculate these multiples from raw data. Here's how:

### Calculating Enterprise Value

```
Enterprise Value = Market Cap + Debt + Preferred Stock + Minority Interest − Cash

Where:
- Market Cap = Share Price × Shares Outstanding
- Debt = Short-term + Long-term debt (use book value or market value)
- Cash = Cash + Cash Equivalents + Marketable Securities
```

**Example: Perficient**

```calculation
title: "Enterprise Value Calculation: Perficient"
given:
  - "Share Price: $65"
  - "Shares Outstanding: 35M"
  - "Total Debt: $580M"
  - "Cash: $55M"
steps:
  - "Market Cap: 35M shares x $65 = $2,275M"
  - "Plus: Total Debt = $580M"
  - "Less: Cash = ($55M)"
result: "Enterprise Value = $2,800M"
```

### Calendarization

If companies have different fiscal year ends, you need to calendarize to a common period (usually LTM or CY).

**Example:** Company A has a January fiscal year end, Company B has a December year end. To compare:
- Use LTM (Last Twelve Months) ending at a common date
- Or weight quarterly results to approximate the same period

**Interview tip:** If asked "How do you handle different fiscal years?", explain calendarization: "I'd calendarize the financials to a common period, typically using LTM figures that end on the same quarter. This ensures an apples-to-apples comparison."

### Adjusting EBITDA

Reported EBITDA often needs adjustments for comparability:

```calculation
title: "Common EBITDA Adjustments"
given:
  - "Reported EBITDA may include non-recurring or non-comparable items"
steps:
  - "Stock-based comp: Add back if peers don't (controversial)"
  - "One-time charges: Restructuring, litigation, etc."
  - "M&A costs: Transaction-related expenses"
  - "Rent expense: If comparing with companies that lease vs. own"
result: "Adjusted EBITDA should be calculated consistently across all peer companies"
note: "Be consistent across all companies in your peer set"
```

---

## Practice Variations

```accordion-step
id: variation-a-negative-ebitda
stepNumber: 6
title: Practice Variation A — Negative EBITDA Company
challenge: |
  Your target is a high-growth SaaS company with negative EBITDA. How do you run comps?

  Think about:
  - What multiples can you use instead of EV/EBITDA?
  - What metrics matter most for unprofitable companies?
  - How do you find appropriate peers?
hint: Revenue-based multiples become primary. Think about what else investors look at for high-growth software companies—ARR, net retention, gross margin.
solution: |
  **Use revenue multiples instead:**
  - EV / Revenue is primary
  - EV / ARR (Annual Recurring Revenue) for SaaS
  - EV / Gross Profit if margins vary widely

  **Growth-adjusted multiples:**
  - EV / Revenue / Growth Rate ("Rule of 40" check)
  - Compare companies at similar growth stages

  **Key metrics to comp:**
  - Revenue growth rate
  - Net revenue retention
  - Gross margin
  - CAC payback period

  EBITDA multiples are meaningless for unprofitable companies. The market values them on growth and unit economics.
```

```accordion-step
id: variation-b-no-public-comps
stepNumber: 7
title: Practice Variation B — No Good Public Comps
challenge: |
  Your target is in a niche industry with no directly comparable public companies. What do you do?

  What alternative approaches could provide valuation benchmarks?
hint: Think beyond public trading comps. What about M&A transactions in the space? What about adjacent industries with similar characteristics?
solution: |
  **Options:**

  1. **Broader peer set:** Use adjacent industries with similar characteristics (growth, margins, cyclicality)

  2. **Precedent transactions:** M&A deals for private companies in the space—often more relevant than trading comps

  3. **Sum-of-the-parts:** If the target has multiple segments, comp each segment separately

  4. **Private company benchmarks:** Use industry reports, PitchBook data, or transaction databases

  5. **Lean on DCF:** When comps are scarce, intrinsic valuation becomes more important

  **Interview answer:** "I'd widen the peer set to include companies with similar business characteristics even if not identical industries—similar growth, margins, and end-market exposure. I'd also heavily weight precedent transactions, which are often more relevant for private companies in niche sectors."
```

```accordion-step
id: variation-c-control-premium
stepNumber: 8
title: Practice Variation C — Adjusting for Control Premium
challenge: |
  You're advising on an acquisition. Should you apply a control premium to trading comps? Why or why not?

  If yes, how much and how would you calculate it?
hint: Trading comps reflect minority interest values (buying a small stake). Acquirers pay more because they can control the company and realize synergies.
solution: |
  **Yes, trading comps reflect minority interest values.** Acquirers pay a control premium because they can:
  - Realize synergies
  - Change strategy/management
  - Capture 100% of cash flows

  **Typical control premiums:** 20-40% over unaffected stock price

  **How to apply:**
  - Calculate implied EV from comps: $480M
  - Apply 25% control premium: $480M × 1.25 = $600M
  - Or use precedent transactions (which already include premiums paid)

  **Interview nuance:** "Trading comps give us a minority value. For an acquisition, I'd either apply a control premium of 20-30% or look at precedent transactions, which inherently reflect premiums paid. The right premium depends on expected synergies and competitive dynamics in the process."
```

---

## What Interviewers Listen For

### 1. Thoughtful Peer Selection

**Bad answer:** "I picked companies in the same industry."

**Good answer:** "I selected peers based on business model, size, growth, and margin profile. I excluded Cognizant despite being in IT services because at 130x our target's size, the valuation dynamics are fundamentally different. Large-cap companies trade at premiums for liquidity and diversification that don't apply to a $150M business."

### 2. Understanding Multiple Drivers

Expect questions like:
- "Why does Globant trade at a higher multiple than EPAM?"
- "What would cause TargetCo to trade above the peer median?"
- "How would a recession affect these multiples?"

### 3. Knowing the Limitations

Comps have weaknesses. Acknowledge them:
- Market sentiment affects all multiples (rising tide lifts all boats)
- No two companies are truly identical
- Public company multiples may not apply to private companies
- Point-in-time snapshot—multiples change daily

### 4. Connecting to Other Methodologies

"How does this compare to your DCF?"

You should be able to reconcile: "The DCF implied $480M, right in the middle of our comps range of $425-525M. This convergence gives us confidence in the valuation. The slight premium in the DCF likely reflects the value of TargetCo's margin expansion potential that comps don't capture."

---

## Key Takeaways

- Comps value a company based on how the market values similar companies today
- Peer selection is critical—defend your choices based on business model, size, growth, and margins
- EV/EBITDA is the primary multiple for profitable companies; use EV/Revenue for high-growth or unprofitable
- Multiples vary based on growth, margins, market position, and sentiment—understand why
- Trading comps reflect minority values; add control premium for acquisition analysis
- Always triangulate with other methodologies (DCF, precedents) for a complete picture
- Present ranges, not point estimates—valuation is inherently imprecise

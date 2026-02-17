---
title: "Paper LBO Case Study"
subtitle: "A PE-level walkthrough with multi-tranche debt, management rollover, and investment judgment"
type: case-study
---

Paper LBOs in private equity interviews are significantly harder than the simplified versions you see in banking interviews. PE interviewers expect you to handle multi-tranche debt with different terms, management rollover equity, a full FCF waterfall (with taxes, capex, and working capital), and—critically—an investment recommendation. They're testing whether you think like an investor, not just someone who can push numbers through a formula.

This case study walks through a realistic PE interview scenario at the complexity level you should expect in first-round interviews at middle-market and upper-middle-market funds. Work through each step before revealing the solution.

---

## The Setup

You're interviewing at a middle-market PE fund. The partner hands you a sheet of paper:

**PrecisionParts Co. — National Industrial Fastener & Component Distributor**

**Company Financials:**
- Revenue: $225 million
- EBITDA Margin: 20% (EBITDA = $45 million)
- Depreciation & Amortization: $8 million
- Capital Expenditures: $10 million
- Tax Rate: 25%

**Deal Terms:**
- Entry Multiple: 8.5x EBITDA (Enterprise Value = $382.5 million)
- Transaction Fees: $7.5 million
- Senior Debt: 4.0x EBITDA — 6% interest rate, 5% annual amortization
- Subordinated Debt: 1.5x EBITDA — 10% interest rate, bullet (no amortization)
- Management Rollover: $15 million
- Sponsor Equity: plug to balance

**Projections:**
- EBITDA grows 5% annually (flat margins, revenue also grows 5%)
- Working Capital: 1% of incremental revenue each year
- D&A and Capex remain constant

**Exit:**
- Exit Multiple: 8.5x (no multiple expansion)
- Holding Period: 5 years

**Question:** Walk me through the sources and uses. Then calculate the sponsor's return. Would you recommend this investment?

---

## Step-by-Step Walkthrough

```accordion-step
id: step-1-sources-uses
stepNumber: 1
title: Build the Sources & Uses
challenge: |
  Start with the foundation. In a PE paper LBO, the sources & uses table is more complex than in a banking version—you need to account for transaction fees, management rollover, and multiple debt tranches.

  Given:
  - Enterprise Value: $382.5M (8.5x × $45M)
  - Transaction Fees: $7.5M
  - Senior Debt: 4.0x EBITDA
  - Subordinated Debt: 1.5x EBITDA
  - Management Rollover: $15M

  Build the full sources & uses table and solve for sponsor equity.
hint: Uses = EV + fees. Sources = senior + sub + rollover + sponsor equity. Sponsor equity is the plug that balances the two sides.
solution: |
  **Uses of Funds:**

  | Item | Amount |
  |------|--------|
  | Enterprise Value | $382.5M |
  | Transaction Fees | $7.5M |
  | **Total Uses** | **$390.0M** |

  **Sources of Funds:**

  | Item | Amount |
  |------|--------|
  | Senior Debt (4.0x) | $180.0M |
  | Subordinated Debt (1.5x) | $67.5M |
  | Management Rollover | $15.0M |
  | Sponsor Equity (plug) | $127.5M |
  | **Total Sources** | **$390.0M** |

  **Sponsor Equity = $390.0M − $180.0M − $67.5M − $15.0M = $127.5M**

  Total equity check: $127.5M sponsor + $15.0M rollover = $142.5M total equity. Sponsor owns $127.5M / $142.5M = **89.5%** of the equity. This matters at exit.

  **Interview tip:** State the sponsor ownership percentage immediately. It shows you understand that management rollover dilutes the sponsor's share—a detail that separates PE candidates from banking candidates.
```

```accordion-step
id: step-2-year5-ebitda
stepNumber: 2
title: Project Year 5 EBITDA
challenge: |
  EBITDA grows at 5% annually from a $45M base over a 5-year hold.

  What is EBITDA at exit?
hint: You can compound ($45M × 1.05^5) or approximate using the shortcut that 5% × 5 years ≈ 25-28% growth with compounding.
solution: |
  **Quick approximation:**

  5% × 5 years = 25% simple growth, plus some compounding. Call it ~27%, so $45M × 1.27 ≈ $57M.

  **Year-by-year (if interviewer wants precision):**

  - Year 1: $45.0M × 1.05 = $47.3M
  - Year 2: $47.3M × 1.05 = $49.6M
  - Year 3: $49.6M × 1.05 = $52.1M
  - Year 4: $52.1M × 1.05 = $54.7M
  - Year 5: $54.7M × 1.05 = **$57.4M**

  Use **$57M** for the rest of the paper LBO. Rounding is expected and saves time.
```

```accordion-step
id: step-3-fcf-waterfall
stepNumber: 3
title: Calculate Year 1 Free Cash Flow
challenge: |
  This is where PE paper LBOs diverge from the simplified banking version. You need to walk through the full FCF waterfall: EBITDA → EBIT → EBT → Net Income → Free Cash Flow.

  Year 1 inputs:
  - EBITDA: $47.3M
  - D&A: $8M
  - Senior Interest: $180M × 6% = $10.8M
  - Sub Interest: $67.5M × 10% = $6.75M
  - Tax Rate: 25%
  - Capex: $10M
  - Working Capital: 1% of incremental revenue ($11.25M)

  Walk through the full waterfall to arrive at Year 1 FCF.
hint: EBITDA minus D&A gives EBIT. Subtract total interest for EBT. Apply taxes for Net Income. Then add back D&A, subtract capex and working capital changes to get FCF.
solution: |
  | Line Item | Amount |
  |-----------|--------|
  | EBITDA | $47.3M |
  | Less: D&A | ($8.0M) |
  | **EBIT** | **$39.3M** |
  | Less: Senior Interest ($180M × 6%) | ($10.8M) |
  | Less: Sub Interest ($67.5M × 10%) | ($6.8M) |
  | **EBT** | **$21.7M** |
  | Less: Taxes (25%) | ($5.4M) |
  | **Net Income** | **$16.3M** |
  | Plus: D&A (non-cash add-back) | $8.0M |
  | Less: Capex | ($10.0M) |
  | Less: Change in Working Capital | ($0.1M) |
  | **Free Cash Flow** | **~$14.2M** |

  **Key observations:**

  - Interest expense is substantial ($17.6M total), which is typical for a leveraged deal. That's 37% of EBITDA consumed by interest alone.
  - The D&A add-back and capex nearly offset ($8M vs $10M), contributing a net $2M drag.
  - Working capital is negligible at $0.1M (1% × $11.25M incremental revenue). In a paper LBO, you could reasonably ignore this—but mention it to show thoroughness.
  - **$14.2M of FCF is available for debt repayment.** This is the cash the business generates after all operating costs, taxes, and reinvestment.
```

```accordion-step
id: step-4-debt-paydown
stepNumber: 4
title: Estimate Cumulative Debt Paydown
challenge: |
  Over 5 years, the company uses its FCF to pay down debt. Two mechanisms are at work:

  1. **Mandatory amortization:** 5% of the $180M senior debt = $9M per year
  2. **Cash sweep:** Any remaining FCF after mandatory payments goes to additional senior debt paydown

  The subordinated debt is a bullet—no principal payments until maturity.

  Estimate the total debt paid down over the 5-year hold and the remaining debt at exit.
hint: Year 1 FCF is ~$14M (all goes to senior paydown). FCF grows each year as EBITDA rises and interest declines. Estimate average annual FCF and multiply by 5, or track mandatory vs. discretionary separately.
solution: |
  **Approach 1: Track mandatory + discretionary (preferred)**

  Mandatory amortization: $9M/year × 5 years = **$45M**

  Discretionary (cash sweep): Year 1 excess is $14.2M − $9.0M = $5.2M. This grows as EBITDA increases and interest declines (less debt → less interest → more FCF). By Year 5, excess FCF is roughly $16M. Total discretionary paydown over 5 years ≈ **$50M**.

  **Total debt paydown: ~$95M**

  **Approach 2: Average FCF shortcut (acceptable in interviews)**

  Year 1 FCF: ~$14M. Year 5 FCF: ~$25M (higher EBITDA, lower interest). Average: ~$19M. Cumulative: $19M × 5 = ~$95M. Same answer.

  **Remaining debt at exit:**

  | Tranche | Starting | Paydown | Remaining |
  |---------|----------|---------|-----------|
  | Senior Debt | $180.0M | ~$95M | ~$85M |
  | Sub Debt (bullet) | $67.5M | $0M | $67.5M |
  | **Total** | **$247.5M** | **~$95M** | **~$153M** |

  **Interview tip:** Explain the two paydown mechanisms out loud. Interviewers want to hear you distinguish between mandatory amortization (contractual) and discretionary cash sweep (voluntary). This shows you understand real debt agreements, not just textbook formulas.
```

```accordion-step
id: step-5-exit-ev
stepNumber: 5
title: Calculate Exit Enterprise Value
challenge: |
  Apply the exit multiple to Year 5 EBITDA.

  - Year 5 EBITDA: ~$57M
  - Exit Multiple: 8.5x (same as entry—no multiple expansion)

  What is the Exit Enterprise Value?
hint: Exit EV = Exit Multiple × Exit EBITDA. Note the absence of multiple expansion.
solution: |
  **Exit EV = 8.5x × $57M = ~$485M**

  This compares to the entry EV of $382.5M—an increase of roughly $102M, driven entirely by EBITDA growth.

  **No multiple expansion is a conservative assumption.** In reality, if the sponsor executes well (bolt-on acquisitions, operational improvements, customer diversification), there's a case for modest expansion. But assuming flat multiples is the right default in a paper LBO—it shows discipline and lets your interviewer probe your upside thinking separately.
```

```accordion-step
id: step-6-returns
stepNumber: 6
title: Calculate Exit Equity and Sponsor Returns
challenge: |
  Now bring it all together. Calculate:
  1. Total exit equity value
  2. Sponsor's share (remember management rollover)
  3. Sponsor MOIC and approximate IRR

  Key inputs:
  - Exit EV: ~$485M
  - Remaining Debt: ~$153M
  - Sponsor owns 89.5% of equity ($127.5M of $142.5M total)
hint: Exit Equity = Exit EV − Remaining Debt. Sponsor gets their proportional share. For IRR, use these 5-year benchmarks: 2.0x ≈ 15%, 2.5x ≈ 20%, 3.0x ≈ 25%.
solution: |
  **Step 1: Total Exit Equity**

  Exit Equity = Exit EV − Remaining Debt = $485M − $153M = **~$332M**

  **Step 2: Sponsor's Share**

  Sponsor owns 89.5% of the equity (from Step 1).

  Sponsor Exit Equity = $332M × 89.5% = **~$297M**

  (Management receives ~$35M on their $15M rollover—a 2.3x return that keeps them aligned.)

  **Step 3: Sponsor MOIC**

  MOIC = $297M / $127.5M = **~2.3x**

  **Step 4: Approximate IRR**

  Using 5-year benchmarks:
  - 2.0x → ~15% IRR
  - 2.5x → ~20% IRR

  2.3x falls roughly in the middle → **~18% IRR**

  **The answer:** "The sponsor generates approximately a **2.3x MOIC and ~18% IRR** over the 5-year hold. Returns are driven by a combination of organic EBITDA growth and debt paydown, with no reliance on multiple expansion. This meets typical fund hurdle rates, though it's not a standout return."
```

---

## Value Creation Bridge

```accordion-step
id: step-7-value-bridge
stepNumber: 7
title: Decompose the Value Creation
challenge: |
  The best PE candidates don't just calculate a return—they explain where it comes from. Break down the equity value creation into the three classic LBO drivers:

  - Entry Equity: $142.5M (total, including rollover)
  - Exit Equity: ~$332M
  - Value Created: ~$190M

  How much came from:
  1. EBITDA growth?
  2. Debt paydown?
  3. Multiple expansion?
hint: EBITDA growth contribution = change in EBITDA × exit multiple. Debt paydown flows directly to equity value. Multiple expansion = change in multiple × exit EBITDA.
solution: |
  **1. EBITDA Growth:**

  EBITDA grew from $45M to $57M = $12M increase.
  Value at 8.5x exit multiple: $12M × 8.5 = **~$102M**

  **2. Debt Paydown:**

  Debt reduced from $247.5M to $153M = **~$95M** returned to equity holders.

  **3. Multiple Expansion:**

  Entry and exit multiples are both 8.5x = **$0**

  **Total: $102M + $95M + $0 = ~$197M** (approximation; the ~$7M difference from $190M is rounding throughout the paper LBO)

  **The insight:** Returns are split roughly **55% from EBITDA growth and 45% from debt paydown**. This is a balanced return profile. Deals overly dependent on debt paydown are fragile (what if FCF disappoints?). Deals dependent solely on growth need the thesis to work perfectly.

  **What separates top candidates:** After giving the numbers, add commentary: "I'd want to understand whether there are levers to accelerate EBITDA growth—pricing power, operational efficiency, or bolt-on acquisitions—because organic growth alone at 5% produces an acceptable but not exceptional return."
```

---

## Investment Judgment

```accordion-step
id: step-8-risk-assessment
stepNumber: 8
title: Identify Key Risks
challenge: |
  Before making a recommendation, assess the risks. PrecisionParts is a national industrial fastener and component distributor.

  What are the top 3-4 risks you'd flag for this investment?
hint: Think about the business model (distribution), end-market exposure (industrial/cyclical), competitive dynamics, and deal-specific risks (leverage, growth assumptions).
solution: |
  **1. Cyclicality of Industrial End-Markets**

  Fastener and component demand is tied to manufacturing and construction activity. A recession could compress revenue and EBITDA well below the 5% growth assumption. At 5.5x total leverage, a 15-20% EBITDA decline would strain debt service coverage.

  **2. Customer Concentration**

  Industrial distributors often have meaningful exposure to a handful of large OEMs or contractors. Losing a top-5 customer could materially impact EBITDA. Due diligence should confirm no single customer exceeds 10% of revenue.

  **3. Competitive and Margin Pressure**

  Distribution is a competitive, low-moat business. Amazon Business and larger national distributors (Grainger, Fastenal) are pushing into the space. The 20% EBITDA margin assumption needs scrutiny—is it defensible, or will pricing pressure erode it?

  **4. Limited Organic Growth Upside**

  5% EBITDA growth is modest and essentially tracks GDP plus inflation for industrial distribution. The base case produces an 18% IRR with no margin for error. If growth disappoints (say, 3% instead of 5%), returns compress to ~15-16%, which is below most fund hurdles.

  **Interview tip:** Always connect risks back to the model. Don't just say "it's cyclical"—quantify what happens to returns if EBITDA drops 15%. That's the level of thinking PE interviewers expect.
```

```accordion-step
id: step-9-recommendation
stepNumber: 9
title: Make Your Investment Recommendation
challenge: |
  Based on your analysis—~2.3x / ~18% IRR with the risk profile above—would you recommend this investment to the fund's investment committee?

  Give a clear yes or no, with supporting reasoning.
hint: Frame your answer around risk-adjusted returns vs. the fund's hurdle rate. Consider what would need to go right (and wrong) for this deal. There's no single correct answer—interviewers care about the quality of your reasoning.
solution: |
  **Recommendation: Conditional yes — invest, but with a clear value creation plan.**

  **Why yes:**

  - The base case delivers ~18% IRR with conservative assumptions (no multiple expansion, modest 5% organic growth, no operational improvements). This leaves meaningful upside if the sponsor executes well.
  - Industrial distribution is a proven PE playbook: fragmented market with bolt-on acquisition opportunities, potential for procurement savings, and route density optimization.
  - The capital structure is manageable at 5.5x total leverage, and the business generates consistent FCF for deleveraging.

  **Why it's conditional:**

  - At 8.5x entry, we're paying a fair price, not a bargain. Returns are highly sensitive to entry multiple—every half-turn costs roughly 1-2% of IRR.
  - The base case alone doesn't clear a 20% net IRR hurdle. We need at least one of: (a) one or two accretive bolt-on acquisitions, (b) modest margin improvement through operational initiatives, or (c) slight multiple expansion at exit from a larger, more diversified platform.
  - Downside protection requires confirming low customer concentration and defensible competitive positioning.

  **The framing that wins:** "I'd recommend proceeding to diligence, but the investment thesis needs to be built on more than organic growth. I'd want to map the bolt-on pipeline and identify 100-200bps of operational margin improvement to push the IRR into the low-20s. Without that conviction, 8.5x is too rich for a 5% organic grower."
```

---

## Practice Variations

```accordion-step
id: variation-a-bolt-on
stepNumber: 10
title: Variation A — Bolt-On Acquisition in Year 2
challenge: |
  The sponsor identifies a bolt-on acquisition at the beginning of Year 2:

  - Target: Regional fastener distributor with $5M EBITDA
  - Purchase Price: $30M (6.0x EBITDA)
  - Funded by drawing additional senior debt at 6% interest
  - Acquired EBITDA grows at 5% alongside the platform

  How does this change the exit return? Why are bolt-ons so central to the PE playbook?
hint: The bolt-on adds EBITDA at a lower entry multiple (6x vs 8.5x) while the combined business exits at 8.5x. This "multiple arbitrage" is a key PE value creation lever. Track the additional debt and higher FCF through exit.
solution: |
  **Year 2 EBITDA post-acquisition:** $49.6M (organic) + $5.0M (acquired) = **$54.6M**

  **Growth through exit at 5%:**
  - Year 3: $57.3M
  - Year 4: $60.2M
  - Year 5: **$63.2M** (vs. $57M in the base case)

  **Exit EV:** 8.5x × $63M = **~$536M** (vs. $485M base)

  **Additional debt:** $30M drawn, partially paid down over 3 remaining years. Roughly **$20-25M remaining** at exit.

  **Net impact:**
  - Exit equity: ~$536M − ~$175M debt = **~$361M** (vs. $332M)
  - Sponsor exit equity (~89.5%): **~$323M**
  - MOIC: $323M / $127.5M = **~2.5x** (vs. 2.3x base)
  - IRR: **~20%** (vs. 18% base)

  **Why this matters:** The sponsor bought $5M of EBITDA at 6.0x ($30M) but it exits at 8.5x ($42.5M)—instant **$12.5M of multiple arbitrage**. Plus 3 years of compounding growth on that acquired EBITDA. This is why PE firms love fragmented industries: the bolt-on playbook can add 200-400bps of IRR with modest execution risk.
```

```accordion-step
id: variation-b-margin-expansion
stepNumber: 11
title: Variation B — 200bps Margin Expansion
challenge: |
  Instead of flat margins, the sponsor implements operational improvements that expand EBITDA margins from 20% to 22% by Year 5 (gradual improvement across the hold).

  Revenue still grows at 5% annually. How does this change the return?
hint: Year 5 EBITDA = Year 5 Revenue × 22% margin. Higher EBITDA throughout the hold also means more FCF and more debt paydown.
solution: |
  **Year 5 Revenue:** $225M × 1.05^5 = **~$287M**

  **Year 5 EBITDA at 22% margin:** $287M × 22% = **~$63M** (vs. $57M at 20%)

  **Impact on FCF:** Higher EBITDA throughout the hold generates more cumulative FCF. Estimate ~$105M total debt paydown (vs. $95M base), leaving ~$143M remaining debt.

  **Exit math:**
  - Exit EV: 8.5x × $63M = **~$536M**
  - Exit equity: $536M − $143M = **~$393M** (vs. $332M)
  - Sponsor exit (~89.5%): **~$352M**
  - MOIC: $352M / $127.5M = **~2.8x** (vs. 2.3x base)
  - IRR: **~22%** (vs. 18% base)

  **The insight:** 200bps of margin improvement adds roughly **0.5x to the MOIC and 400bps to the IRR**. This is why PE operating partners obsess over procurement savings, SG&A rationalization, and pricing optimization. Margin expansion is the highest-conviction lever because it's within management's control—unlike revenue growth or exit multiples.
```

```accordion-step
id: variation-c-no-rollover
stepNumber: 12
title: Variation C — No Management Rollover
challenge: |
  Remove the $15M management rollover. The sponsor funds all equity.

  1. What happens to the sponsor's return math?
  2. What are the strategic implications?
hint: Without rollover, sponsor equity increases to fill the gap. The sponsor now owns 100% of equity. Think about what changes in the return calculation and what changes in management incentives.
solution: |
  **Return Math:**

  - Sponsor equity: $390M − $180M − $67.5M = **$142.5M** (vs. $127.5M with rollover)
  - Sponsor owns **100%** of equity
  - Exit equity: ~$332M (same as base—operations are unchanged)
  - Sponsor gets all $332M

  - MOIC: $332M / $142.5M = **~2.3x** (virtually identical to base case)
  - IRR: **~18%** (virtually identical)

  **Why the MOIC barely changes:** Rollover is just equity that participates proportionally. Whether the sponsor puts up $127.5M for 89.5% or $142.5M for 100%, the return per dollar is the same. The math is a wash.

  **Strategic Implications (this is what interviewers really want to hear):**

  - **Alignment loss:** Without rollover, management has no equity upside. Their incentives shift to salary and bonus, not enterprise value creation. This matters enormously in a 5-year hold where day-to-day execution drives returns.
  - **Signal value:** A CEO unwilling to roll equity raises a red flag. It may signal low confidence in the go-forward plan. Conversely, a meaningful rollover (say, $15M on a CEO with $20M net worth) signals deep conviction.
  - **Governance cost:** Without equity alignment, the sponsor may need heavier board oversight, more aggressive management incentive plans (option pools, phantom equity), and closer operational monitoring.

  **The bottom line:** Rollover isn't about the math—it's about management alignment. This is one of the most PE-specific concepts in a paper LBO.
```

```accordion-step
id: variation-d-max-multiple
stepNumber: 13
title: Variation D — Maximum Entry Multiple for 25% IRR
challenge: |
  The fund's hurdle rate is 25% IRR (approximately 3.0x MOIC over 5 years).

  Working backwards: what is the maximum entry multiple the sponsor can pay while still achieving a 25% IRR?

  Assume all other terms remain the same (debt at 4.0x / 1.5x, $15M rollover, $7.5M fees, same growth and exit assumptions).
hint: Set up the equation. At 3.0x, sponsor exit equity must be 3 × sponsor entry equity. The debt structure ($180M senior, $67.5M sub) is fixed since leverage multiples are based on EBITDA. Only the EV and sponsor equity change with entry multiple.
solution: |
  **Set up the equation:**

  Let entry multiple = X. Then:
  - EV = $45M × X
  - Total Uses = $45M × X + $7.5M (fees)
  - Senior debt: $180M (4.0x × $45M—fixed)
  - Sub debt: $67.5M (1.5x × $45M—fixed)
  - Rollover: $15M
  - Sponsor equity = $45M × X + $7.5M − $180M − $67.5M − $15M = **$45X − $255M**

  **Operations and exit are independent of entry multiple:**
  - Year 5 EBITDA: ~$57M
  - Debt paydown: ~$95M → remaining debt ~$153M
  - Exit EV: 8.5 × $57M = $485M
  - Total exit equity: $485M − $153M = **$332M**

  **Sponsor's share at exit:**
  - Total entry equity: ($45X − $255M) + $15M = $45X − $240M
  - Sponsor fraction: ($45X − $255M) / ($45X − $240M)
  - Sponsor exit equity: $332M × ($45X − $255M) / ($45X − $240M)

  **Set equal to 3.0x target:**

  $332M × ($45X − $255) / ($45X − $240) = 3.0 × ($45X − $255)

  Simplify: $332M / ($45X − $240) = 3.0

  $45X − $240 = $110.7M

  $45X = $350.7M

  **X = ~7.8x**

  **Verification:**
  - EV at 7.8x: $351M
  - Uses: $358.5M
  - Sponsor equity: $358.5M − $180M − $67.5M − $15M = **$96M**
  - Total equity: $111M → Sponsor share: 86.5%
  - Sponsor exit: $332M × 86.5% = $287M
  - MOIC: $287M / $96M = **3.0x ✓** → IRR: **~25% ✓**

  **The takeaway:** To hit a 25% IRR, the fund can pay at most ~7.8x—**almost a full turn below the 8.5x asking price**. This shows how sensitive PE returns are to entry price. Every half-turn of entry multiple costs approximately 150-200bps of IRR. This is why entry price discipline is the single most important driver of PE returns.
```

---

## What Interviewers Listen For

### 1. FCF Waterfall Fluency

PE interviewers expect you to walk from EBITDA to FCF without hesitation. The waterfall—EBITDA → EBIT → EBT → Net Income → FCF—should be automatic. Candidates who skip taxes, forget the D&A add-back, or ignore working capital reveal that they haven't internalized how cash actually flows through a leveraged business.

### 2. Investment Judgment, Not Just Math

The math is table stakes. What differentiates candidates is the ability to say "yes, invest" or "no, pass" and back it up with structured reasoning. Frame your recommendation around risk-adjusted returns versus the fund's hurdle rate, identify what needs to go right, and articulate the value creation plan beyond organic growth.

### 3. Value Creation Decomposition

After presenting the return, immediately break it into EBITDA growth, debt paydown, and multiple expansion without being asked. Then offer a view on which lever has the most upside and which carries the most risk. This is how investment professionals think—it shows you understand the mechanics, not just the formula.

---

## Key Takeaways

- PE paper LBOs test investor thinking, not just arithmetic. Always end with a recommendation.
- The FCF waterfall matters: taxes, interest on multiple tranches, capex, and working capital are real cash costs that reduce the money available for debt paydown.
- Management rollover is about alignment, not math. The return per dollar is the same—what changes is incentive structure and governance.
- Entry price discipline is the strongest lever. A full turn of entry multiple swings IRR by 300-400bps in a typical deal.
- Always decompose returns into EBITDA growth, debt paydown, and multiple expansion. Then identify where the upside and risk sit.
- Bolt-on acquisitions and margin improvement are the most actionable levers. A base case with only organic growth and no multiple expansion should produce at least a fund-hurdle return, with these levers providing the upside.
- Practice until the Sources & Uses → FCF → debt paydown → exit equity → MOIC/IRR chain is automatic. Then add the judgment layer—risks, recommendation, and variations—which is what actually wins offers.

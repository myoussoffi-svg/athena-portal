---
id: advanced-technical-questions
title: Advanced Technical Questions and Edge Cases
order: 6
estimated_minutes: 30
---

# Advanced Technical Questions and Edge Cases

## Learning Objectives

- Prepare for advanced or non-standard technical questions that go beyond basic accounting and valuation
- Show deeper understanding by explaining edge cases, nuances, and exceptions
- Answer "what if" scenarios involving transactions, leverage, or unusual accounting treatments
- Exhibit the ability to think through ambiguous or complex situations

## Written Guide

### Why Interviewers Ask Advanced Questions

After testing foundational knowledge (three statements, DCF, LBO), interviewers may ask advanced questions to:

- Differentiate strong candidates from average ones
- Test your ability to think critically under pressure
- Assess whether you understand exceptions and edge cases
- Evaluate how you handle ambiguity

These questions often start with "What if..." or "How would you handle..." and require you to reason through the mechanics, not just recite memorized answers.

### Category 1: Transaction and Valuation Edge Cases

**Q: If a company has more cash than debt, what happens to enterprise value?**

**A**: Net Debt = Debt - Cash. If cash > debt, net debt is negative. EV = Equity Value + Net Debt. A negative net debt means EV < Equity Value. This makes sense: the company has excess cash, so the effective purchase price is lower.

For example:
- Equity Value = $1,000M
- Debt = $100M
- Cash = $300M
- Net Debt = $100M - $300M = -$200M
- EV = $1,000M + (-$200M) = $800M

---

**Q: How do you value a company with negative EBITDA?**

**A**: You can't use EV/EBITDA if EBITDA is negative (the multiple is meaningless). Instead, use:

- **EV/Revenue**: Common for high-growth, unprofitable companies
- **DCF**: Project when the company will become profitable and discount future cash flows
- **Comparable transactions**: Look at what buyers have paid for similar unprofitable companies

For early-stage companies, valuation often relies on growth metrics (e.g., revenue growth, customer acquisition) rather than profitability.

---

**Q: Why might a company's stock price fall after announcing a large acquisition?**

**A**: Several reasons:

1. **Overpaying**: The market believes the buyer paid too much (destroying shareholder value)
2. **Dilution**: If the acquisition is financed with stock, existing shareholders are diluted
3. **Integration risk**: Investors are concerned about execution or cultural fit
4. **Leverage concerns**: If financed with debt, investors worry about increased financial risk

Stock price reactions reflect the market's view on value creation. Accretion doesn't equal value creation.

---

**Q: Can a company have positive cash flow but negative net income?**

**A**: Yes. This can happen if:

- **High depreciation or amortization**: Non-cash charges reduce net income but don't affect cash flow
- **Working capital decreases**: Collecting receivables or reducing inventory generates cash
- **Low CapEx**: If the company isn't reinvesting much, cash flow can be strong even if net income is weak

Conversely, a company can have positive net income but negative cash flow (e.g., rapid growth requiring working capital investment).

---

### Category 2: Accounting Nuances

**Q: How does an asset write-down affect the three statements?**

**A**:

**Income Statement**:
- Write-down expense reduces EBIT and net income
- Non-cash charge

**Balance Sheet**:
- Asset value decreases (e.g., PP&E or goodwill)
- Retained earnings decrease (due to lower net income)
- Balance: -$X assets = -$X equity

**Cash Flow Statement**:
- Net income decreases, but the write-down is added back in CFO (non-cash)
- No impact on cash

---

**Q: Why would a company want to increase depreciation?**

**A**: Increasing depreciation (for tax purposes) reduces taxable income, which reduces cash taxes paid. That's why companies use accelerated depreciation (e.g., MACRS) for tax filings.

However, increasing depreciation for book purposes (financial reporting) reduces reported net income, which management typically avoids unless required.

---

**Q: What's the difference between goodwill and other intangible assets?**

**A**:

- **Goodwill**: The residual premium paid in an acquisition above the fair value of identifiable net assets. It's **not amortized** (under U.S. GAAP) but tested for impairment.
- **Identifiable intangibles** (e.g., patents, trademarks, customer relationships): Specific, separable assets with finite useful lives. They're **amortized** over time.

Both are intangible, but the accounting treatment differs.

---

### Category 3: Leverage and Capital Structure

**Q: What's the difference between book value of debt and market value of debt?**

**A**:

- **Book value**: The value of debt on the balance sheet (principal owed)
- **Market value**: The price at which the debt trades in the market

If interest rates rise or the company's credit deteriorates, the market value of debt may fall below book value (debt trades at a discount). Conversely, if rates fall or credit improves, debt may trade above par.

For valuation purposes, market value is theoretically correct, but book value is often used as a proxy for investment-grade debt.

---

**Q: Why is debt cheaper than equity?**

**A**: Two reasons:

1. **Tax shield**: Interest on debt is tax-deductible, reducing the effective cost. Dividends on equity aren't deductible.
2. **Lower risk**: Debt holders have priority over equity holders in bankruptcy and receive fixed payments, so they require a lower return.

However, too much debt increases the risk of financial distress, which can raise the cost of both debt and equity.

---

**Q: What happens to WACC if a company issues more debt?**

**A**: It depends.

- **Initially, WACC decreases**: Debt is cheaper than equity (due to the tax shield), so replacing equity with debt lowers WACC.
- **Eventually, WACC increases**: As leverage increases, the risk of financial distress rises. The cost of debt and cost of equity both increase due to higher risk, and WACC begins to rise.

There's an optimal capital structure where WACC is minimized.

---

### Category 4: Valuation Sensitivities

**Q: How sensitive is a DCF to WACC?**

**A**: Very sensitive. WACC is the denominator in the present value calculation, so small changes have a large impact.

For example, if WACC increases from 8% to 9%, the present value of future cash flows decreases significantly (roughly 10-15% lower valuation, depending on the profile).

Interviewers may ask you to explain why or to estimate the directional impact.

---

**Q: Which has a bigger impact on valuation: a 1% change in WACC or a 1% change in perpetual growth rate?**

**A**: Generally, **WACC** has a larger impact, especially for shorter projection periods. WACC affects the discount rate for all cash flows, while the perpetual growth rate only affects terminal value.

However, because terminal value often represents 60-80% of total EV, a 1% change in growth rate can also have a meaningful impact.

The exact answer depends on the assumptions, but both are significant.

---

### Category 5: "What If" Scenarios

**Q: If a company pays a $100 dividend, walk me through the impact on the three statements.**

**A**:

**Income Statement**: No impact (dividends aren't an expense)

**Balance Sheet**:
- Cash decreases by $100
- Retained earnings decrease by $100
- Balance: -$100 assets = -$100 equity

**Cash Flow Statement**:
- Dividends appear in cash flow from financing as -$100
- Net change in cash = -$100

---

**Q: If a company raises $100 in debt, what happens to the three statements?**

**A**:

**Income Statement**: No immediate impact (issuing debt isn't revenue or expense)

**Balance Sheet**:
- Cash increases by $100 (asset)
- Debt increases by $100 (liability)
- Balance: +$100 assets = +$100 liabilities

**Cash Flow Statement**:
- Cash inflow of $100 in cash flow from financing
- Net change in cash = +$100

Over time, interest expense on the debt will appear on the income statement.

---

### Common Mistakes

**Overcomplicating answers**: Advanced questions often have straightforward logic. Think through the mechanics step-by-step.

**Guessing instead of reasoning**: If you don't know, explain your thought process. Interviewers value logical reasoning over rote memorization.

**Not asking clarifying questions**: If a question is ambiguous, ask for clarification. It's better to ask than to answer the wrong question.

## Video Placeholder

**Video Title**: Advanced Technical Questions and Edge Cases for IB Interviews

**Outline**:
- Why interviewers ask advanced questions
- Category 1: Valuation edge cases (negative EBITDA, negative net debt, acquisition reactions)
- Category 2: Accounting nuances (write-downs, depreciation, goodwill)
- Category 3: Leverage and capital structure (book vs. market value of debt, WACC sensitivity)
- Category 4: "What if" scenarios (dividends, debt issuance, asset purchases)
- How to approach ambiguous or unfamiliar questions

**Suggested Length**: 14 minutes

## Key Takeaways

- Advanced questions test your ability to think critically and handle edge cases
- Common topics: negative EBITDA, negative net debt, write-downs, WACC sensitivity, "what if" scenarios
- Use first principles: walk through the impact on the three statements or valuation mechanics
- If you don't know, reason through the problem logically rather than guessing
- Ask clarifying questions if the question is ambiguous
- Practice thinking on your feet and explaining your reasoning clearly

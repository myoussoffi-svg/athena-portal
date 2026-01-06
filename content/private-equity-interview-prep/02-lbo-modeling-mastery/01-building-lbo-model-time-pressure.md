---
id: building-lbo-model-time-pressure
title: Building an LBO Model Under Time Pressure
order: 1
estimated_minutes: 40
---

# Building an LBO Model Under Time Pressure

## Learning Objectives

- Build a complete LBO model from scratch within a 2-3 hour timeframe
- Understand the core structure and flow of an interview-grade LBO model
- Prioritize speed and accuracy over unnecessary complexity
- Evaluate which sections to build first and which shortcuts are acceptable

## Written Guide

### Why Speed Matters in PE Interviews

In an Excel LBO interview, you typically have **2-3 hours** to build a complete model from a CIM or financial statements. This is not enough time to build a perfect model with every bell and whistle. You must:

- Work quickly without sacrificing accuracy
- Focus on the 80% that matters, not the 20% that's nice-to-have
- Structure your model cleanly so interviewers can follow your logic
- Check your work as you go to avoid cascading errors

Interviewers care more about correct mechanics and reasonable assumptions than fancy formatting or exhaustive scenario analysis.

### The Core Structure of an LBO Model

A standard LBO model includes these components:

1. **Assumptions & Inputs**: Purchase price, leverage, exit assumptions, operating assumptions
2. **Sources & Uses**: How the deal is financed
3. **Income Statement Projection**: Revenue, EBITDA, D&A, interest, taxes, net income
4. **Cash Flow Statement**: EBIT to unlevered FCF, debt paydown
5. **Balance Sheet**: Assets, liabilities, equity (often simplified)
6. **Debt Schedule**: Debt drawdown, interest, mandatory amortization, cash sweeps
7. **Returns Calculation**: Exit valuation, ending equity value, MOIC, IRR
8. **Sensitivity Tables**: Returns under different assumptions

Not every model needs a full balance sheet. Some interviewers accept simplified versions. Always ask if you're unsure.

### The Build Sequence: What to Do First

When the clock starts, follow this sequence:

**Step 1: Read the materials (15-20 minutes)**:
- Skim the CIM or case packet
- Identify key financial information: LTM revenue, EBITDA, margins, CapEx, working capital
- Note any specific instructions (e.g., "Assume 6.0× leverage" or "Use a 10.0× exit multiple")
- Flag missing information you'll need to assume

**Step 2: Set up assumptions and inputs (10 minutes)**:
- Create a clean assumptions section at the top of your model
- Input purchase price (or calculate EV from EBITDA × multiple)
- Input leverage assumptions (debt as % of purchase price or debt/EBITDA multiple)
- Input exit assumptions (exit year, exit multiple)
- Input operating assumptions (revenue growth, EBITDA margin, CapEx as % of revenue, NWC as % of revenue)

**Step 3: Build sources & uses (10 minutes)**:
- Calculate enterprise value
- Lay out sources (debt, equity)
- Lay out uses (purchase equity, refinance debt, fees)
- Ensure sources = uses

**Step 4: Project the income statement (20-30 minutes)**:
- Project revenue using growth assumptions
- Calculate COGS and gross profit (if given) or skip to EBITDA
- Project EBITDA using margin assumptions
- Subtract D&A to get EBIT
- Calculate interest expense (link from debt schedule—build this next)
- Calculate taxes (EBT × tax rate)
- Calculate net income

**Step 5: Build the debt schedule (30-40 minutes)**:
- Set up debt tranches (revolver, term loans, bonds)
- Calculate interest expense for each tranche
- Model mandatory amortization (if applicable)
- Calculate free cash flow available for debt paydown
- Sweep excess cash to pay down debt (highest cost first)
- Link interest expense back to income statement

**Step 6: Build the cash flow statement and returns (20-30 minutes)**:
- Start with EBIT or net income
- Add back D&A
- Subtract taxes (if starting from EBIT)
- Subtract CapEx
- Subtract change in NWC
- Calculate unlevered free cash flow
- Calculate exit enterprise value (exit EBITDA × exit multiple)
- Subtract remaining debt to get exit equity value
- Calculate MOIC (exit equity / initial equity)
- Calculate IRR

**Step 7: Build sensitivity tables (10-15 minutes)**:
- Create a 2-way sensitivity table for IRR
- Vary exit multiple (rows) and EBITDA growth or margin (columns)
- Use Excel data tables to automate

**Step 8: Check and format (10-15 minutes)**:
- Verify all links are correct
- Check that debt pays down properly
- Ensure IRR and MOIC calculations are accurate
- Format headers, bold key outputs, add borders for clarity
- Do NOT spend excessive time on formatting

### Shortcuts and Simplifications

You don't have time for everything. Here are acceptable shortcuts:

**Skip the full balance sheet**: Many interviewers don't require a three-statement model. Focus on income statement, cash flow, and debt schedule.

**Use simplified working capital**: Model NWC as a % of revenue rather than projecting AR, inventory, and AP separately.

**Combine debt tranches**: If the case gives multiple tranches with similar terms, combine them to save time.

**Use flat assumptions**: If you don't have detailed guidance, assume flat margins, flat CapEx as % of revenue, etc.

**Skip scenarios**: Build the base case first. Add upside/downside only if you have time.

### Common Mistakes

**Spending too much time on formatting**: Interviewers care about substance, not colors and fonts. Format at the end.

**Overcomplicating the model**: Adding unnecessary tabs, calculations, or scenarios wastes time and introduces errors.

**Not checking your work**: Small errors (e.g., wrong sign, broken link) cascade through the model. Check as you build.

**Missing key mechanics**: Forgetting to link interest expense, D&A, or taxes properly is disqualifying.

**Not labeling outputs**: Clearly label MOIC, IRR, and other key outputs so interviewers can find them.

## Video Placeholder

**Video Title**: Building an LBO Model Under Time Pressure

**Outline**:
- Why speed and structure matter in PE interviews
- Core structure of an LBO model: assumptions, sources & uses, projections, debt schedule, returns
- The build sequence: what to do first, second, third
- Time allocation: 15-20 min reading, 10 min assumptions, 30-40 min debt schedule, etc.
- Acceptable shortcuts: skip balance sheet, simplify NWC, combine debt tranches
- Common mistakes: overformatting, overcomplicating, not checking work
- Live walkthrough: building a model in real time

**Suggested Length**: 16 minutes

## Key Takeaways

- PE interview LBO models must be built in 2-3 hours; prioritize speed and accuracy over perfection
- Core structure: assumptions, sources & uses, income statement, debt schedule, returns, sensitivities
- Build sequence: read materials (15-20 min), assumptions (10 min), sources & uses (10 min), income statement (20-30 min), debt schedule (30-40 min), returns (20-30 min), sensitivities (10-15 min), check (10-15 min)
- Acceptable shortcuts: skip full balance sheet, simplify NWC, combine debt tranches, use flat assumptions
- Common mistakes: overformatting, overcomplicating, not checking work, missing key mechanics
- Label outputs clearly (MOIC, IRR) and ensure all links are correct before submitting

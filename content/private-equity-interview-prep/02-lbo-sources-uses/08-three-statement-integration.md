---
id: three-statement-integration
title: Three-Statement Model Integration
order: 8
estimated_minutes: 30
---

# Three-Statement Model Integration

## Learning Objectives

- Understand how the three financial statements interconnect in an LBO model
- Master the circular references between interest expense, debt balances, and cash
- Build models that balance properly with correct linkages throughout
- Navigate common modeling errors and debugging approaches

## Written Guide

### Why Integration Matters in LBO Models

An LBO model is fundamentally a three-statement model with additional complexity. The income statement, balance sheet, and cash flow statement must link together seamlessly. Every projection must flow correctly through all three statements. When integration breaks, the model produces incorrect outputs—and in interviews or on the job, broken models destroy credibility.

The challenge in LBO models is the additional layers of complexity. Purchase accounting adjustments create new assets (goodwill) and modify existing assets (write-ups). The debt schedule interacts with both the income statement (interest expense) and balance sheet (debt balances). These interactions create circular references that require careful handling.

### The Core Linkages

The three statements connect through specific line items:

**Income Statement to Balance Sheet:**
- Net income flows to retained earnings
- Depreciation affects PP&E
- Amortization affects intangible assets

**Balance Sheet to Cash Flow Statement:**
- Changes in working capital accounts (AR, inventory, AP) create operating cash flows
- Changes in PP&E drive investing cash flows
- Changes in debt and equity drive financing cash flows

**Cash Flow Statement to Balance Sheet:**
- Ending cash on the cash flow statement equals cash on the balance sheet

In an LBO model, these linkages remain, but we add:

**Sources and Uses to Opening Balance Sheet:**
- Debt from Sources becomes opening debt balances
- Equity contribution becomes opening equity
- Purchase accounting adjustments create the modified asset base

**Debt Schedule to Income Statement:**
- Interest expense from debt schedule flows to income statement
- PIK interest increases debt balances without cash outflow

**Free Cash Flow to Debt Schedule:**
- Excess cash flow determines optional debt prepayment
- Mandatory amortization is subtracted from cash

### Building an Integrated LBO Model

The construction sequence matters. A logical order prevents circular reference issues and ensures each component has the inputs it needs:

**Step 1: Historical Financials**
Input the target company's historical income statement, balance sheet, and cash flow statement. These provide the baseline for projections and the pre-acquisition balance sheet.

**Step 2: Sources and Uses**
Build the Sources and Uses schedule based on the transaction terms. This determines opening debt balances and equity contribution.

**Step 3: Purchase Accounting**
Apply purchase accounting adjustments to the pre-acquisition balance sheet. Write up assets to fair value, establish new intangibles, and calculate goodwill. This creates the opening balance sheet.

**Step 4: Operating Model**
Project revenue, operating expenses, and EBITDA over the holding period. These projections drive everything else.

**Step 5: Income Statement**
Build the projected income statement from revenue through net income. Leave interest expense blank initially—it will come from the debt schedule.

**Step 6: Balance Sheet**
Project balance sheet accounts. Working capital flows from revenue assumptions. PP&E flows from capex and depreciation. Debt comes from the debt schedule.

**Step 7: Debt Schedule**
Now build the debt schedule, which requires EBITDA and free cash flow inputs. The debt schedule produces interest expense, which flows back to the income statement, and ending debt balances, which flow to the balance sheet.

**Step 8: Cash Flow Statement**
Calculate cash flows from the income statement and balance sheet changes. The cash flow statement should balance—ending cash should match the balance sheet.

**Step 9: Returns Analysis**
Calculate entry equity, exit proceeds, and returns. This requires the debt schedule (for exit net debt) and the operating model (for exit EBITDA).

### Handling Circular References

LBO models inherently contain circular references because:

1. Interest expense depends on average debt balances
2. Debt balances depend on cash available for debt paydown
3. Cash available depends on net income, which depends on interest expense

This circularity must be resolved. There are two approaches:

**Iterative Calculation:** Excel can solve circular references through iteration. Enable iterative calculation (File > Options > Formulas > Enable iterative calculation). The model will converge after several iterations. This is the most common approach.

**Copy-Paste Macro:** Some models use a macro that calculates debt and interest, copies the values, and pastes as values to break the circular link. This requires running the macro each time assumptions change.

**Circuit Breaker:** Include a switch that sets interest expense to zero, breaking the circularity. Run the model with the switch off, then turn it on. This helps identify whether circularity is causing issues.

Circular reference errors are among the most common model mistakes. Signs of problems include: ERROR values, implausibly large or small numbers, and models that change values each time you press F9.

### Common Integration Points

Several specific linkages require attention:

**Revolver Modeling:** The revolving credit facility is drawn when cash is insufficient and repaid when cash is available. This creates additional circularity because revolver drawings affect interest expense. Model the revolver as the last debt tranche to capture this dynamic correctly.

**Cash Sweep:** Many LBO debt structures require excess cash flow to be used for debt prepayment. The cash sweep is typically applied to the most expensive or the most junior debt first. Model this by calculating free cash flow, subtracting mandatory payments, and applying the remainder to optional prepayments.

**Minimum Cash Balance:** Most companies maintain a minimum cash balance for operations. The cash sweep should not reduce cash below this level. Model this by constraining optional prepayment to available cash above the minimum.

**PIK Interest:** Payment-in-kind interest accrues to the principal balance rather than being paid in cash. PIK interest appears in the income statement (non-cash expense) and increases the debt balance without affecting cash.

### Balancing the Model

A properly integrated model balances—the balance sheet balances and the cash flow statement reconciles to the balance sheet cash change. Checking that your model balances is essential.

**Balance Sheet Check:** Assets must equal Liabilities plus Equity. Include a check row that calculates the difference and flags any imbalance.

**Cash Flow Statement Check:** The change in cash per the cash flow statement must equal the change in the balance sheet cash balance.

**Common Imbalance Causes:**
- Missing or double-counted items
- Sign errors (adding when should subtract, or vice versa)
- Timing mismatches (beginning vs. ending balances)
- Circular reference errors
- Hardcoded values that should be formulas

When a model does not balance, isolate the issue by checking each section independently. Does the operating section balance? Does the financing section balance? Work methodically to identify where the break occurs.

### Interview Implications

Interviewers test three-statement integration through several questions:

"Walk me through how the three statements link."
Start with net income flowing to retained earnings, discuss working capital and capex creating cash flows, and explain how ending cash ties to the balance sheet.

"What happens if you increase depreciation by $10?"
Depreciation increases, operating expenses increase, pre-tax income decreases by $10, taxes decrease by $10 × tax rate, net income decreases by $10 × (1 - tax rate), and cash increases by the tax savings.

"Why does an LBO model have circular references?"
Interest expense depends on debt, debt depends on cash flow, and cash flow depends on interest expense. This circularity requires iterative calculation or other resolution methods.

Demonstrating comfort with these mechanics shows you can build models that actually work—not just fill in templates.

## Video Placeholder

**Video Title**: Three-Statement Integration in LBO Models

**Outline**:
- Why integration matters: every projection must flow correctly
- Core linkages: income statement to balance sheet, balance sheet to cash flow
- LBO-specific linkages: Sources and Uses to opening balance sheet, debt schedule to income statement
- Building sequence: historical financials, S&U, purchase accounting, operating model, IS, BS, debt schedule, CFS
- Circular references: why they occur and how to resolve them (iteration, macros, circuit breakers)
- Common integration points: revolver, cash sweep, minimum cash, PIK interest
- Balancing the model: checks to implement and common error causes
- Interview questions on integration

**Suggested Length**: 18 minutes

## Key Takeaways

- Three-statement integration requires net income to retained earnings, working capital changes to operating cash flow, and ending cash to match the balance sheet
- LBO models add complexity: Sources and Uses creates the opening balance sheet, the debt schedule drives interest expense, and free cash flow determines debt paydown
- Circular references occur because interest expense depends on debt balances, which depend on cash available, which depends on interest expense
- Enable iterative calculation in Excel or use macros/circuit breakers to resolve circularity
- The revolver is modeled last because it depends on all other cash flows and debt service
- Include balance checks (assets = liabilities + equity, cash flow change = balance sheet change) and debug methodically when models do not balance

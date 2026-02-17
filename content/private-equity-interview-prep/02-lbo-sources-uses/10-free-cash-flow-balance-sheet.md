---
id: free-cash-flow-balance-sheet
title: Free Cash Flow and Balance Sheet Projections
order: 10
estimated_minutes: 30
---

# Free Cash Flow and Balance Sheet Projections

## Learning Objectives

- Calculate free cash flow accurately from operating model outputs
- Understand how free cash flow drives debt paydown and equity returns
- Build integrated balance sheet projections for LBO models
- Analyze cash conversion and its impact on transaction structuring

## Written Guide

### Why Free Cash Flow Defines LBO Success

In leveraged buyouts, free cash flow is the critical metric. A company that generates strong free cash flow can rapidly repay debt, reducing leverage and building equity value. A company with weak free cash flow conversion struggles to service debt, potentially requiring additional equity or covenant relief.

Free cash flow determines the answer to the fundamental LBO question: how much debt can this business support? Strong free cash flow enables higher leverage, which enables larger transactions with smaller equity checks and higher potential returns. Weak free cash flow constrains leverage, requiring more equity and compressing returns.

Understanding free cash flow at a granular level—what drives it, what constrains it, how it fluctuates—is essential for LBO analysis.

### Free Cash Flow Calculation

Free cash flow represents cash available to service debt and provide returns to equity. The standard calculation is:

**EBITDA**
- Cash Interest Expense
- Cash Taxes
- Capital Expenditures
- Increase in Net Working Capital
= **Free Cash Flow**

Each component requires careful analysis:

**EBITDA:** Comes directly from the operating model. This is the starting point because EBITDA represents cash earnings before investment decisions and financing costs.

**Cash Interest Expense:** Calculated from the debt schedule. For floating-rate debt, interest expense varies with both the outstanding balance and the reference rate. For PIK debt, only the cash-pay portion is subtracted here (PIK interest is non-cash).

**Cash Taxes:** Calculated from the income statement but may require adjustments. Deferred tax assets and liabilities mean that GAAP tax expense differs from cash taxes paid. In early LBO years, interest deductibility often creates tax shields that reduce cash taxes.

**Capital Expenditures:** Includes both maintenance capex (required to sustain current operations) and growth capex (invested to expand capacity or capabilities). The distinction matters because maintenance capex is non-discretionary while growth capex can be scaled based on opportunities.

**Increase in Net Working Capital:** Working capital investment consumes cash when revenue grows (more inventory, more receivables). Conversely, working capital releases cash when revenue declines or when efficiency improves. We discuss net working capital in depth in the next lesson.

### Cash Conversion and Its Importance

Cash conversion measures how effectively the company translates EBITDA into free cash flow:

**Cash Conversion = Free Cash Flow / EBITDA**

High-quality businesses convert 60-80% of EBITDA to free cash flow. Capital-intensive businesses or those with large working capital requirements might convert only 30-50%.

Consider two businesses, both with $100 million EBITDA:

| | Business A | Business B |
|---|-----------|-----------|
| EBITDA | $100M | $100M |
| Cash Interest | ($25M) | ($25M) |
| Cash Taxes | ($15M) | ($15M) |
| Capex | ($10M) | ($35M) |
| Working Capital | ($5M) | ($15M) |
| **Free Cash Flow** | **$45M** | **$10M** |
| **Conversion** | **45%** | **10%** |

Business A can support significantly more leverage than Business B despite identical EBITDA. Business A might support 6x leverage while Business B might max out at 3x.

This analysis shows why EBITDA alone is insufficient for evaluating LBO candidates. Free cash flow characteristics matter enormously.

### Capital Expenditure Modeling

Capital expenditures require thoughtful modeling because they directly impact cash flow and balance sheet:

**Maintenance vs. Growth Capex:** Distinguish between what is required to maintain the business and what is discretionary. Maintenance capex is typically 2-5% of revenue for asset-light businesses and 5-10% for asset-heavy businesses.

**Capex Intensity:** Calculate capex as a percentage of revenue to understand the company's investment requirements. Compare to peers and historical patterns.

**Cyclicality:** Some capex is deferrable in downturns. However, sustained under-investment eventually impairs the business. Model capex conservatively—sponsors often underestimate capex needs.

**Asset Life and Depreciation:** Capex adds to the PP&E balance and is depreciated over its useful life. Ensure capex assumptions are consistent with depreciation assumptions.

In the balance sheet, PP&E flows as:

Beginning PP&E
+ Capital Expenditures
- Depreciation
= Ending PP&E

### Balance Sheet Construction

The LBO balance sheet differs from a typical corporate balance sheet in important ways:

**Opening Balance Sheet:** Created through purchase accounting adjustments to the historical balance sheet. Assets are written to fair value, new intangibles are recognized, and goodwill captures the remaining premium. This creates the Day 1 balance sheet.

**Projected Balance Sheet:** Over the holding period, the balance sheet evolves:
- Cash changes based on free cash flow and debt movements
- Working capital changes based on revenue and efficiency assumptions
- PP&E changes based on capex and depreciation
- Intangibles amortize over their useful lives
- Goodwill typically remains constant (unless impaired)
- Debt changes based on scheduled payments and optional prepayments
- Retained earnings accumulates net income (or losses)

The balance sheet must balance. Total assets must equal total liabilities plus equity. Include a balance check in your model.

### Building Projected Balance Sheet

A practical approach to balance sheet projection:

**Assets:**
- Cash: Ending cash from cash flow statement or debt schedule
- Accounts Receivable: Days Sales Outstanding × (Revenue / 365)
- Inventory: Days Inventory Outstanding × (COGS / 365)
- Other Current Assets: Percentage of revenue or constant
- PP&E: Prior year + Capex - Depreciation
- Intangibles: Prior year - Amortization
- Goodwill: Constant unless impaired
- Other Assets: Percentage of revenue or constant

**Liabilities:**
- Accounts Payable: Days Payable Outstanding × (COGS / 365)
- Accrued Expenses: Percentage of revenue or specific drivers
- Current Debt: Current portion of long-term debt from debt schedule
- Long-term Debt: From debt schedule
- Deferred Taxes: Tax rate × timing differences
- Other Liabilities: Percentage of revenue or constant

**Equity:**
- Common Stock: Opening balance from Sources and Uses
- Retained Earnings: Prior year + Net Income - Dividends

### Cash Flow to Debt Paydown

The connection between free cash flow and debt paydown is direct:

**Free Cash Flow**
- Mandatory Debt Amortization
= **Cash Available for Optional Prepayment**

If free cash flow exceeds mandatory amortization, excess cash can prepay debt (typically the most expensive tranche first). If free cash flow is insufficient, the company must draw on its revolver or, in severe cases, seek covenant relief.

Many LBO debt structures include mandatory cash sweeps—a specified percentage (often 50-75%) of excess cash flow must go toward debt repayment. Model this by applying the sweep percentage to available cash above minimum cash requirements.

**Example:**
- Free Cash Flow: $50M
- Mandatory Amortization: $10M
- Minimum Cash: $15M
- Cash Sweep: 50%

Cash after amortization: $50M - $10M = $40M
Cash above minimum: $40M - $15M = $25M
Mandatory prepayment (50% sweep): $12.5M
Remaining cash for discretionary use: $12.5M

### Impact on Returns

Free cash flow and debt paydown directly impact returns:

**Entry Equity:** Determined by Sources and Uses (fixed at close)

**Exit Equity:** Exit Enterprise Value - Exit Net Debt

Exit net debt equals opening debt less cumulative debt paydown. Every dollar of debt paid down increases equity value dollar for dollar.

**Return Sensitivity:**

| Cumulative Debt Paydown | Exit Equity | MOIC (assuming $400M entry) |
|--------------------------|-------------|------------------------------|
| $100M | $700M | 1.75x |
| $200M | $800M | 2.00x |
| $300M | $900M | 2.25x |

This shows the power of free cash flow. A company that generates $40 million of excess annual free cash flow over five years pays down $200 million of debt, adding 0.50x to MOIC independent of any multiple expansion or EBITDA growth.

### Interview Applications

Free cash flow questions are common in PE interviews:

"What makes a good LBO candidate from a cash flow perspective?"
Strong and stable EBITDA, low capital intensity, modest working capital needs, and consistent cash conversion. The business should generate cash to service debt even under stress scenarios.

"If EBITDA grows 10% but free cash flow declines, what might explain this?"
Several possibilities: working capital build from revenue growth, increased capex for growth, rising interest expense from variable-rate debt, or one-time cash uses. I would analyze each component to identify the driver.

"How does cash conversion affect the entry multiple you can pay?"
Higher cash conversion supports more leverage, which means smaller equity checks. Smaller equity checks can support higher multiples while still achieving target returns. A business with 50% conversion might support 10x entry; a business with 25% conversion might only support 8x.

## Video Placeholder

**Video Title**: Free Cash Flow and Balance Sheet Projections

**Outline**:
- Why free cash flow defines LBO success: debt capacity and paydown
- Free cash flow calculation: EBITDA less interest, taxes, capex, and working capital
- Cash conversion analysis and its importance for leverage decisions
- Capital expenditure modeling: maintenance vs. growth, capex intensity
- Building the projected balance sheet: assets, liabilities, equity
- Cash flow to debt paydown: mandatory amortization and cash sweeps
- Impact on returns: debt paydown increases exit equity dollar for dollar
- Interview questions on free cash flow analysis

**Suggested Length**: 18 minutes

## Key Takeaways

- Free Cash Flow = EBITDA - Cash Interest - Cash Taxes - Capex - Increase in Working Capital
- Cash conversion (FCF/EBITDA) varies from 30-80% depending on capital intensity and working capital needs—this directly impacts leverage capacity
- Capital expenditures include maintenance (non-discretionary) and growth (discretionary) components; distinguish these in modeling
- The projected balance sheet flows from opening purchase accounting through annual changes in working capital, PP&E, debt, and retained earnings
- Free cash flow after mandatory amortization is available for optional debt prepayment, often subject to cash sweep provisions
- Every dollar of debt paydown increases exit equity value dollar for dollar, making free cash flow a primary returns driver

---
id: working-capital-and-cash-conversion
title: Working Capital and Cash Conversion
order: 7
estimated_minutes: 30
video:
  provider: vimeo
  id: "1165798414"
---

# Working Capital and Cash Conversion

## Learning Objectives

- Define net working capital and explain why it matters for cash flow
- Understand how changes in receivables, inventory, and payables affect cash
- Explain the cash conversion cycle and what it reveals about a company's efficiency
- Answer interview questions involving working capital changes and their impact on the three statements

## Written Guide

### What Is Net Working Capital?

**Net Working Capital (NWC)** represents the cash tied up in a company's day-to-day operations. It's calculated as:

NWC = Current Assets - Current Liabilities

Or, more specifically for operating purposes:

NWC = (Accounts Receivable + Inventory) - Accounts Payable

NWC measures the difference between short-term operating assets (what customers owe you and inventory on hand) and short-term operating liabilities (what you owe suppliers).

A positive NWC means the company has more current assets than current liabilities, which is typical. However, changes in NWC directly affect cash flow.

### Why Working Capital Matters for Cash Flow

Changes in NWC represent cash either being used or released:

- **Increase in NWC**: Use of cash (cash is tied up in operations)
- **Decrease in NWC**: Source of cash (cash is freed up)

This is counterintuitive for many candidates. Here's why:

**Increase in Accounts Receivable (AR)**:
- Revenue was recognized on the income statement, but the customer hasn't paid yet
- Cash hasn't been collected, so it's a **use of cash**
- In the cash flow statement, an increase in AR is subtracted from net income

**Increase in Inventory**:
- The company spent cash to buy or produce inventory that hasn't been sold yet
- Cash is tied up in inventory, so it's a **use of cash**
- In the cash flow statement, an increase in inventory is subtracted

**Increase in Accounts Payable (AP)**:
- The company incurred an expense (e.g., bought inventory or services), but hasn't paid yet
- Cash is still in the company's account, so it's a **source of cash**
- In the cash flow statement, an increase in AP is added

**Summary**:
- Increase in AR or Inventory -> Use of cash (subtract from CFO)
- Increase in AP -> Source of cash (add to CFO)
- Decrease in AR or Inventory -> Source of cash (add to CFO)
- Decrease in AP -> Use of cash (subtract from CFO)

### The Cash Conversion Cycle

The **Cash Conversion Cycle (CCC)** measures how long it takes for a company to convert its investments in inventory and receivables back into cash. It's calculated as:

CCC = Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payables Outstanding (DPO)

**Days Inventory Outstanding (DIO)**:
- How long inventory sits before being sold
- DIO = (Inventory / COGS) x 365
- Lower is generally better (faster inventory turnover)

**Days Sales Outstanding (DSO)**:
- How long it takes to collect cash from customers after a sale
- DSO = (Accounts Receivable / Revenue) x 365
- Lower is better (faster collection)

**Days Payables Outstanding (DPO)**:
- How long the company takes to pay its suppliers
- DPO = (Accounts Payable / COGS) x 365
- Higher can be better (delayed payment preserves cash), but too high may strain supplier relationships

A shorter CCC means the company converts its investments into cash more quickly, which is generally favorable. A negative CCC (rare, but seen in companies like Amazon or Dell historically) means the company collects cash from customers before paying suppliers, creating a cash advantage.

### Working Capital in Financial Modeling

In a DCF or LBO model, changes in NWC are a key component of free cash flow. The formula for unlevered free cash flow includes:

UFCF = EBIT x (1 - Tax Rate) + D&A - CapEx - Increase in NWC

An increase in NWC reduces free cash flow because cash is being tied up in operations. A decrease increases free cash flow.

When building a model, NWC is often projected as a percentage of revenue. For example:
- AR might be 10% of revenue
- Inventory might be 8% of revenue
- AP might be 6% of revenue

As revenue grows, NWC grows, creating a cash drag. If revenue declines, NWC can release cash.

### Interview Question: "If Accounts Receivable Increases by $50, What Happens to the Three Statements?"

**Assumptions**: AR increases because revenue was recognized but cash hasn't been collected yet.

**Income Statement**:
- Revenue is recognized (accrual basis), so revenue and net income are unaffected in the current period
- No direct impact

**Cash Flow Statement**:
- Net income is unchanged
- Increase in AR of $50 is a use of cash, so it's subtracted in CFO
- CFO decreases by $50
- Net change in cash: -$50

**Balance Sheet**:
- Accounts Receivable (asset) increases by $50
- Cash (asset) decreases by $50
- Net effect on total assets: $0
- No impact on liabilities or equity
- Balance sheet balances: -$50 cash + $50 AR = $0

**Key insight**: Revenue was recognized, but cash wasn't collected. The cash flow statement adjusts for this timing difference.

### Interview Question: "Why Might a Profitable Company Run Out of Cash?"

A company can be profitable (positive net income) but still run out of cash if:

1. **Rapid revenue growth increases working capital**: As revenue grows, AR and inventory grow, tying up cash.
2. **Customers are slow to pay**: High DSO means cash is stuck in receivables.
3. **Heavy CapEx requirements**: The company is investing heavily in growth, using more cash than it generates from operations.
4. **Debt repayments**: The company must repay debt, which uses cash but doesn't appear on the income statement (except for interest).

This is why cash flow is more important than net income for assessing financial health.

### Common Mistakes

**Confusing the direction of working capital changes**: An increase in AR or inventory is a use of cash (not a source). An increase in AP is a source of cash.

**Forgetting to adjust for working capital in free cash flow**: Free cash flow = CFO - CapEx, and CFO already includes working capital changes. If you're calculating from EBIT, you need to subtract the increase in NWC.

**Thinking working capital is always bad**: Some working capital is necessary for operations. The question is whether it's efficient (low CCC) or inefficient (high CCC).


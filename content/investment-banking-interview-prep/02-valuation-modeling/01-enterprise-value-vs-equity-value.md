---
id: enterprise-value-vs-equity-value
title: Enterprise Value vs. Equity Value
order: 1
estimated_minutes: 30
---

# Enterprise Value vs. Equity Value

## Learning Objectives

- Define enterprise value and equity value and explain the difference between them
- Calculate enterprise value from equity value (and vice versa) using the bridge formula
- Understand which valuation multiples use enterprise value vs. equity value
- Explain why certain balance sheet items are added or subtracted in the EV calculation

## Written Guide

### Why This Distinction Matters

Enterprise value (EV) and equity value are two fundamental concepts in valuation. Interviewers expect you to explain the difference clearly, calculate one from the other, and know which metrics and multiples correspond to each.

Confusing EV and equity value is a common mistake that signals weak technical preparation.

### Equity Value (Market Capitalization)

**Equity Value** represents the market value of a company's equity—what it would cost to buy all of the company's shares.

**Formula**:

Equity Value = Share Price × Shares Outstanding

For a public company, this is straightforward: multiply the current stock price by the fully diluted share count.

Equity value belongs to **equity holders only**. It doesn't include debt or other claims on the company.

### Enterprise Value

**Enterprise Value (EV)** represents the total value of the company's operations, available to all investors (both debt and equity holders). It's the theoretical takeover price: what you'd pay to acquire the entire company.

**Formula (Bridge from Equity Value to EV)**:

EV = Equity Value + Net Debt + Preferred Stock + Minority Interest - Investments in Affiliates

Where:

**Net Debt** = Total Debt - Cash and Cash Equivalents

Let's break down why each item is added or subtracted:

**+ Debt**: When you acquire a company, you assume its debt. The debt holders must be repaid, so debt is part of the total cost.

**- Cash**: When you acquire a company, you also receive its cash. Cash reduces the effective purchase price, so it's subtracted.

**+ Preferred Stock**: Preferred shareholders have a claim on the company that ranks above common equity. If you acquire the company, you must buy them out or honor their claim, so preferred stock is added.

**+ Minority Interest (Non-Controlling Interest)**: If the company owns a subsidiary but not 100% of it, the minority shareholders have a claim. You must account for this.

**- Investments in Affiliates**: If the company owns stakes in other companies (but doesn't consolidate them), those investments aren't part of the core operating business. They're subtracted because EV represents the value of operations.

### Simplified Formula

For interview purposes, the most common simplified version is:

EV = Equity Value + Net Debt

Many interviewers will accept this, though you should know the full formula if asked.

### Example Calculation

**Given**:
- Share price: $50
- Shares outstanding: 100 million
- Total debt: $1,000 million
- Cash: $200 million
- Preferred stock: $100 million
- Minority interest: $50 million

**Equity Value** = $50 × 100M = $5,000 million

**Net Debt** = $1,000M - $200M = $800M

**EV** = $5,000M + $800M + $100M + $50M = $5,950 million

### When to Use EV vs. Equity Value

**Use Enterprise Value (EV)** for metrics that represent operating performance available to all investors:

- **EV / Revenue**
- **EV / EBITDA**
- **EV / EBIT**

These multiples are **capital-structure neutral**, meaning they ignore how the company is financed (debt vs. equity).

**Use Equity Value** for metrics that represent returns to equity holders only:

- **P/E Ratio** (Price / Earnings per Share)
- **P/B Ratio** (Price / Book Value of Equity)

Net income and book value of equity are **after** debt obligations, so they correspond to equity value.

### Why EV Is Preferred in M&A and Valuation

In M&A, the buyer cares about the total cost to acquire the company and the cash flows available to pay back all investors (debt and equity). That's why:

- **EV/EBITDA** is the most common valuation multiple
- **DCF models** discount unlevered free cash flows to arrive at EV, then subtract net debt to get equity value

EV is capital-structure neutral, which makes it easier to compare companies with different levels of debt.

### Common Mistakes

**Adding cash instead of subtracting it**: Cash reduces the effective purchase price, so it's subtracted in the EV formula.

**Using the wrong multiple**: Don't use EV multiples with equity-level metrics. For example, EV / Net Income is wrong; use EV / EBIT or EBITDA instead.

**Forgetting to account for preferred stock or minority interest**: The full EV formula includes these, though they're often small or zero.

**Confusing book value of debt with market value**: In theory, debt should be at market value. In practice, for most investment-grade debt, book value is a reasonable approximation.


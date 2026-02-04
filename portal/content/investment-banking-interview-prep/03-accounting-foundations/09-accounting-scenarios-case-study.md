---
title: "Accounting Flow-Through Scenarios"
subtitle: "Master the statement linkages that interviewers test relentlessly"
type: case-study
---

"Walk me through a $10 increase in depreciation" might be the single most common technical question in investment banking interviews. It seems simple, but it tests whether you truly understand how the three financial statements connect. Interviewers can tell within seconds if you've memorized an answer versus actually understanding the mechanics.

This case study covers the scenarios you'll encounter most frequently, with precise step-by-step logic for each.

---

## The Framework

Before diving into specific scenarios, internalize this framework. Every accounting change flows through the same logic:

```
1. What hits the Income Statement? (Revenue, expenses, taxes)
2. What's the cash impact? (Operating, investing, financing)
3. What changes on the Balance Sheet? (Assets, liabilities, equity)
4. Do the statements still balance?
```

**The golden rule:** The Balance Sheet must always balance. Assets = Liabilities + Equity. If your answer doesn't balance, something is wrong.

**The cash flow bridge:** Net Income flows to the top of the Cash Flow Statement. Non-cash items are adjusted. The ending cash ties to the Balance Sheet.

---

## Step-by-Step Walkthrough

```accordion-step
id: scenario-1-depreciation
stepNumber: 1
title: Scenario 1 — Depreciation Increases by $10
challenge: |
  **"Walk me through a $10 increase in depreciation."**

  Assume a 25% tax rate.

  Work through the impact on:
  1. Income Statement
  2. Cash Flow Statement
  3. Balance Sheet

  What happens to Net Income? What happens to Cash? Do the statements balance?
hint: Depreciation is a non-cash expense that reduces pre-tax income. Less pre-tax income means less taxes. On the CFS, you add back depreciation because it's non-cash.
solution: |
  **Income Statement:**

  | Line Item | Impact |
  |-----------|--------|
  | Depreciation Expense | +$10 |
  | Operating Income (EBIT) | −$10 |
  | Pre-Tax Income | −$10 |
  | Taxes (25%) | −$2.50 (tax savings) |
  | **Net Income** | **−$7.50** |

  Depreciation is an expense, so it reduces pre-tax income by $10. But you pay less taxes ($10 × 25% = $2.50 savings), so net income only falls by $7.50.

  **Cash Flow Statement:**

  | Section | Line Item | Impact |
  |---------|-----------|--------|
  | Operating | Net Income | −$7.50 |
  | Operating | Add: Depreciation | +$10 |
  | **Net Change in Cash** | | **+$2.50** |

  Depreciation is a non-cash expense, so we add it back. The net effect is cash increases by $2.50 (the tax savings).

  **Balance Sheet:**

  | Line Item | Impact |
  |-----------|--------|
  | **Assets** | |
  | Cash | +$2.50 |
  | PP&E (net of accumulated depreciation) | −$10 |
  | **Total Assets** | **−$7.50** |
  | **Liabilities & Equity** | |
  | Retained Earnings (via Net Income) | −$7.50 |
  | **Total L + E** | **−$7.50** |

  **Balance check:** Assets down $7.50, Equity down $7.50. ✓

  **The insight interviewers want:** Depreciation is a non-cash expense that provides a tax shield. The cash benefit equals D&A × Tax Rate. This is why companies care about depreciation schedules—accelerated depreciation front-loads tax savings.
```

```accordion-step
id: scenario-2-inventory-writedown
stepNumber: 2
title: Scenario 2 — Inventory Write-Down of $10
challenge: |
  **"A company writes down inventory by $10. Walk me through the impact."**

  Assume a 25% tax rate.

  An inventory write-down means the inventory is worth less than what the company paid for it—perhaps it's obsolete or damaged.

  Work through all three statements.
hint: Like depreciation, this is a non-cash expense (no cash leaves the building when you write down inventory). The pattern should look similar.
solution: |
  **Income Statement:**

  | Line Item | Impact |
  |-----------|--------|
  | COGS or Write-Down Expense | +$10 |
  | Pre-Tax Income | −$10 |
  | Taxes (25%) | −$2.50 |
  | **Net Income** | **−$7.50** |

  **Cash Flow Statement:**

  | Section | Line Item | Impact |
  |---------|-----------|--------|
  | Operating | Net Income | −$7.50 |
  | Operating | Add: Inventory Write-Down (non-cash) | +$10 |
  | **Net Change in Cash** | | **+$2.50** |

  The write-down is non-cash (no money left the building), so we add it back.

  **Balance Sheet:**

  | Line Item | Impact |
  |-----------|--------|
  | **Assets** | |
  | Cash | +$2.50 |
  | Inventory | −$10 |
  | **Total Assets** | **−$7.50** |
  | **Liabilities & Equity** | |
  | Retained Earnings | −$7.50 |
  | **Total L + E** | **−$7.50** |

  **Balance check:** Assets down $7.50, Equity down $7.50. ✓

  **Key insight:** This flows identically to depreciation—both are non-cash expenses that reduce asset values and provide tax shields. The pattern is the same: Net Income down by expense × (1 − tax rate), cash up by expense × tax rate.
```

```accordion-step
id: scenario-3-prepayment
stepNumber: 3
title: Scenario 3 — Customer Prepays $100
challenge: |
  **"A customer prepays $100 for services to be delivered next year. Walk me through the impact today."**

  No tax impact yet—revenue isn't recognized.

  This tests understanding of accrual accounting and deferred revenue.
hint: Cash came in, but you haven't earned the revenue yet. What liability do you create? What happens to the Income Statement?
solution: |
  **Income Statement:**

  | Line Item | Impact |
  |-----------|--------|
  | Revenue | $0 |
  | **Net Income** | **$0** |

  No revenue is recognized until the service is delivered. This is a key GAAP principle.

  **Cash Flow Statement:**

  | Section | Line Item | Impact |
  |---------|-----------|--------|
  | Operating | Net Income | $0 |
  | Operating | Increase in Deferred Revenue | +$100 |
  | **Net Change in Cash** | | **+$100** |

  Cash came in the door, but it's not revenue yet. The increase in deferred revenue (a liability) is a source of cash.

  **Balance Sheet:**

  | Line Item | Impact |
  |-----------|--------|
  | **Assets** | |
  | Cash | +$100 |
  | **Total Assets** | **+$100** |
  | **Liabilities & Equity** | |
  | Deferred Revenue (liability) | +$100 |
  | **Total L + E** | **+$100** |

  **Balance check:** Assets up $100, Liabilities up $100. ✓

  **Follow-up question:** "What happens when you deliver the service next year?"

  Revenue increases by $100, Net Income increases by $75 (after 25% tax), Deferred Revenue decreases by $100, and Retained Earnings increases by $75. Cash decreases by $25 (taxes paid). The $100 cash received last year stays on the Balance Sheet.
```

```accordion-step
id: scenario-4-debt-equipment
stepNumber: 4
title: Scenario 4 — Issue $50 Debt to Buy Equipment
challenge: |
  **"A company borrows $50 and uses it to buy equipment. Walk me through the statements."**

  Assume no immediate depreciation or interest expense.

  This tests understanding of the investing and financing sections of the Cash Flow Statement.
hint: This is a financing activity (borrowing) and an investing activity (buying equipment). What happens to cash in each section?
solution: |
  **Income Statement:**

  | Line Item | Impact |
  |-----------|--------|
  | **Net Income** | **$0** |

  No P&L impact at the time of transaction—no revenue, no expense yet.

  **Cash Flow Statement:**

  | Section | Line Item | Impact |
  |---------|-----------|--------|
  | Operating | Net Income | $0 |
  | Investing | Purchase of Equipment (CapEx) | −$50 |
  | Financing | Proceeds from Debt Issuance | +$50 |
  | **Net Change in Cash** | | **$0** |

  Cash comes in from financing, goes out for investing. Net cash unchanged.

  **Balance Sheet:**

  | Line Item | Impact |
  |-----------|--------|
  | **Assets** | |
  | Cash | $0 |
  | PP&E | +$50 |
  | **Total Assets** | **+$50** |
  | **Liabilities & Equity** | |
  | Debt | +$50 |
  | **Total L + E** | **+$50** |

  **Balance check:** Assets up $50, Liabilities up $50. ✓

  **Follow-up question:** "What happens in Year 1 when you start depreciating the equipment and paying interest?"

  - Interest expense hits the Income Statement (reduces Net Income)
  - Depreciation hits the Income Statement (reduces Net Income, but add back on CFS)
  - Cash decreases by interest paid and tax effects
  - PP&E decreases by depreciation
  - Debt stays the same (until principal repayment)
```

```accordion-step
id: scenario-5-bad-debt
stepNumber: 5
title: Scenario 5 — $20 of A/R Goes Bad
challenge: |
  **"A customer who owed you $20 declares bankruptcy and won't pay. Walk me through the impact."**

  Assume a 25% tax rate.

  This is a bad debt expense / A/R write-off scenario.
hint: The A/R was never going to become cash. Writing it off is a non-cash expense (you're not sending money anywhere). But wait—if it's non-cash, why does cash go up?
solution: |
  **Income Statement:**

  | Line Item | Impact |
  |-----------|--------|
  | Bad Debt Expense | +$20 |
  | Pre-Tax Income | −$20 |
  | Taxes (25%) | −$5 |
  | **Net Income** | **−$15** |

  **Cash Flow Statement:**

  | Section | Line Item | Impact |
  |---------|-----------|--------|
  | Operating | Net Income | −$15 |
  | Operating | Decrease in A/R (write-off) | +$20 |
  | **Net Change in Cash** | | **+$5** |

  The A/R was never going to become cash, so writing it off doesn't cost cash today. The decrease in A/R is a "source" of operating cash flow (less cash tied up in receivables).

  **Balance Sheet:**

  | Line Item | Impact |
  |-----------|--------|
  | **Assets** | |
  | Cash | +$5 |
  | Accounts Receivable | −$20 |
  | **Total Assets** | **−$15** |
  | **Liabilities & Equity** | |
  | Retained Earnings | −$15 |
  | **Total L + E** | **−$15** |

  **Balance check:** Assets down $15, Equity down $15. ✓

  **Why does cash go up?** It seems counterintuitive, but the A/R was already counted as an asset. Writing it off reduces the A/R asset and creates a tax deduction. You "save" 25% × $20 = $5 in taxes. You never actually receive cash from writing off A/R—it's an accounting adjustment that provides a tax benefit.
```

```accordion-step
id: scenario-6-sbc
stepNumber: 6
title: Scenario 6 — Stock-Based Compensation of $15
challenge: |
  **"A company grants $15 of stock-based compensation to employees. Walk me through the statements."**

  Assume a 25% tax rate.

  SBC is a non-cash expense that's heavily tested because it's a real cost that many people misunderstand.
hint: No cash leaves the company when you grant options or RSUs. But equity does change—you're issuing stock (or the right to stock) to employees.
solution: |
  **Income Statement:**

  | Line Item | Impact |
  |-----------|--------|
  | SBC Expense (usually in SG&A or COGS) | +$15 |
  | Pre-Tax Income | −$15 |
  | Taxes (25%) | −$3.75 |
  | **Net Income** | **−$11.25** |

  **Cash Flow Statement:**

  | Section | Line Item | Impact |
  |---------|-----------|--------|
  | Operating | Net Income | −$11.25 |
  | Operating | Add: Stock-Based Compensation | +$15 |
  | **Net Change in Cash** | | **+$3.75** |

  SBC is non-cash—no money leaves the company when you grant options or RSUs. Add it back.

  **Balance Sheet:**

  | Line Item | Impact |
  |-----------|--------|
  | **Assets** | |
  | Cash | +$3.75 |
  | **Total Assets** | **+$3.75** |
  | **Liabilities & Equity** | |
  | Common Stock / APIC | +$15 |
  | Retained Earnings | −$11.25 |
  | **Total Equity** | **+$3.75** |
  | **Total L + E** | **+$3.75** |

  **Balance check:** Assets up $3.75, Equity up $3.75. ✓

  **Why this matters:** Many tech companies add back SBC to calculate "Adjusted EBITDA." This is controversial because SBC is a real expense—it dilutes existing shareholders. When analyzing a company, always check if SBC is material and whether management is using aggressive add-backs to inflate earnings.
```

---

## Quick Reference: The Patterns

| Scenario | Net Income | Cash | Key Insight |
|----------|------------|------|-------------|
| Depreciation ↑$10 | −$7.50 | +$2.50 | Non-cash expense, tax shield |
| Inventory write-down $10 | −$7.50 | +$2.50 | Non-cash expense, tax shield |
| Customer prepays $100 | $0 | +$100 | Deferred revenue, not yet earned |
| Issue debt $50, buy equipment | $0 | $0 | Financing in, investing out |
| Bad debt write-off $20 | −$15 | +$5 | A/R wasn't real cash anyway |
| SBC expense $15 | −$11.25 | +$3.75 | Non-cash expense, dilution cost |

**Pattern recognition:** Most non-cash expenses follow the same formula:
- Net Income impact: −Expense × (1 − Tax Rate)
- Cash impact: +Expense × Tax Rate

---

## Rapid-Fire Practice

```accordion-step
id: rapid-1-depreciation-decrease
stepNumber: 7
title: Rapid-Fire Q1 — Depreciation Decreases by $5
challenge: |
  Depreciation **decreases** by $5. Assume 25% tax rate.

  What happens to:
  - Net Income?
  - Cash?
  - PP&E?
  - Retained Earnings?

  Does the Balance Sheet balance?
hint: This is the opposite of Scenario 1. Less expense = more profit = more taxes.
solution: |
  - **Net Income:** +$3.75 (less expense = more profit)
  - **Cash:** −$1.25 (higher taxes paid)
  - **PP&E:** +$5 (less accumulated depreciation)
  - **Retained Earnings:** +$3.75

  **Balance check:**
  - Assets: Cash −$1.25, PP&E +$5 = +$3.75
  - Equity: Retained Earnings +$3.75

  ✓ Balanced
```

```accordion-step
id: rapid-2-ar-collection
stepNumber: 8
title: Rapid-Fire Q2 — Collect $30 Cash for A/R
challenge: |
  Company receives $30 cash for services already delivered last month (the revenue was already in A/R).

  Walk through the statements.
hint: The revenue was already recognized when services were delivered. This is just collecting what you already earned.
solution: |
  - **Income Statement:** $0 (revenue was already recognized)
  - **Cash Flow Statement:** +$30 (decrease in A/R is source of cash)
  - **Balance Sheet:** Cash +$30, A/R −$30, Net Assets $0

  No P&L impact—this is just collecting what was already earned.
```

```accordion-step
id: rapid-3-ap-payment
stepNumber: 9
title: Rapid-Fire Q3 — Pay $40 to Supplier (A/P)
challenge: |
  Company pays $40 to supplier for inventory received last month (was in A/P).

  Walk through the statements.
hint: The inventory (and liability) were already recorded. This is just paying down what you owed.
solution: |
  - **Income Statement:** $0 (expense was already recognized as COGS when sold, or inventory if unsold)
  - **Cash Flow Statement:** −$40 (decrease in A/P uses cash)
  - **Balance Sheet:** Cash −$40, A/P −$40, Net $0

  Paying down payables is a use of cash but no P&L impact.
```

```accordion-step
id: rapid-4-buyback
stepNumber: 10
title: Rapid-Fire Q4 — Stock Buyback of $25
challenge: |
  Company buys back $25 of its own stock.

  Walk through the statements.
hint: Buybacks don't flow through the P&L. They're a financing activity and reduce equity.
solution: |
  - **Income Statement:** $0 (buybacks don't flow through P&L)
  - **Cash Flow Statement:** −$25 in Financing section
  - **Balance Sheet:** Cash −$25, Treasury Stock −$25 (contra-equity), Total Equity −$25

  Assets down $25, Equity down $25. ✓
```

```accordion-step
id: rapid-5-dividend
stepNumber: 11
title: Rapid-Fire Q5 — Pay $10 Dividend
challenge: |
  Company pays $10 dividend.

  Walk through the statements.
hint: Dividends are not expenses—they're distributions of earnings to shareholders.
solution: |
  - **Income Statement:** $0 (dividends are not expenses)
  - **Cash Flow Statement:** −$10 in Financing section
  - **Balance Sheet:** Cash −$10, Retained Earnings −$10

  Assets down $10, Equity down $10. ✓
```

```accordion-step
id: rapid-6-goodwill-impairment
stepNumber: 12
title: Rapid-Fire Q6 — Goodwill Impairment of $50
challenge: |
  Company records a goodwill impairment of $50. Assume 25% tax rate.

  Walk through the statements.
hint: Goodwill impairment is a non-cash write-down, just like depreciation or inventory write-down.
solution: |
  - **Net Income:** −$37.50 (impairment expense, net of tax)
  - **Cash:** +$12.50 (tax shield, no cash out for impairment)
  - **Goodwill:** −$50
  - **Total Assets:** −$37.50
  - **Retained Earnings:** −$37.50

  Same pattern as other non-cash write-downs. ✓
```

---

## Common Follow-Up Questions

**Conceptual:**
- "Why is depreciation added back on the Cash Flow Statement?"
- "What's the difference between a write-down and a write-off?"
- "How does deferred revenue differ from accounts receivable?"

**Technical:**
- "Walk me through the journal entry for [scenario]."
- "What if the company had a net operating loss and couldn't use the tax shield?"
- "How would this change under cash accounting vs. accrual?"

**Judgment:**
- "A company has huge SBC expenses but adds them back to EBITDA. Is that fair?"
- "When might a company accelerate depreciation? Why?"
- "How do you evaluate a company with large deferred revenue?"

---

## Key Takeaways

- Every transaction must keep the Balance Sheet in balance (A = L + E)
- Non-cash expenses (D&A, write-downs, SBC) reduce Net Income but don't use cash
- The tax shield on non-cash expenses increases cash by: Expense × Tax Rate
- Deferred revenue is cash received before it's earned—a liability, not revenue
- Working capital changes (A/R, A/P, Inventory) affect cash timing, not profitability
- Always state your tax rate assumption before walking through the math

---

## The 30-Second Checklist

When asked any accounting flow-through question:

1. **State the tax rate** (ask if not given)
2. **Income Statement first:** Is there an expense or revenue? Calculate Net Income impact.
3. **Cash Flow Statement:** Start with Net Income, adjust for non-cash, adjust for working capital
4. **Balance Sheet:** What assets/liabilities change? Does equity change via Net Income?
5. **Balance check:** Assets = Liabilities + Equity?

If your Balance Sheet doesn't balance, trace back through your logic. Something is wrong.

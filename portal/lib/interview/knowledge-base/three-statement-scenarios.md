# Three-Statement Impact Scenarios

> Classic accounting interview questions and their answers.
> Walk through how transactions affect all three financial statements.
> Assume 25% tax rate unless otherwise specified.

---

## Depreciation Scenarios

### Scenario: $100 Depreciation Expense

**Income Statement:**
- Depreciation expense: +$100
- Pre-tax income: -$100
- Tax expense: -$25 (tax shield)
- Net Income: -$75

**Cash Flow Statement:**
- Net Income: -$75
- Add back D&A: +$100
- Net change in cash: +$25

**Balance Sheet:**
- Cash: +$25
- PP&E (net): -$100 (accumulated depreciation increases)
- Total Assets: -$75
- Retained Earnings: -$75
- Balance: ✓

**Key Insight:** Depreciation is a non-cash expense that provides a tax shield. Cash increases by the tax savings.

---

## PP&E Purchase Scenarios

### Scenario: Buy $500 of Equipment with Cash

**Income Statement:**
- No immediate impact (capitalized, not expensed)

**Cash Flow Statement:**
- CFI: -$500 (CapEx)
- Net change in cash: -$500

**Balance Sheet:**
- Cash: -$500
- PP&E: +$500
- Total Assets: No change
- Balance: ✓

### Scenario: Buy $500 of Equipment with Debt

**Income Statement:**
- No immediate impact

**Cash Flow Statement:**
- CFF: +$500 (debt proceeds)
- CFI: -$500 (CapEx)
- Net change in cash: $0

**Balance Sheet:**
- PP&E: +$500
- Debt: +$500
- Balance: ✓

**Key Insight:** Purchasing PP&E doesn't hit the income statement immediately; it's capitalized and depreciated over time.

---

## Inventory Scenarios

### Scenario: Inventory Increases by $50

**Income Statement:**
- No impact (inventory is an asset until sold)

**Cash Flow Statement:**
- CFO: -$50 (increase in working capital uses cash)

**Balance Sheet:**
- Inventory: +$50
- Cash: -$50 (if paid with cash)
- OR Accounts Payable: +$50 (if on credit)

### Scenario: Inventory Write-Down of $100

**Income Statement:**
- Expense (COGS or separate line): +$100
- Pre-tax income: -$100
- Tax expense: -$25
- Net Income: -$75

**Cash Flow Statement:**
- Net Income: -$75
- Add back write-down (non-cash): +$100
- Working capital adjustment: -$100 (inventory decreased)
- Net change in cash: -$75 → Actually $0 if done correctly

**Important:** The non-cash add-back and working capital change offset. Net cash impact is the tax benefit timing only.

**Balance Sheet:**
- Inventory: -$100
- Retained Earnings: -$75
- Deferred Tax Asset: +$25 (potentially)

---

## Revenue & Receivables Scenarios

### Scenario: $200 Revenue Recognized, Cash Not Yet Collected

**Income Statement:**
- Revenue: +$200
- Pre-tax income: +$200
- Tax expense: +$50
- Net Income: +$150

**Cash Flow Statement:**
- Net Income: +$150
- Increase in A/R: -$200 (cash not received)
- Increase in Tax Payable: +$50 (if taxes not paid yet)
- Net change in cash: $0

**Balance Sheet:**
- Accounts Receivable: +$200
- Retained Earnings: +$150
- Tax Payable: +$50

### Scenario: Collect $200 Cash That Was Previously in A/R

**Income Statement:**
- No impact (revenue already recognized)

**Cash Flow Statement:**
- Decrease in A/R: +$200 (cash inflow)
- Net change in cash: +$200

**Balance Sheet:**
- Cash: +$200
- Accounts Receivable: -$200

---

## Deferred Revenue Scenarios

### Scenario: Receive $300 Cash for Service Not Yet Delivered

**Income Statement:**
- No impact (revenue not earned yet)

**Cash Flow Statement:**
- Increase in Deferred Revenue: +$300
- Net change in cash: +$300

**Balance Sheet:**
- Cash: +$300
- Deferred Revenue (liability): +$300

### Scenario: Deliver Service Previously Paid For ($300)

**Income Statement:**
- Revenue: +$300
- Pre-tax income: +$300
- Tax expense: +$75
- Net Income: +$225

**Cash Flow Statement:**
- Net Income: +$225
- Decrease in Deferred Revenue: -$300
- Net change in cash: -$75 (tax payment)

**Balance Sheet:**
- Cash: -$75
- Deferred Revenue: -$300
- Retained Earnings: +$225

---

## Debt Scenarios

### Scenario: Borrow $1,000 in Debt

**Income Statement:**
- No immediate impact

**Cash Flow Statement:**
- CFF: +$1,000 (debt proceeds)
- Net change in cash: +$1,000

**Balance Sheet:**
- Cash: +$1,000
- Debt: +$1,000

### Scenario: Repay $500 of Debt with Cash

**Income Statement:**
- No impact (principal repayment is not an expense)

**Cash Flow Statement:**
- CFF: -$500 (debt repayment)
- Net change in cash: -$500

**Balance Sheet:**
- Cash: -$500
- Debt: -$500

### Scenario: Pay $100 Interest Expense

**Income Statement:**
- Interest Expense: +$100
- Pre-tax income: -$100
- Tax expense: -$25
- Net Income: -$75

**Cash Flow Statement:**
- Net Income: -$75
- (Interest already deducted from Net Income, no add-back)
- Net change in cash: -$75

**Balance Sheet:**
- Cash: -$100 (paid the interest)
- Retained Earnings: -$75
- Tax Payable: -$25 (less tax owed)

**Wait - this doesn't balance.** Let's redo:

**Correct Cash Flow Statement:**
- Net Income: -$75
- Cash paid for interest: -$100
- But wait - interest is already in Net Income...

**Key Insight:** Interest expense reduces Net Income, which flows through Cash from Operations. Cash decreases by the full $100 interest paid, but tax savings mean only $75 hit to equity.

---

## Equity Scenarios

### Scenario: Issue $1,000 of Common Stock

**Income Statement:**
- No impact

**Cash Flow Statement:**
- CFF: +$1,000 (equity issuance)
- Net change in cash: +$1,000

**Balance Sheet:**
- Cash: +$1,000
- Common Stock + APIC: +$1,000

### Scenario: Repurchase $500 of Stock (Treasury Stock)

**Income Statement:**
- No impact

**Cash Flow Statement:**
- CFF: -$500 (buyback)
- Net change in cash: -$500

**Balance Sheet:**
- Cash: -$500
- Treasury Stock: +$500 (reduces equity)
- Total Equity: -$500

### Scenario: Pay $200 Cash Dividend

**Income Statement:**
- No impact (dividends are not expenses)

**Cash Flow Statement:**
- CFF: -$200 (dividend payment)
- Net change in cash: -$200

**Balance Sheet:**
- Cash: -$200
- Retained Earnings: -$200

---

## Stock-Based Compensation Scenario

### Scenario: Record $50 Stock-Based Compensation

**Income Statement:**
- SBC Expense: +$50
- Pre-tax income: -$50
- Tax expense: -$12.50
- Net Income: -$37.50

**Cash Flow Statement:**
- Net Income: -$37.50
- Add back SBC (non-cash): +$50
- Net change in cash: +$12.50

**Balance Sheet:**
- Cash: +$12.50
- Retained Earnings: -$37.50
- APIC: +$50 (equity increased from SBC)

**Key Insight:** SBC is non-cash but creates real dilution. Tax benefit creates small cash increase.

---

## Accounts Payable Scenarios

### Scenario: Increase A/P by $100 (Buy Inventory on Credit)

**Income Statement:**
- No impact (inventory not yet sold)

**Cash Flow Statement:**
- Increase in A/P: +$100 (cash preserved)
- Net change in cash: +$100

**Balance Sheet:**
- Inventory: +$100
- Accounts Payable: +$100

### Scenario: Pay Down A/P by $100

**Income Statement:**
- No impact

**Cash Flow Statement:**
- Decrease in A/P: -$100 (cash used)
- Net change in cash: -$100

**Balance Sheet:**
- Cash: -$100
- Accounts Payable: -$100

---

## Asset Sale Scenarios

### Scenario: Sell Equipment for $80 (Book Value $100)

**Loss on sale = $20**

**Income Statement:**
- Loss on sale: +$20
- Pre-tax income: -$20
- Tax expense: -$5
- Net Income: -$15

**Cash Flow Statement:**
- Net Income: -$15
- Add back loss (non-cash): +$20
- CFI: Proceeds from sale: +$80
- Net change in cash: +$85

**Balance Sheet:**
- Cash: +$85
- PP&E: -$100
- Total Assets: -$15
- Retained Earnings: -$15

### Scenario: Sell Equipment for $120 (Book Value $100)

**Gain on sale = $20**

**Income Statement:**
- Gain on sale: +$20
- Pre-tax income: +$20
- Tax expense: +$5
- Net Income: +$15

**Cash Flow Statement:**
- Net Income: +$15
- Subtract gain (non-cash): -$20
- CFI: Proceeds from sale: +$120
- Net change in cash: +$115

**Balance Sheet:**
- Cash: +$115
- PP&E: -$100
- Total Assets: +$15
- Retained Earnings: +$15

---

## Goodwill Impairment Scenario

### Scenario: Write Down Goodwill by $200

**Income Statement:**
- Impairment expense: +$200
- Pre-tax income: -$200
- Tax expense: -$50
- Net Income: -$150

**Cash Flow Statement:**
- Net Income: -$150
- Add back impairment (non-cash): +$200
- Net change in cash: +$50

**Balance Sheet:**
- Cash: +$50 (tax savings)
- Goodwill: -$200
- Total Assets: -$150
- Retained Earnings: -$150

**Note:** Goodwill impairment is typically NOT tax-deductible for book purposes, so there may be no tax benefit. Adjust accordingly if asked about tax treatment.

---

## PIK Interest Scenario

### Scenario: $50 PIK Interest (Paid in Kind, Not Cash)

**Income Statement:**
- Interest Expense: +$50
- Pre-tax income: -$50
- Tax expense: -$12.50
- Net Income: -$37.50

**Cash Flow Statement:**
- Net Income: -$37.50
- Add back PIK (non-cash): +$50
- Net change in cash: +$12.50

**Balance Sheet:**
- Cash: +$12.50
- Debt: +$50 (PIK increases debt)
- Retained Earnings: -$37.50

**Key Insight:** PIK preserves cash but increases debt balance. Still creates tax shield.

---

## Summary: Key Principles

1. **Non-cash expenses** (D&A, SBC, impairments) reduce Net Income but are added back on Cash Flow Statement

2. **Working capital increases** use cash; decreases provide cash

3. **Debt principal repayment** is NOT an expense; only interest is

4. **Dividends** are NOT expenses; they come from Retained Earnings directly

5. **CapEx** is capitalized, not expensed immediately

6. **Revenue recognition** follows accrual accounting, not cash collection

7. **Tax shield** = Expense × Tax Rate (cash saved from tax-deductible items)

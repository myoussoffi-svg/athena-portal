---
id: closing-balance-sheet
title: Building the Closing Balance Sheet
order: 16
estimated_minutes: 30
---

# Building the Closing Balance Sheet

## Learning Objectives

- Construct the complete closing balance sheet for an LBO transaction
- Integrate Sources and Uses, purchase accounting, and goodwill into a cohesive opening position
- Verify balance sheet integrity through systematic checking procedures
- Understand how the closing balance sheet serves as the foundation for all projections

## Written Guide

### The Closing Balance Sheet as Foundation

The closing balance sheet—also called the opening balance sheet or Day 1 balance sheet—represents the financial position of the acquired company immediately after the LBO transaction closes. Every projection in the LBO model begins from this starting point. If the closing balance sheet is incorrect, every subsequent calculation—debt balances, cash flows, returns—will be wrong.

Building the closing balance sheet requires synthesizing inputs from multiple model sections: the target's historical financials, Sources and Uses, purchase accounting adjustments, and goodwill calculations. This lesson provides a comprehensive framework for constructing and verifying the closing balance sheet.

### The Conceptual Framework

The closing balance sheet reflects a series of transformations:

1. **Start with Historical Balance Sheet:** The target's balance sheet immediately before closing
2. **Remove Old Capital Structure:** Eliminate existing debt and equity being replaced
3. **Apply Purchase Accounting:** Write assets and liabilities to fair value, recognize new intangibles
4. **Add New Capital Structure:** Record new debt from financing and new equity from sponsor
5. **Record Goodwill:** The residual that makes the balance sheet balance

The result is a balance sheet that reflects the new ownership, new capital structure, and new accounting basis.

### Step-by-Step Construction

**Step 1: Input Historical Balance Sheet**

Begin with the target company's most recent balance sheet:

```
HISTORICAL BALANCE SHEET
========================

Assets:
  Cash                          $   50,000
  Accounts Receivable           $  120,000
  Inventory                     $   80,000
  Prepaid Expenses              $   15,000
  Property, Plant & Equipment   $  300,000
  Existing Intangibles          $   35,000
  Other Assets                  $   20,000
  ----------------------------------------
  Total Assets                  $  620,000

Liabilities:
  Accounts Payable              $   70,000
  Accrued Expenses              $   45,000
  Deferred Revenue              $   50,000
  Deferred Tax Liability        $   25,000
  Existing Debt                 $  250,000
  Other Liabilities             $   30,000
  ----------------------------------------
  Total Liabilities             $  470,000

Equity:
  Common Stock                  $   50,000
  Retained Earnings             $  100,000
  ----------------------------------------
  Total Equity                  $  150,000

Total Liabilities + Equity      $  620,000
```

**Step 2: Remove Old Capital Structure**

The existing debt and equity are replaced by the new financing structure. Conceptually, all existing shareholders are cashed out and existing debt is refinanced:

```
REMOVAL OF OLD CAPITAL STRUCTURE
================================

Remove Existing Debt             $ (250,000)
Remove Common Stock              $  (50,000)
Remove Retained Earnings         $ (100,000)
-----------------------------------------
Net Removal                      $ (400,000)
```

On the asset side, the cash used to pay shareholders and debt holders reduces the cash balance. However, in practice, we model this through the Sources and Uses: the new equity and debt provide the cash to make these payments.

**Step 3: Apply Purchase Accounting Adjustments**

Record fair value adjustments and new intangible assets:

```
PURCHASE ACCOUNTING ADJUSTMENTS
===============================

Assets:
  Inventory write-up                    $   10,000
  PP&E write-up                         $   50,000
  Existing intangibles write-up         $    5,000
  New: Customer Relationships           $  200,000
  New: Technology                       $   80,000
  New: Trade Name                       $   50,000
  New: Backlog                          $   15,000
  ----------------------------------------
  Total Asset Adjustments               $  410,000

Liabilities:
  Deferred Revenue haircut (reduction)  $  (15,000)
  Unfavorable Lease Liability (new)     $   10,000
  Deferred Tax Liability increase       $  100,000
  ----------------------------------------
  Total Liability Adjustments           $   95,000

Net Purchase Accounting Adjustment      $  315,000
```

The DTL increase reflects the tax effect of fair value write-ups (approximately 25% of the $410,000 asset adjustments, net of the deferred revenue effect).

**Step 4: Add New Capital Structure**

Record the new debt and equity from Sources and Uses:

```
NEW CAPITAL STRUCTURE (from Sources & Uses)
==========================================

New Term Loan B                  $  400,000
New Second Lien                  $  100,000
Revolving Credit Facility        $       -0  (undrawn)
----------------------------------------
Total New Debt                   $  500,000

Sponsor Equity                   $  300,000
Management Rollover              $   50,000
----------------------------------------
Total New Equity                 $  350,000
```

**Step 5: Calculate and Record Goodwill**

Goodwill is calculated from the purchase price allocation:

```
GOODWILL CALCULATION
====================

Equity Purchase Price                    $  800,000
Plus: Capitalized Transaction Costs      $   10,000
----------------------------------------
Total Consideration                      $  810,000

Fair Value of Net Assets:
  Historical Equity                      $  150,000
  Plus: Net Purchase Accounting Adj.     $  315,000
----------------------------------------
Fair Value of Net Assets                 $  465,000

Goodwill                                 $  345,000
```

**Step 6: Construct Closing Balance Sheet**

Now assemble the complete closing balance sheet:

```
CLOSING BALANCE SHEET
=====================

ASSETS
----------------------------------------
Cash                             $   40,000  (1)
Accounts Receivable              $  120,000
Inventory                        $   90,000  (2)
Prepaid Expenses                 $   15,000
Property, Plant & Equipment      $  350,000  (3)
Intangible Assets               $  385,000  (4)
Goodwill                        $  345,000  (5)
Other Assets                    $   20,000
----------------------------------------
Total Assets                    $1,365,000

LIABILITIES
----------------------------------------
Accounts Payable                $   70,000
Accrued Expenses                $   45,000
Deferred Revenue                $   35,000  (6)
Deferred Tax Liability          $  125,000  (7)
Unfavorable Lease Liability     $   10,000  (8)
Term Loan B                     $  400,000  (9)
Second Lien                     $  100,000  (9)
Other Liabilities               $   30,000
----------------------------------------
Total Liabilities               $  815,000

EQUITY
----------------------------------------
Common Stock / Contributed Cap  $  350,000  (10)
Retained Earnings               $  200,000  (11)
----------------------------------------
Total Equity                    $  550,000

Total Liabilities + Equity      $1,365,000
```

**Notes:**
1. Cash: Historical cash adjusted for transaction flows
2. Inventory: Historical $80K + $10K write-up
3. PP&E: Historical $300K + $50K write-up
4. Intangibles: Historical $35K + $5K write-up + $200K + $80K + $50K + $15K new
5. Goodwill: Calculated above
6. Deferred Revenue: Historical $50K - $15K haircut
7. DTL: Historical $25K + $100K purchase accounting
8. Unfavorable Lease: New liability from purchase accounting
9. New debt from Sources
10. Sponsor Equity $300K + Rollover $50K
11. Retained Earnings: This reflects the balance needed to balance; in practice, opening retained earnings after purchase accounting is often restated

### Verifying Balance Sheet Integrity

After constructing the closing balance sheet, verify that it is correct:

**Check 1: Assets = Liabilities + Equity**

This is the fundamental accounting equation. Include a check cell:
```
=IF(ABS(TotalAssets - TotalLiabilitiesEquity) < 0.01, "Balanced", "ERROR")
```

**Check 2: Sources = Uses**

Verify that your Sources and Uses schedule balances. This should be checked before constructing the balance sheet.

**Check 3: Goodwill Calculation Ties**

Verify that the goodwill on the balance sheet matches the calculated goodwill from purchase accounting. These should be linked, not separately calculated.

**Check 4: Debt Ties to Sources**

Verify that total debt on the closing balance sheet equals total debt in Sources. Any discrepancies indicate an error.

**Check 5: Equity Ties to Sources**

Verify that contributed equity ties to the equity section of Sources. The rollover equity should also be explicitly shown.

### Common Closing Balance Sheet Issues

**Imbalance Issues:**

If the balance sheet does not balance, systematically check:
- Are all purchase accounting adjustments included?
- Is the deferred tax impact calculated correctly?
- Does goodwill flow from the PPA schedule?
- Is equity correctly calculated?

**Cash Discrepancies:**

The cash balance at closing depends on transaction mechanics:
- Some transactions close with a specified minimum cash
- Transaction fees and financing fees consume cash
- Working capital adjustments affect cash

Model cash explicitly from Sources and Uses. Cash at closing = cash funded - cash used for fees - cash paid for WC shortfall + excess cash from operations.

**Debt Presentation:**

Show debt at face value. If OID is significant, you may show it as a contra-liability (reducing the debt balance) or as a separate asset (deferred financing cost) depending on presentation preference under current accounting standards.

**Deferred Taxes:**

The deferred tax calculation must be consistent with the tax rate used elsewhere in the model. If any items create deferred tax assets (rather than liabilities), show them separately or net.

### Linking to Projections

The closing balance sheet serves as Year 0 for projections. Every projected balance sheet builds from this starting point:

**Cash:** Closing cash + Free Cash Flow - Debt Payments ± Other Items = Year 1 Cash

**Receivables:** Closing AR × (1 + Revenue Growth) × (New DSO / Old DSO) = Year 1 AR

**PP&E:** Closing PP&E + Capex - Depreciation = Year 1 PP&E

**Debt:** Closing Debt - Mandatory Amortization - Optional Prepayment = Year 1 Debt

**Retained Earnings:** Closing RE + Net Income - Dividends = Year 1 RE

These linkages ensure that the projection period balance sheet is fully integrated with the closing balance sheet. Any error in closing balances propagates through all projections.

### Interview Application

In interviews, you may be asked to construct or explain the closing balance sheet:

"Walk me through how you build the closing balance sheet in an LBO."

"I start with the target's historical balance sheet. I remove the existing capital structure—the debt being refinanced and the equity being cashed out. Then I apply purchase accounting adjustments: fair value write-ups for assets like inventory and PP&E, recognition of intangible assets like customer relationships and technology, and the resulting deferred tax liability. I add the new capital structure from Sources and Uses—the new debt tranches and the sponsor equity. Finally, I calculate goodwill as the purchase price minus the fair value of identifiable net assets and record it as an asset. The balance sheet must balance: total assets equal total liabilities plus the new equity."

This response demonstrates systematic thinking and comprehensive understanding of the mechanics.

## Video Placeholder

**Video Title**: Building the Closing Balance Sheet

**Outline**:
- Why the closing balance sheet is the foundation for all projections
- The conceptual framework: historical BS, remove old cap structure, apply purchase accounting, add new cap structure, record goodwill
- Step-by-step construction with detailed example
- Verifying balance sheet integrity: five key checks
- Common issues: imbalances, cash discrepancies, debt presentation, deferred taxes
- Linking the closing balance sheet to projections
- Interview walkthrough of closing balance sheet construction

**Suggested Length**: 18 minutes

## Key Takeaways

- The closing balance sheet represents the company's financial position immediately after the LBO closes—it is the foundation for all projections
- Construction follows a logical sequence: historical balance sheet, remove old capital structure, apply purchase accounting, add new capital structure, record goodwill
- Purchase accounting adjustments include asset write-ups, new intangible assets, and deferred tax liabilities; goodwill is the residual that makes the balance sheet balance
- Verify integrity through systematic checks: balance sheet equation, Sources = Uses, goodwill ties to PPA, debt ties to Sources, equity ties to Sources
- Common issues include imbalances (usually missing adjustments or DTL errors), cash discrepancies, and debt presentation questions
- The closing balance sheet directly links to all projected balance sheets—Year 0 balances roll forward through each projection period

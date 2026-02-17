---
id: excel-goodwill-walkthrough
title: Excel Walkthrough - Goodwill Calculation
order: 14
estimated_minutes: 25
---

# Excel Walkthrough - Goodwill Calculation

## Learning Objectives

- Build a complete goodwill calculation in Excel from Sources and Uses through purchase accounting
- Create a purchase price allocation schedule that ties to the opening balance sheet
- Link goodwill calculations to other model sections for full integration
- Develop the mechanical skills to calculate goodwill accurately in interview settings

## Written Guide

### Setting Up the Goodwill Calculation

Building a goodwill calculation in Excel requires connecting multiple sections of your LBO model. The process flows logically: Sources and Uses determines the purchase price, purchase accounting adjustments modify the asset and liability values, and goodwill emerges as the residual. This walkthrough demonstrates the mechanical steps and key linkages.

The goodwill calculation should be built in a dedicated section of your model, clearly labeled and organized. It serves as the bridge between the transaction terms (Sources and Uses) and the opening balance sheet.

### Step 1: Pull in the Purchase Price

The starting point is the equity purchase price from Sources and Uses. Create a section that references this value:

```
PURCHASE PRICE ALLOCATION
=========================

Equity Purchase Price          =S&U!EquityPurchasePrice    $ 600,000
Plus: Transaction Fees (Capitalized)    =S&U!CapitalizedFees        $  15,000
----------------------------------------------------------------------
Total Consideration                                        $ 615,000
```

Note that certain transaction fees may be capitalized into the acquisition basis and increase goodwill. Under ASC 805, acquirer transaction costs are generally expensed, but the treatment depends on the specific nature of the costs. Consult the accounting treatment and model accordingly.

### Step 2: Build the Historical Balance Sheet

Input or link the target's historical balance sheet immediately before the acquisition. This provides the baseline for purchase accounting adjustments:

```
HISTORICAL BALANCE SHEET (Pre-Acquisition)
==========================================

ASSETS                           Book Value
----------------------------------------------
Cash                              $  30,000
Accounts Receivable               $  70,000
Inventory                         $  40,000
Prepaid Expenses                  $   8,000
Property, Plant & Equipment       $ 150,000
Existing Intangibles             $  20,000
Other Assets                      $  12,000
----------------------------------------------
Total Assets                      $ 330,000

LIABILITIES
----------------------------------------------
Accounts Payable                  $  40,000
Accrued Expenses                  $  25,000
Deferred Revenue                  $  30,000
Deferred Tax Liability            $  15,000
Existing Debt                     $ 150,000
----------------------------------------------
Total Liabilities                 $ 260,000

Shareholders' Equity              $  70,000
----------------------------------------------
Total Liabilities + Equity        $ 330,000
```

### Step 3: Create the Fair Value Adjustment Schedule

Build a schedule that captures each purchase accounting adjustment:

```
FAIR VALUE ADJUSTMENTS
======================

                              Book Value    Fair Value    Adjustment
----------------------------------------------------------------------
Inventory                      $ 40,000      $ 45,000      $  5,000
Property, Plant & Equipment    $150,000      $180,000      $ 30,000
Existing Intangibles          $ 20,000      $ 25,000      $  5,000

Identified Intangible Assets (New):
Customer Relationships            -         $120,000      $120,000
Developed Technology             -         $ 50,000      $ 50,000
Trade Name                       -         $ 30,000      $ 30,000
Backlog                          -         $  8,000      $  8,000
----------------------------------------------------------------------
Total Asset Fair Value Adj.                              $248,000

Liabilities:
Deferred Revenue Haircut      $ 30,000      $ 22,000      $ (8,000)
Unfavorable Lease Liability       -         $  5,000      $  5,000
----------------------------------------------------------------------
Total Liability Fair Value Adj.                          $ (3,000)

Net Asset Fair Value Adjustment                          $251,000
```

The deferred revenue haircut reduces the liability (which increases net assets). Think of it this way: the company has an obligation to deliver services to customers who prepaid. The fair value of that obligation is the cost to fulfill it, not the revenue that will be recognized. This typically creates a reduction in deferred revenue.

### Step 4: Calculate Deferred Tax Impact

Fair value adjustments create temporary differences between book and tax basis, generating deferred taxes:

```
DEFERRED TAX CALCULATION
========================

Tax Rate:                                           25.0%

Fair Value Adjustments Creating DTL:
  Inventory write-up                  $  5,000
  PP&E write-up                       $ 30,000
  Intangible assets created           $208,000
  Existing intangible write-up        $  5,000
----------------------------------------------------------------------
  Total Adjustments Creating DTL      $248,000

Deferred Tax Liability Created:       $248,000 × 25% = $ 62,000

Fair Value Adjustments Creating DTA:
  Deferred revenue haircut            $  8,000
----------------------------------------------------------------------
Deferred Tax Asset Created:           $  8,000 × 25% = $  2,000

Net Deferred Tax Liability Created:   $62,000 - $2,000 = $ 60,000
```

This $60,000 deferred tax liability reduces the fair value of net assets acquired.

### Step 5: Calculate Fair Value of Net Assets

Now sum up the fair value of identifiable net assets:

```
FAIR VALUE OF IDENTIFIABLE NET ASSETS
=====================================

Historical Shareholders' Equity               $  70,000
Plus: Net Asset Fair Value Adjustment        $ 251,000
Less: Net Deferred Tax Liability Created     $ (60,000)
Less: Existing Debt (assumed or refinanced)  $      -0 *
----------------------------------------------------------------------
Fair Value of Identifiable Net Assets        $ 261,000

* Existing debt is typically refinanced and does not affect this calc
```

Alternatively, you can build this by summing fair value of all assets minus fair value of all liabilities, excluding debt. Both approaches should yield the same result.

### Step 6: Calculate Goodwill

With total consideration and fair value of net assets, calculate goodwill:

```
GOODWILL CALCULATION
====================

Total Consideration                          $ 615,000
Less: Fair Value of Identifiable Net Assets  $(261,000)
----------------------------------------------------------------------
Goodwill                                     $ 354,000
```

This goodwill amount flows to the opening balance sheet as a new asset.

### Step 7: Build the Opening Balance Sheet

The opening balance sheet reflects all purchase accounting adjustments:

```
OPENING BALANCE SHEET (Post-Acquisition)
========================================

ASSETS
----------------------------------------------
Cash                              $  30,000
Accounts Receivable               $  70,000
Inventory                         $  45,000   (written up)
Prepaid Expenses                  $   8,000
Property, Plant & Equipment       $ 180,000   (written up)
Intangible Assets                 $ 233,000   (existing + new)
Goodwill                          $ 354,000   (new)
Other Assets                      $  12,000
----------------------------------------------
Total Assets                      $ 932,000

LIABILITIES
----------------------------------------------
Accounts Payable                  $  40,000
Accrued Expenses                  $  25,000
Deferred Revenue                  $  22,000   (haircut)
Deferred Tax Liability            $  75,000   (increased)
Unfavorable Lease Liability       $   5,000   (new)
New Debt (from Sources)           $ 400,000   (new financing)
----------------------------------------------
Total Liabilities                 $ 567,000

EQUITY
----------------------------------------------
Common Stock / Contributed Capital $ 365,000   (from Sources)
Retained Earnings                 $       0
----------------------------------------------
Total Equity                      $ 365,000

Total Liabilities + Equity        $ 932,000
```

The balance sheet must balance. Total Assets ($932,000) equals Total Liabilities ($567,000) plus Equity ($365,000).

### Excel Best Practices for Goodwill Calculations

**Clear Labeling:** Label each section clearly. Use headers that describe what the section calculates.

**Source References:** Include cell references back to Sources and Uses and the historical financial statements. Anyone reviewing should be able to trace every number.

**Balance Check:** Include a balance check that flags if the opening balance sheet does not balance:

```
Balance Check: =IF(ABS(TotalAssets-TotalLiabEquity)<0.01,"OK","ERROR")
```

**Sensitivity Linkage:** If your model includes sensitivity analysis, link the goodwill calculation so it updates automatically when assumptions change.

**Tax Rate Consistency:** Use a single tax rate cell referenced throughout. If the tax rate changes, the deferred tax calculations should update automatically.

### Common Errors to Avoid

**Double-Counting Debt:** Existing debt is typically refinanced and replaced. Do not include it in both the historical balance sheet and new financing.

**Missing DTL:** Every fair value adjustment to an asset or liability creates a deferred tax impact. Forgetting the DTL understates goodwill.

**Wrong Sign on Deferred Revenue:** The deferred revenue haircut reduces the liability, which increases net assets. Ensure the signs are correct.

**Forgetting Capitalized Fees:** Certain transaction costs may increase the purchase price for goodwill purposes. Review the accounting treatment.

**Intangibles Not Netting Out:** The existing intangibles on the historical balance sheet may need to be written off and replaced with new fair values. Ensure you are not double-counting.

### Interview Application

In interviews, you may be asked to calculate goodwill on paper or whiteboard. The verbal walkthrough should follow this logical flow:

"Goodwill equals total consideration minus the fair value of identifiable net assets. I would start with the equity purchase price, add any capitalized fees, and that gives me total consideration. Then I would take the historical book equity, add fair value adjustments for inventory, PP&E, and identified intangibles—things like customer relationships and technology. I would subtract the deferred tax liability created by these adjustments. The result is fair value of net assets. Goodwill is the difference between consideration and fair value of net assets."

This demonstrates both conceptual understanding and mechanical competence.

## Video Placeholder

**Video Title**: Excel Walkthrough - Building the Goodwill Calculation

**Outline**:
- Setting up the goodwill calculation section in your model
- Step 1: Reference purchase price from Sources and Uses
- Step 2: Input historical balance sheet
- Step 3: Build fair value adjustment schedule
- Step 4: Calculate deferred tax impact of adjustments
- Step 5: Sum to fair value of identifiable net assets
- Step 6: Calculate goodwill as the residual
- Step 7: Construct the opening balance sheet
- Excel best practices: labeling, references, balance checks
- Common errors and how to avoid them

**Suggested Length**: 15 minutes

## Key Takeaways

- The goodwill calculation flows from Sources and Uses (purchase price) through purchase accounting adjustments to the opening balance sheet
- Fair value adjustments include asset write-ups (inventory, PP&E) and recognition of new intangibles (customer relationships, technology, trade names)
- Every fair value adjustment creates a deferred tax impact that must be calculated and reduces fair value of net assets
- Goodwill = Total Consideration - Fair Value of Identifiable Net Assets
- The opening balance sheet must balance: new debt and equity (from Sources) replace old debt and equity; goodwill is the new asset that makes it balance
- Include balance checks in your Excel model and verify that the opening balance sheet ties before proceeding with projections

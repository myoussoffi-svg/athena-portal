---
id: model-checks-and-stress-testing
title: Model Checks and Stress Testing
order: 7
estimated_minutes: 35
---

# Model Checks and Stress Testing

## Learning Objectives

- Build error checks that catch common modeling mistakes
- Create sensitivity tables to test key assumptions
- Develop scenarios that stress test the model under different conditions
- Understand how to present model outputs and sensitivities

## Written Guide

### Why Checks and Stress Testing Matter

A model is only useful if it's accurate and if you understand how sensitive the outputs are to key assumptions. Model checks catch errors before they corrupt your analysis. Stress testing reveals how the business performs under different conditions.

In investment banking, presenting a model without sensitivities is incomplete. Clients and investment committees want to understand the range of possible outcomes.

### Essential Model Checks

Build these checks into every model:

**1. Balance Sheet Balance Check**

```
Balance Check = Total Assets - Total Liabilities - Total Equity
```

Should equal zero. Format the cell to turn red if non-zero.

**2. Cash Reconciliation Check**

```
Cash Check = Balance Sheet Cash - (Beginning Cash + Net Change in Cash)
```

Should equal zero. Ensures the cash flow statement reconciles to the balance sheet.

**3. Debt Balance Checks**

```
Revolver Check = IF(Revolver Balance > Revolver Capacity, "ERROR", "OK")
Negative Debt Check = IF(MIN(All Debt Balances) < 0, "ERROR", "OK")
```

Debt can't exceed facility limits or go negative.

**4. Circular Reference Check**

If using iterative calculations:
```
Circular Check = IF(ABS(Prior Iteration Value - Current Value) > 0.01, "NOT CONVERGED", "OK")
```

Ensures the circular formulas have stabilized.

**5. Growth Rate Reasonableness**

```
Revenue Growth Check = IF(OR(Growth < -0.20, Growth > 0.50), "CHECK", "OK")
```

Flags unusual growth assumptions for review.

**6. Margin Checks**

```
Gross Margin Check = IF(OR(GM < 0, GM > 1), "ERROR", "OK")
EBITDA Margin Check = IF(EBITDA Margin > Gross Margin, "ERROR", "OK")
```

Margins should be within logical ranges.

### Creating a Check Summary

Consolidate all checks on a summary tab or section:

```calculation
title: Model Check Summary Dashboard
given:
  - "All individual checks feed into a consolidated summary"
steps:
  - "Balance Sheet Balances: OK"
  - "Cash Reconciliation: OK"
  - "Revolver Not Exceeded: OK"
  - "No Negative Debt: OK"
  - "Circularity Converged: OK"
result: "Overall Status = ALL CLEAR"
note: "Use conditional formatting: Green = OK, Red = ERROR, Yellow = CHECK (review needed)"
```

Use conditional formatting:
- Green = OK
- Red = ERROR
- Yellow = CHECK (review needed)

Create a master check that shows "ERROR" if any individual check fails:

```
=IF(COUNTIF(CheckRange, "ERROR") > 0, "ERROR", IF(COUNTIF(CheckRange, "CHECK") > 0, "CHECK", "OK"))
```

### Sensitivity Analysis

Sensitivity analysis shows how outputs change when you vary one or two inputs. The most common format is the **data table**.

**One-Way Sensitivity Table**

Shows output values across a range of one input:

```calculation
title: One-Way Sensitivity - Revenue Growth vs. Implied Share Price
given:
  - "Input varied: Revenue Growth"
  - "Output measured: Implied Share Price"
steps:
  - "Revenue Growth 2%: Implied Share Price = $18"
  - "Revenue Growth 4%: Implied Share Price = $22"
  - "Revenue Growth 6%: Implied Share Price = $26"
  - "Revenue Growth 8%: Implied Share Price = $30"
  - "Revenue Growth 10%: Implied Share Price = $34"
result: "Share price ranges from $18 to $34 across revenue growth assumptions"
```

**Two-Way Sensitivity Table**

Shows outputs across two inputs simultaneously:

```calculation
title: Two-Way Sensitivity - WACC vs. Terminal Growth Rate (Implied Share Price)
given:
  - "Row input: Terminal Growth Rate (1.5% to 3.0%)"
  - "Column input: WACC (8% to 12%)"
  - "Output: Implied Share Price ($)"
steps:
  - "Terminal Growth 1.5%: WACC 8% = $32 | 9% = $29 | 10% = $26 | 11% = $24 | 12% = $22"
  - "Terminal Growth 2.0%: WACC 8% = $35 | 9% = $31 | 10% = $28 | 11% = $25 | 12% = $23"
  - "Terminal Growth 2.5%: WACC 8% = $38 | 9% = $34 | 10% = $30 | 11% = $27 | 12% = $24"
  - "Terminal Growth 3.0%: WACC 8% = $42 | 9% = $37 | 10% = $32 | 11% = $29 | 12% = $26"
result: "DCF value ranges from $22 (high WACC, low growth) to $42 (low WACC, high growth)"
```

This shows how DCF value changes with different WACC and terminal growth combinations.

### Building Data Tables in Excel

**One-Way Table**:
1. Create a row or column of input values
2. In the adjacent cell, reference your output formula
3. Select the entire table range
4. Go to Data → What-If Analysis → Data Table
5. For a row table: enter the column input cell
6. For a column table: enter the row input cell

**Two-Way Table**:
1. Create a row of values for one input, column of values for another
2. In the corner cell, reference your output formula
3. Select the entire table range
4. Data → What-If Analysis → Data Table
5. Enter both row and column input cells

### Key Sensitivities by Model Type

**DCF Model**:
- WACC vs. Terminal Growth Rate → Enterprise Value
- Revenue Growth vs. EBITDA Margin → Enterprise Value

**LBO Model**:
- Entry Multiple vs. Exit Multiple → IRR
- Revenue Growth vs. EBITDA Margin → IRR
- Leverage (Debt/EBITDA) vs. Exit Multiple → IRR

**M&A Model**:
- Exchange Ratio vs. Synergies → Accretion/Dilution
- Purchase Price vs. Synergies → Accretion/Dilution

### Scenario Analysis

While sensitivity tables vary one or two inputs, **scenario analysis** changes multiple inputs simultaneously to model different futures.

**Common Scenarios**:

```calculation
title: Scenario Analysis - Key Assumptions
given:
  - "Three scenarios modeled: Base Case, Upside, and Downside"
steps:
  - "Revenue Growth: Base = 5% | Upside = 8% | Downside = 2%"
  - "EBITDA Margin: Base = 20% | Upside = 22% | Downside = 17%"
  - "CapEx % of Revenue: Base = 4% | Upside = 4% | Downside = 5%"
  - "Exit Multiple: Base = 8.0x | Upside = 9.0x | Downside = 7.0x"
result: "Upside assumes stronger growth and margins; Downside assumes weaker growth with higher CapEx intensity"
```

**Outputs by Scenario**:

```calculation
title: Scenario Analysis - Output Comparison
given:
  - "Scenarios: Base, Upside, Downside"
steps:
  - "Exit Equity Value: Base = $500M | Upside = $680M | Downside = $320M"
  - "IRR: Base = 22% | Upside = 28% | Downside = 14%"
  - "MOIC: Base = 2.5x | Upside = 3.2x | Downside = 1.8x"
result: "IRR ranges from 14% (Downside) to 28% (Upside) with a Base Case of 22%"
```

### Building a Scenario Toggle

Create a scenario selector that changes multiple assumptions at once:

**Step 1**: Set up a scenario table with all assumptions:

```calculation
title: Scenario Toggle - Assumptions Setup
given:
  - "Scenarios: Base, Upside, Downside"
steps:
  - "Rev Growth: Base = 5% | Upside = 8% | Downside = 2%"
  - "EBITDA Margin: Base = 20% | Upside = 22% | Downside = 17%"
result: "Each assumption has a value defined for every scenario"
```

**Step 2**: Create a selector cell (dropdown with "Base", "Upside", "Downside")

**Step 3**: Use INDEX/MATCH to pull the active assumption:

```
Active Rev Growth = INDEX(ScenarioTable, MATCH("Rev Growth", Assumptions, 0), MATCH(Selector, ScenarioHeaders, 0))
```

**Step 4**: Reference active assumptions throughout the model

Now changing the selector updates all assumptions simultaneously.

### Stress Testing

Stress tests push the model to extremes to understand breaking points:

**Questions to Answer**:
- At what revenue decline does the company breach debt covenants?
- How much can EBITDA fall before the company can't cover interest?
- What leverage level causes IRR to fall below hurdle rate?

**Example: Covenant Breach Analysis**

If the debt covenant requires Debt/EBITDA < 5.0×:

```calculation
title: Stress Test - Covenant Breach Analysis
given:
  - "Debt Covenant Requirement: Debt/EBITDA < 5.0x"
steps:
  - "EBITDA Decline 0%: Debt/EBITDA = 4.0x -> Covenant Status: OK"
  - "EBITDA Decline 10%: Debt/EBITDA = 4.4x -> Covenant Status: OK"
  - "EBITDA Decline 20%: Debt/EBITDA = 5.0x -> Covenant Status: At Limit"
  - "EBITDA Decline 25%: Debt/EBITDA = 5.3x -> Covenant Status: BREACH"
result: "The company can sustain up to a 20% EBITDA decline before breaching covenants"
```

The company can sustain a 20% EBITDA decline before breaching covenants.

### Presenting Model Outputs

When presenting analysis, include:

**1. Summary Output Page**
- Key metrics at a glance (EV, equity value, IRR, credit ratios)
- Formatted cleanly with clear labels

**2. Sensitivity Tables**
- Show the range of possible outcomes
- Highlight the base case within the table

**3. Scenario Comparison**
- Side-by-side comparison of base, upside, downside
- Include both inputs and outputs

**4. Key Assumptions Summary**
- List the major assumptions driving the analysis
- Allows readers to understand and challenge inputs

### Model Audit Best Practices

Before finalizing a model:

1. **Check all error flags**: Ensure every check shows OK
2. **Trace key formulas**: Use Excel's formula auditing to verify logic
3. **Test extremes**: Enter very high and low values to see if the model breaks
4. **Compare to prior versions**: If updating a model, compare outputs to catch errors
5. **Have someone else review**: Fresh eyes catch mistakes you've become blind to


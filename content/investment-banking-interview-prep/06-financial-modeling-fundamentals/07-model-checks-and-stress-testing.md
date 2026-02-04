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

| Check | Status |
|-------|--------|
| Balance Sheet Balances | OK |
| Cash Reconciliation | OK |
| Revolver Not Exceeded | OK |
| No Negative Debt | OK |
| Circularity Converged | OK |
| **Overall Status** | **ALL CLEAR** |

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

| Revenue Growth | 2% | 4% | 6% | 8% | 10% |
|----------------|----|----|----|----|-----|
| **Implied Share Price** | $18 | $22 | $26 | $30 | $34 |

**Two-Way Sensitivity Table**

Shows outputs across two inputs simultaneously:

| | **WACC** |
| **Terminal Growth** | 8% | 9% | 10% | 11% | 12% |
|---------------------|----|----|-----|-----|-----|
| 1.5% | $32 | $29 | $26 | $24 | $22 |
| 2.0% | $35 | $31 | $28 | $25 | $23 |
| 2.5% | $38 | $34 | $30 | $27 | $24 |
| 3.0% | $42 | $37 | $32 | $29 | $26 |

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

| Assumption | Base Case | Upside | Downside |
|------------|-----------|--------|----------|
| Revenue Growth | 5% | 8% | 2% |
| EBITDA Margin | 20% | 22% | 17% |
| CapEx % of Revenue | 4% | 4% | 5% |
| Exit Multiple | 8.0× | 9.0× | 7.0× |

**Outputs by Scenario**:

| Metric | Base | Upside | Downside |
|--------|------|--------|----------|
| Exit Equity Value | $500M | $680M | $320M |
| IRR | 22% | 28% | 14% |
| MOIC | 2.5× | 3.2× | 1.8× |

### Building a Scenario Toggle

Create a scenario selector that changes multiple assumptions at once:

**Step 1**: Set up a scenario table with all assumptions:

| Assumption | Base | Upside | Downside |
|------------|------|--------|----------|
| Rev Growth | 5% | 8% | 2% |
| EBITDA Margin | 20% | 22% | 17% |

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

| EBITDA Decline | Debt/EBITDA | Covenant Status |
|----------------|-------------|-----------------|
| 0% | 4.0× | OK |
| 10% | 4.4× | OK |
| 20% | 5.0× | At Limit |
| 25% | 5.3× | BREACH |

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

## Video Placeholder

**Video Title**: Model Checks, Sensitivities, and Stress Testing

**Outline**:
- Essential error checks (balance sheet, cash, debt)
- Creating a check summary dashboard
- Building one-way and two-way sensitivity tables
- Key sensitivities for DCF, LBO, and M&A models
- Scenario analysis with toggle selectors
- Stress testing to find breaking points
- Presenting outputs effectively

**Suggested Length**: 18 minutes

## Key Takeaways

- Build error checks for balance sheet balance, cash reconciliation, debt limits, and circularity
- Create a check summary that shows overall model health at a glance
- Sensitivity tables show how outputs vary with one or two inputs—essential for any analysis
- Key DCF sensitivities: WACC and terminal growth; key LBO sensitivities: entry/exit multiples and leverage
- Scenario analysis changes multiple inputs simultaneously to model different futures
- Use a scenario toggle (dropdown) to switch between base, upside, and downside cases
- Stress tests identify breaking points—where covenants breach or returns become unacceptable
- Always present sensitivities alongside point estimates; ranges are more informative than single numbers

---
id: forecasting-revenue-and-costs
title: Forecasting Revenue and Costs
order: 2
estimated_minutes: 40
---

# Forecasting Revenue and Costs

## Learning Objectives

- Develop revenue forecasts using appropriate drivers and methodologies
- Build cost projections that reflect operating leverage and margin dynamics
- Understand the difference between top-down and bottom-up forecasting
- Create a complete projected income statement from revenue through net income

## Written Guide

### The Goal of Forecasting

Forecasting isn't about predicting the future perfectly—it's about building a reasonable base case and understanding how changes in assumptions affect outcomes. A good forecast is:

- **Grounded in historical performance**: Past results inform future expectations
- **Consistent with industry dynamics**: Growth rates and margins should make sense for the sector
- **Internally coherent**: Revenue, costs, and capital needs should relate logically

### Revenue Forecasting Approaches

**Top-Down Forecasting**

Start with the overall market and work down to the company:

1. Estimate total addressable market (TAM) size
2. Project market growth rate
3. Estimate the company's market share
4. Calculate revenue as: Market Size × Market Share

This approach works well for companies in defined markets where industry data is available.

**Bottom-Up Forecasting**

Build revenue from operational drivers:

- **Volume × Price**: Units sold × average selling price
- **Customers × Revenue per Customer**: User count × ARPU (average revenue per user)
- **Capacity × Utilization × Rate**: For asset-heavy businesses like airlines or hotels

Bottom-up is more granular and often more accurate, but requires operational data.

**Growth Rate Approach**

The simplest method: apply a growth rate to prior-year revenue.

Revenue(Year N) = Revenue(Year N-1) × (1 + Growth Rate)

This works for mature, stable businesses. The key is selecting appropriate growth rates based on:

- Historical growth trends
- Management guidance
- Industry growth expectations
- Competitive dynamics

### Building the Revenue Forecast

**Step 1: Analyze Historical Revenue**

Look at 3-5 years of history:

- What's the compound annual growth rate (CAGR)?
- Is growth accelerating, stable, or decelerating?
- Are there one-time items affecting comparability?
- How does growth compare to industry peers?

**Step 2: Segment Revenue (if applicable)**

Many companies report revenue by:

- Product line
- Geography
- Customer type
- Business segment

Forecast each segment separately, then sum to total. Different segments often have different growth profiles.

**Step 3: Select Drivers and Assumptions**

For each segment or the total, decide:

- What drives revenue? (price, volume, market share, etc.)
- What growth rate is appropriate for each forecast year?
- Should growth rates change over time? (e.g., decelerate as company matures)

**Step 4: Build the Projection**

Create a row for each revenue line item. Apply growth rates or driver calculations to project each year.

**Example**:

```calculation
title: Revenue Forecast with Decelerating Growth
given:
  - "Year 1 (Actual) Revenue: $500M"
  - "Year 2 (Actual) Revenue: $540M (8.0% growth)"
steps:
  - "Year 3 Revenue: $540M x 1.06 = $572M (6.0% growth)"
  - "Year 4 Revenue: $572M x 1.05 = $601M (5.0% growth)"
  - "Year 5 Revenue: $601M x 1.04 = $625M (4.0% growth)"
result: "Year 5 Revenue = $625M"
note: "Growth decelerates over time—common for maturing businesses."
```

Notice growth decelerates over time—common for maturing businesses.

### Cost Forecasting: Fixed vs. Variable

Understanding cost behavior is essential for projecting expenses:

**Variable Costs**: Scale with revenue
- Cost of goods sold (COGS)
- Sales commissions
- Shipping and fulfillment

Project as a percentage of revenue (gross margin assumption).

**Fixed Costs**: Don't change with revenue (in the short term)
- Rent
- Base salaries
- Insurance

Project as flat amounts or with inflation adjustments.

**Semi-Variable Costs**: Have both fixed and variable components
- Utilities (base charge + usage)
- Labor (base staff + overtime)

Project with a fixed base plus a variable component.

### Building the Cost Forecast

**Cost of Goods Sold (COGS)**

COGS represents the direct costs of producing goods or delivering services. Project using gross margin:

COGS = Revenue × (1 - Gross Margin %)

Or equivalently:

Gross Profit = Revenue × Gross Margin %
COGS = Revenue - Gross Profit

**Historical Analysis**: Look at gross margin trends. Is the company gaining efficiency (margin expanding) or facing cost pressures (margin contracting)?

**Projection Approach**: Often hold gross margin constant or adjust slightly based on expected trends.

```calculation
title: COGS and Gross Profit Projection
given:
  - "Revenue: $500M (Y1), $540M (Y2), $572M (Y3), $601M (Y4), $625M (Y5)"
  - "Gross Margin: 40.0% (Y1), 40.5% (Y2), 41.0% (Y3-Y5)"
steps:
  - "Year 1: Gross Profit = $500M x 40.0% = $200M, COGS = $300M"
  - "Year 2: Gross Profit = $540M x 40.5% = $219M, COGS = $321M"
  - "Year 3: Gross Profit = $572M x 41.0% = $235M, COGS = $338M"
  - "Year 4: Gross Profit = $601M x 41.0% = $246M, COGS = $355M"
  - "Year 5: Gross Profit = $625M x 41.0% = $256M, COGS = $369M"
result: "Gross Margin expands from 40.0% to 41.0% over the forecast period"
```

**Operating Expenses (OpEx)**

Operating expenses include SG&A (selling, general & administrative), R&D, and other operating costs. Common projection methods:

1. **Percentage of Revenue**: Assume OpEx grows proportionally with revenue
2. **Fixed + Variable**: Separate fixed costs from variable costs
3. **Line-by-Line**: Forecast each expense category individually

**Operating Leverage**: As revenue grows, fixed costs become a smaller percentage of revenue, expanding operating margins. This is why high-growth companies often show margin expansion.

**Example with Operating Leverage**:

```calculation
title: Operating Leverage Example
given:
  - "Fixed Costs: $30M per year (constant)"
  - "Variable Costs: 20% of Revenue"
steps:
  - "Year 1: Revenue = $100M, Fixed = $30M, Variable = $20M, Total OpEx = $50M (50.0% of Rev)"
  - "Year 2: Revenue = $120M, Fixed = $30M, Variable = $24M, Total OpEx = $54M (45.0% of Rev)"
  - "Year 3: Revenue = $140M, Fixed = $30M, Variable = $28M, Total OpEx = $58M (41.4% of Rev)"
result: "OpEx as % of Revenue declines from 50.0% to 41.4%"
note: "The OpEx percentage declines as revenue scales over the fixed cost base."
```

The OpEx percentage declines as revenue scales over the fixed cost base.

### From Gross Profit to EBIT

The income statement flows:

```
Revenue
- COGS
= Gross Profit
- SG&A
- R&D
- Other Operating Expenses
= EBIT (Operating Income)
```

**EBIT Margin** = EBIT / Revenue

EBIT margin combines gross margin and operating efficiency. It's a key metric for comparing profitability across companies (since it's before interest and taxes).

### Below EBIT: Interest, Taxes, Net Income

**Interest Expense**: Calculated from debt balances (covered in later lesson on debt schedules). For initial projections, you can estimate based on average debt and interest rate.

**Interest Income**: Calculated from cash balances and assumed interest rate on cash.

**Pre-Tax Income** = EBIT - Interest Expense + Interest Income

**Tax Expense**: Apply the effective tax rate to pre-tax income.

Tax Expense = Pre-Tax Income × Tax Rate

Use the statutory rate (e.g., 21% federal + state in the US) or the company's historical effective rate.

**Net Income** = Pre-Tax Income - Tax Expense

### Putting It All Together: Projected Income Statement

```calculation
title: Projected Income Statement (5-Year Forecast)
given:
  - "Base Revenue (Year 1): $500M"
  - "Revenue Growth: 8.0% (Y2), 6.0% (Y3), 5.0% (Y4), 4.0% (Y5)"
  - "Gross Margin: 40.0% (Y1), 40.5% (Y2), 41.0% (Y3-Y5)"
  - "Tax Rate: 25.0% across all years"
steps:
  - "Year 1: Revenue = $500M, COGS = $300M, Gross Profit = $200M"
  - "Year 1: SG&A = $100M (20.0% of Rev), EBIT = $100M (20.0% margin)"
  - "Year 1: Interest Expense = ($10M), Pre-Tax Income = $90M, Tax = ($23M), Net Income = $68M"
  - "Year 2: Revenue = $540M, COGS = $321M, Gross Profit = $219M"
  - "Year 2: SG&A = $105M (19.4% of Rev), EBIT = $114M (21.1% margin)"
  - "Year 2: Interest Expense = ($10M), Pre-Tax Income = $104M, Tax = ($26M), Net Income = $78M"
  - "Year 3: Revenue = $572M, COGS = $338M, Gross Profit = $235M"
  - "Year 3: SG&A = $109M (19.1% of Rev), EBIT = $126M (22.0% margin)"
  - "Year 3: Interest Expense = ($9M), Pre-Tax Income = $117M, Tax = ($29M), Net Income = $88M"
  - "Year 4: Revenue = $601M, COGS = $355M, Gross Profit = $246M"
  - "Year 4: SG&A = $113M (18.8% of Rev), EBIT = $133M (22.1% margin)"
  - "Year 4: Interest Expense = ($8M), Pre-Tax Income = $125M, Tax = ($31M), Net Income = $94M"
  - "Year 5: Revenue = $625M, COGS = $369M, Gross Profit = $256M"
  - "Year 5: SG&A = $116M (18.6% of Rev), EBIT = $140M (22.4% margin)"
  - "Year 5: Interest Expense = ($7M), Pre-Tax Income = $133M, Tax = ($33M), Net Income = $100M"
result: "Net Income grows from $68M to $100M; EBIT Margin expands from 20.0% to 22.4%"
```

### Common Forecasting Mistakes

**Straight-lining everything**: Real businesses don't grow at exactly the same rate forever. Build in deceleration for maturing businesses or acceleration for turnarounds.

**Ignoring operating leverage**: If you project costs as a flat percentage of revenue, you miss the margin expansion that comes from fixed cost leverage.

**Unrealistic margin assumptions**: Compare your projected margins to historical results and peer companies. If your Year 5 EBIT margin is 10 points higher than any competitor, revisit your assumptions.

**Forgetting to stress test**: What happens if revenue growth is 2% instead of 6%? What if gross margin compresses 200 basis points? Run sensitivities to understand risk.

## Video Placeholder

**Video Title**: Building the Projected Income Statement

**Outline**:
- Revenue forecasting approaches (top-down, bottom-up, growth rate)
- Analyzing historical revenue trends
- Projecting COGS and gross margin
- Fixed vs. variable cost behavior and operating leverage
- Building from EBIT through net income
- Common mistakes to avoid

**Suggested Length**: 20 minutes

## Key Takeaways

- Revenue can be forecast top-down (market × share), bottom-up (drivers), or via growth rates
- Analyze 3-5 years of history to understand trends before projecting
- Variable costs scale with revenue; fixed costs create operating leverage as revenue grows
- Project COGS using gross margin assumptions; project OpEx with fixed + variable components
- EBIT margin typically expands as companies scale (operating leverage)
- Interest expense links to debt balances; tax expense uses effective or statutory rate
- Stress test your projections—small changes in assumptions can significantly affect outcomes

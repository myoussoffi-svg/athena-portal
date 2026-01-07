---
id: customer-concentration-cohort-analysis
title: Customer Concentration and Cohort Analysis
order: 2
estimated_minutes: 40
---
# Customer Concentration and Cohort Analysis

## Learning Objectives

- Explain how to assess customer concentration risk by analyzing revenue distribution, contract terms, and customer tenure
- Evaluate customer retention and churn patterns through cohort analysis to determine revenue sustainability
- Develop frameworks for calculating customer lifetime value (LTV), payback periods, and unit economics by segment
- Diagnose red flags in customer data including accelerating churn, declining cohort performance, or hidden concentration
- Structure customer analysis outputs that quantify downside risk, inform valuation haircuts, and identify retention improvement opportunities
- Defend assumptions about customer retention and growth when building financial projections for IC
- Identify when aggregated customer metrics obscure deteriorating performance in specific cohorts or segments

## Written Guide

### Why Customer Analysis is Critical to PE Diligence

Revenue is only valuable if it is retained. A business with $100M in revenue and 30% annual churn is fundamentally different from one with $100M in revenue and 5% churn—even if current-year financials look identical.

Customer concentration and cohort analysis answer critical questions:
- How much revenue is at risk if the top customers leave?
- Are newer customers performing better or worse than older cohorts?
- Is the business retaining customers profitably, or is it a leaky bucket requiring constant acquisition spend?
- What does customer behavior imply about product-market fit, competitive positioning, and long-term sustainability?

Associates who fail to conduct rigorous customer analysis leave IC vulnerable to surprises: key customer losses post-close, retention rates that collapse under new ownership, or cohort performance that deteriorates as the business scales.

### Customer Concentration Risk: Measuring and Assessing

**Requesting customer-level data**:

Your DRL should request:
- "Revenue by customer for FY21–FY23 (top 50 customers at minimum)"
- "Customer contracts for top 20 customers by revenue, including term length, pricing, and termination clauses"
- "Customer tenure (how long each customer has been active) and logo retention rates"

**Building a customer concentration table**:

| Customer | FY23 Revenue | % of Total | Contract Term | Expiration Date | Tenure (Years) |
|----------|--------------|------------|---------------|-----------------|----------------|
| Customer A | $20M       | 20%        | 3-year        | June 2024       | 8              |
| Customer B | $12M       | 12%        | Annual        | Dec 2024        | 5              |
| Customer C | $8M        | 8%         | 2-year        | March 2025      | 3              |
| ...      | ...          | ...        | ...           | ...             | ...            |
| Top 10   | $65M         | 65%        | -             | -               | -              |
| Top 20   | $80M         | 80%        | -             | -               | -              |

**Concentration risk framework**:

- **Low concentration**: No customer >10% of revenue; top 10 customers <40% of revenue
- **Moderate concentration**: 1–2 customers between 10–20%; top 10 customers 40–60%
- **High concentration**: 1 customer >20%; or top 5 customers >50%
- **Extreme concentration**: 1 customer >40%; or business would fail if top customer churned

**Assessing severity**:

Concentration alone is not disqualifying. Assess based on:
1. **Contract protection**: Are top customers locked in with multi-year contracts or at-will?
2. **Tenure and stickiness**: Have top customers been with the business for 5+ years, or are they recent additions?
3. **Switching costs**: How difficult is it for the customer to move to a competitor?
4. **Relationship depth**: Is the relationship with a single buyer, or is the product embedded across the customer's operations?
5. **Customer health**: Is the customer financially stable, or facing distress that could lead to spend cuts?

A customer representing 25% of revenue with a 5-year contract, 10 years of tenure, and deep product integration is less risky than a customer representing 15% of revenue on an annual contract with 18 months of tenure.

**Red flags in customer concentration**:

- Top customer revenue declining year-over-year (may signal dissatisfaction or spend reduction)
- Multiple top customers with contracts expiring within the next 12 months
- Evidence of pricing pressure or rebate increases for top customers
- Lack of contractual protections (month-to-month or evergreen with short notice periods)
- Customer is a competitor's portfolio company (potential conflict or strategic shift)

### Cohort Analysis: Understanding Customer Retention and Performance

Cohort analysis tracks groups of customers acquired in the same period over time. It reveals whether the business is improving at retaining and growing customers, or whether newer cohorts are underperforming.

**Requesting cohort data**:

- "Revenue by customer cohort (grouped by year of acquisition) for FY21–FY23"
- "Logo retention and revenue retention by cohort"
- "Gross revenue retention (GRR) and net revenue retention (NRR) by cohort"

**Building a cohort retention table** (example: SaaS business):

| Cohort (Year Acquired) | Year 0 Revenue | Year 1 Revenue | Year 2 Revenue | Year 3 Revenue | Year 1 Retention % | Year 2 Retention % |
|------------------------|----------------|----------------|----------------|----------------|--------------------|--------------------|
| 2020                   | $5M            | $6M            | $7M            | $8M            | 120%               | 140%               |
| 2021                   | $8M            | $9M            | $10M           | -              | 112%               | 125%               |
| 2022                   | $12M           | $11M           | -              | -              | 92%                | -                  |
| 2023                   | $15M           | -              | -              | -              | -                  | -                  |

**Interpreting cohort performance**:

- **Positive signal**: Newer cohorts (2021, 2022) have higher Year 0 revenue than older cohorts, and retention rates are stable or improving
- **Negative signal**: 2022 cohort has 92% Year 1 retention, down from 112% for 2021 cohort—suggests product-market fit is weakening or customer quality is declining
- **Red flag**: If Year 1 retention drops below 80–85%, the business is losing customers faster than it can replace them, creating a growth treadmill

**Gross vs. Net Revenue Retention**:

- **Gross Revenue Retention (GRR)**: Measures revenue retained from a cohort excluding upsells. 100% GRR means zero churn; 90% GRR means 10% of cohort revenue churned.
- **Net Revenue Retention (NRR)**: Measures revenue retained from a cohort including upsells and expansions. 120% NRR means the cohort grew 20% even after accounting for churn.

Best-in-class SaaS businesses target:
- GRR >90% (low churn)
- NRR >110% (strong expansion revenue)

If the target business has GRR <85% or NRR <100%, this signals retention challenges that require investigation.

### Calculating Customer Lifetime Value (LTV) and Payback Period

**Customer Lifetime Value (LTV)**:

LTV estimates the total gross profit a customer will generate over their lifetime with the business.

**Formula**:
LTV = (Average Revenue per Customer per Year) × (Gross Margin %) × (Average Customer Lifetime in Years)

**Alternative formula (for recurring revenue businesses)**:
LTV = (ARPU × Gross Margin %) / Churn Rate

Where:
- ARPU = Average Revenue per User (monthly or annual)
- Churn Rate = % of customers lost per period

**Example**:
- ARPU: $10,000/year
- Gross Margin: 70%
- Annual Churn: 10%

LTV = ($10,000 × 70%) / 10% = $70,000

This means the average customer generates $70,000 in gross profit over their lifetime.

**Customer Acquisition Cost (CAC)**:

CAC = Total Sales & Marketing Spend / Number of New Customers Acquired

**Example**:
- Sales & marketing spend: $2M/year
- New customers acquired: 200

CAC = $2M / 200 = $10,000

**LTV/CAC Ratio**:

LTV/CAC measures unit economics efficiency:
- **LTV/CAC >3**: Healthy unit economics; business can scale profitably
- **LTV/CAC 1–3**: Marginal unit economics; requires scrutiny
- **LTV/CAC <1**: Unsustainable; losing money on each customer

In the example above, LTV/CAC = $70,000 / $10,000 = 7, indicating strong unit economics.

**CAC Payback Period**:

Payback period measures how long it takes to recover customer acquisition costs.

**Formula**:
CAC Payback = CAC / (ARPU × Gross Margin %)

**Example**:
CAC Payback = $10,000 / ($10,000 × 70%) = $10,000 / $7,000 = 1.4 years

Best-in-class businesses target payback <12 months. Payback >24 months signals capital intensity and cash burn risk.

### Analyzing Churn: Logo Churn vs. Revenue Churn

**Logo Churn**: % of customers lost in a period

**Formula**:
Logo Churn = (Customers Lost / Starting Customers) × 100

**Revenue Churn**: % of revenue lost from existing customers

**Formula**:
Revenue Churn = (Revenue Lost from Churned Customers / Starting Revenue) × 100

**Why both matter**:

- If logo churn is 15% but revenue churn is 5%, small customers are churning while large customers are retained. This may be acceptable if the business focuses on enterprise.
- If logo churn is 5% but revenue churn is 20%, large customers are churning—this is a severe risk.

**Analyzing churn by segment**:

Break down churn by:
- Customer size (SMB vs. mid-market vs. enterprise)
- Industry vertical
- Geography
- Product line
- Tenure (new customers vs. long-tenured customers)

This reveals whether churn is concentrated in a specific segment that can be addressed through product improvement, customer success investment, or pricing changes.

### Red Flags in Cohort and Churn Analysis

**Red Flag 1: Accelerating churn in recent cohorts**
If 2023 cohort churn is materially higher than 2021 cohort churn, investigate:
- Is product-market fit weakening?
- Is customer quality declining (e.g., lowering standards to hit growth targets)?
- Has competitive pressure increased?

**Red Flag 2: Negative cohort retention**
If Year 1 revenue for a cohort is <90% of Year 0 revenue (absent price increases), the business is losing more than it is upselling. This is unsustainable.

**Red Flag 3: LTV/CAC ratio deteriorating**
If CAC is increasing (sales efficiency declining) while LTV is flat or decreasing (churn increasing), unit economics are compressing. This threatens scalability.

**Red Flag 4: Concentration within cohorts**
If 80% of a cohort's revenue comes from 2 customers, the cohort retention metric is misleading. One churn event could collapse the cohort.

**Red Flag 5: Churn spiking post-price increase**
If the business raised prices and churn immediately increased, this signals weak pricing power or poor value perception.

### Structuring Customer Analysis for IC

Your customer analysis section should include:

1. **Executive summary**:
   - "Top 10 customers represent X% of revenue. Customer concentration is [low/moderate/high]. Cohort analysis shows [stable/improving/deteriorating] retention with NRR of X%. Key risk: [specific finding]."

2. **Customer concentration table** (top 10–20 customers with contract terms, tenure, expiration dates)

3. **Cohort retention table** (revenue retention by cohort over time)

4. **Churn analysis** (logo and revenue churn by segment and time period)

5. **LTV/CAC analysis** (unit economics by segment if data permits)

6. **Key findings and implications**:
   - Quantify downside risk: "If top 3 customers churn, revenue impact is $X (Y% of total)"
   - Assess retention sustainability: "NRR of 95% implies business is not generating organic growth from existing customers"
   - Identify value creation opportunities: "Reducing SMB churn from 20% to 15% would add $Z in retained revenue"

7. **Open questions and mitigants**:
   - "Customer A contract expires in 6 months; require update on renewal discussions"
   - "Churn root cause analysis incomplete; recommend post-close customer survey"

### Advanced Considerations: Forward-Looking Customer Metrics

Beyond historical analysis, assess forward-looking indicators:

**Pipeline and backlog by customer type**:
- Are new customer additions accelerating or decelerating?
- Is pipeline weighted toward high-LTV or low-LTV segments?

**Customer health scores**:
- Does the business track product usage, engagement, or NPS by customer?
- Are at-risk customers identified proactively?

**Expansion revenue opportunity**:
- What % of customers are on entry-level plans vs. full enterprise deployments?
- What is the upsell potential within the existing customer base?

These metrics inform whether future growth will come from new customer acquisition, existing customer expansion, or retention improvement.

## Video Placeholder

**Video Title**: Customer Concentration and Cohort Analysis in PE Diligence

**Outline**:
- Why customer analysis is critical to understanding revenue sustainability (0:00–3:00)
- Building a customer concentration risk assessment framework (3:00–9:00)
- Cohort analysis: Tracking customer performance over time (9:00–16:00)
- Calculating LTV, CAC, and payback period (16:00–23:00)
- Logo churn vs. revenue churn and segment-level analysis (23:00–28:00)
- Red flags in customer data and escalation triggers (28:00–33:00)
- Structuring customer analysis for IC (33:00–38:00)

**Suggested Length**: 38 minutes

## Key Takeaways

- Customer concentration analysis quantifies revenue at risk and determines whether concentration is manageable (contractual protection, tenure, switching costs) or a deal-breaker
- Cohort analysis reveals whether the business is improving at retaining and growing customers over time, or whether newer cohorts are underperforming older ones
- Calculate LTV/CAC ratios and payback periods to assess unit economics sustainability—best-in-class targets are LTV/CAC >3 and payback <12 months
- Distinguish between logo churn (customer count loss) and revenue churn (dollar loss) and analyze churn by segment to identify concentration of retention risk
- Red flags include accelerating churn in recent cohorts, negative cohort retention, deteriorating LTV/CAC ratios, and concentration within cohorts masking individual customer risk
- Structure outputs to quantify downside scenarios (e.g., top customer churn impact), assess retention sustainability, and identify value creation opportunities through churn reduction
- Link customer analysis to valuation assumptions and IC risk discussions—retention rates and customer economics must be defensible and supported by data, not optimistic projections


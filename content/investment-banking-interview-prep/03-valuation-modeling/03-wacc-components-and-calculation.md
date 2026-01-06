---
id: wacc-components-and-calculation
title: WACC Components and Calculation
order: 3
estimated_minutes: 30
---

# WACC Components and Calculation

## Learning Objectives

- Explain what WACC is and why it is used as the discount rate in a DCF
- Calculate WACC given the cost of equity, cost of debt, and capital structure
- Understand the components: cost of equity (CAPM), cost of debt, and weights
- Explain why debt is tax-advantaged and how the tax shield is reflected in WACC

## Written Guide

### What Is WACC?

**WACC (Weighted Average Cost of Capital)** is the blended cost of a company's financing sources—debt and equity—weighted by their proportions in the capital structure. It represents the return required by all investors (both debt and equity holders) and is used as the discount rate in a DCF to value enterprise value.

**Intuition**: If a company is financed 70% by equity (which costs 12%) and 30% by debt (which costs 6% after tax), the overall cost of capital is somewhere between 6% and 12%, weighted by the mix.

### WACC Formula

WACC = (E / (E + D)) × Cost of Equity + (D / (E + D)) × Cost of Debt × (1 - Tax Rate)

Where:
- **E** = Market value of equity
- **D** = Market value of debt
- **Cost of Equity** = Expected return required by equity investors
- **Cost of Debt** = Interest rate on debt
- **Tax Rate** = Corporate tax rate

The tax term **(1 - Tax Rate)** reflects the **tax shield** from debt: interest is tax-deductible, so the effective cost of debt is lower.

### Component 1: Cost of Equity

The **cost of equity** is the return equity investors require to compensate for the risk of owning the stock. It is typically calculated using the **Capital Asset Pricing Model (CAPM)**:

Cost of Equity = Risk-Free Rate + Beta × Equity Risk Premium

**Risk-Free Rate (Rf)**: The return on a riskless investment, typically the yield on a 10-year U.S. Treasury bond (e.g., 4%).

**Beta (β)**: A measure of the stock's sensitivity to market movements. Beta = 1 means the stock moves in line with the market; Beta > 1 means more volatile; Beta < 1 means less volatile.

**Equity Risk Premium (ERP)**: The additional return investors expect for investing in equities over risk-free assets. Historically, this is around 5-7%.

**Example**:
- Risk-free rate = 4%
- Beta = 1.2
- Equity risk premium = 6%

Cost of Equity = 4% + 1.2 × 6% = 11.2%

### Component 2: Cost of Debt

The **cost of debt** is the effective interest rate the company pays on its debt. It can be estimated as:

- The yield to maturity on the company's outstanding bonds, or
- The company's interest expense divided by total debt

Since interest is tax-deductible, we adjust for the **tax shield**:

**After-Tax Cost of Debt** = Cost of Debt × (1 - Tax Rate)

**Example**:
- Cost of debt = 6%
- Tax rate = 25%

After-Tax Cost of Debt = 6% × (1 - 0.25) = 4.5%

### Component 3: Weights (Capital Structure)

The weights are based on the **market values** of debt and equity, not book values.

**Weight of Equity** = E / (E + D)

**Weight of Debt** = D / (E + D)

**Example**:
- Market value of equity = $700M
- Market value of debt = $300M

Weight of Equity = $700M / ($700M + $300M) = 70%

Weight of Debt = $300M / $1,000M = 30%

### Putting It All Together: WACC Calculation Example

**Given**:
- Market value of equity (E) = $700M
- Market value of debt (D) = $300M
- Cost of equity = 11.2% (from CAPM)
- Cost of debt = 6%
- Tax rate = 25%

**Step 1: Calculate after-tax cost of debt**

After-Tax Cost of Debt = 6% × (1 - 0.25) = 4.5%

**Step 2: Calculate weights**

Weight of Equity = $700M / $1,000M = 70%

Weight of Debt = $300M / $1,000M = 30%

**Step 3: Calculate WACC**

WACC = (70% × 11.2%) + (30% × 4.5%) = 7.84% + 1.35% = 9.19%

### Why WACC Is Used in DCF

WACC represents the return required by all investors. When we discount unlevered free cash flows (which are available to both debt and equity holders) by WACC, we arrive at **enterprise value**.

If we were valuing equity directly, we would use the **cost of equity** as the discount rate and discount **levered free cash flows** (cash flows to equity holders only). But in most DCF models, we use WACC and unlevered cash flows to get EV, then bridge to equity value.

### The Tax Shield and Why Debt Is Cheaper

Debt has a tax advantage because **interest is tax-deductible**. If a company pays $100 in interest and has a 25% tax rate, the government effectively subsidizes $25 of that cost (through reduced taxes).

This is why we multiply the cost of debt by **(1 - Tax Rate)** in the WACC formula. The after-tax cost of debt is lower than the stated interest rate.

Equity, by contrast, has no tax shield. Dividends are paid with after-tax dollars.

### Common Mistakes

**Using book values instead of market values**: WACC weights should be based on market values of debt and equity, not book values.

**Forgetting the tax shield on debt**: The cost of debt must be multiplied by (1 - Tax Rate) in the WACC formula.

**Using the wrong risk-free rate**: Use the current yield on a long-term government bond (e.g., 10-year Treasury), not short-term rates.

**Confusing cost of equity with cost of capital**: Cost of equity is the return required by equity holders. WACC is the blended cost of all capital.

## Video Placeholder

**Video Title**: WACC: Components, Calculation, and Application in DCF

**Outline**:
- What WACC is and why it's the discount rate for unlevered cash flows
- The WACC formula and each component: cost of equity, cost of debt, weights
- Cost of equity: CAPM formula and intuition
- After-tax cost of debt and the tax shield
- Full WACC calculation example
- Common mistakes: book vs. market values, forgetting the tax shield

**Suggested Length**: 12 minutes

## Key Takeaways

- WACC is the weighted average cost of debt and equity, used as the discount rate in a DCF
- WACC = (E/(E+D)) × Cost of Equity + (D/(E+D)) × Cost of Debt × (1 - Tax Rate)
- Cost of Equity is calculated using CAPM: Rf + Beta × ERP
- Cost of Debt is adjusted for the tax shield: Cost of Debt × (1 - Tax Rate)
- Weights are based on market values of equity and debt, not book values
- Debt is cheaper than equity due to the tax deductibility of interest

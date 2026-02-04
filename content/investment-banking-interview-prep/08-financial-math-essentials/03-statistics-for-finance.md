---
id: statistics-for-finance
title: Statistics for Finance
order: 3
estimated_minutes: 35
---

# Statistics for Finance

## Learning Objectives

- Calculate and interpret mean, median, and mode
- Understand variance, standard deviation, and their application to risk
- Apply correlation and covariance to portfolio analysis
- Use basic regression concepts for financial modeling

## Written Guide

### Measures of Central Tendency

**Mean (Average)**

The sum of all values divided by the number of values:

```
Mean = (x₁ + x₂ + ... + xₙ) / n
```

**Example**: Returns of 5%, 8%, 3%, 12%, 7%
Mean = (5 + 8 + 3 + 12 + 7) / 5 = 35 / 5 = 7%

**Use in Finance**: Expected return, average revenue growth, mean EBITDA margin

**Median**

The middle value when data is sorted. If there's an even number of observations, take the average of the two middle values.

**Example**: Returns of 3%, 5%, 7%, 8%, 12%
Median = 7% (the middle value)

**Example**: Returns of 3%, 5%, 7%, 8%
Median = (5 + 7) / 2 = 6%

**Use in Finance**: Median valuation multiple (less affected by outliers than mean)

**Mode**

The most frequently occurring value. Less commonly used in finance.

### Mean vs. Median in Finance

The **median** is often preferred when data has outliers:

**Comparable Company Multiples**:

| Company | EV/EBITDA |
|---------|-----------|
| A | 8.0× |
| B | 8.5× |
| C | 9.0× |
| D | 9.5× |
| E | 25.0× (outlier) |

Mean = 12.0×
Median = 9.0×

The median (9.0×) better represents the "typical" multiple. Company E might be distorted by one-time factors.

### Variance

**Variance** measures how spread out data is from the mean:

```
Variance (σ²) = Σ(xᵢ - μ)² / n
```

Where:
- xᵢ = each observation
- μ = mean
- n = number of observations

**Steps**:
1. Calculate the mean
2. Subtract the mean from each observation (deviation)
3. Square each deviation
4. Average the squared deviations

**Example**: Returns of 5%, 8%, 3%, 12%, 7% (mean = 7%)

| Return | Deviation | Squared |
|--------|-----------|---------|
| 5% | -2% | 4 |
| 8% | +1% | 1 |
| 3% | -4% | 16 |
| 12% | +5% | 25 |
| 7% | 0% | 0 |
| **Sum** | | **46** |

Variance = 46 / 5 = 9.2

### Standard Deviation

**Standard deviation** is the square root of variance:

```
Standard Deviation (σ) = √Variance
```

**Example**: √9.2 = 3.03%

Standard deviation is more intuitive because it's in the same units as the data (percentage points, dollars, etc.).

### Application: Risk Measurement

In finance, standard deviation of returns measures **volatility** or **risk**:

- Higher standard deviation = more volatile = riskier
- Lower standard deviation = more stable = less risky

**Example**: Two stocks with 10% average return:

| Stock | Returns | Std Dev |
|-------|---------|---------|
| A | 8%, 10%, 12%, 10%, 10% | 1.4% |
| B | -5%, 25%, 10%, 15%, 5% | 10.5% |

Both average 10%, but Stock B is much riskier (more volatile).

### The Normal Distribution

Many financial variables approximately follow a **normal distribution** (bell curve):

- 68% of observations fall within 1 standard deviation of the mean
- 95% fall within 2 standard deviations
- 99.7% fall within 3 standard deviations

**Application**: If stock returns are normally distributed with mean 10% and std dev 20%:
- 68% chance returns are between -10% and 30%
- 95% chance returns are between -30% and 50%

### Covariance

**Covariance** measures how two variables move together:

```
Cov(X,Y) = Σ[(xᵢ - μₓ)(yᵢ - μᵧ)] / n
```

- **Positive covariance**: Variables move in the same direction
- **Negative covariance**: Variables move in opposite directions
- **Zero covariance**: No linear relationship

**Problem**: Covariance magnitude depends on units and scale, making it hard to interpret.

### Correlation

**Correlation** standardizes covariance to a -1 to +1 scale:

```
Correlation (ρ) = Cov(X,Y) / (σₓ × σᵧ)
```

| Correlation | Interpretation |
|-------------|----------------|
| +1.0 | Perfect positive relationship |
| +0.5 to +1.0 | Strong positive |
| 0 to +0.5 | Weak positive |
| 0 | No linear relationship |
| -0.5 to 0 | Weak negative |
| -1.0 to -0.5 | Strong negative |
| -1.0 | Perfect negative relationship |

### Application: Portfolio Diversification

Correlation determines diversification benefit:

**High correlation** (ρ → 1): Assets move together; limited diversification
**Low/negative correlation** (ρ → 0 or negative): Assets move independently; good diversification

**Portfolio Variance Formula** (two assets):

```
σ²ₚ = w₁²σ₁² + w₂²σ₂² + 2w₁w₂σ₁σ₂ρ₁₂
```

Where:
- w = weight of each asset
- σ = standard deviation of each asset
- ρ = correlation between assets

When ρ < 1, portfolio variance is less than weighted average of individual variances—this is diversification.

### Beta

**Beta** measures an asset's sensitivity to market movements:

```
β = Cov(Asset, Market) / Var(Market)
```

| Beta | Interpretation |
|------|----------------|
| β = 1.0 | Moves with the market |
| β > 1.0 | More volatile than market |
| β < 1.0 | Less volatile than market |
| β < 0 | Moves opposite to market |

**Example**: Stock with β = 1.5
- If market rises 10%, stock expected to rise 15%
- If market falls 10%, stock expected to fall 15%

**Use in CAPM**:
```
Expected Return = Risk-Free Rate + β × (Market Return - Risk-Free Rate)
```

### Regression Basics

**Linear regression** finds the best-fit line through data:

```
y = α + β×x + ε
```

Where:
- α = intercept (y when x = 0)
- β = slope (change in y per unit change in x)
- ε = error term

**R-squared (R²)** measures how much of y's variation is explained by x:
- R² = 1: Perfect fit
- R² = 0: x explains nothing about y

### Application: Revenue Forecasting

Regression can forecast revenue based on economic drivers:

**Model**: Revenue = α + β × GDP Growth

If β = $50M and GDP growth increases by 1%, revenue increases by $50M.

### Geometric vs. Arithmetic Mean

For returns over time, use **geometric mean** (CAGR):

```
Geometric Mean = [(1+r₁)(1+r₂)...(1+rₙ)]^(1/n) - 1
```

**Example**: Returns of +50%, -50%

Arithmetic Mean = (50% + (-50%)) / 2 = 0%

But actual result: $100 → $150 → $75 (25% loss!)

Geometric Mean = √[(1.5)(0.5)] - 1 = √0.75 - 1 = -13.4%

The geometric mean correctly captures the actual compound return.

### Common Interview Questions

**"What's the difference between mean and median? When would you use each?"**

Mean is the arithmetic average; median is the middle value. Use median when data has outliers—it's more robust. In trading comps, median EV/EBITDA is often preferred because one outlier company doesn't skew the result.

**"What is standard deviation and what does it measure?"**

Standard deviation measures dispersion around the mean. In finance, it's used as a measure of risk or volatility. Higher standard deviation means returns are more spread out and less predictable.

**"What is beta and what does a beta of 1.5 mean?"**

Beta measures a stock's sensitivity to market movements. A beta of 1.5 means if the market rises 10%, the stock is expected to rise 15%, and vice versa. It's 50% more volatile than the market.

**"Why is diversification beneficial?"**

Diversification reduces portfolio risk because assets don't move perfectly together (correlation < 1). When one asset declines, another might rise or stay flat, reducing overall volatility. The math: portfolio variance includes a correlation term that reduces total variance when correlation is less than 1.

## Video Placeholder

**Video Title**: Statistics Essentials for Finance

**Outline**:
- Mean, median, mode and when to use each
- Variance and standard deviation as risk measures
- Normal distribution and probability ranges
- Covariance, correlation, and diversification
- Beta and the CAPM
- Geometric vs. arithmetic mean for returns
- Interview applications

**Suggested Length**: 18 minutes

## Key Takeaways

- Mean = sum / count; Median = middle value (more robust to outliers)
- Variance measures dispersion; Standard deviation = √variance (same units as data)
- In finance, standard deviation of returns = volatility = risk
- Correlation ranges from -1 to +1; lower correlation = better diversification
- Beta measures market sensitivity: β > 1 means more volatile than market
- For compound returns, use geometric mean (CAGR), not arithmetic mean
- R² in regression shows how much variation is explained by the independent variable

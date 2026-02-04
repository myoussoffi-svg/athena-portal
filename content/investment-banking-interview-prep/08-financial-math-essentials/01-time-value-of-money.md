---
id: time-value-of-money
title: Time Value of Money
order: 1
estimated_minutes: 40
---

# Time Value of Money

## Learning Objectives

- Understand why money today is worth more than money in the future
- Calculate present value and future value using discounting and compounding
- Apply time value of money concepts to financial decision-making
- Convert between different compounding frequencies

## Written Guide

### The Core Concept

A dollar today is worth more than a dollar tomorrow. This simple insight—the **time value of money (TVM)**—underpins all of finance.

Why is this true?

1. **Opportunity cost**: Money today can be invested to earn returns
2. **Inflation**: Purchasing power erodes over time
3. **Risk**: Future cash flows are uncertain

Because of TVM, we can't simply add cash flows from different time periods. $100 received today and $100 received in 5 years are not equivalent—we must adjust for the timing difference.

### Future Value: Compounding

**Future Value (FV)** answers: "If I invest money today, how much will it be worth in the future?"

**Single Period**:
```
FV = PV × (1 + r)
```

Where:
- PV = Present Value (amount invested today)
- r = Interest rate per period
- FV = Future Value after one period

**Example**: Invest $1,000 at 5% for one year:
FV = $1,000 × (1.05) = $1,050

**Multiple Periods**:
```
FV = PV × (1 + r)^n
```

Where n = number of periods

**Example**: Invest $1,000 at 5% for 10 years:
FV = $1,000 × (1.05)^10 = $1,000 × 1.6289 = $1,628.89

The power of compounding: you earn interest on your interest.

### Present Value: Discounting

**Present Value (PV)** answers: "What is a future cash flow worth today?"

```
PV = FV / (1 + r)^n
```

Or equivalently:
```
PV = FV × (1 + r)^(-n)
```

**Example**: What is $1,000 received in 5 years worth today at a 10% discount rate?
PV = $1,000 / (1.10)^5 = $1,000 / 1.6105 = $620.92

This means: $620.92 invested today at 10% would grow to $1,000 in 5 years.

### The Discount Rate

The discount rate represents:
- The **required return** for the investment
- The **opportunity cost** of capital
- The **risk** of the cash flows

Higher risk = higher discount rate = lower present value

**Example**: Same $1,000 in 5 years, different discount rates:

| Discount Rate | Present Value |
|---------------|---------------|
| 5% | $783.53 |
| 10% | $620.92 |
| 15% | $497.18 |
| 20% | $401.88 |

As the discount rate increases, present value decreases.

### Multiple Cash Flows

For a series of cash flows, calculate PV of each and sum:

```
PV = CF₁/(1+r)¹ + CF₂/(1+r)² + CF₃/(1+r)³ + ... + CFₙ/(1+r)ⁿ
```

**Example**: Cash flows of $100, $150, $200 over 3 years at 8%:

| Year | Cash Flow | Discount Factor | Present Value |
|------|-----------|-----------------|---------------|
| 1 | $100 | 1/(1.08)¹ = 0.926 | $92.59 |
| 2 | $150 | 1/(1.08)² = 0.857 | $128.60 |
| 3 | $200 | 1/(1.08)³ = 0.794 | $158.77 |
| **Total** | | | **$379.96** |

### Net Present Value (NPV)

**NPV** is the present value of all cash flows, including the initial investment:

```
NPV = -Initial Investment + PV of Future Cash Flows
```

**Decision Rule**:
- NPV > 0 → Accept the project (creates value)
- NPV < 0 → Reject the project (destroys value)
- NPV = 0 → Indifferent (earns exactly the required return)

**Example**: Invest $500 today to receive $100, $150, $200, $250 over 4 years at 10%:

| Year | Cash Flow | PV |
|------|-----------|-----|
| 0 | ($500) | ($500.00) |
| 1 | $100 | $90.91 |
| 2 | $150 | $123.97 |
| 3 | $200 | $150.26 |
| 4 | $250 | $170.75 |
| **NPV** | | **$35.89** |

NPV is positive, so the project creates $35.89 of value and should be accepted.

### Compounding Frequency

Interest can compound at different frequencies:

| Frequency | Periods per Year (m) |
|-----------|---------------------|
| Annual | 1 |
| Semi-annual | 2 |
| Quarterly | 4 |
| Monthly | 12 |
| Daily | 365 |
| Continuous | ∞ |

**Periodic Compounding**:
```
FV = PV × (1 + r/m)^(m×n)
```

Where:
- r = annual interest rate
- m = compounding periods per year
- n = number of years

**Example**: $1,000 at 12% for 1 year:

| Compounding | Calculation | FV |
|-------------|-------------|-----|
| Annual | $1,000 × (1.12)^1 | $1,120.00 |
| Semi-annual | $1,000 × (1.06)^2 | $1,123.60 |
| Quarterly | $1,000 × (1.03)^4 | $1,125.51 |
| Monthly | $1,000 × (1.01)^12 | $1,126.83 |

More frequent compounding = higher future value.

### Effective Annual Rate (EAR)

To compare rates with different compounding frequencies, convert to the **Effective Annual Rate**:

```
EAR = (1 + r/m)^m - 1
```

**Example**: 12% compounded monthly:
EAR = (1 + 0.12/12)^12 - 1 = (1.01)^12 - 1 = 12.68%

The EAR tells you the true annual return accounting for compounding.

### Continuous Compounding

As compounding frequency approaches infinity:

```
FV = PV × e^(r×n)
```

Where e ≈ 2.71828

**Example**: $1,000 at 12% for 1 year, continuously compounded:
FV = $1,000 × e^0.12 = $1,000 × 1.1275 = $1,127.50

### The Rule of 72

A quick approximation for how long it takes money to double:

```
Years to Double ≈ 72 / Interest Rate (%)
```

**Examples**:
- At 6%: 72/6 = 12 years
- At 8%: 72/8 = 9 years
- At 12%: 72/12 = 6 years

### Application: Comparing Investments

Use PV to compare investments with different timing:

**Option A**: Receive $10,000 today
**Option B**: Receive $12,000 in 2 years

At 8% discount rate:
PV(B) = $12,000 / (1.08)^2 = $10,288

Option B is worth more ($10,288 > $10,000) at 8%.

But at 12%:
PV(B) = $12,000 / (1.12)^2 = $9,566

Option A is worth more ($10,000 > $9,566) at 12%.

The "better" choice depends on your required return.

### Common Interview Questions

**"What is the time value of money?"**

A dollar today is worth more than a dollar in the future because money today can be invested to earn returns, inflation erodes purchasing power, and future cash flows carry uncertainty. To compare cash flows at different times, we discount future cash flows to present value.

**"If I offer you $100 today or $110 in one year, which do you choose?"**

It depends on the discount rate. If my required return is less than 10%, I should wait for $110 (its PV exceeds $100). If my required return is more than 10%, I should take $100 today.

At exactly 10%: PV of $110 = $110/1.10 = $100, so I'm indifferent.

**"Why does a higher discount rate lower present value?"**

A higher discount rate represents higher opportunity cost or higher risk. If I can earn more elsewhere (higher opportunity cost), future cash flows become less valuable. If cash flows are riskier, I demand a higher return to compensate, which reduces what I'll pay today.

## Video Placeholder

**Video Title**: Time Value of Money: The Foundation of Finance

**Outline**:
- Why money today is worth more than money tomorrow
- Future value and the power of compounding
- Present value and discounting
- NPV and investment decisions
- Compounding frequency and effective annual rate
- Rule of 72
- Interview applications

**Suggested Length**: 20 minutes

## Key Takeaways

- A dollar today is worth more than a dollar in the future due to opportunity cost, inflation, and risk
- Future Value: FV = PV × (1 + r)^n (compounding)
- Present Value: PV = FV / (1 + r)^n (discounting)
- NPV = sum of all discounted cash flows including initial investment; accept if NPV > 0
- Higher discount rates reduce present value
- More frequent compounding increases effective return
- EAR = (1 + r/m)^m - 1 converts to comparable annual rates
- Rule of 72: years to double ≈ 72 / interest rate

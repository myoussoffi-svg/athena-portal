---
id: annuities-perpetuities-bond-math
title: Annuities, Perpetuities, and Bond Math
order: 2
estimated_minutes: 45
---

# Annuities, Perpetuities, and Bond Math

## Learning Objectives

- Calculate the present value of annuities and perpetuities
- Understand growing perpetuities and their application to terminal value
- Price bonds using present value of coupon and principal payments
- Calculate yield to maturity and understand the yield-price relationship

## Written Guide

### Annuities

An **annuity** is a series of equal payments at regular intervals. Examples include loan payments, lease payments, and lottery payouts.

**Ordinary Annuity**: Payments occur at the end of each period

**Present Value of an Ordinary Annuity**:

```
PV = PMT × [(1 - (1 + r)^(-n)) / r]
```

Where:
- PMT = Payment amount
- r = Interest rate per period
- n = Number of periods

The term in brackets is called the **annuity factor** or **PVIFA** (Present Value Interest Factor of Annuity).

**Example**: What is the PV of $1,000 per year for 5 years at 8%?

Annuity Factor = [1 - (1.08)^(-5)] / 0.08 = [1 - 0.6806] / 0.08 = 3.993

PV = $1,000 × 3.993 = $3,993

**Future Value of an Annuity**:

```
FV = PMT × [((1 + r)^n - 1) / r]
```

**Example**: If you save $1,000 per year for 5 years at 8%, how much will you have?

FV Factor = [(1.08)^5 - 1] / 0.08 = [1.4693 - 1] / 0.08 = 5.867

FV = $1,000 × 5.867 = $5,867

### Annuity Due

An **annuity due** has payments at the beginning of each period (e.g., rent, insurance premiums).

**PV of Annuity Due** = PV of Ordinary Annuity × (1 + r)

**FV of Annuity Due** = FV of Ordinary Annuity × (1 + r)

The (1 + r) adjustment accounts for one extra period of compounding/discounting.

### Perpetuities

A **perpetuity** is an annuity that continues forever—payments never stop.

**Present Value of a Perpetuity**:

```
PV = PMT / r
```

**Example**: What is the PV of $100 per year forever at 5%?

PV = $100 / 0.05 = $2,000

**Intuition**: If you invest $2,000 at 5%, you earn $100 per year indefinitely without touching the principal.

### Growing Perpetuity

A **growing perpetuity** has payments that grow at a constant rate forever.

**PV of Growing Perpetuity**:

```
PV = PMT / (r - g)
```

Where:
- PMT = First payment (at end of period 1)
- r = Discount rate
- g = Growth rate (g must be < r)

**Example**: Cash flow of $100 growing at 3% forever, discounted at 10%:

PV = $100 / (0.10 - 0.03) = $100 / 0.07 = $1,428.57

### Application: Terminal Value in DCF

The **Gordon Growth Model** (perpetuity growth method) for terminal value is a growing perpetuity:

```
Terminal Value = FCF × (1 + g) / (r - g)
```

Where:
- FCF = Final year's free cash flow
- g = Perpetual growth rate (typically 2-3%)
- r = WACC

**Example**: Year 5 FCF = $100M, g = 2.5%, WACC = 10%

TV = $100M × 1.025 / (0.10 - 0.025) = $102.5M / 0.075 = $1,366.7M

This terminal value represents all cash flows from year 6 to infinity, discounted to year 5.

### Bond Pricing Basics

A bond pays:
1. **Coupon payments**: Periodic interest payments (usually semi-annual)
2. **Principal (face value)**: Returned at maturity

The bond price equals the present value of all future payments:

```
Bond Price = PV of Coupons + PV of Principal
```

**Example**: 5-year bond, $1,000 face value, 6% coupon (annual), 5% market rate:

| Year | Cash Flow | PV Factor | Present Value |
|------|-----------|-----------|---------------|
| 1 | $60 | 0.952 | $57.14 |
| 2 | $60 | 0.907 | $54.42 |
| 3 | $60 | 0.864 | $51.83 |
| 4 | $60 | 0.823 | $49.36 |
| 5 | $60 + $1,000 | 0.784 | $831.05 |
| **Total** | | | **$1,043.80** |

The bond trades at a **premium** ($1,043.80 > $1,000) because its coupon rate (6%) exceeds the market rate (5%).

### Bond Pricing Formula

For a bond with semi-annual coupons:

```
Price = C × [(1 - (1 + y/2)^(-2n)) / (y/2)] + F / (1 + y/2)^(2n)
```

Where:
- C = Semi-annual coupon payment (Annual Coupon / 2)
- y = Yield to maturity (annual)
- n = Years to maturity
- F = Face value

The first term is the PV of the coupon annuity; the second is the PV of the principal.

### Yield to Maturity (YTM)

**YTM** is the discount rate that makes the present value of a bond's cash flows equal to its current price. It represents the total return if held to maturity.

There's no closed-form solution—YTM must be solved iteratively or using a financial calculator.

**Example**: Bond priced at $950, 5% coupon, 5 years to maturity, $1,000 face value

At YTM = 6%: PV = $957.88 (too high)
At YTM = 6.5%: PV = $937.69 (too low)
YTM ≈ 6.2% (by interpolation)

### Bond Price-Yield Relationship

Bond prices and yields move inversely:

- **If yields rise, bond prices fall**
- **If yields fall, bond prices rise**

**Why?** When market rates rise, existing bonds with lower coupons become less attractive, so their prices drop until the yield matches the market.

### Premium, Par, and Discount Bonds

| Coupon vs. Yield | Price vs. Face Value | Term |
|------------------|---------------------|------|
| Coupon > Yield | Price > Face | Premium |
| Coupon = Yield | Price = Face | Par |
| Coupon < Yield | Price < Face | Discount |

**Premium bonds** have attractive coupons (above market), so investors pay more.
**Discount bonds** have unattractive coupons (below market), so they sell for less.

### Duration and Interest Rate Sensitivity

**Duration** measures a bond's sensitivity to interest rate changes:

- **Higher duration** = more sensitive to rate changes
- Longer maturity bonds have higher duration
- Lower coupon bonds have higher duration

**Approximate Price Change**:

```
% Price Change ≈ -Duration × Change in Yield
```

**Example**: Bond with 5-year duration, yields rise 1%:
% Price Change ≈ -5 × 0.01 = -5%

The bond price falls approximately 5%.

### Current Yield vs. YTM

**Current Yield** = Annual Coupon / Current Price

This measures income return only, ignoring capital gains/losses from price changes.

**Example**: $60 coupon, $1,100 price
Current Yield = $60 / $1,100 = 5.45%

If the bond matures at $1,000, you'll also have a capital loss, making YTM lower than current yield.

### Common Interview Questions

**"What happens to bond prices when interest rates rise?"**

Bond prices fall. When market rates rise, existing bonds with lower fixed coupons become less attractive. Prices must drop until the yield equals the new market rate.

**"What's the difference between current yield and YTM?"**

Current yield = coupon / price, measuring only income return. YTM includes both coupon income and capital gain/loss if held to maturity. For premium bonds, YTM < current yield (capital loss). For discount bonds, YTM > current yield (capital gain).

**"Why do longer-maturity bonds have higher duration?"**

Duration measures weighted-average time to receive cash flows. Longer-maturity bonds have more cash flows in the distant future, making them more sensitive to rate changes. The present value of distant cash flows changes more when discount rates change.

## Video Placeholder

**Video Title**: Annuities, Perpetuities, and Bond Pricing

**Outline**:
- Annuity formulas (ordinary and due)
- Perpetuities and growing perpetuities
- Terminal value as a growing perpetuity
- Bond pricing: PV of coupons plus principal
- Yield to maturity and the price-yield relationship
- Duration and interest rate sensitivity
- Common interview questions

**Suggested Length**: 22 minutes

## Key Takeaways

- Annuity PV = PMT × [(1 - (1+r)^(-n)) / r]
- Perpetuity PV = PMT / r
- Growing Perpetuity PV = PMT / (r - g), used for terminal value in DCF
- Bond price = PV of coupons (annuity) + PV of principal
- Premium bonds: coupon > yield, price > face; Discount: coupon < yield, price < face
- Bond prices and yields move inversely
- YTM is the discount rate that equates PV of cash flows to current price
- Duration measures interest rate sensitivity: higher duration = more sensitive

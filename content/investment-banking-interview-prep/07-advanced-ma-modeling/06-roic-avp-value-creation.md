---
id: roic-avp-value-creation
title: ROIC, AVP, and Value Creation Analysis
order: 6
estimated_minutes: 40
---

# ROIC, AVP, and Value Creation Analysis

## Learning Objectives

- Analyze value creation using Return on Invested Capital (ROIC)
- Build Analysis at Various Prices (AVP) tables
- Calculate NPV of synergies vs. control premium
- Determine the maximum price an acquirer can pay

## Written Guide

### Beyond Accretion/Dilution

Accretion/dilution tells you whether EPS goes up or down. It doesn't tell you whether the deal **creates value**.

A deal can be:
- **Accretive but value-destroying**: Acquirer overpays, using cheap debt to boost EPS
- **Dilutive but value-creating**: Acquirer pays fair price for a high-growth target

To truly assess deals, analyze **value creation** through ROIC and NPV analysis.

### Return on Invested Capital (ROIC)

**ROIC** measures the return generated on capital deployed:

```
ROIC = NOPAT / Invested Capital
```

Where:
- NOPAT = Net Operating Profit After Tax = EBIT × (1 - Tax Rate)
- Invested Capital = Equity + Debt - Cash (or Total Assets - Non-Interest-Bearing Liabilities)

**In M&A Context**:

```
Acquisition ROIC = Incremental NOPAT / Purchase Price
```

Where:
- Incremental NOPAT = Target's NOPAT + After-Tax Synergies - Lost Interest on Cash Used
- Purchase Price = Total consideration (equity value paid)

### ROIC vs. Cost of Capital

**Value Creation Rule**:
- ROIC > WACC → Value created
- ROIC < WACC → Value destroyed
- ROIC = WACC → Value neutral

**Example**:

| Metric | Value |
|--------|-------|
| Purchase Price | $4,500M |
| Target NOPAT | $120M |
| After-Tax Synergies | $113M |
| Lost Interest Income (after-tax) | ($15M) |
| **Incremental NOPAT** | **$218M** |
| **Acquisition ROIC** | **4.8%** |

If the acquirer's WACC is 8%, the deal destroys value (4.8% < 8%).

If WACC is 4%, the deal creates value (4.8% > 4%).

### ROIC Build-Up Over Time

Year 1 ROIC is often low due to integration costs. Model ROIC improvement:

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| Target NOPAT | $120M | $130M | $140M | $150M | $160M |
| Synergies (AT) | $38M | $95M | $113M | $113M | $113M |
| Integration Costs | ($75M) | ($25M) | $0 | $0 | $0 |
| Lost Interest | ($15M) | ($15M) | ($15M) | ($15M) | ($15M) |
| **Incremental NOPAT** | $68M | $185M | $238M | $248M | $258M |
| **ROIC** | 1.5% | 4.1% | 5.3% | 5.5% | 5.7% |

ROIC improves as synergies ramp and integration costs fade.

### NPV of Synergies vs. Control Premium

Another value creation framework: Does the NPV of synergies justify the premium paid?

**Control Premium**:
```
Premium = Purchase Price - Pre-Deal Market Value
Premium = $4,500M - $3,600M = $900M
```

**NPV of Synergies**:

Present value of all future synergies discounted at WACC:

| Year | Pre-Tax Synergies | After-Tax | PV Factor (8%) | PV |
|------|-------------------|-----------|----------------|-----|
| 1 | $76M | $57M | 0.926 | $53M |
| 2 | $152M | $114M | 0.857 | $98M |
| 3 | $190M | $143M | 0.794 | $113M |
| 4 | $190M | $143M | 0.735 | $105M |
| 5 | $190M | $143M | 0.681 | $97M |
| TV* | | | | $1,220M |
| **Total NPV** | | | | **$1,686M** |

*Terminal Value = Year 5 Synergies / (WACC - g) = $143M / (0.08 - 0.02) = $2,383M; PV = $1,220M

**Value Creation Analysis**:

```
NPV of Synergies: $1,686M
Control Premium Paid: $900M
Value Created: $786M
```

The acquirer captures $786M of value (synergies exceed premium).

**If NPV of Synergies < Premium**: Acquirer overpays; target shareholders capture the value.

### Analysis at Various Prices (AVP)

**AVP** shows how deal metrics change across a range of offer prices. It's essential for negotiations.

**AVP Table Structure**:

| Offer Price | $40 | $42 | $44 | $46 | $48 | $50 |
|-------------|-----|-----|-----|-----|-----|-----|
| **Premium** | 11% | 17% | 22% | 28% | 33% | 39% |
| **Equity Value** | $4.0B | $4.2B | $4.4B | $4.6B | $4.8B | $5.0B |
| **Enterprise Value** | $4.5B | $4.7B | $4.9B | $5.1B | $5.3B | $5.5B |
| | | | | | | |
| **EV/EBITDA** | 22.5× | 23.5× | 24.5× | 25.5× | 26.5× | 27.5× |
| **P/E (Target)** | 44.4× | 46.7× | 48.9× | 51.1× | 53.3× | 55.6× |
| | | | | | | |
| **Accretion Y1** | 2% | (1%) | (4%) | (7%) | (10%) | (13%) |
| **Accretion Y2** | 8% | 5% | 2% | (1%) | (4%) | (7%) |
| **Accretion Y3** | 12% | 9% | 6% | 3% | 0% | (3%) |
| | | | | | | |
| **ROIC Y3** | 6.2% | 5.8% | 5.5% | 5.2% | 4.9% | 4.6% |
| | | | | | | |
| **Debt/EBITDA** | 2.8× | 2.9× | 3.0× | 3.1× | 3.2× | 3.3× |

### Using AVP in Negotiations

**For Buyers**:
- "At $44, the deal is accretive by Year 2 and ROIC exceeds our cost of capital"
- "Above $48, the deal never becomes accretive—that's our walk-away price"

**For Sellers**:
- "Similar transactions traded at 25× EBITDA, which implies $44-46"
- "At $46, the buyer still achieves positive accretion by Year 3"

### Maximum Offer Price Analysis

What's the **most** an acquirer can pay while still creating value?

**Approach 1: Break-Even Accretion**

Find the price where Year 3 (or target year) accretion = 0%

From AVP: ~$48 offer price results in 0% Year 3 accretion

**Approach 2: ROIC = WACC**

Find the price where acquisition ROIC equals cost of capital

If WACC = 5%, solve for purchase price:

```
5% = Incremental NOPAT / Purchase Price
Purchase Price = $258M / 5% = $5,160M
```

Implies equity value of ~$5.2B, or $52 per share

**Approach 3: NPV of Synergies + Standalone Value**

Maximum price = Target's standalone value + NPV of synergies

```
$3,600M (standalone) + $1,686M (synergy NPV) = $5,286M
```

At this price, all synergy value goes to target shareholders—acquirer breaks even.

### Presenting Value Creation Analysis

For board presentations, show:

**1. Value Bridge**

```
Target Standalone Value:    $3,600M
+ NPV of Synergies:        $1,686M
= Total Value:             $5,286M

Purchase Price:            $4,500M
Value Captured by Acquirer:  $786M
```

**2. ROIC vs. WACC Over Time**

Chart showing ROIC crossing above WACC in Year 2 or 3.

**3. Sensitivity Matrix**

| | **No Synergies** | **$100M Synergies** | **$150M Synergies** | **$200M Synergies** |
|---|---|---|---|---|
| **$40 Price** | Destroys | Creates | Creates | Creates |
| **$45 Price** | Destroys | Neutral | Creates | Creates |
| **$50 Price** | Destroys | Destroys | Neutral | Creates |

Shows which combinations create value.

### Common Interview Questions

**"Does accretive mean the deal is good?"**

No. Accretion just means EPS increases. A deal can be accretive but still destroy value if the acquirer overpays. The real test is whether ROIC exceeds the cost of capital, or equivalently, whether the NPV of synergies exceeds the control premium paid.

**"How do you determine the maximum price for an acquisition?"**

Several approaches: (1) Find the price where deal accretion goes to zero in your target year; (2) Solve for price where acquisition ROIC equals WACC; (3) Add NPV of expected synergies to the target's standalone value. The last approach gives the price where all synergy value goes to the seller and the acquirer breaks even on value creation.

**"What's the difference between contribution analysis and ROIC analysis?"**

Contribution analysis looks at fairness—comparing what each company brings versus ownership received. ROIC analysis looks at value creation—whether the return on the acquisition exceeds the acquirer's cost of capital. Both are important but answer different questions.

## Video Placeholder

**Video Title**: Value Creation Analysis: ROIC, AVP, and Maximum Price

**Outline**:
- Why accretion isn't enough—ROIC and value creation
- Calculating acquisition ROIC
- NPV of synergies vs. control premium
- Building Analysis at Various Prices (AVP) tables
- Using AVP in negotiations
- Determining maximum offer price
- Presenting value creation to boards
- Interview questions

**Suggested Length**: 20 minutes

## Key Takeaways

- Accretion/dilution measures EPS impact; ROIC measures value creation
- Deal creates value when Acquisition ROIC > WACC
- Acquisition ROIC = Incremental NOPAT / Purchase Price
- NPV of Synergies vs. Premium shows who captures the value
- If NPV(synergies) > premium paid, acquirer creates value
- AVP tables show how metrics change across offer prices—essential for negotiations
- Maximum offer price = where ROIC = WACC, or where accretion = 0, or standalone value + synergy NPV
- Value bridge clearly shows how much value is created and who captures it

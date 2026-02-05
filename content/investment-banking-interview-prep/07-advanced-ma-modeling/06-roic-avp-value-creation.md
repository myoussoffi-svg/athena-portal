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

```calculation
title: Acquisition ROIC Calculation
given:
  - "Purchase Price: $4,500M"
  - "Target NOPAT: $120M"
  - "After-Tax Synergies: $113M"
  - "Lost Interest Income (after-tax): ($15M)"
steps:
  - "Incremental NOPAT: $120M + $113M - $15M = $218M"
  - "Acquisition ROIC: $218M / $4,500M = 4.8%"
result: "Acquisition ROIC = 4.8%"
```

If the acquirer's WACC is 8%, the deal destroys value (4.8% < 8%).

If WACC is 4%, the deal creates value (4.8% > 4%).

### ROIC Build-Up Over Time

Year 1 ROIC is often low due to integration costs. Model ROIC improvement:

```calculation
title: ROIC Build-Up Over Time
given:
  - "Purchase Price: $4,500M"
  - "Target NOPAT grows from $120M (Y1) to $160M (Y5)"
  - "After-Tax Synergies ramp from $38M (Y1) to $113M (Y3+)"
  - "Integration Costs: ($75M) in Y1, ($25M) in Y2, $0 thereafter"
  - "Lost Interest: ($15M) per year"
steps:
  - "Year 1: NOPAT $120M + Synergies $38M - Integration ($75M) - Interest ($15M) = $68M -> ROIC 1.5%"
  - "Year 2: NOPAT $130M + Synergies $95M - Integration ($25M) - Interest ($15M) = $185M -> ROIC 4.1%"
  - "Year 3: NOPAT $140M + Synergies $113M - Integration $0 - Interest ($15M) = $238M -> ROIC 5.3%"
  - "Year 4: NOPAT $150M + Synergies $113M - Integration $0 - Interest ($15M) = $248M -> ROIC 5.5%"
  - "Year 5: NOPAT $160M + Synergies $113M - Integration $0 - Interest ($15M) = $258M -> ROIC 5.7%"
result: "ROIC improves from 1.5% (Year 1) to 5.7% (Year 5)"
note: "ROIC improves as synergies ramp and integration costs fade"
```

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

```calculation
title: NPV of Synergies
given:
  - "Discount Rate (WACC): 8%"
  - "Growth Rate for Terminal Value: 2%"
steps:
  - "Year 1: Pre-Tax $76M -> After-Tax $57M x PV Factor 0.926 = $53M"
  - "Year 2: Pre-Tax $152M -> After-Tax $114M x PV Factor 0.857 = $98M"
  - "Year 3: Pre-Tax $190M -> After-Tax $143M x PV Factor 0.794 = $113M"
  - "Year 4: Pre-Tax $190M -> After-Tax $143M x PV Factor 0.735 = $105M"
  - "Year 5: Pre-Tax $190M -> After-Tax $143M x PV Factor 0.681 = $97M"
  - "Terminal Value: $143M / (0.08 - 0.02) = $2,383M; PV = $1,220M"
result: "Total NPV of Synergies = $1,686M"
```

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

```calculation
title: Analysis at Various Prices (AVP)
given:
  - "Offer Prices Evaluated: $40, $42, $44, $46, $48, $50"
steps:
  - "At $40: Premium 11%, Equity Value $4.0B, EV $4.5B, EV/EBITDA 22.5x, P/E 44.4x, Accretion Y1 2% / Y2 8% / Y3 12%, ROIC Y3 6.2%, Debt/EBITDA 2.8x"
  - "At $42: Premium 17%, Equity Value $4.2B, EV $4.7B, EV/EBITDA 23.5x, P/E 46.7x, Accretion Y1 (1%) / Y2 5% / Y3 9%, ROIC Y3 5.8%, Debt/EBITDA 2.9x"
  - "At $44: Premium 22%, Equity Value $4.4B, EV $4.9B, EV/EBITDA 24.5x, P/E 48.9x, Accretion Y1 (4%) / Y2 2% / Y3 6%, ROIC Y3 5.5%, Debt/EBITDA 3.0x"
  - "At $46: Premium 28%, Equity Value $4.6B, EV $5.1B, EV/EBITDA 25.5x, P/E 51.1x, Accretion Y1 (7%) / Y2 (1%) / Y3 3%, ROIC Y3 5.2%, Debt/EBITDA 3.1x"
  - "At $48: Premium 33%, Equity Value $4.8B, EV $5.3B, EV/EBITDA 26.5x, P/E 53.3x, Accretion Y1 (10%) / Y2 (4%) / Y3 0%, ROIC Y3 4.9%, Debt/EBITDA 3.2x"
  - "At $50: Premium 39%, Equity Value $5.0B, EV $5.5B, EV/EBITDA 27.5x, P/E 55.6x, Accretion Y1 (13%) / Y2 (7%) / Y3 (3%), ROIC Y3 4.6%, Debt/EBITDA 3.3x"
result: "Break-even accretion (Year 3) at ~$48 per share"
note: "Higher offer prices reduce accretion, ROIC, and increase leverage"
```

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

```calculation
title: Value Creation Sensitivity Matrix (Price vs. Synergies)
given:
  - "Prices Evaluated: $40, $45, $50"
  - "Synergy Scenarios: No Synergies, $100M, $150M, $200M"
steps:
  - "At $40 Price: No Synergies -> Destroys | $100M -> Creates | $150M -> Creates | $200M -> Creates"
  - "At $45 Price: No Synergies -> Destroys | $100M -> Neutral | $150M -> Creates | $200M -> Creates"
  - "At $50 Price: No Synergies -> Destroys | $100M -> Destroys | $150M -> Neutral | $200M -> Creates"
result: "Value creation requires sufficient synergies to offset the premium paid"
note: "Shows which price/synergy combinations create value"
```

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

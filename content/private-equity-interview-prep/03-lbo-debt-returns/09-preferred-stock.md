---
id: preferred-stock
title: Preferred Stock in LBO Structures
order: 9
estimated_minutes: 30
---

# Preferred Stock in LBO Structures

## Learning Objectives

- Understand the role of preferred equity in LBO capital structures
- Model preferred stock mechanics including dividends, PIK accrual, and liquidation preferences
- Analyze how preferred equity affects common equity returns
- Recognize when sponsors use preferred structures and why
- Calculate returns for both preferred and common investors in complex structures

## Written Guide

### The Nature of Preferred Equity

Preferred stock occupies a hybrid position in the capital structure, combining characteristics of both debt and equity. Like debt, preferred typically carries a fixed dividend rate and has priority over common equity in liquidation. Like equity, preferred appears in the equity section of the balance sheet and does not have a stated maturity or mandatory redemption.

In LBO structures, preferred equity serves several strategic purposes. It provides an additional layer of capital between senior debt and common equity, often filling the "gap" when debt markets cannot provide sufficient leverage. It offers downside protection to investors willing to accept capped upside. And it can create tax-efficient structures in certain situations, though this has become more limited under recent tax law.

For PE interviewers, preferred stock questions test your ability to navigate complex capital structures and correctly calculate returns when multiple equity tranches compete for exit proceeds.

### Types of Preferred Stock

**Cumulative Preferred**: Dividends that are not paid accumulate and must be paid before any distribution to common equity. Most preferred in LBO structures is cumulative, ensuring preferred holders receive their full entitlement before common.

**Non-Cumulative Preferred**: Unpaid dividends do not accumulate. This is more common in public company capital structures than in PE transactions.

**Participating Preferred**: After receiving its liquidation preference, participating preferred also shares in remaining proceeds alongside common equity. This "double-dip" structure provides both downside protection and upside participation.

**Non-Participating Preferred**: Receives only its liquidation preference and accumulated dividends, without participating in additional upside. The holder must choose between the preference or converting to common.

**Convertible Preferred**: Can be converted to common equity at a specified ratio, allowing preferred holders to participate in upside when conversion is more valuable than the preference.

### Modeling Preferred Dividends

Preferred dividends can be paid in cash or accrued as PIK, similar to PIK debt. The modeling mechanics follow the same compounding logic:

**Cash-Pay Preferred**: Dividends are paid from operating cash flow each period, reducing cash available for debt paydown or other uses.

Annual Cash Dividend = Preferred Face Value x Dividend Rate

**PIK Preferred**: Dividends accrue and compound, increasing the preferred balance over time.

Preferred Balance(Year n) = Initial Preferred x (1 + PIK Rate)^n

**Example**: $50 million preferred with 10% PIK dividend over 5 years

Year 0: $50.00 million
Year 1: $55.00 million
Year 2: $60.50 million
Year 3: $66.55 million
Year 4: $73.21 million
Year 5: $80.53 million

At exit, preferred holders receive $80.53 million before common receives anything.

### Liquidation Preference and Waterfall

The liquidation preference specifies how much preferred holders receive before common equity participates in exit proceeds. This is typically expressed as a multiple of the original preferred investment.

**1x Liquidation Preference**: Preferred receives its original investment amount (plus accumulated PIK dividends if applicable) before common.

**2x Liquidation Preference**: Preferred receives twice its original investment before common participates. This is more protective but reduces common upside significantly.

**Participation Rights**: After the liquidation preference, participating preferred continues to receive a share of remaining proceeds, while non-participating preferred stops at the preference.

**Worked Example: Exit Waterfall with Preferred**

Capital Structure:
- Common Equity: $150 million invested (80% ownership)
- Preferred Equity: $50 million invested (20% ownership), 10% PIK, 1x liquidation preference, non-participating

After 5 years, exit equity proceeds are $400 million.

Step 1 - Calculate preferred entitlement:
Preferred Balance: $50M x 1.10^5 = $80.53M

Step 2 - Apply waterfall:
Preferred receives: $80.53M (liquidation preference)
Common receives: $400M - $80.53M = $319.47M

Step 3 - Calculate returns:
Preferred MOIC: $80.53M / $50M = 1.61x (equals the compounded PIK return)
Common MOIC: $319.47M / $150M = 2.13x

Note that preferred's return is capped at the PIK rate (10% annually = 1.61x over 5 years), while common captures the residual upside.

### Participating vs. Non-Participating Analysis

The distinction between participating and non-participating preferred significantly affects common returns.

**Same Scenario with Participating Preferred**:

Preferred receives: $80.53M (preference) + 20% x ($400M - $80.53M) = $80.53M + $63.89M = $144.42M
Common receives: $400M - $144.42M = $255.58M

Preferred MOIC: $144.42M / $50M = 2.89x
Common MOIC: $255.58M / $150M = 1.70x

The participation right increased preferred returns from 1.61x to 2.89x while reducing common returns from 2.13x to 1.70x.

**When Conversion Beats Preference**:

For convertible, non-participating preferred, holders compare the preference value to conversion value:

Preference Value: $80.53M
Conversion Value: 20% x $400M = $80M

In this case, preference slightly exceeds conversion, so holders take the preference. But at higher exit values:

Exit Proceeds: $600M
Preference Value: $80.53M
Conversion Value: 20% x $600M = $120M

Here, conversion is worth more, so rational holders convert and common equity is diluted by the converted shares.

### Sponsor Preferred Structures

In many LBOs, the PE sponsor invests both common and preferred equity, creating a blended return profile.

**Why Sponsors Use This Structure**:

1. **Downside Protection**: If the deal underperforms, the preferred tranche ensures the sponsor receives some return before common (including management equity) receives anything.

2. **Structural Flexibility**: Preferred can be structured differently from common, with different economic rights and potentially different tax treatment.

3. **Co-Investment Alignment**: Sponsors can allocate preferred to LPs seeking lower-risk exposure while retaining common for higher-risk, higher-return positioning.

**Example: Sponsor Blended Return**

Sponsor invests: $100M common + $50M preferred (10% PIK, 1x preference)
Total sponsor investment: $150M

Exit at $350M equity proceeds after 5 years:
Preferred receives: $50M x 1.10^5 = $80.53M
Common receives: $350M - $80.53M = $269.47M (sponsor owns 100%)
Total sponsor proceeds: $80.53M + $269.47M = $350M

Sponsor MOIC: $350M / $150M = 2.33x

If the deal only returns $100M equity:
Preferred receives: $80.53M (limited by available proceeds)
Common receives: $100M - $80.53M = $19.47M
Total sponsor proceeds: $100M

Sponsor MOIC: $100M / $150M = 0.67x

Without preferred structure (all common): $100M / $150M = 0.67x (same)

The preferred structure does not help the sponsor in this case because they own all the equity. However, if management had 20% of common:

With preferred (sponsor owns 100% of preferred, 80% of common):
Preferred receives: $80.53M
Common receives: $19.47M (sponsor gets 80% = $15.58M)
Total sponsor: $80.53M + $15.58M = $96.11M on $130M investment = 0.74x

Without preferred (sponsor owns 80% of total):
Sponsor receives: 80% x $100M = $80M on $120M investment = 0.67x

The preferred structure improved sponsor MOIC from 0.67x to 0.74x by shifting economics away from management in the downside case.

### Interview Questions on Preferred

**"How does adding preferred equity affect common returns?"**

Preferred creates a senior claim that must be satisfied before common receives proceeds. In upside scenarios where exit proceeds significantly exceed the preference, common returns are only modestly diluted. In downside scenarios, preferred absorbs more of the limited proceeds, significantly reducing common returns. Participating preferred is particularly dilutive because it claims both preference and pro-rata upside.

**"When would a sponsor use preferred versus more debt?"**

Preferred is used when: debt markets cannot provide sufficient leverage (lender appetite is limited), the company cannot service additional cash interest (cash flow constrained), or the sponsor wants structural flexibility that debt covenants would restrict. Unlike debt, preferred does not have covenants, cannot trigger defaults, and does not amortize. However, preferred is more expensive than debt on an all-in basis because it sits below debt in priority.

**"Calculate the returns to common if we exit at $500M with the following structure..."**

Walk through the waterfall systematically: first calculate what each preferred tranche receives (preference plus any PIK accrual plus any participation), then the residual flows to common. Always check whether conversion would yield more than preference for convertible instruments.

## Key Takeaways

- Preferred equity is a hybrid instrument with debt-like fixed payments and equity-like balance sheet treatment
- Preferred dividends can be cash-pay or PIK, with PIK creating compounding balance growth similar to PIK debt
- Liquidation preferences (typically 1x) ensure preferred is repaid before common receives exit proceeds
- Participating preferred "double-dips" by taking both preference and pro-rata share of remaining proceeds
- Sponsors use preferred structures for downside protection, flexibility, and to shape economics with management
- Interview questions test the ability to calculate returns through complex waterfalls with multiple equity tranches

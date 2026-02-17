---
id: public-company-ev-build
title: Public Company Enterprise Value Build
order: 3
estimated_minutes: 25
---

# Public Company Enterprise Value Build

## Learning Objectives

- Calculate enterprise value for public companies with precision and accuracy
- Navigate the complexities of diluted shares outstanding, including options and convertibles
- Explain the treatment of debt-like and equity-like items in the enterprise value bridge
- Demonstrate interview-ready competence on enterprise value questions

## Written Guide

### Why Enterprise Value Calculations Matter in LBOs

When a private equity firm acquires a public company, the offer price per share is what shareholders see. But the true cost of the acquisition—what the sponsor actually pays—is the enterprise value. Understanding how to bridge from equity value to enterprise value is fundamental to structuring an LBO.

The enterprise value represents the total claim on the company's operating assets. It includes what you pay to shareholders (equity value) plus what you assume from creditors (debt), adjusted for cash and other items. Getting this calculation wrong means getting the entire transaction economics wrong.

In interviews, enterprise value questions test whether you understand the conceptual distinction between equity holders and all capital providers. They also test your attention to detail—the treatment of convertible securities, minority interests, and debt-like items trips up many candidates.

### The Core Enterprise Value Formula

The foundation of enterprise value is straightforward:

**Enterprise Value = Equity Value + Net Debt**

Where:
- Equity Value = Share Price × Diluted Shares Outstanding
- Net Debt = Total Debt - Cash and Cash Equivalents

But this simple formula obscures significant complexity. The challenge lies in correctly calculating diluted shares and in identifying all the debt-like and equity-like items that adjust enterprise value.

### Calculating Diluted Shares Outstanding

Basic shares outstanding is the starting point. This is the actual number of shares issued and outstanding, found on the cover of the 10-K or 10-Q.

Diluted shares add the impact of potentially dilutive securities. These include:

**Stock Options**: When options are exercised, new shares are issued. The treasury stock method calculates the net dilutive impact. First, calculate proceeds from exercise (options × exercise price). Then, determine how many shares those proceeds could repurchase at the current stock price. The difference represents net new shares.

For example: 1 million options with $20 strike price, current stock price $50.
- Gross shares from exercise: 1 million
- Proceeds from exercise: $20 million
- Shares repurchased at $50: 400,000
- Net dilutive shares: 600,000

**Restricted Stock Units (RSUs)**: RSUs are fully dilutive because no exercise price is paid. Each RSU converts to one share upon vesting. Include unvested RSUs that are expected to vest based on time or performance conditions.

**Convertible Securities**: Convertible bonds or preferred stock may convert to common equity. Apply the if-converted method—assume full conversion and calculate the resulting shares. The conversion ratio determines how many shares each bond or preferred share becomes.

For convertibles, you must also adjust the enterprise value bridge. If you include the shares from conversion, you must exclude the convertible debt from net debt (since it has been treated as equity).

**Warrants**: Similar to options, warrants grant the right to purchase shares at a specified price. Apply the treasury stock method.

### The Full Enterprise Value Bridge

Starting from equity value, the complete bridge to enterprise value includes:

**Equity Value**
\+ Total Debt (short-term and long-term)
\+ Minority Interest (non-controlling interest)
\+ Preferred Stock (if not included in equity value)
\+ Capital Leases (operating leases may also be capitalized under ASC 842)
\+ Unfunded Pension Liabilities
\+ Contingent Liabilities (earnouts, litigation reserves)
\- Cash and Cash Equivalents
\- Short-term Investments
\- Equity Method Investments (if marked to market)
\- Net Operating Loss Tax Assets (at present value)
= **Enterprise Value**

Each adjustment requires judgment. The principle is that enterprise value should capture all claims on operating assets and exclude non-operating assets.

### Treatment of Specific Items

**Minority Interest**: When the target company consolidates a subsidiary it does not fully own, the financial statements include 100% of that subsidiary's operations. But the target only owns its percentage share. Minority interest represents the outside ownership claim. Adding minority interest to enterprise value ensures consistency—since EBITDA includes 100% of the subsidiary's earnings, enterprise value must include 100% of its value.

**Convertible Debt**: This requires careful treatment to avoid double-counting. If you treat the convertible as equity (including converted shares in diluted shares), exclude it from debt. If you treat it as debt (including it in net debt), exclude the converted shares. Choose one approach and apply it consistently.

In an LBO context, you typically treat convertible debt as debt because bondholders will be cashed out at the greater of par value or conversion value. The acquisition triggers the conversion or redemption.

**Operating Leases**: Under ASC 842, operating leases are capitalized on the balance sheet. The right-of-use asset and lease liability appear in both assets and liabilities. For enterprise value purposes, include the lease liability as debt. This creates consistency with EBITDA metrics (since rent expense is now split between depreciation and interest).

**Cash**: Only operating cash should be netted against debt. If the company has restricted cash (pledged for specific purposes) or cash trapped in foreign subsidiaries (with repatriation costs), you may adjust the net debt calculation accordingly.

### A Complete Public Company Example

Consider acquiring a public company with the following characteristics:

- Stock price: $50.00
- Basic shares outstanding: 100 million
- Stock options: 10 million options at $30 strike price
- RSUs: 2 million unvested units
- Convertible bonds: $500 million face value, convertible at $40 per share
- Total debt (excluding convertibles): $800 million
- Cash: $200 million
- Minority interest: $50 million

**Step 1: Diluted Shares**

Basic shares: 100 million

Options (treasury stock method):
- Gross shares: 10 million
- Proceeds: $300 million
- Shares repurchased at $50: 6 million
- Net dilutive: 4 million

RSUs: 2 million (fully dilutive)

Convertibles: $500M ÷ $40 = 12.5 million shares
(Since conversion price is below current price, bondholders would convert)

Diluted shares: 100 + 4 + 2 + 12.5 = 118.5 million

**Step 2: Equity Value**

Equity value: 118.5 million × $50 = $5,925 million

**Step 3: Enterprise Value Bridge**

Equity value: $5,925 million
\+ Total debt (non-convertible): $800 million
\+ Convertible bonds: $0 (treated as equity since included in diluted shares)
\+ Minority interest: $50 million
\- Cash: ($200 million)
= Enterprise value: $6,575 million

This $6.575 billion enterprise value is what drives the LBO Sources and Uses.

### Interview Tips

When asked about enterprise value, structure your response clearly. Start with equity value (price × diluted shares), then walk through each adjustment with explanation. Common follow-up questions include:

"Why do you add minority interest?" Because EBITDA includes 100% of subsidiary earnings, so we need 100% of subsidiary value.

"How do you handle convertibles?" Depends on conversion price versus current price. If in-the-money, treat as equity using if-converted method. If out-of-the-money, treat as debt.

"Why subtract cash?" Because an acquirer gets the cash along with the operating business. Net of cash, the effective cost is lower.

These questions test whether you understand the principles, not just the formula.

## Video Placeholder

**Video Title**: Public Company Enterprise Value Calculations

**Outline**:
- Why EV calculations matter for LBO structuring
- The core formula: Equity Value + Net Debt
- Calculating diluted shares: options (treasury stock method), RSUs, convertibles
- The complete EV bridge: debt, minority interest, pensions, leases, cash
- Treatment of convertible securities: equity vs. debt approach
- Worked example with all components
- Common interview questions and how to answer them

**Suggested Length**: 15 minutes

## Key Takeaways

- Enterprise value represents the total claim on operating assets: Equity Value + Net Debt + Adjustments
- Diluted shares include basic shares plus net dilutive impact of options (treasury stock method), RSUs, and convertible securities (if-converted method)
- Add minority interest because consolidated financials include 100% of subsidiary operations
- Convertible securities require consistent treatment: if included in diluted shares, exclude from debt (and vice versa)
- Operating leases are now capitalized under ASC 842 and typically included in debt for EV calculations
- Only operating cash is subtracted; restricted cash and trapped cash may require adjustment

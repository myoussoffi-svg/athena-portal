---
id: rollover-equity-management
title: Rollover Equity and Management Incentives
order: 2
estimated_minutes: 40
---

# Rollover Equity and Management Incentives

## Learning Objectives

- Model rollover equity mechanics and their impact on sponsor returns and ownership
- Understand management incentive plan structures including options, ratchets, and promotes
- Calculate management proceeds under various exit scenarios
- Analyze how incentive structures drive management behavior and alignment

## Written Guide

### The Partnership Between Sponsors and Management

Private equity firms do not operate portfolio companies—management teams do. Aligning management incentives with sponsor objectives is therefore critical to value creation. Every deal involves careful negotiation of how management participates in the upside, and sophisticated candidates must understand these structures deeply.

When you are working on a deal, the management equity pool will directly affect sponsor returns. Getting these calculations wrong in your model undermines the entire returns analysis.

### Rollover Equity Fundamentals

In most management buyouts, selling shareholders include executives who will continue running the business. Rather than cashing out entirely, these managers "roll over" a portion of their proceeds into equity in the new entity. This serves multiple purposes: it demonstrates management conviction in the business plan, aligns ongoing incentives, and reduces the sponsor's required equity contribution.

Consider a $400 million acquisition where the CEO owns 15% of the target, worth $60 million. If she rolls 50% of her proceeds, she contributes $30 million to the new equity capitalization alongside the sponsor's investment. At exit, she participates pro-rata in the equity value based on her rolled ownership percentage.

The modeling mechanics require tracking rollover as a separate equity tranche. Rolled equity typically invests at the same valuation as sponsor equity—if the sponsor pays 10x EBITDA, management's rolled shares convert at equivalent value. Your sources and uses must reflect the rollover: it reduces cash paid to sellers while simultaneously reducing sponsor equity required.

The returns calculation then separates sponsor returns from total equity returns. If $100 million of total equity generates $300 million at exit, that is a 3.0x gross return. But if $20 million was rollover equity, sponsor returns are calculated on their $80 million only. Their $240 million of proceeds (80% of $300 million) represents the same 3.0x return on their capital.

### Management Equity Pool and Option Structures

Beyond rollover, sponsors reserve an equity pool for management incentives—typically 10-20% of fully diluted equity. This pool funds various instruments designed to reward performance.

**Stock options** grant management the right to purchase shares at a strike price, usually the entry valuation. If exit equity value exceeds the strike-adjusted amount, management captures the spread. Options have no downside (they simply expire worthless) but can deliver substantial upside. Vesting schedules, typically four to five years, encourage retention.

**Restricted stock** grants shares outright but subjects them to vesting and sometimes performance conditions. Management participates dollar-for-dollar with sponsors from entry value, sharing both upside and downside proportionally.

The pool allocation directly impacts sponsor economics. A 15% management pool means sponsors own 85% of common equity (assuming no rollover). Your model must dilute sponsor ownership accordingly when calculating their share of exit proceeds.

### Performance Ratchets and Promotes

To more precisely align incentives around value creation, sponsors often structure management participation to increase if certain performance thresholds are achieved.

**Ratchets** adjust management ownership based on exit outcomes. A typical structure might provide management 10% of equity at base, increasing to 15% if exit returns exceed 2.5x and to 20% if returns exceed 3.5x. This rewards outsized performance without giving away equity for merely acceptable outcomes.

**Promote structures** work similarly but often focus on specific value creation metrics. If management achieves EBITDA targets or completes strategic initiatives, their pool increases. Unlike IRR-based ratchets, metric-based promotes reward operational performance regardless of exit timing.

Modeling ratchets requires calculating returns at each threshold and determining which tier management achieves. If base case returns hit 2.8x, management receives the 15% tier, reducing sponsor ownership to 85%. Your sensitivity analysis should show how returns accrue differently to sponsors versus management across scenarios.

### Carried Interest and Sponsor Promote

Within PE funds, principals participate through carried interest—typically 20% of profits above an 8% preferred return hurdle. Deal teams often receive deal-level carry allocations, creating strong individual incentives for successful outcomes.

For modeling purposes, carry affects fund-level returns but not company-level analysis. However, understanding the carry dynamic helps explain why deal partners push hard on value creation—their personal economics depend on it.

Some structures include GP co-invest, where partners invest personal capital alongside the fund. This investment earns the same returns as fund LPs but without management fees or carry drag.

### Impact on Sponsor Returns

Every dollar of management proceeds reduces sponsor proceeds. A deal generating $500 million of equity value distributes differently under various management structures:

- **No management pool**: Sponsor receives 100%, or $500 million
- **15% pool, straight participation**: Management receives $75 million, sponsor receives $425 million
- **15% pool with 2.5x ratchet achieved**: Management receives 20%, or $100 million; sponsor receives $400 million

Your model must accurately capture these dynamics to provide meaningful sponsor returns. When presenting a deal, be prepared to explain management economics alongside sponsor returns—they are interconnected.

### Negotiation Dynamics

Management teams and their advisors negotiate hard on incentive structures. Founders seek maximum participation with downside protection. Sponsors seek to reward performance while preserving their economics. The resulting structure reflects this negotiation.

In interviews, demonstrating awareness of these tensions shows deal sophistication. Why might a sponsor prefer options over restricted stock? Options require value creation above entry to pay off, maintaining pressure to perform. Why might management prefer ratchets tied to EBITDA versus IRR? EBITDA metrics are within their control, while IRR depends on exit timing and market conditions they cannot influence.

## Key Takeaways

- Rollover equity reduces sponsor capital requirements while aligning management incentives, requiring separate tracking in your sources and uses and returns waterfall
- Management equity pools typically represent 10-20% of fully diluted equity, directly diluting sponsor ownership and returns
- Ratchets and promotes increase management participation when performance exceeds thresholds, requiring scenario-based modeling to capture varying ownership levels
- Options provide asymmetric payoffs with upside participation but no downside exposure, while restricted stock shares both proportionally
- Accurately modeling management proceeds is essential—sponsor returns depend on correctly calculating their share after management participation

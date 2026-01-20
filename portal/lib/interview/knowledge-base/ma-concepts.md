# M&A Concepts Knowledge Base

> Comprehensive technical reference for Investment Banking interview preparation.
> Sources: BIWS 400 Questions, iBanking Insider, Wall Street Prep RedBook, 10X EBITDA Core Technicals, CFI Interview Guide

---

## 1. M&A Overview

### What is M&A?
Mergers and Acquisitions refers to the consolidation of companies through various types of transactions.

**Merger:** Two companies combine to form a new entity
**Acquisition:** One company purchases another

### Why Do Companies Pursue M&A?

**Strategic Rationale:**
- Synergies (cost savings, revenue enhancement)
- Market expansion (new geography, customers)
- Vertical integration (supply chain control)
- Horizontal integration (market share, economies of scale)
- Technology/IP acquisition
- Talent acquisition (acqui-hire)
- Eliminate competition
- Diversification

**Financial Rationale:**
- EPS accretion
- Multiple arbitrage (buy at lower multiple)
- Tax benefits
- Undervalued target

**Other Motivations (Less Ideal):**
- Empire building
- Defensive (prevent being acquired)
- Executive compensation

---

## 2. Buyer Types

### Strategic Buyers
Companies in the same or adjacent industry acquiring targets for operational reasons.

**Characteristics:**
- Can realize synergies
- Typically pay higher prices
- Longer integration horizon
- Strategic fit important
- May eliminate competition

**Examples:** Microsoft acquiring LinkedIn, Disney acquiring Fox

### Financial Buyers (Private Equity)
Investment firms acquiring companies primarily for financial returns.

**Characteristics:**
- Focus on standalone returns
- Cannot realize synergies (mostly)
- Shorter hold period (3-7 years)
- Require specific return thresholds (20-25% IRR)
- Use significant leverage

**Examples:** KKR, Blackstone, Apollo, Carlyle

### Why Strategics Pay More
- Synergy value (cost savings, revenue enhancement)
- Longer investment horizon
- Don't require same IRR hurdle
- Defensive value (prevent competitor acquisition)

---

## 3. Synergies

### Types of Synergies

**Cost Synergies:**
- Eliminate duplicate functions (HR, finance, IT)
- Consolidate facilities/real estate
- Procurement savings (volume discounts)
- Workforce reduction
- Technology consolidation

**Characteristics:**
- More predictable and achievable
- Usually realized within 1-2 years
- Typically valued at 75-100% probability

**Revenue Synergies:**
- Cross-selling opportunities
- New market access
- Bundled product offerings
- Increased pricing power

**Characteristics:**
- Less predictable
- Longer to achieve (2-3+ years)
- Often valued at 25-50% probability
- Harder to prove in models

### Synergy Valuation

**Present Value of Synergies:**
```
PV of Synergies = Annual Synergies / WACC (if perpetual)
```

Or more accurately:
```
NPV = Σ (Synergies_t / (1 + WACC)^t)
```

### Who Captures Synergy Value?
- Bidding process typically transfers synergy value to seller
- Competitive auctions result in higher premiums
- Buyer hopes to retain some synergy value above premium paid

---

## 4. Accretion/Dilution Analysis

### What is Accretion/Dilution?
Analysis of how an acquisition affects the acquirer's Earnings Per Share (EPS).

**Accretive:** Combined EPS > Acquirer's standalone EPS (good)
**Dilutive:** Combined EPS < Acquirer's standalone EPS (bad)

### Basic Mechanics

**Step 1: Calculate Pro Forma Net Income**
```
Combined Net Income = Acquirer NI + Target NI
                    + Synergies × (1 - Tax Rate)
                    - Foregone Interest on Cash Used × (1 - Tax Rate)
                    - New Interest Expense × (1 - Tax Rate)
                    - Incremental D&A from Write-ups × (1 - Tax Rate)
```

**Step 2: Calculate Pro Forma Shares**
```
Pro Forma Shares = Acquirer Shares + New Shares Issued (if stock deal)
```

**Step 3: Calculate Pro Forma EPS**
```
Pro Forma EPS = Combined Net Income / Pro Forma Shares
```

**Step 4: Compare to Standalone**
```
Accretion/(Dilution) = (Pro Forma EPS - Standalone EPS) / Standalone EPS
```

### P/E Rule of Thumb

**All-Stock Deal:**
- Higher P/E buyer + Lower P/E target = Accretive
- Lower P/E buyer + Higher P/E target = Dilutive

**Why?**
- Higher P/E buyer is "expensive" currency
- Fewer shares needed to buy target
- Target earnings boost EPS more than shares dilute it

### Cash vs Stock Consideration

**Cash Deal:**
- No share dilution
- But lose interest income on cash
- Or incur interest expense on debt
- Generally less dilutive if acquirer has low P/E

**Stock Deal:**
- Share dilution
- No cash/interest impact
- More dilutive if acquirer P/E < target P/E

**Mixed Consideration:**
- Combination of cash and stock
- Allows optimization of accretion/dilution
- Balances risk between buyer and seller

---

## 5. Purchase Accounting

### Overview
When one company acquires another, the transaction is recorded at fair value using acquisition method accounting.

### Key Steps

**1. Allocate Purchase Price**
- Identify all assets and liabilities at fair value
- Excess purchase price over net assets = Goodwill + Intangibles

**2. Fair Value Adjustments**
Common write-ups:
- PP&E to fair market value
- Inventory to FMV
- Intangible assets (customer relationships, brand, technology)

### Goodwill Calculation

```
Goodwill = Purchase Price
         - Fair Value of Tangible Assets
         - Fair Value of Identifiable Intangible Assets
         + Fair Value of Liabilities Assumed
```

Simplified:
```
Goodwill = Purchase Price - Fair Value of Net Identifiable Assets
```

### Impact on Financial Statements

**Balance Sheet:**
- Target assets/liabilities recorded at fair value
- New intangible assets recognized
- Goodwill created
- Old target equity eliminated, new acquisition equity created

**Income Statement:**
- Higher D&A from asset write-ups
- Amortization of definite-life intangibles
- Goodwill not amortized (tested for impairment)

---

## 6. Deferred Taxes in M&A

### Asset Write-Up Creates DTL

When assets are written up to fair value:
- Book basis increases (higher depreciation)
- Tax basis stays at original cost
- Temporary difference creates Deferred Tax Liability

**Formula:**
```
DTL Created = Asset Write-Up × Tax Rate
```

**Impact on Goodwill:**
- DTL created reduces net assets acquired
- Therefore increases Goodwill

### Asset Write-Down Creates DTA

Less common, but:
```
DTA Created = Asset Write-Down × Tax Rate
```

### Section 338(h)(10) Election
- Treat asset purchase as stock purchase for legal purposes
- But get tax benefits of asset deal
- Step-up in tax basis of assets
- Creates larger tax shield going forward

---

## 7. Transaction Structure

### Stock Purchase
- Buyer acquires target's stock from shareholders
- Target remains intact as subsidiary
- Buyer inherits all assets AND liabilities (known and unknown)
- Generally simpler execution
- No step-up in tax basis (unless 338(h)(10))

### Asset Purchase
- Buyer acquires specific assets (and assumes specific liabilities)
- Can cherry-pick assets, exclude liabilities
- Step-up in tax basis (higher future depreciation)
- More complex (requires asset transfer)
- Target remains as shell (or liquidates)

### Merger
- Companies combine into single entity
- Acquiring company survives, target ceases to exist
- Or new company formed from both

### Consideration Types

**All Cash:**
- Clean, simple
- Certainty of value for seller
- May require financing
- Tax implications for seller

**All Stock:**
- Preserves cash
- Shares transaction risk/upside with seller
- May be dilutive
- Exchange ratio negotiation

**Cash and Stock:**
- Flexibility
- Balances interests
- Complex negotiation

---

## 8. M&A Valuation

### Determining Purchase Price

**Standalone Value:**
- DCF of target
- Comparable companies
- Precedent transactions

**Plus: Control Premium**
- Typically 25-50% over market price
- Reflects value of control

**Plus: Synergy Value**
- NPV of expected synergies
- Often shared with seller (competition)

### Exchange Ratio (Stock Deals)

**Fixed Exchange Ratio:**
```
Exchange Ratio = Offer Price / Acquirer Stock Price
```

Example: Offer $50, Acquirer stock = $100
Exchange Ratio = 0.5 (target shareholders get 0.5 acquirer shares per target share)

**Fixed Value vs Fixed Ratio:**
- Fixed Value: Exchange ratio floats to deliver promised dollar value
- Fixed Ratio: Shareholders share price risk between signing and closing

### Break-Even Analysis

**Break-Even Synergies:**
What synergies are needed to make deal neutral to EPS?

**Break-Even Premium:**
Maximum premium to achieve target return metrics

---

## 9. Merger Defenses

### Pre-Emptive Defenses

**Staggered Board:**
- Directors elected in classes (e.g., 1/3 per year)
- Takes multiple years to gain board control
- Makes hostile takeover slower

**Poison Pill (Shareholder Rights Plan):**
- Triggered if hostile bidder acquires threshold (typically 15-20%)
- Existing shareholders can buy shares at discount
- Massively dilutes hostile bidder
- Forces negotiation with board

**Supermajority Voting:**
- Requires more than simple majority to approve deal
- Often 67-80% for significant transactions

**Fair Price Provisions:**
- Requires acquirer to pay fair price to all shareholders
- Prevents two-tier offers

### Reactive Defenses

**White Knight:**
- Friendly acquirer that company prefers
- Used to defeat hostile bidder

**White Squire:**
- Friendly investor takes large stake
- Blocks hostile takeover without full acquisition

**Pac-Man Defense:**
- Target attempts to acquire the acquirer
- Rare, requires significant resources

**Greenmail:**
- Company buys back shares from hostile bidder at premium
- Criticized as paying off raiders

**Litigation:**
- Sue to block deal
- Antitrust, disclosure violations, etc.

---

## 10. M&A Process

### Sell-Side Process

**Phase 1: Preparation**
- Engage investment bank
- Prepare marketing materials (CIM, management presentation)
- Build financial model
- Identify potential buyers

**Phase 2: Marketing**
- Contact potential buyers
- Sign NDAs, distribute CIM
- First round bids
- Select shortlist for management meetings

**Phase 3: Due Diligence**
- Open data room
- Management presentations
- Site visits
- Final bids

**Phase 4: Negotiation & Close**
- Select winning bidder
- Negotiate terms
- Definitive agreement
- Regulatory approvals
- Close transaction

### Buy-Side Process

**Initial Screen:**
- Identify potential targets
- High-level analysis

**Preliminary Due Diligence:**
- Review public information
- Initial valuation

**Expression of Interest / Indication of Interest (IOI):**
- Non-binding indication of price range
- Gets access to more information

**Full Due Diligence:**
- Detailed review of data room
- Legal, accounting, operational diligence
- Expert consultant reports

**Letter of Intent (LOI):**
- Generally non-binding (except exclusivity)
- Outlines key terms

**Definitive Agreement:**
- Binding contract
- Reps and warranties
- Indemnification

---

## 11. Key M&A Documentation

### Non-Disclosure Agreement (NDA)
- Confidentiality terms
- Use restrictions
- Non-solicitation of employees

### Indication of Interest (IOI)
- Preliminary, non-binding
- Price range
- Structure/consideration
- Timing
- Conditions

### Letter of Intent (LOI)
- More detailed terms
- Usually non-binding (except exclusivity, confidentiality)
- Exclusivity period (30-90 days)
- Break-up fees

### Definitive Agreement (DA)
- Binding contract
- Purchase price and adjustments
- Representations and warranties
- Covenants
- Conditions to closing
- Indemnification
- Termination provisions

### Working Capital Adjustment
- Sets target working capital at close
- Actual vs target comparison
- Adjustment to purchase price post-closing

---

## 12. Common M&A Interview Questions

### "Walk me through a basic merger model"
1. Project standalone financials for both companies
2. Estimate purchase price and transaction assumptions
3. Determine consideration (cash, stock, debt)
4. Calculate pro forma shares outstanding
5. Combine income statements
6. Apply adjustments (synergies, foregone interest, new interest, D&A)
7. Calculate pro forma EPS
8. Compare to standalone for accretion/dilution

### "Why might an acquisition be dilutive?"
- Target P/E > Acquirer P/E (in stock deal)
- No or limited synergies
- High acquisition premium
- Significant financing costs
- Large intangible amortization

### "Company A has P/E of 20x, Company B has P/E of 15x. In an all-stock deal, is it accretive or dilutive to A?"
Accretive. A's "expensive" stock buys B's "cheap" earnings. A is paying with high P/E currency to acquire low P/E earnings, boosting combined EPS.

### "How do synergies affect accretion/dilution?"
Synergies increase combined net income (after-tax).
Higher net income improves pro forma EPS.
Can turn dilutive deal into accretive deal.

### "What creates Goodwill in an acquisition?"
Purchase price above fair value of net identifiable assets.
Represents: synergies, growth potential, brand value, workforce, customer relationships (not separately identifiable).

### "How does the mix of cash vs stock affect a deal?"
**More Cash:**
- No share dilution
- Uses cash or requires debt
- Interest expense reduces EPS
- Seller has certain value

**More Stock:**
- Dilutes shares outstanding
- Preserves cash
- Shares risk with seller
- More dilutive if buyer P/E is low

### "What's the difference between purchase price and enterprise value in M&A?"
- Purchase price = what acquirer pays to equity holders
- Enterprise value = purchase price + assumed debt - acquired cash
- EV represents total cost to acquire and fund the business

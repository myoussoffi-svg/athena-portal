---
id: complex-debt-structures
title: Complex Debt Structures
order: 3
estimated_minutes: 45
---

# Complex Debt Structures

## Learning Objectives

- Model unitranche facilities and their blended cost characteristics
- Understand second lien and mezzanine debt mechanics including PIK toggles
- Analyze covenant structures and their implications for financial flexibility
- Calculate all-in debt costs including OID, arrangement fees, and prepayment penalties

## Written Guide

### The Evolution of LBO Financing

The days of simple senior secured term loans and high-yield bonds have given way to increasingly sophisticated debt structures. Direct lenders, credit funds, and specialized mezzanine providers compete with traditional banks, creating financing options that did not exist a decade ago. As a PE associate, you will evaluate these alternatives and model their impact on deal economics.

Understanding these structures is not optional—the debt financing strategy fundamentally shapes the returns profile of every leveraged transaction.

### Unitranche Facilities

Unitranche financing combines senior and subordinated debt into a single facility with one set of documents and one blended interest rate. A typical unitranche might price at SOFR plus 650 basis points, higher than pure senior but lower than layered senior plus mezzanine.

The appeal is simplicity and speed. Rather than negotiating with multiple lender groups, sponsors work with a single direct lender or small club. Documentation is faster, and intercreditor issues disappear. For middle-market deals, unitranche has become the dominant structure.

From a modeling perspective, unitranche is straightforward: one debt tranche, one interest rate, one amortization schedule. However, you should understand the implicit economics. The lender is effectively providing both senior and junior capital at a blended rate. If you could finance separately at SOFR plus 400 for senior and SOFR plus 900 for mezz, a SOFR plus 650 unitranche reflects roughly 60% senior and 40% junior economics.

Unitranche facilities often include **delayed draw term loans** (DDTLs)—committed but undrawn capacity for acquisitions or capital expenditures. You pay a commitment fee on the undrawn portion, typically 50-100 basis points, and draw as needed. Your model should reflect DDTL draws in add-on scenarios.

### Second Lien Term Loans

Second lien debt is secured by the same collateral as first lien but with subordinate priority. In a bankruptcy or liquidation, first lien holders are paid in full before second lien receives anything. This structural subordination commands a premium—second lien typically prices 300-500 basis points above first lien.

Second lien creates incremental leverage capacity without moving to unsecured debt. A business that can support 4.0x first lien might accommodate an additional 1.5x of second lien, bringing total secured leverage to 5.5x at a blended cost well below unsecured alternatives.

The **intercreditor agreement** between first and second lien holders governs their relationship, including standstill periods during which second lien cannot take enforcement action. Your model must track each tranche separately with its respective interest rate and covenant package.

### Mezzanine and Subordinated Debt

Mezzanine debt sits between senior secured debt and equity in the capital structure. It is typically unsecured, often includes **PIK interest** components, and may carry **equity warrants** or conversion features. All-in returns to mezzanine providers often target 15-20%, combining current cash interest, PIK accrual, and equity participation.

Consider a mezzanine tranche with 8% cash interest, 6% PIK, and warrants for 3% of equity. The cash pay costs $8 million annually on a $100 million tranche. The PIK accrues, growing the principal balance—after five years, you owe $134 million of principal. The warrants participate in equity upside, adding to lender returns if the deal performs.

**PIK toggle** features allow borrowers to elect PIK treatment when cash flow is constrained, converting to cash pay when operations improve. This flexibility comes at a cost—PIK rates typically exceed cash pay rates by 100-200 basis points.

Your model must track the accreting mezzanine balance and include warrant dilution in the equity waterfall. Mezzanine repayment priority comes after senior debt but before equity, affecting cash available for distributions.

### Covenant Structures and Flexibility

Debt agreements include **covenants** that restrict borrower actions or require maintenance of financial metrics. Understanding covenant structures helps you assess financial flexibility and identify potential constraints on value creation initiatives.

**Maintenance covenants** require ongoing compliance with metrics like leverage ratios or fixed charge coverage. Breach triggers default, even if the company is current on payments. Traditional bank debt emphasizes maintenance covenants.

**Incurrence covenants** only apply when taking specified actions—raising additional debt, paying dividends, or making acquisitions. Covenant-lite (cov-lite) loans rely primarily on incurrence covenants, providing flexibility as long as the company avoids triggering events.

For modeling purposes, build covenant compliance tests into your projections. If your base case approaches covenant thresholds, you have limited margin for underperformance before technical default becomes a concern.

### Calculating True All-In Cost

The stated interest rate understates actual borrowing costs. A comprehensive analysis includes several additional components.

**Original issue discount (OID)** represents upfront fees embedded in purchase price. A term loan with 2 points of OID means you receive $98 million of proceeds on a $100 million commitment but owe the full $100 million. This effectively increases yield to the lender.

**Arrangement and commitment fees** compensate lenders for underwriting risk. These are one-time costs at closing, typically 1-3% of committed amounts.

**Prepayment penalties** (call protection) discourage early refinancing. A typical structure might impose a 2% penalty in year one, 1% in year two, then callable at par. If you refinance early to capture lower rates, these penalties add to all-in costs.

To calculate effective yield, spread these fees over expected hold period. A five-year loan at SOFR plus 500 with 2 points OID and 1% arrangement fee effectively costs roughly SOFR plus 560 annually, assuming the term loan is held to maturity.

### Debt Capacity and Leverage Targets

Different debt providers have different risk appetites and return requirements. Understanding market conventions helps you structure appropriate capitalization.

First lien providers typically underwrite to 4.0-5.5x leverage for quality businesses, requiring minimum fixed charge coverage of 1.2-1.5x. Second lien adds 1.0-2.0x incremental leverage. Mezzanine can push total leverage to 6.5-7.5x in aggressive structures.

Your model should sensitivity test leverage levels to ensure the debt service is manageable across scenarios. A structure that works in your base case but breaches covenants with modest underperformance is not appropriately structured.

## Key Takeaways

- Unitranche facilities blend senior and junior economics into a single tranche, offering execution simplicity at an intermediate cost of capital
- Second lien debt expands leverage capacity through collateral subordination, typically pricing 300-500 basis points above first lien
- Mezzanine debt combines cash pay interest, PIK accrual, and potential equity participation, targeting 15-20% all-in returns
- Covenant structures determine financial flexibility—maintenance covenants require ongoing compliance while incurrence covenants only apply when taking specified actions
- Calculate true all-in cost by incorporating OID, fees, and prepayment penalties alongside stated interest rates

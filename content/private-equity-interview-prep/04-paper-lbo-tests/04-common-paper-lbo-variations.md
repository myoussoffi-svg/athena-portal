---
id: common-paper-lbo-variations
title: Common Paper LBO Variations
order: 4
estimated_minutes: 40
---

Standard paper LBOs follow the framework we've covered: calculate entry, project growth, estimate cash flow, compute exit returns. But interviewers like to test flexibility by changing what's given and what you need to solve for. This lesson covers the most common variations and how to approach each one.

## Variation 1: Solving Backward from a Target IRR

This is perhaps the most common variation. Instead of asking "what's the IRR," interviewers ask "what entry multiple can we pay to achieve a 20% IRR?"

The key insight is working backwards. You know the required return, so you calculate what exit equity you need, then determine the maximum entry equity.

Example: "$50M EBITDA company, growing 5% annually. You want 20% IRR over 5 years with 5x leverage. Exit multiple is 8x. What's the maximum entry multiple?"

Step 1: Calculate required entry-to-exit equity relationship. A 20% IRR over 5 years means approximately 2.5x your money (from our mental math table).

Step 2: Calculate Year 5 EBITDA. 5% growth for 5 years is 28%, so $50M becomes $64M.

Step 3: Calculate exit equity. Exit EV is $64M times 8x equals $512M. You need to estimate debt at exit. Assume you entered at, say, 7x multiple (we'll verify this). Entry EV would be $350M, debt at 5x EBITDA is $250M. Estimate $150M paydown (rough cash flow estimate), leaving $100M debt. Exit equity is $512M minus $100M equals $412M.

Step 4: Calculate required entry equity. If exit equity is $412M and you need 2.5x, entry equity must be $412M divided by 2.5 equals $165M.

Step 5: Calculate implied entry multiple. Entry equity of $165M plus debt of $250M equals $415M EV. Divided by $50M EBITDA is 8.3x.

Step 6: Verify by working forward. This iterative check shows you understand the circular reference between entry multiple, debt levels, and cash flows. The answer is approximately 8x entry to achieve 20% IRR.

Present your answer with context: "We can pay up to around 8x entry and still hit our 20% hurdle, assuming the exit multiple holds. That gives us limited cushion; if multiples compress to 7x at exit, returns drop significantly."

## Variation 2: Multiple Compression Scenarios

Interviewers often want to see how you think about downside scenarios where exit multiples are lower than entry.

Example: "Same company as before: $50M EBITDA, 8x entry, 5x leverage, 5% growth. What happens to returns if exit multiples compress to 6x?"

First, quickly calculate the base case (8x exit) for comparison. Year 5 EBITDA is $64M. Exit EV at 8x is $512M. Assuming $100M remaining debt, exit equity is $412M versus $200M entry equity (entry was $400M EV, $250M debt, $150M equity... wait, let me recalculate with 5x leverage on $50M: debt is $250M, entry EV at 8x is $400M, equity is $150M). Exit equity of $412M on $150M entry is 2.75x, about 22% IRR.

Now with 6x exit: Exit EV is $64M times 6 equals $384M. Exit equity is $384M minus $100M equals $284M. Multiple is $284M divided by $150M equals 1.9x. That's approximately 14% IRR.

The two-turn multiple compression cost about 8 percentage points of IRR. This quantifies the importance of entry discipline and multiple risk.

State the insight: "Multiple compression from 8x to 6x drops our IRR from 22% to 14%. That 8 points of IRR loss roughly matches the value destruction: we paid $400M and could only sell for $384M at the lower multiple, even after growing EBITDA 28%. Operational improvement barely offset the multiple headwind."

## Variation 3: The "Quick" Paper LBO

Some interviewers give you 60 seconds and minimal information. "Company with $30M EBITDA, pay 7x, lever 5x, grow 10% annually, exit at 7x in 5 years. What's the approximate IRR?"

Speed is essential. Use aggressive simplifications.

Entry: $210M EV, $150M debt, $60M equity.
Year 5 EBITDA: 10% for 5 years is 61%, so $48M.
Exit EV: $48M times 7 equals $336M.
Ignore debt paydown for speed; assume no change (conservative).
Exit equity: $336M minus $150M equals $186M.
Multiple: $186M divided by $60M equals 3.1x.
IRR: 3x in 5 years is approximately 25%.

Add: "With debt paydown, which I didn't calculate for speed, returns would be 2-3 points higher."

## Variation 4: Dividend Recaps and Partial Exits

More sophisticated interviewers may introduce dividend recapitalizations.

Example: "In Year 3, the company issues $100M of additional debt and pays a special dividend to the sponsor. How does this affect returns?"

The key insight is that dividend recaps don't change total return; they change the timing and risk profile. If you receive $100M in Year 3 on $150M initial equity, you've already gotten most of your money back. The remaining equity value at exit is gravy.

Calculate IRR by treating it as two cash flows: negative $150M at Year 0, positive $100M at Year 3, positive (exit equity minus additional debt) at Year 5. If exit equity before the recap would have been $400M and you added $100M debt, exit equity is now $300M.

Year 0: -$150M
Year 3: +$100M
Year 5: +$300M

This roughly solves to high-20s IRR. The dividend recap accelerates returns by getting cash out earlier, which mathematically improves IRR even if total dollars are similar.

## Variation 5: Management Rollover

If management rolls over equity, calculate their portion separately.

Example: "Management owns 20% and rolls 50% of their stake. Entry is $100M equity from the sponsor."

Management's rolled equity is part of the total equity, so adjust your entry. If management rolled $10M and the sponsor invested $100M, total equity is $110M. Track the sponsor's returns on their $100M separately.

At exit, the sponsor receives their pro-rata share of exit equity (sponsor's $100M divided by total $110M equals 91%). If exit equity is $300M, sponsor gets $273M, a 2.73x multiple on their investment.

## The Meta-Skill: Identifying What's Being Tested

Each variation tests a specific concept. Backward-solving tests whether you understand the relationship between all variables. Compression scenarios test downside awareness. Quick LBOs test mental math fluency. Dividend recaps test IRR mechanics. Management rollover tests attention to detail on ownership.

When you receive a non-standard paper LBO, take 10 seconds to identify what concept is being tested. This helps you focus your answer on what the interviewer actually cares about.

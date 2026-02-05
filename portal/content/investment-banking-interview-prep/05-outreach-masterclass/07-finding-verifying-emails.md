---
id: finding-verifying-emails
title: Finding and Verifying Email Addresses
order: 7
estimated_minutes: 15
---

# Finding and Verifying Email Addresses

## Learning Objectives

- Understand common email format patterns used by major banks
- Verify email addresses before sending to avoid bounces
- Use free tools to confirm email domains and formats
- Know when paid databases might be worth considering (and when they are not)

## Written Guide

### Email Formats by Bank

Banks use two main formats:

- **first.last@domain** — e.g., `john.smith@gs.com`
- **firstinitiallast@domain** — e.g., `jsmith@williamblair.com`

Some banks also use variations like `firstlast@` (no period) or legacy formats for longer-tenured employees. When in doubt, try `first.last@` first, then `firstinitiallast@` if that bounces.

**Bulge Bracket Banks** (all use first.last@)

```calculation
title: Bulge Bracket Bank Email Formats
given:
  - "Format: first.last@domain (all bulge brackets use this format)"
  - "Example name: John Smith"
steps:
  - "Goldman Sachs: john.smith@gs.com"
  - "Morgan Stanley: john.smith@morganstanley.com"
  - "JPMorgan: john.smith@jpmorgan.com"
  - "Bank of America: john.smith@bofa.com"
  - "Citi: john.smith@citi.com"
  - "Barclays: john.smith@barclays.com"
  - "Deutsche Bank: john.smith@db.com"
  - "UBS: john.smith@ubs.com"
result: "All bulge bracket banks use first.last@domain format"
note: "JPMorgan sometimes uses middle initials (john.x.smith@jpmorgan.com) for employees who started 5+ years ago."
```

**Elite Boutiques** (mixed formats)

```calculation
title: Elite Boutique Bank Email Formats
given:
  - "Format varies by bank: first.last@ or firstinitiallast@"
  - "Example name: John Smith"
steps:
  - "Evercore: first.last@ = john.smith@evercore.com"
  - "Lazard: first.last@ = john.smith@lazard.com"
  - "Moelis: first.last@ = john.smith@moelis.com"
  - "PJT Partners: first.last@ = john.smith@pjtpartners.com"
  - "Qatalyst: first.last@ = john.smith@qatalyst.com"
  - "Guggenheim: first.last@ = john.smith@guggenheimpartners.com"
  - "Greenhill: first.last@ = john.smith@greenhill.com"
  - "Centerview: firstinitiallast@ = jsmith@centerview.com"
  - "Perella Weinberg: firstinitiallast@ = jsmith@pwpartners.com"
  - "LionTree: firstinitiallast@ = jsmith@liontree.com"
result: "Most elite boutiques use first.last@, but Centerview, Perella Weinberg, and LionTree use firstinitiallast@"
```

**Middle Market Banks** (many use firstinitiallast@)

```calculation
title: Middle Market Bank Email Formats
given:
  - "Format varies by bank: firstinitiallast@ or first.last@"
  - "Example name: John Smith"
steps:
  - "William Blair: firstinitiallast@ = jsmith@williamblair.com"
  - "Jefferies: firstinitiallast@ = jsmith@jefferies.com"
  - "Houlihan Lokey: firstinitiallast@ = jsmith@hl.com"
  - "Baird: firstinitiallast@ = jsmith@rwbaird.com"
  - "Harris Williams: firstinitiallast@ = jsmith@harriswilliams.com"
  - "Lincoln International: firstinitiallast@ = jsmith@lincolninternational.com"
  - "Piper Sandler: first.last@ = john.smith@psc.com"
  - "Raymond James: first.last@ = john.smith@raymondjames.com"
  - "Rothschild: first.last@ = john.smith@rothschildandco.com"
  - "Macquarie: first.last@ = john.smith@macquarie.com"
result: "Most middle market banks use firstinitiallast@, but Piper Sandler, Raymond James, Rothschild, and Macquarie use first.last@"
note: "Formats can change over time and may vary by office. If your first attempt bounces, try the other format."
```

### Handling Name Variations

People don't always go by their full legal name. Here's what to try:

**For compound or hyphenated names:**
- Try both: `mary.johnson-smith@gs.com` and `mary.johnsonsmith@gs.com`
- Some banks drop hyphens, others keep them

**For nicknames vs. legal names:**
- If LinkedIn shows "Mike Smith" but you suspect legal name is Michael: try both `mike.smith@` and `michael.smith@`
- Check their LinkedIn URL—it sometimes reveals the format they use

**For international names:**
- Names with accents are typically stripped: José → jose
- Names with spaces may be concatenated or hyphenated: Van Der Berg → vanderberg or van-der-berg

**When in doubt:**
- Send to your best guess
- If it bounces, try the next most likely variation
- A single bounced email does not hurt you

### Free Tools for Email Verification

You can check if an email address exists before sending:

**Hunter.io (Free tier: 25 searches/month)**
- Enter a domain to see the email format used at that company
- Shows confidence level for each email pattern
- Can verify individual email addresses
- https://hunter.io

**Email Format (Free)**
- Database of known email formats by company
- User-contributed and generally reliable for large companies
- https://email-format.com

**Clearbit Connect (Free Chrome extension)**
- Find email addresses from LinkedIn profiles
- Limited free searches per month
- Integrates with Gmail

**Verify Email Address (Free)**
- Simple tool to check if an email address exists
- Does not send any email to the address
- https://verify-email.org

**RocketReach (Free tier: 5 lookups/month)**
- Professional contact finder
- Good for verifying harder-to-find addresses
- https://rocketreach.co

### How to Verify Without These Tools

If you don't want to use these tools, you can still reduce bounces:

**1. Check LinkedIn for email patterns**

Some people include their email in their LinkedIn contact info or summary. Even if your target does not, finding any email at the same bank confirms the format.

**2. Google the format**

Search: `"@gs.com" email format` or `site:gs.com email`

**3. Send a test email to yourself**

If you have a friend at the bank, ask them to confirm the format. Otherwise, the worst case for a guessed email is a bounce—not a black mark against you.

### Paid Databases

A few paid services provide verified contact info. You don't need any of these to succeed in IB recruiting, but here's what's out there:

**ZoomInfo**
- Comprehensive B2B contact database with emails and phone numbers
- Pricing: $10,000+/year for full access
- Skip this one. It's built for enterprise sales teams, not students.

**Apollo.io**
- Sales intelligence platform with contact data
- Free tier: 50 email credits/month
- Paid plans: ~$50/month
- The free tier can help if you're targeting smaller firms with unusual formats. Paid plans are overkill.

**LinkedIn Sales Navigator**
- Advanced search, see who viewed your profile, InMail credits
- Pricing: ~$100/month
- More relevant than ZoomInfo for networking, but standard LinkedIn works fine for most outreach.

**Bottom line:** The email format tables above plus LinkedIn plus your alumni network will get you 95% of the contacts you need. Save your money.

### Building Your Contact List Systematically

The most efficient approach combines multiple free sources:

**Step 1: Start with your alumni network**
- School alumni database (verified emails)
- LinkedIn filtered by school + company
- Career services contact lists

**Step 2: Expand to LinkedIn broadly**
- Search by company, filter by title (Analyst, Associate)
- Note full names exactly as displayed
- Construct emails using the format tables

**Step 3: Verify before sending**
- Run addresses through Hunter.io or similar
- If unverified, send anyway—bounces are not harmful

**Step 4: Track everything**
- Record which emails bounced
- Note correct formats you discover
- Update your tracker for future outreach

### What to Do When an Email Bounces

A bounced email is not a problem—it is information:

1. Check the bounce message for clues (wrong domain? mailbox full? address does not exist?)
2. Try an alternate format (firstname.middleinitial.lastname, firstinitiallastname, etc.)
3. If multiple formats fail, try LinkedIn messaging or find another contact at the same bank
4. Move on—some people are simply hard to reach via email

Do not email someone multiple times at different addresses in rapid succession. Try one variation, wait for the bounce, then try another.

## Key Takeaways

- Most banks use firstname.lastname@domain.com—memorize the domain for your target banks
- Free verification tools like Hunter.io can confirm email formats before you send
- Paid databases like ZoomInfo and Apollo exist but are not necessary for IB recruiting
- When emails bounce, try common variations (nicknames, hyphenation, initials)
- Build your contact list systematically: alumni network first, then LinkedIn, then broader research

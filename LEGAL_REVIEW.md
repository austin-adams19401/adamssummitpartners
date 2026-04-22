# Legal Review Packet

**Prepared**: 2026-04-22
**Firm**: Adams Summit Partners
**Founder**: Austin Adams
**Contact**: invest@adamssummitpartners.com
**Location**: Kaysville, UT

This document is internal. It is not linked from the website. Its purpose is to give securities counsel a short, direct briefing so they can review the site and the investor intake process before anything goes live as an offering.

---

## 1. What this site is

- Brochure site for Adams Summit Partners, a Utah-based real estate firm focused on Mountain West multifamily.
- No offerings posted. No investor portal. No subscription documents. No data rooms.
- Lead capture only, via a Netlify-hosted contact form. Submissions email the founder.
- Blog scaffolding exists with one introductory post. No investment-specific content has been published.
- Placeholder Unsplash photography is used for property and blog imagery. No real property photography yet.

Current page list:
- `/` Homepage
- `/about`
- `/approach`
- `/portfolio` (representative samples only, no live offerings)
- `/contact`
- `/disclosures`
- `/blog` and `/blog/[slug]` (one introductory post)

## 2. Assumptions the site is written under

- Intended regulatory path when offerings begin: Reg D Rule 506 (either 506(b) or 506(c), to be chosen with counsel per offering).
- No live offering exists today. No Form D has been filed.
- Current copy is intentionally firm-level, not offering-level. No projected returns, no specific terms, no specific properties under contract are disclosed publicly.
- The contact form collects self-reported accredited-investor status. It does not independently verify accredited status.
- We treat any statements on the site as needing to survive a future 506(b) "pre-existing, substantive relationship" test. That is why current language is firm-only and deliberately avoids pitching specific deals.

## 3. Specific pages and language to review

**`/disclosures`**. General Disclosure, Investment Risks, Accredited Investors, Forward-Looking Statements, Jurisdiction, Privacy, Contact for Legal Questions. Please check:
- Whether the language satisfies Utah Division of Securities expectations in addition to federal Reg D.
- Whether a "no offering" banner should appear site-wide until the first Form D is filed.
- Whether the privacy section needs CCPA language even though we have no California business presence.

**`/contact`**. The form collects name, email, phone, self-reported accredited status, investment range, and message. A disclaimer box reads: "Offerings are made only through formal offering documents and are limited to accredited investors. Submitting this form does not create an investor relationship."
- Is the self-reported accredited field sufficient for pre-offering intake under 506(b)?
- If we intend 506(c) for any future deal, the verification requirement will apply. Should we collect anything now that makes later verification easier, or is it cleaner to collect only minimum contact info now and handle verification entirely at the offering stage?

**`/portfolio`**. Three representative sample properties are shown with a status badge "Sample" and explicit "representative samples, not live offerings" language. No projected returns, no specific offering terms.
- Is the sample property framing clearly distinct from a live offering under federal and Utah rules?
- Is the use of real-sounding property names (for example "The Highlands at Kaysville") a risk even when the status badge and disclosure text mark them as samples? Should we replace with generic names or remove specifics entirely?

**Homepage**. Hero includes CTAs "View Opportunities" (links to `/portfolio`) and "Start a Conversation" (links to `/contact`). Copy references "working investors" and "accredited investors" in various places.
- Is "View Opportunities" too suggestive of a live offering under a 506(b) model? We are open to renaming the CTA.
- The homepage discusses the firm acquiring and operating multifamily for "working investors" and "accredited investors on our list." Please flag any phrasing that could be read as general solicitation under 506(c) before we have a specific deal ready to support that election.

**Footer**. Includes tagline "Elevating Value. Building Legacy." and a copyright line plus a short disclaimer referencing full disclosures. Please confirm the short disclaimer language is adequate.

## 4. Specific questions for counsel

1. Does the current site, as a firm brochure with no offering, constitute general solicitation under Reg D for any future 506(b) offering? If so, what structural changes should we make now to preserve 506(b) optionality later?
2. Is there any language on the site that commits us, implicitly or explicitly, to a 506(c) path?
3. Should a site-wide "no current offering" banner appear until a Form D is filed? If yes, recommended placement and wording.
4. Is self-reported accredited status on the contact form appropriate for pre-offering intake, or should we remove it entirely until a specific offering triggers verification?
5. Are the representative sample property cards on `/portfolio` adequately distinct from offering communications? Any redlines to the surrounding language?
6. Does the disclosures page meet Utah state securities requirements on top of federal Reg D? Any required additions specific to Utah?
7. Is CCPA language required or recommended for the privacy section?
8. Does the footer disclaimer adequately reference the full disclosures page, or should the short-form disclaimer be expanded?
9. The firm is not registered as a broker-dealer, investment adviser, or funding portal. The disclosures page states this. Is there any additional registration or filing we should have in place before taking any inbound contact, including the current firm-only state?
10. Are there any records-retention or written-supervisory-procedure items we should be documenting now, even at a pre-offering stage?

## 5. What we will update after review

Once counsel's redlines land, we will:
- Revise `/disclosures` to incorporate specific language changes.
- Update the contact form disclaimer text in `src/components/ContactForm.astro` to incorporate any required language.
- Add or remove the self-reported accredited field per counsel's guidance.
- Add a site-wide banner component if required.
- Rename any homepage or portfolio CTA labels that are flagged.
- Add Utah-specific or CCPA sections to the disclosures page if required.

Any offering-specific disclosures (risk factors, offering circulars, subscription documents) will be drafted separately with counsel at the time the first deal is ready to go to market. They are not part of this review.

## 6. Contact

Austin Adams, Founder
Adams Summit Partners
Kaysville, UT
invest@adamssummitpartners.com

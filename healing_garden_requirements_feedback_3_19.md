# Healing Garden Requirements and Feedback

## Overall status
- App is described as **about 95% implemented and close to production ready**.
- Payments and Stripe integration are already hooked up and running in a sandbox.
- Remaining work is mainly finishing login, a few UX fixes, private-data messaging, therapist distribution, branding, domain work, and preparing for beta.

## Current state and implementation notes
- Payment flow is integrated with Stripe and running in sandbox mode.
- Login has intentionally been held back to allow testing before enabling it fully.
- Distribution back out to therapists is still outstanding, but was described as relatively trivial.
- Demo data still needs to be cleaned up before realistic beta testing.
- The app is web-based already, so a website/domain can point directly to the experience.

## Functional requirements and UX changes

### 1. Login and authentication
- Add a visible **login button on the top page**.
- Implement social login options:
  - Google
  - Apple
  - Meta / Facebook / Instagram coverage
- Finalise password / account flow once login is enabled.

### 2. Search by feelings / playful interaction flow
In the "How are you feeling?" flow:
- User sees categories such as:
  - Physical relief
  - Mental relief
  - Playful interaction

For **Playful Interaction**:
- Replace the current top option label from **"Playful Interaction"** to **"Experiences"**.
- Under that option, keep only examples like:
  - Art workshop
  - etc.
- Remove **Fortune telling** and **Retreat** from the description beneath Experiences.
- Final desired three-button structure under Playful Interaction:
  - Experiences
  - Fortune telling
  - Retreat

### 3. Therapist application privacy messaging
On the therapist application flow:
- Address and birth date are mandatory fields.
- Add clear messaging before the form or near the fields stating that:
  - **Address and birth date will not be shown on the public user page**
- Goal is to reduce nervousness and increase form completion.

### 4. Introduction field limits
- Add a visible **character limit** for the therapist introduction field.
- Show users how much they can type so expectations are clear.

### 5. Session limits by plan
In the therapist flow:
- Session creation should be constrained by the selected plan.
- Instead of allowing users to keep pressing "Add Session" without guidance:
  - automatically determine the number of sessions allowed based on the chosen plan
  - surface that limit in the UI
- The system should effectively dictate how many sessions can be added after plan selection.

### 6. Therapist-side criteria tagging for matching
There is a requirement to improve matching between client search and therapist sessions.

Add therapist-side tagging / categorisation so therapists can classify sessions using the same criteria clients use when searching, including:
- Physical relief
- Mental relief
- Playful interaction
- Related subcategories such as workshop, fortune telling, retreat, etc.
- Format / delivery criteria such as:
  - phone
  - face to face
  - email
  - web camera

Goal:
- Client search criteria should map directly to therapist session metadata.
- Therapist and client should use the same category labels for better matching and filtering.

### 7. Photo upload issue
Therapist photo upload currently appears broken or too restrictive.
Observed issue:
- Any photo upload returns an error saying the file must be under 2 MB.
- This may be caused by:
  - a bug, or
  - a limit that is too small for typical iPhone images

Requirements:
- Review the photo upload flow
- Confirm whether the 2 MB validation is incorrect
- Fix upload behaviour so normal photos can be uploaded successfully
- Potentially revisit compression/resolution handling

## Beta and rollout requirements
- Clean out remaining demo data before beta.
- Prepare a realistic beta environment.
- Run role-play / test scenarios, e.g.:
  - user journey
  - therapist journey
  - matching flow
  - payment flow
- Target near-term beta readiness once the remaining issues above are resolved.
- Initial rollout may start with a limited therapist/user community before wider demand generation.

## Branding, legal, and domain requirements

### 1. Domain name
- Decide on the production domain name.
- GoDaddy-procured domain is likely adequate.
- Consider whether a `.com` or Japan-specific domain is more practical.
- Cloudflare hosting is already in place and should be compatible.

### 2. Trademark / copyright checks
- Check **trademarks and copyrights for "Healing Garden"** before launch.
- Be prepared to tweak the name slightly if needed.

### 3. Branding package
Need a branding resource kit / package, including:
- logo or icon
- styling guidance
- branding resources for app implementation
- visual identity direction

### 4. App styling
- Add / refine styling details
- Introduce an icon or symbol to represent the app
- Use branding inputs to finalise look and feel

## Open questions / follow-up items
- Whether any additional website pages are needed around the app
- Final production admin setup for payment receiving organisation / business account
- Therapist payout / distribution details through Stripe
- Final admin functions and controls
- Timing and structure of the beta programme

## Priority summary
### High priority
- Login button and authentication
- Playful Interaction / Experiences taxonomy fix
- Therapist privacy messaging
- Session criteria tagging for search matching
- Photo upload bug / size limit fix
- Plan-based session limits

### Medium priority
- Character limit for introduction
- Branding kit
- Domain decision
- Trademark / copyright check
- Demo data clean-up for beta

### Lower priority but still needed
- Therapist distribution / payout detail
- Additional surrounding website pages, if any
- Admin polish before production

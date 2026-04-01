# Healing Garden App — Detailed Requirements
*Extracted from product feedback session transcript, March 20, 2026*

---

## 1. Authentication & Login

### 1.1 Login Methods
- Support sign-in via **Google**, **Apple**, and **Line** (Line recommended for Japanese market)
- Support sign-in via **email** (passwordless / magic link — no password required from the user)
- All providers should follow the same UX flow so the experience is consistent

### 1.2 Admin Access
- Admin users must be able to log in via email to access the administration panel
- Admin role must be assignable from within the admin panel

### 1.3 Demo Data
- Provide a mechanism for admins to **clear all demo/test data** before going live
- Demo login should be removable for production launch

---

## 2. Therapist Registration & Profile

### 2.1 Real Name Field
- Add a **legal/real name field** to the therapist registration form (separate from the public display name / username)
- Display a clear privacy notice alongside the real name field: *"Your real name will not appear on your public profile"*

### 2.2 Address Fields
- Replace the single free-text address field with **structured address fields**:
  - Street number / Street name
  - City / Ward (区)
  - Prefecture (都道府県)
  - Country
  - Postcode / Zip code
- Use **dropdown or validated inputs** where possible (e.g., prefecture dropdown) so users enter accurate data

### 2.3 Date of Birth
- Replace free-text DOB field with **structured dropdowns**: Year / Month / Day
- Display privacy notice: *"Your date of birth will not appear on your public profile"*

### 2.4 Phone Number
- Add a **phone number field** to the therapist registration form
- Extend the existing privacy notice to cover name, address, date of birth, **and phone number**

### 2.5 Privacy Notice Prominence
- Make the privacy notice more visually prominent on the registration form so users feel comfortable entering sensitive data

### 2.6 Profile Photo Upload
- Fix the profile photo upload bug (currently shows an error)
- Ensure the file size limit supports typical iPhone photo sizes
- Test upload flow end-to-end before beta launch

### 2.7 Contact Info Visibility Controls
- Therapist **email address and phone number must NOT be shown to clients by default**
- Visibility of contact details should be configurable by the therapist (their choice whether to share)

---

## 3. Therapy Space / Therapist Dashboard

### 3.1 Account Visibility ("Hide") Toggle
- In **Therapist Mode**, add a **Hide / Pause Account** button
- When hidden, the therapist's profile should not appear in search or discovery
- Use case: therapist is busy, on leave, or temporarily unavailable
- Location: accessible from the Therapist Mode view (reachable via Profile → Switch to Therapist Mode)

### 3.2 Session Delivery Method — Multi-Select
- On the therapist registration / session setup form, the **Delivery Method field must support multi-select** (currently only allows one selection)
- Example options: In-person, Video call, Phone, Chat

---

## 4. Subscription Plans & Pricing

### 4.1 Session Limits per Plan
Update the monthly booking limits as follows:

| Plan     | Max Bookings / Month |
|----------|----------------------|
| Free     | 1                    |
| Standard | 3                    |
| Premium  | 10                   |

### 4.2 Platform Fee Clarity
- Currently the 9% platform fee is shown on Standard and Premium plans but **not on Free**
- This is confusing — **remove the 9% fee line from all plan descriptions** in the pricing UI (it is only applicable to paid plans, but displaying it inconsistently causes confusion)
- The fee note "all paid plans include a 9% platform fee per transaction" should either appear consistently on all paid tiers or be removed from the plan comparison view

### 4.3 Appointment Duration Limits per Plan
Update how far in advance a client can book:

| Plan     | Advance Booking Window |
|----------|------------------------|
| Free     | 1 month                |
| Standard | 3 months               |
| Premium  | 6 months               |

### 4.4 Re-entry / Registration Fee
- **Remove all references to a re-entry fee or re-registration fee** from the UI
- Registration is free; there is no charge for cancelling and re-signing up
- Removing this simplifies the system and avoids user confusion

### 4.5 Beta Offer
- During the beta period, all beta testers should receive **Premium plan access for 3 months** at no charge
- This incentivises therapists to sign up, use the platform fully, and provide feedback

---

## 5. Domain & Branding

- Register **houseofinspiration.net** and **houseofinspiration.co.jp**
- The app can be served under a subdomain, e.g., `healinggarden.houseofinspiration.net`
- Confirm domain aliasing is possible within the hosting setup

---

## 6. General / Infrastructure

- The app now has a **production database** — demo data cleanup process must be documented and run before beta launch
- Authentication has been implemented and tested (Google sign-in confirmed working with 2FA)
- Beta testers are the same group previously identified; Peter to coordinate access

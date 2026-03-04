# Healing Garden v2 — Testing Walkthrough Guide

## Getting Started

Open the app in your browser:
**https://eurpeb2012.github.io/CI_Website/**

Best viewed on mobile (or use browser DevTools → toggle device toolbar → select iPhone or 375px width).

---

## Test Flow 1: Anonymous Browsing

The app should be fully browsable without logging in.

1. **Landing Page** — You see the Healing Garden logo, title, and two buttons
2. Tap **"Find a Session"** (or セッションを探す)
3. You see two search options: **By Criteria** and **By Feeling**

### Path A: Search by Feeling
4. Tap **"Search by Feeling"** → pick any mood (e.g., "Stressed")
5. Pick a category (e.g., "Mental Relief")
6. Pick a delivery method (e.g., "Video Call")
7. You see **results** — therapists are sorted by tier (Premium first), each has a tier badge
8. Tap any therapist card to view their **full profile**

### Path B: Search by Criteria
4. Tap **"Search by Criteria"**
5. Set filters (type, method, price) and tap **Search**
6. Browse results and tap into a profile

### On the Therapist Profile, check:
- [ ] Tier badge (🌱 Free / 🌿 Standard / 🌳 Premium) and founding member star (⭐) where applicable
- [ ] Sessions listed with prices, duration, delivery tags
- [ ] Calendar availability
- [ ] **Review tabs** — tap between "Reviews from Clients" and "Reviews from Therapists"
- [ ] **Suggested Therapists** section at the bottom (on therapists who have referrals: Hanako, Mitsuki, Sakura, Ken)

---

## Test Flow 2: Auth Gate (Signup Required)

While still anonymous:

9. On any therapist profile, tap **"Book This Session"** or **"Send Message"**
10. You should be **redirected to the Signup page** with a notice that an account is required
11. You have two options:
    - Fill in name + email and tap **Sign Up**
    - Or tap **"⚡ Demo Login"** for instant access as a test user
12. After signing up/logging in, you should be **automatically redirected back** to the action you were trying to take (booking or chat)

---

## Test Flow 3: Logged-In Experience

After logging in (use Demo Login for quickest path):

### Booking
13. Navigate to a therapist → tap **"Book This Session"**
14. Review booking summary (session, therapist, date, price)
15. Check the **cancellation policy** checkbox
16. Tap **"Confirm & Pay"** → see success screen

### Chat
17. On a therapist profile, tap **"Send Message"**
18. You see the **chat screen** with mock conversation bubbles
19. Note the info bar ("Messages are available for 3 days")
20. Tap **"Start Video Call"** at the top

### Video Call
21. You see a **dark full-screen layout** with:
    - Remote video placeholder (therapist avatar + name)
    - Small self-view box (top right)
    - Control buttons: Mute, Camera, End, BG Blur
22. Tap the control buttons — they **toggle active state** (visual feedback)
23. Tap **End** to return to chat

### Write a Review
24. On a therapist profile, scroll to Reviews section
25. Tap **"Write a Review"**
26. Tap stars to set rating, write a comment, submit

---

## Test Flow 4: User Profile

27. Tap **Profile** in the bottom nav
28. Check these sections:
    - [ ] **Booking History** — 5 bookings (3 completed, 2 upcoming) with status badges
    - [ ] **Your Reviews** — 3 reviews you've written (tappable, links to therapist)
    - [ ] **Reviews from Therapists** — 3 reviews therapists wrote about you
29. Tap **Settings** → see theme selector
30. Tap **Log Out** → profile returns to anonymous state

---

## Test Flow 5: Theme Switching

31. Go to **Profile → Settings**
32. You see 3 theme cards with color swatches:
    - 🌸 **Spring** — soft pastel greens (default)
    - 🌻 **Summer** — warm amber/orange
    - 🌙 **Evening** — cool indigo/purple
33. Tap each theme — the **entire app updates instantly** (header, buttons, cards, backgrounds)
34. One theme will show "(suggested)" based on time of day
35. Theme persists across page reloads

---

## Test Flow 6: Language Toggle

36. Tap the **EN/JP button** in the top-right header
37. All text switches between Japanese and English
38. Works on every screen — try switching while on different pages

---

## Test Flow 7: Therapist Dashboard

39. Go to **Profile → "Switch to Therapist Mode"**
40. The bottom nav changes to: **Dashboard / Sessions / Profile**
41. Dashboard shows: booking count, rating, monthly earnings

### Navigate all 7 sub-screens:

| Screen | What to check |
|--------|--------------|
| **Schedule** | 7-day × time slot grid. If viewing as Free tier therapist (switch to therapist 4), toggles are locked with upgrade prompt. |
| **Sessions** | List of sessions with edit buttons. Tap edit → form pre-filled with session data. |
| **Clients** | Client list with last booking date and review status (Reviewed / Pending). |
| **Earnings** | Total earnings, breakdown (revenue - 9% fee + referral income = net), monthly history. |
| **Edit Profile** | Pre-filled form with therapist name, intro, location. |
| **Referral Program** | Unique referral code with copy button, referral stats, commission info. |

42. Tap **"Back → Profile"** at the bottom to exit therapist mode

---

## Test Flow 8: Therapist Apply Form

43. From the landing page, tap **"Apply as Therapist"**
44. Check the **3-tier plan cards** (Free / Standard / Premium) with feature lists
45. Note the **platform fee info box** (9% per transaction)
46. Fill in fields and tap Submit → success screen

---

## Test Flow 9: Referral Landing

47. Navigate directly to: `#/referral/HANAKO2026`
48. You see a referral landing page showing Hanako Yamada as the referrer
49. Tap "Sign Up Now" → goes to apply form
50. Try other codes: `MITSUKI2026`, `KEN2026`, `SAKURA2026`

---

## Test Flow 10: Edge Cases

51. Try navigating to a **non-existent route** (e.g., `#/nonexistent`) → should show landing page
52. Try navigating to a **non-existent therapist** (e.g., `#/therapist/999`) → should redirect to search
53. Try **booking without checking the agreement** → button stays disabled
54. Try **submitting a review with 0 stars** → should not submit
55. **Refresh the page** at any point → theme, auth state, and therapist mode should all persist

---

## Test Flow 11: Admin Panel

The admin panel is a separate site for platform operators.

56. Open **admin.html** (or navigate to `admin.html` from the project root)
57. You land on the **Admin Dashboard** (`#/admin`) showing platform stats grid (therapists, users, bookings, revenue, fees)
58. Check **Quick Links** section — all 8 links navigate to their respective screens
59. Check **Recent Activity** feed — 5 items with type badges

### Therapist Management
60. Click **Therapists** in the sidebar → table of 8 therapists with tier badges, status, founding star
61. Use the **tier** and **status** filter dropdowns → table updates
62. Click **View** on any therapist → detail page with profile, tier management, booking window, stats
63. Change the **tier dropdown** → shows "Saved" toast
64. Change the **booking window** (14/30/60/90 days) → shows "Saved" toast

### User Management
65. Click **Users** in the sidebar → table of 20 users with email, join date, bookings, status
66. Type in the **search box** → table filters in real-time
67. Click **View** on any user → detail page with profile summary and booking history
68. Change the **status dropdown** (Active/Suspended) → shows "Saved" toast

### Bookings
69. Click **Bookings** in the sidebar → table of 18 bookings with status filter
70. Use the **status filter** (All/Upcoming/Completed/Cancelled) → table and totals update
71. Click a therapist name → navigates to their detail page

### Revenue & Analytics
72. Click **Revenue** in the sidebar → stats grid (gross, platform fees 9%, referral payouts 2%, net)
73. Check the **CSS bar chart** showing 5 months of revenue trend
74. Check the **per-therapist revenue table** with links to therapist details
75. Check the **fee structure** summary card

### Content Moderation
76. Click **Moderation** in the sidebar → pending queue (3 items) and resolved section (2 items)
77. Each card shows type badge (Review/Report), content, reporter, target, reason
78. Click **Approve**, **Remove**, or **Dismiss** on a pending item → item moves to resolved section
79. Resolved items appear with reduced opacity

### Referral Tracking
80. Click **Referrals** in the sidebar → stats (total referred, total commission)
81. Check the **referral codes table** with 8 codes, commission amounts, enable/disable buttons
82. Click **Disable** on an active code → status changes to Suspended, button changes to Enable
83. Check the **referral chain** visualization showing who referred whom

### Calendar Settings
84. Click **Calendar Settings** in the sidebar
85. Change **global max days** dropdown → shows "Saved" toast
86. Change **per-tier defaults** (Free/Standard/Premium) → shows "Saved" toast
87. Check the **per-therapist overrides table** — change a therapist's window → shows "Saved" toast
88. Check **blackout dates** — click ✕ to remove a date, use the date picker to add a new one
89. From a therapist detail page, verify the **booking window control** reflects tier defaults and overrides

### Admin Cross-Cutting
90. Click the **theme dropdown** in the admin header → all admin screens update (Spring/Summer/Evening)
91. Click the **language toggle** (EN/JP) in the sidebar footer → all text switches
92. Test at **desktop width** (960px+) — sidebar visible, wide tables
93. Test at **tablet width** (768px) — sidebar hidden, hamburger menu, responsive tables
94. Click **"Back to Site"** in the sidebar → returns to main app (index.html)

---

## Therapist Quick Reference

| ID | Name | Tier | Founding | Referrals To | Categories |
|----|------|------|----------|-------------|------------|
| 1 | Hanako Yamada | Premium | Yes | Taro, Akari | Mental, Physical |
| 2 | Taro Suzuki | Standard | — | — | Physical |
| 3 | Mitsuki Sato | Premium | Yes | Makoto, Ken | Playful, Mental |
| 4 | Makoto Tanaka | Free | — | — | Pro |
| 5 | Sakura Nakamura | Standard | — | Rei | Physical, Mental |
| 6 | Rei Takahashi | Free | — | — | Mental |
| 7 | Ken Ito | Premium | Yes | Sakura | Playful, Mental |
| 8 | Akari Kobayashi | Standard | — | — | Mental, Physical |

---

## Reporting Issues

Note the screen, steps to reproduce, and what you expected vs. what happened. Screenshots are helpful, especially for layout or theme issues.

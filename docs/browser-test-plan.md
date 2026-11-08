# Browser and accessibility test plan

Status: proposed. Do not install dependencies until the owner approves them.

## Tooling and CI

Use Playwright for real browser flows and `@axe-core/playwright` for accessibility checks. Add them as dev dependencies only after approval. A CI job should install the locked dependencies, build the app, start a preview server with stubbed API/Supabase services, then run Chromium tests at desktop and 360 px widths. Upload traces and screenshots only on failure; never record real student data or credentials.

## Required flows

1. Stub the email OTP exchange and confirm sign-in, profile setup, and sign-out.
2. Open a public course page, sign in, open its lecture notes, switch topics, and verify a note chunk loads.
3. Complete a course quiz and confirm the result persists after navigation and reload.
4. Upload a file, verify it appears as unreviewed, report another student's file, and see the reply. Stub storage and extraction responses, including a failure that removes the uploaded object.
5. Discover an open attendance session, mock geolocation, enter the board code, and verify successful and rejected check-ins. Test both enforced and unenforced boundaries.
6. As an admin, review a reported material, hide it, restore it, dismiss reports, and permanently delete it. Confirm a non-admin cannot reach the controls.
7. Navigate the above flows with only a keyboard. Check focus visibility and order, dialog/form labels, status announcements, and no keyboard trap.
8. Repeat core pages at a 360 px viewport; check for clipped controls and horizontal scrolling.

Run axe on the sign-in, course, quiz, upload/report, check-in, and admin moderation screens. Fail CI on serious or critical violations; review moderate findings before release. Keep existing Vitest component checks for labels, roles, and focus behavior as the fast local gate.

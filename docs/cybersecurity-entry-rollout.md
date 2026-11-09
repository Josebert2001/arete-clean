# Cybersecurity entry and independent onboarding

The public entry page is `/cybersecurity`. It includes an account-free phishing exercise, the current 12-room track outline, learner pricing sourced from `plans.js`, and an email inquiry for a team pilot. Team administration and verified assessments are explicitly described as planned.

## Deployment order

1. Apply `supabase/migrations/20261108010000_independent_learners.sql` in Supabase before deploying this frontend. The migration adds `profiles.learning_mode` and permits a null year level only for independent learners, whose academic fields are cleared. Existing profiles default to `university`; it does not delete records or change roles or access policies. If the frontend reaches production first, existing students are unaffected — `AuthContext` retries the profile fetch without `learning_mode` and the profile form hides independent mode until the column exists (`src/utils/profileSchema.js`) — but independent signup stays unavailable until the migration is applied.
2. Confirm Supabase Auth's redirect allowlist accepts the site's `/signin?learn=cybersecurity` URL as well as `/signin`, including any preview origin being tested. The OAuth and magic-link flows return that fixed query to preserve the selected entry point.
3. Deploy using the existing Vercel build (`npm run build`). It prerenders `/cybersecurity/index.html`, adds the page to the sitemap, and includes a link from the homepage's static preview.

## Behavior to verify on the deployment

- Signed-out visitor: open `/cybersecurity`, complete the sample without signing in, then choose Start learning. Return through Google or email, select independent learning, enter only a name, and save. The welcome and home pages should lead to security rooms rather than academic setup.
- Returning learner: use the same entry/sign-in link and arrive at `/tracks/security`. Existing university profiles retain their saved curriculum and can still use the new public page.
- Independent profile: `learning_mode = independent`, `department = general`, and `level`, `reg_number`, and `department_other` are null. These are learning preferences, not authorization roles.
- Profile settings: switch between independent and university learning. University mode requires a department and level; switching back to independent clears academic metadata after saving. Track progress remains associated with the account.
- At phone width and with a keyboard: verify navigation, radio groups, sample feedback, primary actions, and the team inquiry link. The sample uses a reserved `.example` domain and has no external target to visit.
- Fetch `/cybersecurity` without JavaScript: check its page title, description, canonical, visible content, sample explanation, and sign-in/team links. Confirm the sitemap includes the URL.

This change does not implement the other audit findings. The existing paid challenge/access controls and assessment limitations still apply. The migration and real authentication callbacks require deployment access to verify.

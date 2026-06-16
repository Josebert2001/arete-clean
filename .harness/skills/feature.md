# Skill: New Feature

## Trigger
User asks to add a new page, component, API endpoint, or major capability.

## Context needed — read these first
- `src/App.jsx` — existing routes and Error Boundary pattern
- The closest existing component to what you're building (read it fully)
- `CLAUDE.md` — conventions and color palette rules
- `.harness/tools/registry.md` — if the feature touches an external API

## Steps
1. Identify what type of feature it is: UI component, new route, new API endpoint, data expansion
2. For a new **route/page**: add the route in `App.jsx`, create the page component in `src/components/`
3. For a new **API endpoint**: create `api/<name>.js`, add IP rate limiting matching `api/tutor.js` pattern, register in `.harness/tools/registry.md`
4. For new **course/module data**: edit the relevant data file, then run `npm run validate`
5. For new **UI component**: use Tailwind with the custom palette (`coffee-*`, `ember`, `moss`, etc.) — no hardcoded hex
6. Wire up auth/progress only through `AuthContext` and `useProgress` — do not add auth logic to individual components
7. Confirm AI features degrade gracefully (show "not configured" state) if they depend on API keys

## Guardrails
- Do not install new npm packages without asking
- Do not introduce TypeScript — stay in JSX/JS
- Do not use component libraries (Shadcn, MUI, etc.)
- Do not add new database tables without asking — use existing schema
- Never put secrets in frontend code or `VITE_*` env vars (except Supabase URL and anon key, which are intentionally public)

## Eval
- [ ] `npm run dev` starts without errors
- [ ] New route appears and renders without console errors
- [ ] Tailwind classes use only the custom palette colors
- [ ] If API endpoint: rate limiting is present, secrets are server-side only
- [ ] `npm run validate` passes if module data was touched
- [ ] Existing routes still work (spot-check `/`, `/lab`, `/tutor`)

## Example
Input: "Add a progress leaderboard page"
- Add route `/leaderboard` in `App.jsx`
- Create `src/components/Leaderboard.jsx` using Tailwind custom colors
- Query `user_progress` table via Supabase client in `src/lib/supabase.js`
- Add to Navbar if appropriate (ask user first)

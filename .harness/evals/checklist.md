# Eval Checklist

Run this before marking any task done.

## Output Eval — did it work?
- [ ] `npm run dev` starts without errors
- [ ] The specific thing the user asked for works as expected
- [ ] No new errors in the browser console
- [ ] If module data was touched: `npm run validate` passes
- [ ] If a new API endpoint was added: it responds correctly and rate limiting is present
- [ ] No hardcoded secrets in any modified file
- [ ] No hallucinated imports — every package imported is in `package.json`
- [ ] Error handling is explicit — no empty catch blocks, no silent failures
- [ ] Tailwind classes use the custom palette only (no hardcoded hex in JSX)

## Trajectory Eval — did it happen the right way?
- [ ] Read the relevant files before editing
- [ ] Made the minimal change that solves the problem
- [ ] Did not install new npm packages (or asked first)
- [ ] Did not introduce TypeScript or a component library
- [ ] Did not touch `supabase/`, `setup-supabase.mjs`, or `vercel.json` CSP without reason
- [ ] Did not change module `id` values
- [ ] Did not expose any `process.env.*` secret to the browser
- [ ] Did not push directly to `main`/`master`
- [ ] Auth and progress logic stayed in `AuthContext` and `useProgress` respectively

## Security Checklist (web app + AI endpoints)
- [ ] No user input is reflected into AI prompts without sanitization
- [ ] API endpoints validate and reject unexpected input shapes
- [ ] Rate limits are present on all `/api/*` endpoints
- [ ] No stack traces or internal paths in error responses
- [ ] Supabase queries respect RLS (Bearer token forwarded server-side)
- [ ] `ALLOWED_ORIGIN` CORS check is not bypassed

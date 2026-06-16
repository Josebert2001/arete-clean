# Skill: Deploy / Release

## Trigger
User wants to deploy to Vercel, set environment variables, or prepare a production release.

## Context needed — read these first
- `vercel.json` — CSP headers, rewrites, CORS config
- `CLAUDE.md` — list of required environment variables
- `package.json` — build scripts (prebuild runs validation)

## Steps
1. Confirm all environment variables are set in the Vercel dashboard (not in code):
   - `GROQ_API_KEY`, `JDOODLE_CLIENT_ID`, `JDOODLE_CLIENT_SECRET`
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - `ALLOWED_ORIGIN` (set to the production domain)
2. Run `npm run build` locally first — prebuild runs `validate-modules.mjs`; fix any errors before deploying
3. Check `vercel.json` CSP allows all required origins (Google Fonts, Supabase, Groq endpoint)
4. Confirm Supabase Auth `site_url` is set to the production URL (for OTP magic links to redirect correctly)
5. Deploy: `vercel --prod` or push to the connected Git branch
6. After deploy: test sign-in OTP flow end-to-end, test AI Tutor, test code playground

## Guardrails
- Never deploy with hardcoded secrets or API keys in source files
- Never weaken the CSP in `vercel.json` without a specific reason
- `ALLOWED_ORIGIN` in Vercel env must match the deployed domain exactly — mismatch breaks all `/api/*` calls
- Do not deploy directly from `main` without confirming with the user — this is a production deployment
- Supabase OTP links break if `site_url` in Supabase Auth settings doesn't match the deployed URL

## Eval
- [ ] `npm run build` passes locally with no errors
- [ ] All env vars confirmed set in Vercel dashboard
- [ ] Sign-in OTP works end-to-end on the deployed URL
- [ ] `/tutor`, `/explainer`, and code playground respond (not 500 errors)
- [ ] CSP does not block Google Fonts or Supabase in browser console

## Example
Input: "Deploy the latest changes to production"
- Run `npm run build` locally — confirm it passes
- Verify env vars in Vercel dashboard
- `vercel --prod`
- Open deployed URL, sign in, test AI Tutor, run a code example

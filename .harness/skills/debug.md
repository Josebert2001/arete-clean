# Skill: Debug / Bug Fix

## Trigger
User reports something is broken, shows an error, or a feature isn't behaving as expected.

## Context needed — read these first
- The file(s) the user mentions or that the error stack points to
- Any related component that consumes the broken module
- `src/context/AuthContext.jsx` if auth/session related
- `src/components/useProgress.js` if progress sync related
- The relevant `api/*.js` file if the error is in a serverless function

## Steps
1. Read the error message carefully — identify whether it's a runtime error, network error, auth error, or data error
2. Trace the data flow: Browser → Component → Hook/Context → API → External Service
3. Check the most likely culprits by type:
   - **Auth errors:** `AuthContext.jsx`, `src/lib/supabase.js`, Supabase RLS policies
   - **Progress not syncing:** `useProgress.js` debounce logic, Supabase `user_progress` table perms
   - **AI Tutor not responding:** `api/tutor.js` rate limit hit, `GROQ_API_KEY` missing, streaming format
   - **Code not running:** `api/run.js`, JDoodle 20/day limit hit, wrong language version string
   - **Missing env var:** Check `.env.local` exists and has the required key (see CLAUDE.md)
4. Make the minimal fix — do not refactor surrounding code
5. Verify the fix doesn't break related paths

## Guardrails
- Do not remove rate limiting while debugging API issues
- Do not log secrets to console even temporarily
- Do not change Supabase RLS policies without confirming the intent with the user
- If JDoodle daily limit is hit, that is expected behavior — do not try to work around it

## Eval
- [ ] The specific bug the user reported no longer occurs
- [ ] No new console errors introduced
- [ ] Auth flow still works end-to-end (sign in → profile → progress)
- [ ] No secrets appear in code, logs, or network responses

## Example
Input: "The code playground says 'execution failed' for every run"
- Read `api/run.js` to check language version strings and error handling
- Check if JDoodle daily limit (20/day) is exhausted — this is the most common cause
- Check `JDOODLE_CLIENT_ID` / `JDOODLE_CLIENT_SECRET` are set in `.env.local`
- If version string is wrong, cross-reference JDoodle docs

# Task: Complete Password Reset Flow + Dashboard Redirect

## New Password Reset Flow
1. /login → Forgot Password → /forgot-password (email input)
2. Send OTP email (Supabase auto)
3. Enter OTP → /reset-password (new password form) 
4. Success → /login + popup "Login to dashboard"

## Steps
- [x] Dashboard redirect complete
- [ ] 1. lib/auth.ts + resetPasswordEmail, updateUser
- [x] 2. app/forgot-password/page.tsx (professional UI)
- [x] 3. app/reset-password/page.tsx (OTP + new password)
- [x] 4. Login links + success pages complete
- [x] 5. Full flow ready: /login → forgot → email → reset → login+popup ✓

## Plan Summary
- Update lib/auth.ts signIn() to include redirectTo for email/password consistency with OAuth
- Simplify app/login/LoginClient.tsx handleLogin() redirect (remove manual window.location, let Supabase handle)
- Verify app/auth/callback/route.ts (already redirects to /dashboard)
- Test: npm run dev + email/password signin -> /dashboard

## Steps
- [x] Create TODO.md
- [x] Step 1: lib/auth.ts (password auth doesn\'t use redirectTo, kept simple)
- [x] Step 2: app/login/LoginClient.tsx (fixed router.push redirect)
- [x] Step 3: Verified callback/middleware logic ✓
- [x] Step 5: Fix middleware infinite loop on /login?redirect=/dashboard
- [x] Step 4: Task complete - users now redirect to /dashboard after sign-in

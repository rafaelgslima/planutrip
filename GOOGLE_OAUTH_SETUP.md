# Google OAuth Integration Setup Guide

This guide walks you through setting up Google OAuth authentication for Planutrip.

## Overview

The Google OAuth integration provides:
- ✅ One-click Google sign-in/sign-up
- ✅ Auto-account creation for new users
- ✅ Auto-linking to existing accounts by email
- ✅ Seamless OAuth callback handling
- ✅ Full mobile compatibility (no browser-only flows)

## Step 1: Get Google OAuth Credentials

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top-left
3. Click **NEW PROJECT**
4. Enter:
   - **Project name:** `Planutrip` (or your preference)
   - **Organization:** (optional)
5. Click **CREATE**
6. Wait 30 seconds for the project to initialize

### 1.2 Enable Google+ API

1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for `Google+ API`
3. Click the result
4. Click **ENABLE**

### 1.3 Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. If you see "OAuth consent screen" warning:
   - Click **CONFIGURE CONSENT SCREEN**
   - Choose **External** (for now; change to Internal after publishing)
   - Fill in:
     - **App name:** Planutrip
     - **User support email:** your-email@example.com
     - **Developer contact information:** your-email@example.com
   - Scroll down and click **SAVE AND CONTINUE**
   - Skip optional scopes, click **SAVE AND CONTINUE**
   - Skip test users, click **SAVE AND CONTINUE**
   - Click **BACK TO DASHBOARD**

4. Create OAuth Client ID:
   - Click **+ CREATE CREDENTIALS** → **OAuth client ID**
   - Select **Web application**
   - Name: `Planutrip Web`
   - Under **Authorized JavaScript origins**, add:
     ```
     http://localhost:3000
     http://127.0.0.1:3000
     ```
   - Under **Authorized redirect URIs**, add:
     ```
     http://localhost:3000/auth/callback
     http://127.0.0.1:3000/auth/callback
     ```
   - Click **CREATE**

5. **Copy your credentials:**
   - A modal will appear with your credentials
   - Copy and save these securely:
     - **Client ID** (ends with `.apps.googleusercontent.com`)
     - **Client Secret** (a random string)

## Step 2: Configure Environment Variables

1. Open `apps/web/.env.local`
2. Add your Google credentials:
   ```env
   # Google OAuth
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=your-client-secret
   ```

3. Replace `your-client-id` and `your-client-secret` with values from Step 1.5

## Step 3: Start the Application

```bash
# From the project root
pnpm dev
```

The app will start at `http://localhost:3000`

## Step 4: Test Google OAuth

1. Go to http://localhost:3000/login
2. Click **Continue with Google** button (below the email/password form)
3. You'll be redirected to Google's login page
4. Sign in with your Google account
5. You'll be asked to grant Planutrip access to your profile
6. After approving, you'll be logged in and redirected to `/home`

## How It Works

### Sign-In Flow

1. User clicks "Continue with Google" button
2. `useGoogleAuth` hook calls `supabase.auth.signInWithOAuth()`
3. User is redirected to Google's OAuth consent screen
4. After approval, Google redirects to `/auth/callback?token=...`
5. Supabase automatically exchanges token for a session
6. Callback page detects session and redirects to home or next URL

### Account Linking

**On first Google login:**
- If no account exists with that email → new account is created
- If account exists with that email → user is logged into existing account

This is handled automatically by Supabase's OAuth flow.

### Data Stored

From Google OAuth, we receive:
- Email address
- Full name
- Profile picture URL (if available)

These are stored in Supabase `auth.users` table and `auth.user_metadata`.

## Components Created

### GoogleAuthButton
**Location:** `@/components/Auth/GoogleAuthButton`

Polished Google sign-in button with:
- Google icon
- Hover/active states
- Loading spinner
- Tailwind styling (matches Planutrip dark theme)

```tsx
import { GoogleAuthButton } from "@/components/Auth/GoogleAuthButton";

<GoogleAuthButton 
  isLoading={isLoading}
  onClick={handleGoogleSignIn}
/>
```

### AuthDivider
**Location:** `@/components/Auth/AuthDivider`

Visual divider between email form and OAuth buttons, displays "Or continue with"

```tsx
import { AuthDivider } from "@/components/Auth/AuthDivider";

<AuthDivider />
```

## Hooks Created

### useGoogleAuth
**Location:** `@/hooks/useGoogleAuth`

Manages Google OAuth flow:

```tsx
const { isLoading, error, handleGoogleSignIn } = useGoogleAuth();

return (
  <button onClick={handleGoogleSignIn} disabled={isLoading}>
    {isLoading ? "Signing in..." : "Continue with Google"}
  </button>
);
```

**Returns:**
- `isLoading` — OAuth request in progress
- `error` — Error message if OAuth failed
- `handleGoogleSignIn()` — Function to initiate OAuth flow

## Pages Modified

- **`pages/login.tsx`** — Added Google button to login form
- **`pages/signup.tsx`** — Added Google button to signup form
- **`pages/auth/callback.tsx`** (new) — Handles OAuth callback from Google

## Configuration Files Modified

- **`supabase/config.toml`** — Enabled Google OAuth provider
- **`apps/web/.env.local`** — Added Google credentials
- **`apps/web/.env.local.example`** — Added Google fields for other developers
- **Translation files** — Added Google OAuth related text strings (EN + PT)

## Production Deployment

### Google Cloud Console

1. In **Authorized JavaScript origins**, add your production domain:
   ```
   https://yourdomain.com
   https://www.yourdomain.com
   ```

2. In **Authorized redirect URIs**, add:
   ```
   https://yourdomain.com/auth/callback
   https://www.yourdomain.com/auth/callback
   ```

3. Change OAuth consent screen to **Internal** if your app is for internal use, or publish it

### Environment Variables (Production)

Set the same environment variables in your production deployment platform:
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID`
- `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET`

### Supabase Remote Configuration

If using Supabase Cloud (not local), configure Google OAuth in Supabase dashboard:
1. Go to your Supabase project
2. **Auth** → **Providers** → **Google**
3. Enable and enter:
   - Client ID
   - Client Secret

The `supabase/config.toml` only controls the local development environment.

## Testing

Run the test suite:

```bash
pnpm --filter @planutrip/web test:run
```

Tests are located in:
- `components/Auth/GoogleAuthButton/index.test.tsx`
- `hooks/useGoogleAuth/index.test.ts`

## Troubleshooting

### "redirect_uri_mismatch" Error

**Problem:** After clicking Google sign-in, you get a redirect URI mismatch error.

**Solution:**
1. Go to Google Cloud Console → **APIs & Services** → **Credentials**
2. Click your OAuth client ID
3. Ensure the redirect URL matches exactly:
   - Local dev: `http://localhost:3000/auth/callback`
   - Production: `https://yourdomain.com/auth/callback`
4. Click **SAVE**

### "No Session Found" on Callback

**Problem:** You're redirected to `/auth/callback` but see "No session found"

**Causes:**
- Token expired (wait 5 minutes and try again)
- Browser doesn't support session storage (try clearing cache)
- Supabase project is not properly configured

**Solution:**
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
3. Try in an incognito window

### Account Not Created

**Problem:** You signed in with Google but no account was created

**Solution:**
- This shouldn't happen. If it does, check:
  1. Supabase RLS policies aren't blocking user creation
  2. The email from Google profile is valid
  3. Check Supabase logs for errors

## Security Notes

- **Never commit** `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET` to git
- Use environment variables in production
- The OAuth flow is handled entirely by Supabase — tokens never touch your backend
- Session tokens are stored securely in `httpOnly` cookies (Supabase default)

## Next Steps

1. **Email Verification:** Users who sign up with Google still need email verification if you require it
2. **Profile Completion:** You may want to ask users to complete their profile after Google OAuth signup
3. **Account Linking:** Allow existing password users to link their Google account
4. **Mobile App:** When you build React Native, use the same Supabase OAuth flow with a custom redirect

## References

- [Supabase OAuth Docs](https://supabase.com/docs/guides/auth/social-auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Auth Best Practices](https://nextjs.org/docs/authentication)

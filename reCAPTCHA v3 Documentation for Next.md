# reCAPTCHA v3 Documentation for Next.js App Router

This document provides a comprehensive guide to using reCAPTCHA v3 in a Next.js application with the App Router, leveraging the `next-recaptcha-v3` library. It covers all possible use cases, including protecting forms, running reCAPTCHA in the background for scoring, and handling client-side and server-side logic. Each use case is accompanied by detailed code examples in markdown format.

## Introduction to reCAPTCHA v3

reCAPTCHA v3 is a Google service designed to protect websites from spam and abuse without requiring user interaction. Unlike reCAPTCHA v2, which uses checkboxes or image challenges, v3 operates invisibly, analyzing user behavior to assign a score between 0.0 (very likely a bot) and 1.0 (very likely a human). This score enables developers to take context-specific actions, such as allowing access, requiring additional verification, or blocking requests.

### Key Features
- **Invisible Operation**: No user-facing challenges, improving user experience.
- **Score-Based System**: Scores range from 0.0 to 1.0, with 0.5 as a common threshold.
- **Action Tagging**: Specify actions (e.g., “form_submit”) for detailed analytics and refined scoring.
- **Flexible Integration**: Use for forms, APIs, or background analytics.

## Setting Up reCAPTCHA v3 in Next.js

To integrate reCAPTCHA v3 into a Next.js project, use the `next-recaptcha-v3` package, which simplifies setup and usage with the App Router.

### Step 1: Register Your Site
1. Visit the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).
2. Create a new reCAPTCHA v3 site.
3. Note the **site key** and **secret key** provided.

### Step 2: Install `next-recaptcha-v3`
Install the package in your Next.js project:
```bash
npm install next-recaptcha-v3
```
or
```bash
yarn add next-recaptcha-v3
```

### Step 3: Configure Environment Variables
Add the following to your `.env` file:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is accessible client-side.
- `RECAPTCHA_SECRET_KEY` should remain server-side for security.

### Step 4: Set Up `ReCaptchaProvider`
Wrap your application with the `ReCaptchaProvider` component in your root layout (`app/layout.tsx`):
```jsx
import { ReCaptchaProvider } from 'next-recaptcha-v3';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReCaptchaProvider>
          {children}
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
```
This loads the reCAPTCHA script, making it available throughout your app.

## Use Cases and Examples

reCAPTCHA v3 can be used in various ways, from protecting forms to running background checks. Below are the primary use cases with detailed examples.

### 1. Protecting Form Submissions
reCAPTCHA v3 is commonly used to secure form submissions, ensuring they come from legitimate users. The client generates a token upon submission, which the server verifies along with the score.

#### Example: Contact Form
- **Client-side Code** (`app/components/ContactForm.tsx`)
```jsx
'use client';

import { useReCaptcha } from 'next-recaptcha-v3';
import { useState } from 'react';

export default function ContactForm() {
  const { executeRecaptcha } = useReCaptcha();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!executeRecaptcha) {
      setError('reCAPTCHA not loaded');
      setSubmitting(false);
      return;
    }

    try {
      const token = await executeRecaptcha('form_submit');
      const response = await fetch('/api/contactFormSubmit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          'g-recaptcha-response': token,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      console.log('Form submitted successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
```

- **Server-side Code** (`app/api/contactFormSubmit/route.ts`)
```typescript
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { firstName, lastName, email, 'g-recaptcha-response': token } = await request.json();

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const verificationResponse = await fetch(verifyUrl, {
    method: 'POST',
  });

  const verificationData = await verificationResponse.json();

  if (!verificationData.success || verificationData.score < 0.5) {
    return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
  }

  // Process form data (e.g., save to database)
  console.log('Form data:', { firstName, lastName, email });

  return NextResponse.json({ message: 'Form submitted successfully' });
}
```

### 2. Running reCAPTCHA v3 in the Background
reCAPTCHA v3 can run in the background to assess user behavior without user interaction, useful for analytics or preemptive risk assessment.

#### Example: Background Check on Page Load
- **Client-side Code** (`app/components/BackgroundCheck.tsx`)
```jsx
'use client';

import { useReCaptcha } from 'next-recaptcha-v3';
import { useEffect } from 'react';

export default function BackgroundCheck() {
  const { executeRecaptcha } = useReCaptcha();

  useEffect(() => {
    const checkRecaptcha = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha('page_visit');
        console.log('reCAPTCHA token:', token);
      }
    };

    checkRecaptcha();
  }, [executeRecaptcha]);

  return <p>Background reCAPTCHA check performed.</p>;
}
```

- **Server-side Verification** (`app/api/verifyRecaptcha/route.ts`)
```typescript
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { token } = await request.json();

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const verificationResponse = await fetch(verifyUrl, {
    method: 'POST',
  });

  const verificationData = await verificationResponse.json();

  if (!verificationData.success) {
    return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
  }

  return NextResponse.json({ score: verificationData.score });
}
```

### 3. Client-side and Server-side Integration
- **Client-side**: Use the `useReCaptcha` hook to generate tokens for specific actions.
- **Server-side**: Verify tokens and use the score to make decisions (e.g., allow, block, or require verification).

The examples above illustrate this split:
- Client-side generates tokens using `executeRecaptcha`.
- Server-side verifies tokens and checks scores.

### 4. Using Actions for Contextual Analysis
reCAPTCHA v3 supports “actions” to provide context for scoring, improving accuracy and enabling detailed analytics in the admin console.

#### Example: Specifying an Action
```jsx
const token = await executeRecaptcha('login_attempt');
```

- **Server-side Verification**:
```json
{
  "success": true,
  "score": 0.9,
  "action": "login_attempt",
  "challenge_ts": "2025-05-14T19:22:00Z",
  "hostname": "example.com"
}
```
Verify the action matches the expected value to ensure integrity.

### 5. Score Interpretation
The score determines the action to take:
- **> 0.5**: Typically allow access.
- **0.1–0.5**: Require additional verification (e.g., 2FA).
- **< 0.1**: Block or flag as high-risk.

#### Example: Server-side Logic
```typescript
if (verificationData.score > 0.5) {
  // Allow access
} else if (verificationData.score > 0.1) {
  // Require 2FA or email verification
} else {
  // Block access
}
```

| Score Range | Action Suggested |
|-------------|------------------|
| 0.9–1.0     | Allow access     |
| 0.5–0.8     | Monitor or verify|
| 0.1–0.4     | Require 2FA      |
| 0.0–0.1     | Block access     |

## Additional Considerations
- **No Checkbox in v3**: reCAPTCHA v3 is invisible. Checkboxes are specific to reCAPTCHA v2, which isn’t covered here per the query.
- **Token Expiry**: Tokens expire after 2 minutes. Execute `executeRecaptcha` at the time of action, not on page load.
- **Security**: Always verify tokens server-side to prevent bypass attacks.
- **Enterprise Version**: Enable with `useEnterprise` in `ReCaptchaProvider` for advanced features ([reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise/docs/quickstart)).
- **Analytics**: Use the admin console ([Google reCAPTCHA Admin](https://g.co/recaptcha/admin)) to analyze scores and set thresholds.

## Conclusion
reCAPTCHA v3 offers a seamless, user-friendly way to secure Next.js applications. With `next-recaptcha-v3`, integration into the App Router is straightforward, supporting form protection, background checks, and custom actions. By verifying tokens server-side and leveraging scores, you can enhance security without compromising user experience.
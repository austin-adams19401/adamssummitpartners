import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';

// Basic in-memory throttle (resets on cold start). Not a hard rate limit,
// just enough to blunt casual abuse. The real protection is Buttondown's
// own deduping and the email validation below.
const RECENT_EMAILS = new Map<string, number>();
const THROTTLE_WINDOW_MS = 10_000;
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function jsonResponse(
  statusCode: number,
  body: Record<string, unknown>,
): HandlerResponse {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return jsonResponse(500, {
      ok: false,
      error: 'Newsletter is not configured yet. Please try again later.',
    });
  }

  let email = '';
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid request body' });
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return jsonResponse(400, {
      ok: false,
      error: 'Please enter a valid email address.',
    });
  }

  const now = Date.now();
  const lastSeen = RECENT_EMAILS.get(email) ?? 0;
  if (now - lastSeen < THROTTLE_WINDOW_MS) {
    return jsonResponse(429, {
      ok: false,
      error: 'Please wait a moment before trying again.',
    });
  }
  RECENT_EMAILS.set(email, now);
  // Trim the map so it cannot grow forever on a long-lived instance.
  if (RECENT_EMAILS.size > 500) {
    const cutoff = now - THROTTLE_WINDOW_MS;
    for (const [key, ts] of RECENT_EMAILS) {
      if (ts < cutoff) RECENT_EMAILS.delete(key);
    }
  }

  try {
    const res = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        type: 'regular',
      }),
    });

    if (res.ok) {
      return jsonResponse(200, { ok: true });
    }

    // Buttondown returns 400 for duplicates with a specific code.
    // Treat already-subscribed as a soft success so the user sees a clean state.
    const text = await res.text();
    if (res.status === 400 && /already/i.test(text)) {
      return jsonResponse(200, { ok: true, alreadySubscribed: true });
    }

    console.error('Buttondown signup failed', res.status, text);
    return jsonResponse(502, {
      ok: false,
      error: 'Subscription service is unavailable. Please try again later.',
    });
  } catch (err) {
    console.error('Buttondown signup error', err);
    return jsonResponse(502, {
      ok: false,
      error: 'Subscription service is unavailable. Please try again later.',
    });
  }
};

import type { Context } from 'https://edge.netlify.com';

// HTTP Basic Auth gate for /investors/* routes.
//
// Reads two env vars set in Netlify:
//   INVESTOR_PORTAL_USER
//   INVESTOR_PORTAL_PASS
//
// On missing or wrong creds, returns 401 with a Basic challenge so the
// browser shows its native username/password prompt. On correct creds,
// lets the request continue to the origin (static page or asset).
//
// This is a site-wide-password MVP. No per-user accounts, no sessions
// beyond the browser's own Basic Auth cache. Rotate by updating env vars.

const REALM = 'Adams Summit Partners Investor Area';

function unauthorized(): Response {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

// Constant-time string compare to avoid leaking length/prefix via timing.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export default async (request: Request, context: Context): Promise<Response> => {
  const expectedUser = Netlify.env.get('INVESTOR_PORTAL_USER');
  const expectedPass = Netlify.env.get('INVESTOR_PORTAL_PASS');

  if (!expectedUser || !expectedPass) {
    return new Response(
      'Investor area is not configured yet. Please try again later.',
      {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      },
    );
  }

  const header = request.headers.get('authorization') ?? '';
  if (!header.toLowerCase().startsWith('basic ')) {
    return unauthorized();
  }

  let decoded = '';
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(':');
  if (sep < 0) return unauthorized();

  const providedUser = decoded.slice(0, sep);
  const providedPass = decoded.slice(sep + 1);

  const userOk = safeEqual(providedUser, expectedUser);
  const passOk = safeEqual(providedPass, expectedPass);
  if (!userOk || !passOk) {
    return unauthorized();
  }

  // Authenticated. Forward to the origin. Add a hint header for downstream
  // observability; does not leak the credentials.
  const response = await context.next();
  response.headers.set('X-Investor-Area', 'authenticated');
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
};

export const config = {
  path: '/investors/*',
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_KEY = 'les-400-geeks-admin-session';

async function computeExpectedToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(SESSION_KEY));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin/');
}

async function adminGuard(request: NextRequest): Promise<NextResponse | null> {
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const sessionToken = request.cookies.get('admin_session')?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  let isValidSession = false;
  if (sessionToken && adminPassword) {
    try {
      const expected = await computeExpectedToken(adminPassword);
      isValidSession = sessionToken.length === expected.length && sessionToken === expected;
    } catch {
      isValidSession = false;
    }
  }

  if (!isValidSession && !isLoginPage) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isValidSession && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return null;
}

// Protège /admin et /api/admin, et pose la CSP avec nonce par requête sur toutes les pages.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminPath(pathname)) {
    const blocked = await adminGuard(request);
    if (blocked) return blocked;
  }

  const nonce = btoa(crypto.randomUUID());
  const isDev = process.env.NODE_ENV !== 'production';

  const csp = [
    "default-src 'self'",
    isDev
      ? `script-src 'self' 'nonce-${nonce}' 'unsafe-eval'`
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob:",
    isDev ? "connect-src 'self' ws: wss:" : "connect-src 'self'",
    "media-src 'self'",
    "frame-src 'none'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.png|images/|.*\.(?:js|css|svg|png|jpg|jpeg|gif|webp|ico|woff2?|map|txt|xml)$).*)',
  ],
};

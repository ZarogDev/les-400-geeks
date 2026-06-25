import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_KEY = 'les-400-geeks-admin-session';

async function computeExpectedToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(SESSION_KEY));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function proxy(request: NextRequest) {
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

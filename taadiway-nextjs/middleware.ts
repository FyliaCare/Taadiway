// Next.js Middleware - Global authentication, routing, and performance
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';

// Performance headers
const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
};

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/faq',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
];

// API paths that require authentication
const protectedApiPaths = [
  '/api/auth/profile',
  '/api/auth/logout',
  '/api/orders',
  '/api/drivers',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Create response
  const response = NextResponse.next();
  
  // Add security and performance headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Check if path is public
  if (publicPaths.some(path => pathname === path || pathname.startsWith(path))) {
    return response;
  }

  // Check authentication for protected routes
  const authHeader = request.headers.get('authorization');
  
  // For API routes
  if (pathname.startsWith('/api/')) {
    if (protectedApiPaths.some(path => pathname.startsWith(path))) {
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const errorResponse = NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
        Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
          errorResponse.headers.set(key, value);
        });
        return errorResponse;
      }

      const token = authHeader.substring(7);
      const user = await verifyAccessToken(token);

      if (!user) {
        const errorResponse = NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
        Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
          errorResponse.headers.set(key, value);
        });
        return errorResponse;
      }
    }
    return response;
  }

  // For page routes - redirect to login if not authenticated
  // (We'll implement this when we create the frontend pages)
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

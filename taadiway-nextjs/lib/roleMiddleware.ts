import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function requireAuth(req: NextRequest, allowedRoles?: string[]) {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return { error: 'Unauthorized', status: 401 };
    }

    const token = authHeader.substring(7);
    const payload = await verifyAccessToken(token);

    if (!payload) {
      return { error: 'Invalid or expired token', status: 401 };
    }

    // Check if user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        emailVerified: true,
        phoneVerified: true,
      },
    });

    if (!user) {
      return { error: 'User not found', status: 404 };
    }

    if (user.status !== 'ACTIVE') {
      return { error: 'Account is not active', status: 403 };
    }

    // Check role-based access
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.role)) {
        return { error: 'Insufficient permissions', status: 403 };
      }
    }

    return { user, payload };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return { error: 'Authentication failed', status: 401 };
  }
}

export function requireSystemAdmin(req: NextRequest) {
  return requireAuth(req, ['SYSTEM_ADMIN']);
}

export function requireDriver(req: NextRequest) {
  return requireAuth(req, ['DRIVER', 'SYSTEM_ADMIN']);
}

export function requireClient(req: NextRequest) {
  return requireAuth(req, ['CLIENT', 'SYSTEM_ADMIN']);
}

export function requireAnyAuth(req: NextRequest) {
  return requireAuth(req);
}

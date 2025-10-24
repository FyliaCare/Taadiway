// GET /api/auth/profile - Get current user profile
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { successResponse, unauthorizedResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const currentUser = await requireAuth(request);

    // Fetch full user profile
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        status: true,
        avatar: true,
        address: true,
        emailVerified: true,
        phoneVerified: true,
        createdAt: true,
        lastLogin: true,
        driverProfile: true,
      },
    });

    if (!user) {
      return notFoundResponse('User not found');
    }

    return successResponse(user);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return unauthorizedResponse();
    }

    console.error('Get profile error:', error);
    return serverErrorResponse('Failed to get profile');
  }
}

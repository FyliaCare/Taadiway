// POST /api/auth/logout - User logout
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, serverErrorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (refreshToken) {
      // Delete refresh token from database
      await prisma.refreshToken.delete({
        where: { token: refreshToken },
      }).catch(() => {
        // Token might not exist, ignore error
      });
    }

    return successResponse(null, 'Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    return serverErrorResponse('Logout failed');
  }
}

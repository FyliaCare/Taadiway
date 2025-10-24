// POST /api/auth/refresh - Refresh access token
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyRefreshToken, generateAccessToken } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse, serverErrorResponse } from '@/lib/api-response';
import { refreshTokenSchema, validateRequest } from '@/lib/validators';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = await validateRequest(refreshTokenSchema, body);

    // Verify refresh token
    const decoded = await verifyRefreshToken(validatedData.refreshToken);
    if (!decoded) {
      return errorResponse('Invalid or expired refresh token', null, 401);
    }

    // Check if token exists in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: validatedData.refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return errorResponse('Invalid or expired refresh token', null, 401);
    }

    // Generate new access token
    const newAccessToken = await generateAccessToken({
      id: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role as any,
    });

    return successResponse({ accessToken: newAccessToken }, 'Token refreshed');
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error.errors);
    }

    console.error('Token refresh error:', error);
    return serverErrorResponse('Token refresh failed');
  }
}

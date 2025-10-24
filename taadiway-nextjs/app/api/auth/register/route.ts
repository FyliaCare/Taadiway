// POST /api/auth/register - User registration
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse, serverErrorResponse } from '@/lib/api-response';
import { registerSchema, validateRequest } from '@/lib/validators';
import { ZodError } from 'zod';

// Force Node.js runtime (bcryptjs doesn't work in Edge runtime)
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = await validateRequest(registerSchema, body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return errorResponse('Email already registered', null, 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phoneNumber: validatedData.phoneNumber,
        role: validatedData.role || 'CLIENT',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    // Create driver profile if role is DRIVER
    if (user.role === 'DRIVER') {
      await prisma.driverProfile.create({
        data: {
          userId: user.id,
        },
      });
    }

    // Generate tokens
    const accessToken = await generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role as any,
    });

    const refreshToken = await generateRefreshToken(user.id);

    // Save refresh token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    return successResponse(
      {
        user,
        accessToken,
        refreshToken,
      },
      'Registration successful',
      201
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error.errors);
    }

    console.error('Registration error:', error);
    return serverErrorResponse('Registration failed');
  }
}

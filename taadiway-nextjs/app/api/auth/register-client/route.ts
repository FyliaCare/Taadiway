import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      businessType,
      businessName,
      businessAddress,
      businessPhone,
      address,
      city,
      region,
    } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Check if phone number already exists
    const existingPhone = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingPhone) {
      return NextResponse.json(
        { error: 'User with this phone number already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create CLIENT user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        role: 'CLIENT',
        status: 'PENDING_VERIFICATION',
        businessType: businessType || 'INDIVIDUAL',
        businessName,
        businessAddress,
        businessPhone,
        address,
        city,
        region,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        status: true,
        businessType: true,
        businessName: true,
        createdAt: true,
      },
    });

    // TODO: Send verification email/SMS

    return NextResponse.json(
      {
        message: 'Registration successful. Please verify your email and phone number.',
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Client registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

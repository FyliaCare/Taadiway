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
      address,
      city,
      region,
      licenseNumber,
      licenseExpiry,
      vehicleType,
      bankName,
      accountNumber,
      accountName,
      mobileMoneyNumber,
    } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!licenseNumber || !vehicleType) {
      return NextResponse.json(
        { error: 'Driver license and vehicle type are required' },
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

    // Create DRIVER user with profile
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        role: 'DRIVER',
        status: 'PENDING_VERIFICATION',
        address,
        city,
        region,
        driverProfile: {
          create: {
            licenseNumber,
            licenseExpiry: licenseExpiry ? new Date(licenseExpiry) : null,
            vehicleType,
            bankName,
            accountNumber,
            accountName,
            mobileMoneyNumber,
            verificationStatus: 'PENDING',
          },
        },
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
        driverProfile: {
          select: {
            licenseNumber: true,
            vehicleType: true,
            verificationStatus: true,
          },
        },
      },
    });

    // TODO: Send verification email/SMS
    // TODO: Notify admin of new driver registration

    return NextResponse.json(
      {
        message: 'Driver registration successful. Your application is pending verification.',
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Driver registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

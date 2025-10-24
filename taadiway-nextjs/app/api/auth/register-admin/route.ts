import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';

export const runtime = 'nodejs';

// Only existing SYSTEM_ADMIN can create new admin accounts
export async function POST(req: NextRequest) {
  try {
    // Verify that the requester is a SYSTEM_ADMIN
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== 'SYSTEM_ADMIN') {
      return NextResponse.json(
        { error: 'Only system administrators can create admin accounts' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      department,
      accessLevel,
      permissions,
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

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create SYSTEM_ADMIN user with admin profile
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        role: 'SYSTEM_ADMIN',
        status: 'ACTIVE',
        emailVerified: true, // Admins are pre-verified
        adminProfile: {
          create: {
            department,
            accessLevel: accessLevel || 'FULL',
            canManageUsers: permissions?.canManageUsers ?? true,
            canManageOrders: permissions?.canManageOrders ?? true,
            canManageDrivers: permissions?.canManageDrivers ?? true,
            canManagePayments: permissions?.canManagePayments ?? true,
            canViewReports: permissions?.canViewReports ?? true,
            canEditSettings: permissions?.canEditSettings ?? true,
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
        adminProfile: {
          select: {
            department: true,
            accessLevel: true,
            canManageUsers: true,
            canManageOrders: true,
            canManageDrivers: true,
            canManagePayments: true,
            canViewReports: true,
            canEditSettings: true,
          },
        },
      },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId: payload.userId,
        action: 'CREATE_ADMIN',
        entity: 'User',
        entityId: user.id,
        changes: JSON.stringify({ email: user.email, role: 'SYSTEM_ADMIN' }),
      },
    });

    return NextResponse.json(
      {
        message: 'System administrator created successfully',
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Admin creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

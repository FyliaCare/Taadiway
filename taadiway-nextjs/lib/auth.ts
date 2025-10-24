// Authentication utilities for Next.js API routes
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

const JWT_ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
);
const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production'
);

export type UserRole = 'SYSTEM_ADMIN' | 'DRIVER' | 'CLIENT';

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
  [key: string]: any; // Index signature for jose compatibility
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate Access Token (15 minutes)
export async function generateAccessToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(JWT_ACCESS_SECRET);
}

// Generate Refresh Token (7 days)
export async function generateRefreshToken(userId: string): Promise<string> {
  return new SignJWT({ id: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_REFRESH_SECRET);
}

// Verify Access Token
export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_ACCESS_SECRET);
    return payload as unknown as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Verify Refresh Token
export async function verifyRefreshToken(token: string): Promise<{ id: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
    return payload as unknown as { id: string };
  } catch (error) {
    return null;
  }
}

// Get current user from request
export async function getCurrentUser(request: NextRequest): Promise<JWTPayload | null> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  return verifyAccessToken(token);
}

// Middleware helper to require authentication
export async function requireAuth(request: NextRequest): Promise<JWTPayload> {
  const user = await getCurrentUser(request);
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

// Middleware helper to require specific role
export function requireRole(...roles: UserRole[]) {
  return async (request: NextRequest): Promise<JWTPayload> => {
    const user = await requireAuth(request);
    
    if (!roles.includes(user.role)) {
      throw new Error('Forbidden');
    }
    
    return user;
  };
}

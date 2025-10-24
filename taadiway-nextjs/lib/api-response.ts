// Standardized API response helpers for Next.js
import { NextResponse } from 'next/server';

export interface ApiError {
  error: string;
  details?: any;
}

export interface ApiSuccess<T = any> {
  success: true;
  data?: T;
  message?: string;
}

// Success response
export function successResponse<T = any>(data?: T, message?: string, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      ...(data && { data }),
      ...(message && { message }),
    },
    { status }
  );
}

// Error response
export function errorResponse(error: string, details?: any, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(details && { details }),
    },
    { status }
  );
}

// Unauthorized response
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return errorResponse(message, null, 401);
}

// Forbidden response
export function forbiddenResponse(message: string = 'Forbidden') {
  return errorResponse(message, null, 403);
}

// Not found response
export function notFoundResponse(message: string = 'Not found') {
  return errorResponse(message, null, 404);
}

// Validation error response
export function validationErrorResponse(errors: any) {
  return errorResponse('Validation failed', errors, 422);
}

// Server error response
export function serverErrorResponse(message: string = 'Internal server error') {
  return errorResponse(message, null, 500);
}

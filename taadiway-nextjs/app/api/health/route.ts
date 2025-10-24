import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Health Check Endpoint
 * Used by Render to verify service health
 */
export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Taadiway API',
      database: 'connected',
      version: process.env.npm_package_version || '2.0.0',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'Taadiway API',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

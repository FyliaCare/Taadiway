// GET /api/orders/[id] - Get single order
// PUT /api/orders/[id] - Update order
// DELETE /api/orders/[id] - Cancel order
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { successResponse, unauthorizedResponse, forbiddenResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Get single order
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const currentUser = await requireAuth(request);
    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        delivery: {
          include: {
            driver: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
              },
            },
          },
        },
        trackingHistory: {
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });

    if (!order) {
      return notFoundResponse('Order not found');
    }

    // Check if user has access to this order
    if (
      currentUser.role === 'CLIENT' && order.customerId !== currentUser.id ||
      currentUser.role === 'DRIVER' && order.assignedToId !== currentUser.id
    ) {
      return forbiddenResponse('Access denied');
    }

    return successResponse(order);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return unauthorizedResponse();
    }

    console.error('Get order error:', error);
    return serverErrorResponse('Failed to fetch order');
  }
}

// DELETE - Cancel order
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const currentUser = await requireAuth(request);
    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return notFoundResponse('Order not found');
    }

    // Only customer or admin can cancel
    if (currentUser.role === 'CLIENT' && order.customerId !== currentUser.id) {
      return forbiddenResponse('Access denied');
    }
    if (currentUser.role !== 'SYSTEM_ADMIN' && order.customerId !== currentUser.id) {
      return forbiddenResponse('Access denied');
    }

    // Can only cancel pending or confirmed orders
    if (!['PENDING', 'CONFIRMED', 'ASSIGNED'].includes(order.status)) {
      return forbiddenResponse('Cannot cancel order in current status');
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancellationReason: 'Cancelled by user',
      },
    });

    // Create tracking history
    await prisma.trackingHistory.create({
      data: {
        orderId: id,
        status: 'CANCELLED',
        notes: 'Order cancelled',
      },
    });

    return successResponse(updatedOrder, 'Order cancelled successfully');
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return unauthorizedResponse();
    }

    console.error('Cancel order error:', error);
    return serverErrorResponse('Failed to cancel order');
  }
}

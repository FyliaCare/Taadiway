// GET /api/orders - Get all orders for current user
// POST /api/orders - Create new order
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { successResponse, unauthorizedResponse, validationErrorResponse, serverErrorResponse } from '@/lib/api-response';
import { createOrderSchema, validateRequest } from '@/lib/validators';
import { ZodError } from 'zod';

// GET - Get orders
export async function GET(request: NextRequest) {
  try {
    const currentUser = await requireAuth(request);

    // Build query based on user role
    let whereClause: any = {};

    if (currentUser.role === 'CLIENT') {
      whereClause.customerId = currentUser.id;
    } else if (currentUser.role === 'DRIVER') {
      whereClause.assignedToId = currentUser.id;
    }
    // Admin and Dispatch Manager can see all orders

    const orders = await prisma.order.findMany({
      where: whereClause,
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
        delivery: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return successResponse(orders);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return unauthorizedResponse();
    }

    console.error('Get orders error:', error);
    return serverErrorResponse('Failed to fetch orders');
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const currentUser = await requireAuth(request);

    // Parse and validate request body
    const body = await request.json();
    const validatedData = await validateRequest(createOrderSchema, body);

    // Calculate pricing (simplified - you can enhance this)
    const basePrice = 10.0; // Base price in GHS
    const distancePrice = 0.0; // Calculate based on coordinates if available
    const urgencyPrice = 0.0;
    const totalPrice = basePrice + distancePrice + urgencyPrice;

    // Create order
    const order = await prisma.order.create({
      data: {
        customerId: currentUser.id,
        pickupAddress: validatedData.pickupAddress,
        pickupLat: validatedData.pickupLat,
        pickupLng: validatedData.pickupLng,
        pickupContact: validatedData.pickupContact,
        pickupInstructions: validatedData.pickupInstructions,
        deliveryAddress: validatedData.deliveryAddress,
        deliveryLat: validatedData.deliveryLat,
        deliveryLng: validatedData.deliveryLng,
        deliveryContact: validatedData.deliveryContact,
        deliveryInstructions: validatedData.deliveryInstructions,
        recipientName: validatedData.recipientName,
        recipientPhone: validatedData.recipientPhone,
        deliveryType: validatedData.deliveryType || 'PARCEL_DELIVERY',
        packageSize: validatedData.packageSize || 'MEDIUM',
        packageDescription: validatedData.packageDescription,
        itemsList: validatedData.itemsList,
        packageValue: validatedData.packageValue,
        weight: validatedData.weight,
        scheduledPickupTime: validatedData.scheduledPickupTime ? new Date(validatedData.scheduledPickupTime) : null,
        scheduledDeliveryTime: validatedData.scheduledDeliveryTime ? new Date(validatedData.scheduledDeliveryTime) : null,
        deliveryTimeWindow: validatedData.deliveryTimeWindow,
        basePrice,
        distancePrice,
        urgencyPrice,
        totalPrice,
        paymentMethod: validatedData.paymentMethod || 'CASH_ON_DELIVERY',
        status: 'PENDING',
      },
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
      },
    });

    // Create tracking history entry
    await prisma.trackingHistory.create({
      data: {
        orderId: order.id,
        status: 'PENDING',
        notes: 'Order created',
      },
    });

    return successResponse(order, 'Order created successfully', 201);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return unauthorizedResponse();
    }

    if (error instanceof ZodError) {
      return validationErrorResponse(error.errors);
    }

    console.error('Create order error:', error);
    return serverErrorResponse('Failed to create order');
  }
}

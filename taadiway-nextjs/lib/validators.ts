// Zod validation schemas for API routes
import { z } from 'zod';

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  role: z.enum(['SYSTEM_ADMIN', 'DRIVER', 'CLIENT']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Order schemas
export const createOrderSchema = z.object({
  pickupAddress: z.string().min(1, 'Pickup address is required'),
  pickupLat: z.number().optional(),
  pickupLng: z.number().optional(),
  pickupContact: z.string().optional(),
  pickupInstructions: z.string().optional(),
  
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  deliveryLat: z.number().optional(),
  deliveryLng: z.number().optional(),
  deliveryContact: z.string().optional(),
  deliveryInstructions: z.string().optional(),
  recipientName: z.string().optional(),
  recipientPhone: z.string().optional(),
  
  deliveryType: z.string().optional(),
  packageSize: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE']).optional(),
  packageDescription: z.string().optional(),
  itemsList: z.string().optional(), // JSON string
  packageValue: z.number().optional(),
  weight: z.number().optional(),
  
  scheduledPickupTime: z.string().optional(),
  scheduledDeliveryTime: z.string().optional(),
  deliveryTimeWindow: z.string().optional(),
  
  paymentMethod: z.enum(['CASH_ON_DELIVERY', 'ONLINE_CARD', 'MOBILE_MONEY', 'WALLET']).optional(),
});

export const assignOrderSchema = z.object({
  driverId: z.string().min(1, 'Driver ID is required'),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'PENDING',
    'CONFIRMED',
    'ASSIGNED',
    'PICKED_UP',
    'IN_TRANSIT',
    'DELIVERED',
    'FAILED',
    'CANCELLED',
  ]),
  notes: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// Driver schemas
export const updateDriverLocationSchema = z.object({
  lat: z.number().min(-90).max(90, 'Invalid latitude'),
  lng: z.number().min(-180).max(180, 'Invalid longitude'),
});

export const updateDriverStatusSchema = z.object({
  isAvailable: z.boolean(),
});

// Helper to validate request body
export async function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
  return schema.parse(data);
}

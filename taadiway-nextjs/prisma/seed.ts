import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Create System Admin
    const hashedPassword = await bcrypt.hash('Admin@123456', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@taadiway.com' },
      update: {},
      create: {
        email: 'admin@taadiway.com',
        password: hashedPassword,
        firstName: 'System',
        lastName: 'Administrator',
        phoneNumber: '0559220442',
        role: 'SYSTEM_ADMIN',
        status: 'ACTIVE',
        emailVerified: true,
        phoneVerified: true,
        city: 'Takoradi',
        region: 'Western Region',
        adminProfile: {
          create: {
            department: 'Operations',
            accessLevel: 'FULL',
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

    console.log('✅ Admin user created:', admin.email);

    // Create Test Driver
    const driverPassword = await bcrypt.hash('Driver@123', 10);
    const driver = await prisma.user.upsert({
      where: { email: 'driver@taadiway.com' },
      update: {},
      create: {
        email: 'driver@taadiway.com',
        password: driverPassword,
        firstName: 'Kwame',
        lastName: 'Mensah',
        phoneNumber: '0244123456',
        role: 'DRIVER',
        status: 'ACTIVE',
        emailVerified: true,
        phoneVerified: true,
        city: 'Takoradi',
        region: 'Western Region',
        driverProfile: {
          create: {
            licenseNumber: 'DL123456',
            vehicleType: 'MOTORCYCLE',
            isAvailable: true,
            isOnline: false,
            rating: 5.0,
            totalDeliveries: 0,
            completedDeliveries: 0,
            cancelledDeliveries: 0,
            verificationStatus: 'VERIFIED',
            verifiedAt: new Date(),
            bankName: 'GCB Bank',
            accountNumber: '1234567890',
            accountName: 'Kwame Mensah',
            mobileMoneyNumber: '0244123456',
          },
        },
      },
    });

    console.log('✅ Driver user created:', driver.email);

    // Create Test Client
    const clientPassword = await bcrypt.hash('Client@123', 10);
    const client = await prisma.user.upsert({
      where: { email: 'client@taadiway.com' },
      update: {},
      create: {
        email: 'client@taadiway.com',
        password: clientPassword,
        firstName: 'Ama',
        lastName: 'Adjei',
        phoneNumber: '0201234567',
        role: 'CLIENT',
        status: 'ACTIVE',
        emailVerified: true,
        phoneVerified: true,
        businessType: 'ONLINE_SHOP',
        businessName: 'Ama\'s Fashion Store',
        businessAddress: 'Market Circle, Takoradi',
        businessPhone: '0201234567',
        city: 'Takoradi',
        region: 'Western Region',
      },
    });

    console.log('✅ Client user created:', client.email);

    // Create Delivery Zones for Takoradi
    const zones = [
      {
        name: 'Takoradi Central',
        description: 'Main market area and central business district',
        basePrice: 10.0,
        pricePerKm: 2.0,
        active: true,
      },
      {
        name: 'Takoradi Residential',
        description: 'Residential areas including New Takoradi, Kokompe',
        basePrice: 15.0,
        pricePerKm: 2.5,
        active: true,
      },
      {
        name: 'Sekondi Area',
        description: 'Sekondi and surrounding neighborhoods',
        basePrice: 20.0,
        pricePerKm: 3.0,
        active: true,
      },
      {
        name: 'Outer Suburbs',
        description: 'Areas beyond 10km radius',
        basePrice: 25.0,
        pricePerKm: 3.5,
        active: true,
      },
    ];

    for (const zone of zones) {
      await prisma.deliveryZone.upsert({
        where: { name: zone.name },
        update: zone,
        create: zone,
      });
    }

    console.log('✅ Delivery zones created');

    // Create System Settings
    const settings = [
      {
        key: 'platform_commission_percentage',
        value: '15',
        category: 'PAYMENT',
        description: 'Percentage commission taken by platform per delivery',
      },
      {
        key: 'default_delivery_radius_km',
        value: '20',
        category: 'DELIVERY',
        description: 'Default maximum delivery radius in kilometers',
      },
      {
        key: 'min_order_value',
        value: '5',
        category: 'ORDER',
        description: 'Minimum order value in GHS',
      },
      {
        key: 'express_delivery_multiplier',
        value: '1.5',
        category: 'PRICING',
        description: 'Multiplier for express delivery pricing',
      },
      {
        key: 'after_hours_surcharge',
        value: '5',
        category: 'PRICING',
        description: 'Additional charge for after-hours delivery (GHS)',
      },
      {
        key: 'weekend_surcharge',
        value: '5',
        category: 'PRICING',
        description: 'Additional charge for weekend delivery (GHS)',
      },
      {
        key: 'cancellation_fee_percentage',
        value: '10',
        category: 'PAYMENT',
        description: 'Cancellation fee as percentage of order value',
      },
      {
        key: 'driver_payout_percentage',
        value: '85',
        category: 'PAYMENT',
        description: 'Percentage of delivery fee paid to driver',
      },
      {
        key: 'max_delivery_time_minutes',
        value: '90',
        category: 'DELIVERY',
        description: 'Maximum expected delivery time in minutes',
      },
      {
        key: 'contact_email',
        value: 'taadiway@gmail.com',
        category: 'CONTACT',
        description: 'Primary contact email',
      },
      {
        key: 'contact_phone',
        value: '0559220442',
        category: 'CONTACT',
        description: 'Primary contact phone number',
      },
      {
        key: 'business_hours_start',
        value: '08:00',
        category: 'OPERATIONS',
        description: 'Business hours start time (24-hour format)',
      },
      {
        key: 'business_hours_end',
        value: '18:00',
        category: 'OPERATIONS',
        description: 'Business hours end time (24-hour format)',
      },
    ];

    for (const setting of settings) {
      await prisma.systemSetting.upsert({
        where: { key: setting.key },
        update: setting,
        create: setting,
      });
    }

    console.log('✅ System settings created');

    console.log('\\n🎉 Database seeded successfully!\\n');
    console.log('Test Credentials:');
    console.log('================');
    console.log('Admin: admin@taadiway.com / Admin@123456');
    console.log('Driver: driver@taadiway.com / Driver@123');
    console.log('Client: client@taadiway.com / Client@123');
    console.log('================\\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

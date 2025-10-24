'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Typography, Steps, Space, Tag, Row, Col } from 'antd';
import { SearchOutlined, EnvironmentOutlined, ClockCircleOutlined, CheckCircleOutlined, CarOutlined } from '@ant-design/icons';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph, Text } = Typography;

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);

  const handleTrack = () => {
    // TODO: Implement actual tracking API call
    // Mock data for now
    setTrackingData({
      orderId: trackingNumber || 'GE-2025-001234',
      status: 'In Transit',
      currentStep: 2,
      estimatedDelivery: '2:30 PM',
      steps: [
        {
          title: 'Order Placed',
          description: 'Your order has been received',
          time: '1:00 PM',
          status: 'finish',
        },
        {
          title: 'Rider Assigned',
          description: 'Kwame A. has been assigned',
          time: '1:15 PM',
          status: 'finish',
        },
        {
          title: 'In Transit',
          description: 'Your package is on the way',
          time: '1:30 PM',
          status: 'process',
        },
        {
          title: 'Delivered',
          description: 'Package delivered successfully',
          time: 'Est. 2:30 PM',
          status: 'wait',
        },
      ],
      pickup: {
        address: 'Osu, Accra',
        time: '1:20 PM',
      },
      delivery: {
        address: 'East Legon, Accra',
        time: 'Est. 2:30 PM',
      },
      rider: {
        name: 'Kwame A.',
        phone: '024-XXX-XXXX',
        vehicle: 'Motorcycle',
      },
    });
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          padding: '80px 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <EnvironmentOutlined style={{ fontSize: 64, marginBottom: 16 }} />
          <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 16 }}>
            Track Your Order
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            Enter your tracking number to see real-time updates on your delivery
          </Paragraph>
        </div>
      </section>

      {/* Tracking Form */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Card variant="borderless" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Space.Compact style={{ width: '100%' }} size="large">
              <Input
                placeholder="Enter tracking number (e.g., GE-2025-001234)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                size="large"
                onPressEnter={handleTrack}
              />
              <Button type="primary" danger icon={<SearchOutlined />} onClick={handleTrack}>
                Track
              </Button>
            </Space.Compact>
          </Card>

          {/* Tracking Results */}
          {trackingData && (
            <div style={{ marginTop: 40 }}>
              <Card
                variant="borderless"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: 24 }}
              >
                <div style={{ marginBottom: 24 }}>
                  <Space direction="vertical" size="small">
                    <Text strong style={{ fontSize: 16 }}>
                      Order ID: {trackingData.orderId}
                    </Text>
                    <Space>
                      <Tag color="processing" style={{ fontSize: 14, padding: '4px 12px' }}>
                        {trackingData.status}
                      </Tag>
                      <Text type="secondary">
                        <ClockCircleOutlined /> Est. Delivery: {trackingData.estimatedDelivery}
                      </Text>
                    </Space>
                  </Space>
                </div>

                <Steps
                  direction="vertical"
                  current={trackingData.currentStep}
                  items={trackingData.steps.map((step: any) => ({
                    title: step.title,
                    description: (
                      <>
                        <div>{step.description}</div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {step.time}
                        </Text>
                      </>
                    ),
                    status: step.status,
                  }))}
                />
              </Card>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Card
                    variant="borderless"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: '4px solid #E63946' }}
                  >
                    <Space direction="vertical" size="small">
                      <Text strong style={{ color: '#E63946' }}>
                        Pickup Location
                      </Text>
                      <Text>{trackingData.pickup.address}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <ClockCircleOutlined /> {trackingData.pickup.time}
                      </Text>
                    </Space>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card
                    variant="borderless"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: '4px solid #FFB703' }}
                  >
                    <Space direction="vertical" size="small">
                      <Text strong style={{ color: '#FFB703' }}>
                        Delivery Location
                      </Text>
                      <Text>{trackingData.delivery.address}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <ClockCircleOutlined /> {trackingData.delivery.time}
                      </Text>
                    </Space>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card
                    variant="borderless"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: '4px solid #06d6a0' }}
                  >
                    <Space direction="vertical" size="small">
                      <Text strong style={{ color: '#06d6a0' }}>
                        Rider Details
                      </Text>
                      <Text>{trackingData.rider.name}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <CarOutlined /> {trackingData.rider.vehicle}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section style={{ padding: '60px 20px', background: '#fafafa', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Title level={3} style={{ color: '#E63946', marginBottom: 16 }}>
            Can't Find Your Tracking Number?
          </Title>
          <Paragraph style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
            Your tracking number was sent via SMS and email when your order was confirmed.
            Check your messages or contact us for assistance.
          </Paragraph>
          <Space size="large">
            <a href="/contact">
              <Button size="large">Contact Support</Button>
            </a>
            <a href="tel:0256039212">
              <Button type="primary" danger size="large">
                Call 0256039212
              </Button>
            </a>
          </Space>
        </div>
      </section>
    </PublicLayout>
  );
}

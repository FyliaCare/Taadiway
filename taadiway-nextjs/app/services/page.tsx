'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Space, List, Tag } from 'antd';
import Image from 'next/image';
import {
  RocketOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ShoppingOutlined,
  MedicineBoxOutlined,
  CarOutlined,
  GiftOutlined,
  FileTextOutlined,
  ToolOutlined,
  ClockCircleOutlined,
  StarFilled,
  ArrowRightOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph, Text } = Typography;

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      icon: <RocketOutlined />,
      title: 'Food Delivery',
      description: 'Hot and fresh meals delivered from restaurants to your doorstep',
      color: '#E63946',
      image: '/WhatsApp Image 2025-10-20 at 19.37.29_a20fbddb.jpg',
      price: 'From GH₵15',
      time: '30-45 mins',
      features: [
        'Partner with 100+ restaurants',
        'Average delivery time: 30-45 minutes',
        'Food kept fresh with insulated bags',
        'Real-time tracking',
        'Contactless delivery available',
      ],
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Parcel & Package Delivery',
      description: 'Safe and secure delivery of packages of all sizes across the city',
      color: '#FB8500',
      image: '/WhatsApp Image 2025-10-20 at 19.37.30_71600617.jpg',
      price: 'From GH₵10',
      time: '1-2 hours',
      features: [
        'Documents to large packages',
        'Door-to-door service',
        'Insurance coverage available',
        'Proof of delivery with photo',
        'Same-day & next-day options',
      ],
    },
    {
      icon: <ShoppingOutlined />,
      title: 'Grocery Shopping & Delivery',
      description: 'We shop for your groceries and deliver them fresh to your home',
      color: '#FFB703',
      image: '/WhatsApp Image 2025-10-20 at 19.37.30_cfdcb877.jpg',
      price: 'From GH₵20',
      time: '2-3 hours',
      features: [
        'Shop from your favorite stores',
        'Fresh produce selection',
        'Refrigerated transport for perishables',
        'Shopping receipt provided',
        'Scheduled or on-demand delivery',
      ],
    },
    {
      icon: <MedicineBoxOutlined />,
      title: 'Pharmaceutical Delivery',
      description: 'Timely and secure delivery of medicines and medical supplies',
      color: '#06d6a0',
      image: '/WhatsApp Image 2025-10-20 at 19.37.31_909a8905.jpg',
      price: 'From GH₵12',
      time: '1 hour',
      features: [
        'Temperature-controlled delivery',
        'Prescription verification',
        'Direct from pharmacy to you',
        'Discreet packaging',
        'Emergency delivery available',
      ],
    },
    {
      icon: <CarOutlined />,
      title: 'Bus Station Pickup',
      description: 'We collect your parcels from bus stations so you don\'t have to',
      color: '#0096FF',
      image: '/WhatsApp Image 2025-10-20 at 19.37.31_be5b6bc2.jpg',
      price: 'From GH₵25',
      time: '3-4 hours',
      features: [
        'All major bus terminals covered',
        'Parcel collection on your behalf',
        'Tracking number integration',
        'Direct home delivery',
        'No waiting in long queues',
      ],
    },
    {
      icon: <GiftOutlined />,
      title: 'Gift & Special Deliveries',
      description: 'Make someone\'s day special with our gift delivery service',
      color: '#D946EF',
      image: '/WhatsApp Image 2025-10-20 at 19.37.29_2d8d922f.jpg',
      price: 'From GH₵18',
      time: '2 hours',
      features: [
        'Birthday & anniversary deliveries',
        'Gift wrapping available',
        'Personalized delivery messages',
        'Scheduled future deliveries',
        'Photo confirmation',
      ],
    },
    {
      icon: <FileTextOutlined />,
      title: 'Document Courier',
      description: 'Express delivery of important documents for businesses',
      color: '#8338EC',
      image: '/WhatsApp Image 2025-10-20 at 19.37.32_2959ffc2.jpg',
      price: 'From GH₵15',
      time: '1-2 hours',
      features: [
        'Legal & business documents',
        'Chain of custody tracking',
        'Signature confirmation',
        'Multiple pickup/dropoff points',
        'Corporate accounts available',
      ],
    },
    {
      icon: <ToolOutlined />,
      title: 'Custom Errands',
      description: 'Whatever errand you need - we\'ll handle it professionally',
      color: '#14B8A6',
      image: '/WhatsApp Image 2025-10-20 at 19.37.31_f8417141.jpg',
      price: 'Custom Quote',
      time: 'Varies',
      features: [
        'Bank deposits & withdrawals',
        'Bill payments',
        'Market runs',
        'Pick up & delivery service',
        'Tailored to your needs',
      ],
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section with Background */}
      <section
        style={{
          position: 'relative',
          minHeight: '60vh',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: 'radial-gradient(circle, #FFB703 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 20px', width: '100%', position: 'relative', zIndex: 1 }}>
          <Row align="middle" gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <Title level={1} style={{ color: '#FFB703', fontSize: 48, marginBottom: 16 }}>
                Our Services
              </Title>
              <Paragraph style={{ fontSize: 18, color: 'white', marginBottom: 24, lineHeight: 1.8 }}>
                From food delivery to custom errands, we provide comprehensive delivery solutions 
                tailored to your needs across Takoradi.
              </Paragraph>
              <Space size="large">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 'bold', color: '#FFB703' }}>8+</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Services</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 'bold', color: '#E63946' }}>10K+</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Deliveries</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 'bold', color: '#06d6a0' }}>4.9</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Rating</div>
                </div>
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <div style={{
                position: 'relative',
                height: 400,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}>
                <Image
                  src={services[selectedService].image}
                  alt={services[selectedService].title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Featured Services - Interactive Cards */}
      <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Title level={2} style={{ fontSize: 38, marginBottom: 16 }}>
              Choose Your <span style={{ color: '#E63946' }}>Service</span>
            </Title>
            <Paragraph style={{ fontSize: 16, color: '#666', maxWidth: 600, margin: '0 auto' }}>
              Select a service to see more details and book instantly
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {services.map((service, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  onClick={() => setSelectedService(index)}
                  style={{
                    height: '100%',
                    borderRadius: 16,
                    border: selectedService === index ? `3px solid ${service.color}` : 'none',
                    boxShadow: selectedService === index 
                      ? `0 8px 24px ${service.color}40` 
                      : '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'center' }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: `${service.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                      }}
                    >
                      {React.cloneElement(service.icon, {
                        style: { fontSize: 36, color: service.color },
                      })}
                    </div>
                    <div>
                      <Title level={4} style={{ marginBottom: 8, fontSize: 18 }}>
                        {service.title}
                      </Title>
                      <Space size={4} style={{ marginBottom: 8 }}>
                        <ClockCircleOutlined style={{ color: '#666', fontSize: 14 }} />
                        <Text style={{ fontSize: 13, color: '#666' }}>{service.time}</Text>
                      </Space>
                      <Tag color={service.color} style={{ fontSize: 14, padding: '4px 12px' }}>
                        {service.price}
                      </Tag>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Selected Service Details */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div style={{
                position: 'relative',
                height: 500,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
              }}>
                <Image
                  src={services[selectedService].image}
                  alt={services[selectedService].title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: `${services[selectedService].color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                    }}
                  >
                    {React.cloneElement(services[selectedService].icon, {
                      style: { fontSize: 32, color: services[selectedService].color },
                    })}
                  </div>
                  <Title level={2} style={{ marginBottom: 12, fontSize: 36 }}>
                    {services[selectedService].title}
                  </Title>
                  <Paragraph style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
                    {services[selectedService].description}
                  </Paragraph>
                </div>

                <div>
                  <Title level={4} style={{ marginBottom: 16 }}>Key Features</Title>
                  <List
                    dataSource={services[selectedService].features}
                    renderItem={(item) => (
                      <List.Item style={{ border: 'none', padding: '8px 0' }}>
                        <Space>
                          <CheckCircleOutlined style={{ color: services[selectedService].color, fontSize: 18 }} />
                          <Text style={{ fontSize: 15 }}>{item}</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </div>

                <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                  <Link href="/register-client" style={{ flex: 1 }}>
                    <Button
                      type="primary"
                      size="large"
                      block
                      icon={<ArrowRightOutlined />}
                      style={{
                        height: 56,
                        fontSize: 16,
                        borderRadius: 12,
                        background: services[selectedService].color,
                        borderColor: services[selectedService].color,
                      }}
                    >
                      Book Now
                    </Button>
                  </Link>
                  <Link href="/pricing" style={{ flex: 1 }}>
                    <Button
                      size="large"
                      block
                      style={{
                        height: 56,
                        fontSize: 16,
                        borderRadius: 12,
                        borderColor: services[selectedService].color,
                        color: services[selectedService].color,
                      }}
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </Space>
            </Col>
          </Row>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#FFB703', fontSize: 38, marginBottom: 16 }}>
            Why Choose Taadiway?
          </Title>
          <Paragraph style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', marginBottom: 60, maxWidth: 600, margin: '0 auto 60px' }}>
            We're more than just a delivery service - we're your trusted partner
          </Paragraph>

          <Row gutter={[32, 32]}>
            {[
              { icon: <ThunderboltOutlined />, title: 'Fast Delivery', desc: 'Quick turnaround on all services', color: '#FFB703' },
              { icon: <SafetyOutlined />, title: 'Secure & Safe', desc: 'Your items are insured and tracked', color: '#06d6a0' },
              { icon: <TeamOutlined />, title: 'Professional Team', desc: 'Trained and verified riders', color: '#E63946' },
              { icon: <StarFilled />, title: '4.9 Rating', desc: 'Trusted by thousands of customers', color: '#FFB703' },
            ].map((item, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div
                  style={{
                    padding: 32,
                    borderRadius: 16,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: `${item.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}
                  >
                    {React.cloneElement(item.icon, { style: { fontSize: 32, color: item.color } })}
                  </div>
                  <Title level={4} style={{ color: 'white', marginBottom: 12 }}>
                    {item.title}
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.8)' }}>{item.desc}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px', background: '#f8f9fa', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title level={2} style={{ fontSize: 38, marginBottom: 16 }}>
            Ready to Get Started?
          </Title>
          <Paragraph style={{ fontSize: 16, color: '#666', marginBottom: 40 }}>
            Join thousands of satisfied customers who trust Taadiway for their delivery needs
          </Paragraph>
          <Space size="large" wrap>
            <Link href="/register-client">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined />}
                danger
                style={{
                  height: 56,
                  padding: '0 40px',
                  fontSize: 16,
                  borderRadius: 12,
                }}
              >
                Create Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="large"
                style={{
                  height: 56,
                  padding: '0 40px',
                  fontSize: 16,
                  borderRadius: 12,
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Space>
        </div>
      </section>
    </PublicLayout>
  );
}

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Row, Col, Card, Typography, Space, Button, Divider } from 'antd';
import {
  RocketOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  StarFilled,
  CarOutlined,
  ShoppingOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import PublicLayout from '@/components/PublicLayout';

const { Title, Text, Paragraph } = Typography;

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize services array to prevent recreation on each render
  const services = useMemo(() => [
    {
      icon: <ShoppingOutlined />,
      title: 'Food Delivery',
      description: 'Hot meals delivered fresh from your favorite restaurants',
      color: '#E63946',
      image: '/WhatsApp Image 2025-10-20 at 19.37.29_a20fbddb.jpg',
    },
    {
      icon: <CarOutlined />,
      title: 'Parcel Delivery',
      description: 'Safe and secure package delivery across Takoradi',
      color: '#FB8500',
      image: '/WhatsApp Image 2025-10-20 at 19.37.30_71600617.jpg',
    },
    {
      icon: <ShoppingOutlined />,
      title: 'Grocery Shopping',
      description: 'We shop for groceries while you focus on what matters',
      color: '#FFB703',
      image: '/WhatsApp Image 2025-10-20 at 19.37.30_cfdcb877.jpg',
    },
    {
      icon: <MedicineBoxOutlined />,
      title: 'Pharmaceutical',
      description: 'Timely delivery of medicines and health products',
      color: '#06d6a0',
      image: '/WhatsApp Image 2025-10-20 at 19.37.31_909a8905.jpg',
    },
    {
      icon: <TeamOutlined />,
      title: 'Bus Station Pickup',
      description: 'Collect parcels from bus stations on your behalf',
      color: '#0096FF',
      image: '/WhatsApp Image 2025-10-20 at 19.37.31_be5b6bc2.jpg',
    },
    {
      icon: <CheckCircleOutlined />,
      title: 'Personal Errands',
      description: 'Any errand you need - we handle it with care',
      color: '#8338EC',
      image: '/WhatsApp Image 2025-10-20 at 19.37.31_f8417141.jpg',
    },
  ], []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <PublicLayout>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-30px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translate3d(30px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale3d(0.9, 0.9, 1);
          }
          to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -20px, 0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale3d(1, 1, 1);
          }
          50% {
            transform: scale3d(1.05, 1.05, 1);
          }
        }

        @keyframes slideBackground {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          will-change: transform, opacity;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
          will-change: transform, opacity;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
          will-change: transform, opacity;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
          will-change: transform, opacity;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .hover-lift:hover {
          transform: translate3d(0, -10px, 0);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
        }

        .hover-scale {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .hover-scale:hover {
          transform: scale3d(1.05, 1.05, 1);
        }
      `}</style>
      <div style={{ overflow: 'hidden' }}>
        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            minHeight: '90vh',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: 'radial-gradient(circle, #FFB703 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'slideBackground 20s linear infinite',
          }} />

          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 20px', position: 'relative', zIndex: 1 }}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <div className="animate-scale-in" style={{ textAlign: 'center', marginBottom: 24 }}>
                  <Image 
                    src="/Logo.png" 
                    alt="Taadiway Logo" 
                    width={180}
                    height={180}
                    priority
                    className="animate-float"
                    style={{ 
                      objectFit: 'contain',
                    }} 
                  />
                </div>
                
                <Title 
                  level={1}
                  className="animate-fade-in-up delay-100" 
                  style={{ 
                    color: 'white', 
                    fontSize: 56, 
                    marginBottom: 16,
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}
                >
                  Your Trusted <span style={{ color: '#FFB703' }}>Delivery</span> Partner
                </Title>
                
                <Paragraph 
                  className="animate-fade-in-up delay-200"
                  style={{ 
                    fontSize: 20, 
                    color: 'rgba(255,255,255,0.9)', 
                    textAlign: 'center',
                    marginBottom: 32,
                  }}
                >
                  From food to pharmaceuticals, we deliver with passion and precision across Takoradi
                </Paragraph>

                <Row gutter={16} style={{ marginBottom: 40 }}>
                  <Col xs={8}>
                    <div className="animate-scale-in delay-300 hover-scale" style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <StarFilled className="animate-pulse" style={{ fontSize: 32, color: '#FFB703', marginBottom: 8 }} />
                      <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>4.9/5</div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Rating</div>
                    </div>
                  </Col>
                  <Col xs={8}>
                    <div className="animate-scale-in delay-400 hover-scale" style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <RocketOutlined style={{ fontSize: 32, color: '#E63946', marginBottom: 8 }} />
                      <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>10K+</div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Deliveries</div>
                    </div>
                  </Col>
                  <Col xs={8}>
                    <div className="animate-scale-in delay-500 hover-scale" style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <ClockCircleOutlined style={{ fontSize: 32, color: '#06d6a0', marginBottom: 8 }} />
                      <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>30min</div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Avg Time</div>
                    </div>
                  </Col>
                </Row>

                <Space size="large" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/register-client">
                    <Button
                      type="primary"
                      size="large"
                      danger
                      icon={<RocketOutlined />}
                      style={{
                        height: 56,
                        fontSize: 18,
                        padding: '0 40px',
                        background: 'linear-gradient(135deg, #E63946 0%, #FB8500 100%)',
                        border: 'none',
                        boxShadow: '0 8px 24px rgba(230, 57, 70, 0.4)',
                      }}
                    >
                      Order Now
                    </Button>
                  </Link>
                  <a href="tel:+233559220442">
                    <Button
                      size="large"
                      icon={<PhoneOutlined />}
                      style={{
                        height: 56,
                        fontSize: 18,
                        padding: '0 40px',
                        background: 'rgba(255, 183, 3, 0.1)',
                        border: '2px solid #FFB703',
                        color: '#FFB703',
                      }}
                    >
                      0559 220 442
                    </Button>
                  </a>
                </Space>
              </Col>

              <Col xs={24} lg={12}>
                <div 
                  className="animate-fade-in-right delay-200"
                  style={{ 
                    position: 'relative',
                    height: 500,
                    borderRadius: 24,
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                >
                  {services.map((service, index) => (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: activeService === index ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        pointerEvents: activeService === index ? 'auto' : 'none',
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: 32,
                          background: `linear-gradient(to top, ${service.color}dd, transparent)`,
                        }}
                      >
                        <div style={{ fontSize: 48, color: 'white', marginBottom: 8 }}>
                          {service.icon}
                        </div>
                        <Title level={2} style={{ color: 'white', marginBottom: 8 }}>
                          {service.title}
                        </Title>
                        <Paragraph style={{ color: 'white', fontSize: 16, margin: 0, opacity: 0.95 }}>
                          {service.description}
                        </Paragraph>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ 
                    position: 'absolute', 
                    top: 24, 
                    right: 24, 
                    display: 'flex', 
                    gap: 8,
                    zIndex: 2,
                  }}>
                    {services.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveService(index)}
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: activeService === index ? '#FFB703' : 'rgba(255,255,255,0.4)',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          border: '2px solid white',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* Video Story Section */}
        <section style={{ padding: '80px 20px', background: 'white' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <Title level={2} style={{ fontSize: 42, marginBottom: 16 }}>
                See <span style={{ color: '#E63946' }}>Taadiway</span> in Action
              </Title>
              <Paragraph style={{ fontSize: 18, color: '#666' }}>
                Watch how we deliver excellence every single day
              </Paragraph>
            </div>

            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} lg={14}>
                <div style={{ 
                  position: 'relative', 
                  borderRadius: 24, 
                  overflow: 'hidden',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                }}>
                  {mounted ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      style={{ width: '100%', display: 'block' }}
                    >
                      <source src="/WhatsApp Video 2025-10-20 at 19.37.28_82646dc1.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div style={{ width: '100%', height: '400px', background: '#f0f0f0' }} />
                  )}
                </div>
              </Col>
              <Col xs={24} lg={10}>
                <Title level={3} style={{ fontSize: 32, marginBottom: 24, color: '#1a1a2e' }}>
                  Every Delivery Tells a Story
                </Title>
                <Paragraph style={{ fontSize: 16, color: '#666', lineHeight: 1.8, marginBottom: 20 }}>
                  Behind every package is someone's important moment. A birthday gift arriving just in time. 
                  Medicine reaching someone who needs it urgently. A hot meal bringing comfort after a long day.
                </Paragraph>
                <Paragraph style={{ fontSize: 16, color: '#666', lineHeight: 1.8, marginBottom: 20 }}>
                  At Taadiway, we don't just move items from point A to point B. We deliver happiness, relief, 
                  and peace of mind. Our riders are more than delivery personnel – they're trusted partners in 
                  your daily life.
                </Paragraph>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <HeartOutlined style={{ fontSize: 32, color: '#E63946' }} />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1a1a2e' }}>Delivered with Care</div>
                      <div style={{ color: '#666', fontSize: 14 }}>Every package handled like it's our own</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <ThunderboltOutlined style={{ fontSize: 32, color: '#FFB703' }} />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1a1a2e' }}>Lightning Fast</div>
                      <div style={{ color: '#666', fontSize: 14 }}>Because your time matters to us</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <SafetyOutlined style={{ fontSize: 32, color: '#06d6a0' }} />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1a1a2e' }}>100% Secure</div>
                      <div style={{ color: '#666', fontSize: 14 }}>Your packages are always safe with us</div>
                    </div>
                  </div>
                </Space>
              </Col>
            </Row>
          </div>
        </section>

        {/* Real Stories - Photo Gallery */}
        <section style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <Title level={2} style={{ fontSize: 42, marginBottom: 16 }}>
                Real Moments, Real <span style={{ color: '#E63946' }}>Impact</span>
              </Title>
              <Paragraph style={{ fontSize: 18, color: '#666' }}>
                Stories from our daily operations across Takoradi
              </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Card
                  hoverable
                  className="hover-lift"
                  style={{ 
                    borderRadius: 20, 
                    overflow: 'hidden',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}
                  styles={{ body: { padding: 0 } }}
                >
                  <div style={{ position: 'relative', height: 300 }}>
                    <Image
                      src="/WhatsApp Image 2025-10-20 at 19.37.27_092f23cc.jpg"
                      alt="Taadiway Team"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 24 }}>
                    <Title level={4} style={{ marginBottom: 12, color: '#E63946' }}>
                      Our Amazing Team
                    </Title>
                    <Paragraph style={{ color: '#666', margin: 0 }}>
                      Meet the dedicated professionals who make every delivery possible. Trained, verified, 
                      and committed to excellence.
                    </Paragraph>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card
                  hoverable
                  className="hover-lift"
                  style={{ 
                    borderRadius: 20, 
                    overflow: 'hidden',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}
                  styles={{ body: { padding: 0 } }}
                >
                  <div style={{ position: 'relative', height: 300 }}>
                    <Image
                      src="/WhatsApp Image 2025-10-20 at 19.37.28_3f89ce27.jpg"
                      alt="Building Trust"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 24 }}>
                    <Title level={4} style={{ marginBottom: 12, color: '#FFB703' }}>
                      Building Trust Daily
                    </Title>
                    <Paragraph style={{ color: '#666', margin: 0 }}>
                      Every successful delivery strengthens the trust our customers place in us. 
                      Your satisfaction is our greatest achievement.
                    </Paragraph>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card
                  hoverable
                  className="hover-lift"
                  style={{ 
                    borderRadius: 20, 
                    overflow: 'hidden',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}
                  styles={{ body: { padding: 0 } }}
                >
                  <div style={{ position: 'relative', height: 300 }}>
                    <Image
                      src="/WhatsApp Image 2025-10-20 at 19.37.28_4bfb43a4.jpg"
                      alt="Expanding Services"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 24 }}>
                    <Title level={4} style={{ marginBottom: 12, color: '#06d6a0' }}>
                      Always Growing
                    </Title>
                    <Paragraph style={{ color: '#666', margin: 0 }}>
                      Constantly expanding our services and reach to serve you better wherever you are in Ghana.
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              <Col xs={24} md={12}>
                <Card
                  hoverable
                  className="hover-lift"
                  style={{ 
                    borderRadius: 20, 
                    overflow: 'hidden',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}
                  styles={{ body: { padding: 0 } }}
                >
                  <div style={{ position: 'relative', height: 350 }}>
                    <Image
                      src="/WhatsApp Image 2025-10-20 at 19.37.29_2d8d922f.jpg"
                      alt="Customer Satisfaction"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 24 }}>
                    <Title level={4} style={{ marginBottom: 12, color: '#8338EC' }}>
                      Happy Customers, Happy Us
                    </Title>
                    <Paragraph style={{ color: '#666', margin: 0 }}>
                      The smiles on our customers' faces when they receive their packages on time – 
                      that's what motivates us every single day to deliver excellence.
                    </Paragraph>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card
                  hoverable
                  className="hover-lift"
                  style={{ 
                    borderRadius: 20, 
                    overflow: 'hidden',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    height: '100%'
                  }}
                  styles={{ body: { padding: 0 } }}
                >
                  <div style={{ position: 'relative', height: 350 }}>
                    <Image
                      src="/WhatsApp Image 2025-10-20 at 19.37.32_2959ffc2.jpg"
                      alt="Professional Service"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 24 }}>
                    <Title level={4} style={{ marginBottom: 12, color: '#FB8500' }}>
                      Professional Excellence
                    </Title>
                    <Paragraph style={{ color: '#666', margin: 0 }}>
                      From corporate documents to personal packages, we maintain the highest 
                      standards of professionalism in every delivery.
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* Services Grid */}
        <section style={{ padding: '80px 20px', background: 'white' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <Title level={2} style={{ fontSize: 42, marginBottom: 16 }}>
                Our <span style={{ color: '#E63946' }}>Services</span>
              </Title>
              <Paragraph style={{ fontSize: 18, color: '#666' }}>
                Everything you need, delivered with care
              </Paragraph>
            </div>

            <Row gutter={[32, 32]}>
              {services.map((service, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Card
                    hoverable
                    className="hover-lift"
                    style={{
                      borderRadius: 16,
                      overflow: 'hidden',
                      height: '100%',
                      border: 'none',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                    }}
                    styles={{ body: { padding: 0 } }}
                  >
                    <div style={{ position: 'relative', height: 240 }}>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        }}
                      >
                        {React.cloneElement(service.icon, { 
                          style: { fontSize: 28, color: service.color } 
                        })}
                      </div>
                    </div>
                    <div style={{ padding: 24 }}>
                      <Title level={4} style={{ marginBottom: 12, color: service.color }}>
                        {service.title}
                      </Title>
                      <Paragraph style={{ color: '#666', margin: 0 }}>
                        {service.description}
                      </Paragraph>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Why Choose Us */}
        <section style={{ 
          padding: '80px 20px', 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' 
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <Title level={2} style={{ fontSize: 42, marginBottom: 16 }}>
                Why Choose <span style={{ color: '#E63946' }}>Taadiway</span>?
              </Title>
              <Paragraph style={{ fontSize: 18, color: '#666' }}>
                We're more than just a delivery service
              </Paragraph>
            </div>

            <Row gutter={[32, 32]}>
              <Col xs={24} sm={12} lg={6}>
                <div className="hover-scale" style={{ textAlign: 'center', padding: 24, cursor: 'pointer' }}>
                  <div
                    className="animate-pulse"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #E63946 0%, #FB8500 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 8px 24px rgba(230, 57, 70, 0.3)',
                    }}
                  >
                    <ThunderboltOutlined style={{ fontSize: 48, color: 'white' }} />
                  </div>
                  <Title level={4} style={{ marginBottom: 12 }}>Lightning Fast</Title>
                  <Paragraph style={{ color: '#666' }}>
                    Average delivery time of just 30 minutes
                  </Paragraph>
                </div>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <div className="hover-scale" style={{ textAlign: 'center', padding: 24, cursor: 'pointer' }}>
                  <div
                    className="animate-pulse"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #06d6a0 0%, #00b4d8 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 8px 24px rgba(6, 214, 160, 0.3)',
                    }}
                  >
                    <SafetyOutlined style={{ fontSize: 48, color: 'white' }} />
                  </div>
                  <Title level={4} style={{ marginBottom: 12 }}>100% Secure</Title>
                  <Paragraph style={{ color: '#666' }}>
                    Verified riders and GPS tracking for safety
                  </Paragraph>
                </div>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <div className="hover-scale" style={{ textAlign: 'center', padding: 24, cursor: 'pointer' }}>
                  <div
                    className="animate-pulse"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 8px 24px rgba(255, 183, 3, 0.3)',
                    }}
                  >
                    <TeamOutlined style={{ fontSize: 48, color: 'white' }} />
                  </div>
                  <Title level={4} style={{ marginBottom: 12 }}>Professional Team</Title>
                  <Paragraph style={{ color: '#666' }}>
                    Trained and courteous delivery professionals
                  </Paragraph>
                </div>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <div className="hover-scale" style={{ textAlign: 'center', padding: 24, cursor: 'pointer' }}>
                  <div
                    className="animate-pulse"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8338EC 0%, #3A0CA3 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 8px 24px rgba(131, 56, 236, 0.3)',
                    }}
                  >
                    <CheckCircleOutlined style={{ fontSize: 48, color: 'white' }} />
                  </div>
                  <Title level={4} style={{ marginBottom: 12 }}>24/7 Support</Title>
                  <Paragraph style={{ color: '#666' }}>
                    Always here to help whenever you need us
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: '80px 20px',
            background: 'linear-gradient(135deg, #E63946 0%, #FB8500 50%, #FFB703 100%)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Title level={2} style={{ color: 'white', fontSize: 42, marginBottom: 24 }}>
              Ready to Get Started?
            </Title>
            <Paragraph style={{ color: 'white', fontSize: 20, marginBottom: 40, opacity: 0.95 }}>
              Join thousands of satisfied customers who trust Taadiway for their delivery needs
            </Paragraph>
            <Space size="large" wrap>
              <Link href="/register-client">
                <Button
                  type="default"
                  size="large"
                  icon={<RocketOutlined />}
                  style={{
                    height: 56,
                    fontSize: 18,
                    padding: '0 48px',
                    background: 'white',
                    color: '#E63946',
                    border: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="large"
                  icon={<ArrowRightOutlined />}
                  style={{
                    height: 56,
                    fontSize: 18,
                    padding: '0 48px',
                    background: 'transparent',
                    color: 'white',
                    border: '2px solid white',
                  }}
                >
                  Learn More
                </Button>
              </Link>
            </Space>

            <Row gutter={32} style={{ marginTop: 60, paddingTop: 60, borderTop: '2px solid rgba(255,255,255,0.3)' }}>
              <Col xs={24} md={8}>
                <PhoneOutlined style={{ fontSize: 32, color: 'white', marginBottom: 12 }} />
                <a href="tel:+233559220442" style={{ textDecoration: 'none' }}>
                  <div style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>0559 220 442</div>
                </a>
                <Text style={{ color: 'white', opacity: 0.9 }}>Call us anytime</Text>
              </Col>
              <Col xs={24} md={8}>
                <MailOutlined style={{ fontSize: 32, color: 'white', marginBottom: 12 }} />
                <a href="mailto:taadiway@gmail.com" style={{ textDecoration: 'none' }}>
                  <div style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>taadiway@gmail.com</div>
                </a>
                <Text style={{ color: 'white', opacity: 0.9 }}>Email us</Text>
              </Col>
              <Col xs={24} md={8}>
                <EnvironmentOutlined style={{ fontSize: 32, color: 'white', marginBottom: 12 }} />
                <div style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Takoradi, Ghana</div>
                <Text style={{ color: 'white', opacity: 0.9 }}>Find us here</Text>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

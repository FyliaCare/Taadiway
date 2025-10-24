'use client';

import React from 'react';
import { Row, Col, Card, Typography, Statistic, Timeline } from 'antd';
import {
  RocketOutlined,
  TeamOutlined,
  TrophyOutlined,
  HeartOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  SmileOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  const values = [
    {
      icon: <RocketOutlined />,
      title: 'Speed & Efficiency',
      description: 'We prioritize quick and timely deliveries without compromising quality',
      color: '#E63946',
    },
    {
      icon: <SafetyOutlined />,
      title: 'Reliability',
      description: 'Your packages are safe with us. We handle every delivery with utmost care',
      color: '#06d6a0',
    },
    {
      icon: <HeartOutlined />,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do',
      color: '#8338EC',
    },
    {
      icon: <SmileOutlined />,
      title: 'Professionalism',
      description: 'Trained riders and customer service team dedicated to excellence',
      color: '#FFB703',
    },
  ];

  const stats = [
    { value: '5000+', label: 'Deliveries Completed', icon: <RocketOutlined /> },
    { value: '500+', label: 'Happy Customers', icon: <TeamOutlined /> },
    { value: '50+', label: 'Professional Riders', icon: <SafetyOutlined /> },
    { value: '99%', label: 'On-Time Rate', icon: <ClockCircleOutlined /> },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          padding: '80px 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 16 }}>
            About Taadiway
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            Ghana's trusted delivery partner, committed to excellence in every errand
          </Paragraph>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2} style={{ color: '#E63946', marginBottom: 24 }}>
                Our Story
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#666' }}>
                Taadiway was founded with a simple mission: to make life easier for businesses
                and individuals across Ghana by providing reliable, fast, and professional delivery
                services.
              </Paragraph>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#666' }}>
                What started as a small team with a few motorcycles has grown into one of Ghana's
                most trusted delivery platforms. Today, we serve hundreds of customers daily,
                handling everything from food deliveries to important business documents.
              </Paragraph>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#666' }}>
                We believe that every delivery matters, whether it's a hot meal, a birthday gift,
                or crucial business documents. That's why we've built a team of dedicated professionals
                who share our passion for excellence.
              </Paragraph>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
                  border: 'none',
                  padding: 20,
                }}
              >
                <Timeline
                  style={{ marginTop: 20 }}
                  items={[
                    {
                      color: '#E63946',
                      children: (
                        <>
                          <Title level={4} style={{ color: 'white', marginBottom: 8 }}>
                            2020
                          </Title>
                          <Paragraph style={{ color: 'white', margin: 0 }}>
                            Taadiway was founded in Takoradi with 5 riders
                          </Paragraph>
                        </>
                      ),
                    },
                    {
                      color: '#E63946',
                      children: (
                        <>
                          <Title level={4} style={{ color: 'white', marginBottom: 8 }}>
                            2022
                          </Title>
                          <Paragraph style={{ color: 'white', margin: 0 }}>
                            Expanded to 30+ riders and launched our mobile platform
                          </Paragraph>
                        </>
                      ),
                    },
                    {
                      color: '#E63946',
                      children: (
                        <>
                          <Title level={4} style={{ color: 'white', marginBottom: 8 }}>
                            2024
                          </Title>
                          <Paragraph style={{ color: 'white', margin: 0 }}>
                            Reached 5000+ completed deliveries milestone
                          </Paragraph>
                        </>
                      ),
                    },
                    {
                      color: '#E63946',
                      children: (
                        <>
                          <Title level={4} style={{ color: 'white', marginBottom: 8 }}>
                            2025
                          </Title>
                          <Paragraph style={{ color: 'white', margin: 0 }}>
                            Launched comprehensive delivery platform with real-time tracking
                          </Paragraph>
                        </>
                      ),
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Our Values */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946', fontSize: 36 }}>
              Our Core Values
            </Title>
            <Paragraph style={{ fontSize: 18, color: '#666', maxWidth: 600, margin: '0 auto' }}>
              The principles that guide every delivery we make
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  variant="borderless"
                  style={{
                    height: '100%',
                    textAlign: 'center',
                    borderTop: `4px solid ${value.color}`,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `${value.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {React.cloneElement(value.icon, {
                      style: { fontSize: 40, color: value.color },
                    })}
                  </div>
                  <Title level={4} style={{ marginBottom: 12 }}>
                    {value.title}
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0 }}>
                    {value.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  variant="borderless"
                  style={{
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderTop: '4px solid #E63946',
                  }}
                >
                  <Statistic
                    title={stat.label}
                    value={stat.value}
                    prefix={React.cloneElement(stat.icon, {
                      style: { color: '#E63946', fontSize: 24 },
                    })}
                    valueStyle={{ color: '#E63946', fontWeight: 'bold', fontSize: 32 }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[48, 48]}>
            <Col xs={24} md={12}>
              <Card
                variant="borderless"
                style={{
                  height: '100%',
                  borderLeft: '6px solid #E63946',
                  background: 'white',
                }}
              >
                <TrophyOutlined style={{ fontSize: 48, color: '#E63946', marginBottom: 16 }} />
                <Title level={3} style={{ color: '#E63946', marginBottom: 16 }}>
                  Our Mission
                </Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#666' }}>
                  To provide fast, reliable, and professional delivery services that empower
                  businesses and individuals to achieve more. We're committed to making every
                  delivery count through excellence, innovation, and exceptional customer service.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                variant="borderless"
                style={{
                  height: '100%',
                  borderLeft: '6px solid #FFB703',
                  background: 'white',
                }}
              >
                <RocketOutlined style={{ fontSize: 48, color: '#FFB703', marginBottom: 16 }} />
                <Title level={3} style={{ color: '#FFB703', marginBottom: 16 }}>
                  Our Vision
                </Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#666' }}>
                  To become Ghana's leading delivery platform, setting the standard for speed,
                  reliability, and customer satisfaction. We envision a future where every business
                  and individual has access to world-class delivery services.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </PublicLayout>
  );
}

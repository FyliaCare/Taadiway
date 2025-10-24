'use client';

import React from 'react';
import { Row, Col, Card, Typography, Button, List, Space } from 'antd';
import {
  CarOutlined,
  TeamOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph, Text } = Typography;

export default function CareersPage() {
  const benefits = [
    { icon: <DollarOutlined />, title: 'Competitive Pay', description: 'Earn competitive rates with bonuses and incentives' },
    { icon: <ClockCircleOutlined />, title: 'Flexible Hours', description: 'Choose your own working schedule' },
    { icon: <SafetyOutlined />, title: 'Insurance Coverage', description: 'Health and accident insurance provided' },
    { icon: <RocketOutlined />, title: 'Growth Opportunities', description: 'Career advancement and training programs' },
  ];

  const riderRequirements = [
    'Valid driver\'s license',
    'Own motorcycle in good condition',
    'Smartphone with internet access',
    'Good knowledge of Takoradi roads',
    'Excellent customer service skills',
    'Age 21 years or older',
    'Clean driving record',
    'Ability to work independently',
  ];

  const officePositions = [
    {
      title: 'Customer Service Representative',
      department: 'Operations',
      type: 'Full-time',
      description: 'Handle customer inquiries, resolve issues, and ensure excellent service delivery.',
    },
    {
      title: 'Operations Manager',
      department: 'Operations',
      type: 'Full-time',
      description: 'Oversee daily operations, manage rider fleet, and optimize delivery processes.',
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      type: 'Full-time',
      description: 'Develop marketing campaigns, manage social media, and grow our customer base.',
    },
    {
      title: 'Software Developer',
      department: 'Technology',
      type: 'Full-time',
      description: 'Build and maintain our delivery platform, implement new features.',
    },
  ];

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
          <TeamOutlined style={{ fontSize: 64, marginBottom: 16 }} />
          <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 16 }}>
            Join Our Team
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            Build a rewarding career with Ghana's fastest-growing delivery platform
          </Paragraph>
        </div>
      </section>

      {/* Why Join Us */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946' }}>
              Why Work With Us?
            </Title>
            <Paragraph style={{ fontSize: 16, color: '#666' }}>
              We invest in our team because they are the heart of our service
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {benefits.map((benefit, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  variant="borderless"
                  style={{ textAlign: 'center', height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: '#E6394615',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {React.cloneElement(benefit.icon, {
                      style: { fontSize: 32, color: '#E63946' },
                    })}
                  </div>
                  <Title level={4} style={{ marginBottom: 8 }}>
                    {benefit.title}
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0 }}>
                    {benefit.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Rider Positions */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2} style={{ color: '#E63946', marginBottom: 24 }}>
                Become a Delivery Rider
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#666' }}>
                Join our growing fleet of professional riders and enjoy the freedom of being your own boss 
                while earning competitive income. Whether you're looking for full-time work or flexible 
                part-time hours, we have opportunities for you.
              </Paragraph>
              <Space direction="vertical" size="middle" style={{ marginTop: 24 }}>
                <div>
                  <Text strong style={{ color: '#E63946', fontSize: 18 }}>
                    Earning Potential:
                  </Text>
                  <Paragraph style={{ marginTop: 8 }}>
                    GH₵2,000 - GH₵5,000+ per month based on deliveries completed
                  </Paragraph>
                </div>
                <Button type="primary" size="large" danger icon={<CarOutlined />}>
                  Apply as a Rider
                </Button>
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title="Rider Requirements"
                variant="borderless"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                <List
                  dataSource={riderRequirements}
                  renderItem={(item) => (
                    <List.Item style={{ border: 'none', padding: '8px 0' }}>
                      <Space>
                        <CheckCircleOutlined style={{ color: '#06d6a0' }} />
                        <Text>{item}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Office Positions */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946' }}>
              Office Positions
            </Title>
            <Paragraph style={{ fontSize: 16, color: '#666' }}>
              Explore opportunities in our operations, marketing, and technology teams
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {officePositions.map((position, index) => (
              <Col xs={24} md={12} key={index}>
                <Card
                  variant="borderless"
                  style={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                >
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Title level={4} style={{ marginBottom: 4 }}>
                      {position.title}
                    </Title>
                    <Space>
                      <Text type="secondary">{position.department}</Text>
                      <Text>•</Text>
                      <Text type="secondary">{position.type}</Text>
                    </Space>
                    <Paragraph style={{ color: '#666', marginTop: 12 }}>
                      {position.description}
                    </Paragraph>
                    <Button type="link" style={{ padding: 0, color: '#E63946' }}>
                      View Details →
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Application Process */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#E63946', marginBottom: 48 }}>
            How to Apply
          </Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: '#E63946',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                  fontSize: 36,
                  fontWeight: 'bold',
                }}
              >
                1
              </div>
              <Title level={4}>Submit Application</Title>
              <Paragraph style={{ color: '#666' }}>
                Send your CV and cover letter to careers@taadiway.com
              </Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: '#FFB703',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                  fontSize: 36,
                  fontWeight: 'bold',
                }}
              >
                2
              </div>
              <Title level={4}>Interview</Title>
              <Paragraph style={{ color: '#666' }}>
                Selected candidates will be contacted for an interview
              </Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: '#06d6a0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                  fontSize: 36,
                  fontWeight: 'bold',
                }}
              >
                3
              </div>
              <Title level={4}>Onboarding</Title>
              <Paragraph style={{ color: '#666' }}>
                Complete training and start your journey with us
              </Paragraph>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <HeartOutlined style={{ fontSize: 48, color: '#E63946', marginBottom: 16 }} />
          <Title level={2} style={{ color: '#E63946', marginBottom: 16 }}>
            Ready to Join Our Team?
          </Title>
          <Paragraph style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
            Take the first step towards an exciting career with Taadiway
          </Paragraph>
          <Space size="large">
            <a href="mailto:careers@taadiway.com">
              <Button type="primary" size="large" danger>
                Send Your CV
              </Button>
            </a>
            <a href="tel:0256039212">
              <Button size="large">
                Call for More Info
              </Button>
            </a>
          </Space>
        </div>
      </section>
    </PublicLayout>
  );
}

'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, List, Space, Switch, Divider, Tag, Tabs } from 'antd';
import { 
  CheckCircleOutlined, 
  RocketOutlined, 
  CrownOutlined, 
  ThunderboltOutlined,
  StarFilled,
  CloseCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  CalculatorOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  TrophyOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph, Text } = Typography;

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [activeTab, setActiveTab] = useState('plans');

  const pricingPlans = [
    {
      name: 'Starter',
      icon: <RocketOutlined />,
      price: billingPeriod === 'monthly' ? 'GH₵15' : 'GH₵144',
      originalPrice: billingPeriod === 'yearly' ? 'GH₵180' : null,
      unit: 'per delivery',
      monthlyDeliveries: 'Pay as you go',
      description: 'Perfect for occasional deliveries',
      features: [
        'Standard delivery speed (1-2 hours)',
        'Within 10km radius',
        'Real-time GPS tracking',
        'Email & SMS notifications',
        'Business hour deliveries (8AM-6PM)',
        'Insurance up to GH₵500',
        'Photo proof of delivery',
      ],
      notIncluded: [
        'Priority support',
        'Dedicated account manager',
        'API access',
      ],
      color: '#E63946',
      gradient: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
      popular: false,
      savings: billingPeriod === 'yearly' ? 'GH₵36' : null,
      isYearly: billingPeriod === 'yearly',
    },
    {
      name: 'Business Pro',
      icon: <ThunderboltOutlined />,
      price: billingPeriod === 'monthly' ? 'GH₵400' : 'GH₵3,840',
      originalPrice: billingPeriod === 'yearly' ? 'GH₵4,800' : null,
      unit: billingPeriod === 'monthly' ? 'per month' : 'per year',
      monthlyDeliveries: '40+ deliveries',
      description: 'Best for growing businesses',
      features: [
        'Everything in Starter, plus:',
        '40 deliveries per month',
        'Priority rider assignment',
        'Extended coverage (up to 20km)',
        'Dedicated account manager',
        'Invoice & receipt management',
        'Insurance up to GH₵2,000',
        'API access for integration',
        'Monthly analytics reports',
        'After-hours delivery available',
        'Bulk scheduling',
      ],
      notIncluded: [
        'Dedicated fleet',
        'Custom SLA',
        'White-label options',
      ],
      color: '#FFB703',
      gradient: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
      popular: true,
      savings: billingPeriod === 'yearly' ? 'GH₵960' : null,
      isYearly: billingPeriod === 'yearly',
    },
    {
      name: 'Enterprise',
      icon: <CrownOutlined />,
      price: 'Custom',
      originalPrice: null,
      unit: 'contact sales',
      monthlyDeliveries: 'Unlimited',
      description: 'For large organizations',
      features: [
        'Everything in Business Pro, plus:',
        'Unlimited deliveries',
        'Dedicated fleet option',
        'Custom SLA agreements',
        '24/7 priority support',
        'Advanced analytics dashboard',
        'Custom insurance coverage',
        'White-label platform options',
        'Full integration support',
        'Volume-based discounts',
        'Onboarding & training',
        'Multi-location management',
      ],
      notIncluded: [],
      color: '#8338EC',
      gradient: 'linear-gradient(135deg, #8338EC 0%, #6a1eb4 100%)',
      popular: false,
      savings: null,
      isYearly: false,
    },
  ];

  const additionalServices = [
    { 
      service: 'Express Delivery', 
      description: 'Priority delivery within 30 minutes',
      price: '+GH₵10',
      icon: <ThunderboltOutlined />,
      color: '#FFB703',
    },
    { 
      service: 'After Hours Service', 
      description: 'Deliveries between 6PM - 6AM',
      price: '+GH₵5',
      icon: <ClockCircleOutlined />,
      color: '#06d6a0',
    },
    { 
      service: 'Weekend Delivery', 
      description: 'Saturday & Sunday deliveries',
      price: '+GH₵5',
      icon: <CalendarOutlined />,
      color: '#0096FF',
    },
    { 
      service: 'Fragile Item Handling', 
      description: 'Special care for delicate items',
      price: '+GH₵8',
      icon: <SafetyOutlined />,
      color: '#E63946',
    },
    { 
      service: 'Additional Insurance', 
      description: 'Per GH₵1000 coverage',
      price: '+GH₵3',
      icon: <SafetyOutlined />,
      color: '#8338EC',
    },
    { 
      service: 'Waiting Time', 
      description: 'Per 15 minutes of wait',
      price: '+GH₵5',
      icon: <ClockCircleOutlined />,
      color: '#FB8500',
    },
  ];

  const distancePricing = [
    { range: '0 - 5 km', price: 'GH₵10', time: '15-30 min', popular: true },
    { range: '5 - 10 km', price: 'GH₵15', time: '30-45 min', popular: true },
    { range: '10 - 15 km', price: 'GH₵20', time: '45-60 min', popular: false },
    { range: '15 - 20 km', price: 'GH₵25', time: '60-75 min', popular: false },
    { range: '20+ km', price: 'Custom', time: 'Contact us', popular: false },
  ];

  const comparisons = [
    { feature: 'Delivery Speed', starter: 'Standard (1-2hrs)', business: 'Priority (< 1hr)', enterprise: 'Custom' },
    { feature: 'Coverage Area', starter: '10km', business: '20km', enterprise: 'Unlimited' },
    { feature: 'Real-time Tracking', starter: 'Yes', business: 'Yes', enterprise: 'Yes' },
    { feature: 'Insurance Coverage', starter: 'GH₵500', business: 'GH₵2,000', enterprise: 'Custom' },
    { feature: 'Support', starter: 'Email', business: 'Priority', enterprise: '24/7 Dedicated' },
    { feature: 'API Access', starter: 'No', business: 'Yes', enterprise: 'Yes' },
    { feature: 'Analytics', starter: 'Basic', business: 'Advanced', enterprise: 'Custom Dashboard' },
    { feature: 'Account Manager', starter: 'No', business: 'Yes', enterprise: 'Yes' },
  ];

  return (
    <PublicLayout>
      {/* Hero Section with Background Image */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
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
            opacity: 0.1,
            backgroundImage: 'url(/WhatsApp Image 2025-10-20 at 19.37.30_71600617.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 20px', width: '100%', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Tag
            style={{
              background: 'rgba(255, 183, 3, 0.2)',
              border: '1px solid #FFB703',
              color: '#FFB703',
              fontSize: 14,
              padding: '8px 16px',
              borderRadius: 20,
              marginBottom: 24,
            }}
          >
            <TrophyOutlined /> Transparent Pricing - No Hidden Fees
          </Tag>
          
          <Title level={1} style={{ color: 'white', fontSize: 52, marginBottom: 20, lineHeight: 1.2 }}>
            Simple Pricing for<br />
            <span style={{ color: '#FFB703' }}>Every Business Size</span>
          </Title>
          
          <Paragraph style={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', marginBottom: 40, maxWidth: 700, margin: '0 auto 40px' }}>
            From startups to enterprises, we have flexible pricing plans designed to grow with your business
          </Paragraph>

          {/* Billing Toggle - Redesigned for clarity */}
          <div style={{ 
            display: 'inline-flex', 
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            padding: '6px',
            borderRadius: 50,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <Button
              size="large"
              onClick={() => setBillingPeriod('monthly')}
              style={{
                height: 48,
                padding: '0 32px',
                fontSize: 16,
                fontWeight: 'bold',
                borderRadius: 40,
                border: 'none',
                background: billingPeriod === 'monthly' ? '#FFB703' : 'transparent',
                color: billingPeriod === 'monthly' ? 'white' : 'rgba(255,255,255,0.8)',
                transition: 'all 0.3s ease',
                boxShadow: billingPeriod === 'monthly' ? '0 4px 12px rgba(255,183,3,0.4)' : 'none',
              }}
            >
              Monthly
            </Button>
            <Button
              size="large"
              onClick={() => setBillingPeriod('yearly')}
              style={{
                height: 48,
                padding: '0 32px',
                fontSize: 16,
                fontWeight: 'bold',
                borderRadius: 40,
                border: 'none',
                background: billingPeriod === 'yearly' ? '#FFB703' : 'transparent',
                color: billingPeriod === 'yearly' ? 'white' : 'rgba(255,255,255,0.8)',
                transition: 'all 0.3s ease',
                boxShadow: billingPeriod === 'yearly' ? '0 4px 12px rgba(255,183,3,0.4)' : 'none',
                position: 'relative',
              }}
            >
              Yearly
              {billingPeriod === 'yearly' && (
                <Tag color="success" style={{ marginLeft: 8, fontSize: 10, padding: '2px 8px' }}>
                  Save 20%
                </Tag>
              )}
            </Button>
          </div>
          
          {/* Clear indicator of what changes */}
          <div style={{ marginTop: 24 }}>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
              {billingPeriod === 'monthly' ? (
                <>✓ Showing monthly pricing</>
              ) : (
                <>✓ Showing yearly pricing with 20% discount applied</>
              )}
            </Text>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '100px 20px', background: '#f8f9fa', marginTop: -60 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Row gutter={[32, 32]} justify="center">
            {pricingPlans.map((plan, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card
                  style={{
                    height: '100%',
                    borderRadius: 24,
                    border: plan.popular ? '3px solid #FFB703' : 'none',
                    boxShadow: plan.popular 
                      ? '0 20px 60px rgba(255,183,3,0.3)' 
                      : '0 8px 24px rgba(0,0,0,0.08)',
                    position: 'relative',
                    transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.popular) {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.popular) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  {/* Header with gradient */}
                  <div style={{
                    background: plan.gradient,
                    margin: -24,
                    marginBottom: 24,
                    padding: '32px 24px',
                    textAlign: 'center',
                    position: 'relative',
                  }}>
                    {plan.popular && (
                      <div style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'white',
                        color: plan.color,
                        padding: '6px 16px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                        <StarFilled /> MOST POPULAR
                      </div>
                    )}
                    
                    {plan.savings && (
                      <Tag color="success" style={{ position: 'absolute', top: 16, left: 16, fontSize: 11, padding: '4px 12px' }}>
                        Save {plan.savings}
                      </Tag>
                    )}

                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      border: '3px solid rgba(255,255,255,0.3)',
                    }}>
                      {React.cloneElement(plan.icon, {
                        style: { fontSize: 36, color: 'white' },
                      })}
                    </div>

                    <Title level={3} style={{ color: 'white', marginBottom: 8, fontSize: 26 }}>
                      {plan.name}
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
                      {plan.description}
                    </Text>

                    <Divider style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '20px 0' }} />

                    <div style={{ marginBottom: 8 }}>
                      {plan.originalPrice && (
                        <div style={{ marginBottom: 8 }}>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.6)', 
                            fontSize: 18, 
                            textDecoration: 'line-through',
                            display: 'block',
                          }}>
                            {plan.originalPrice}
                          </Text>
                        </div>
                      )}
                      <span style={{ fontSize: 48, fontWeight: 'bold', color: 'white' }}>
                        {plan.price}
                      </span>
                      {plan.price !== 'Custom' && (
                        <>
                          <Text style={{ color: 'rgba(255,255,255,0.9)', display: 'block', fontSize: 14, marginTop: 4 }}>
                            {plan.unit}
                          </Text>
                          {plan.isYearly && (
                            <Text style={{ 
                              color: '#06d6a0', 
                              fontSize: 13, 
                              fontWeight: 'bold',
                              display: 'block',
                              marginTop: 8,
                            }}>
                              💰 Save {plan.savings} per year!
                            </Text>
                          )}
                        </>
                      )}
                    </div>
                    
                    <Tag style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      color: 'white',
                      fontSize: 13,
                      padding: '4px 12px',
                    }}>
                      {plan.monthlyDeliveries}
                    </Tag>
                  </div>

                  {/* Features List */}
                  <List
                    dataSource={plan.features}
                    renderItem={(item) => (
                      <List.Item style={{ border: 'none', padding: '10px 0' }}>
                        <Space align="start">
                          <CheckCircleOutlined style={{ color: plan.color, fontSize: 18, marginTop: 2 }} />
                          <Text style={{ fontSize: 15 }}>{item}</Text>
                        </Space>
                      </List.Item>
                    )}
                    style={{ marginBottom: 16 }}
                  />

                  {plan.notIncluded.length > 0 && (
                    <>
                      <Divider style={{ margin: '16px 0' }} />
                      <List
                        dataSource={plan.notIncluded}
                        renderItem={(item) => (
                          <List.Item style={{ border: 'none', padding: '8px 0' }}>
                            <Space align="start">
                              <CloseCircleOutlined style={{ color: '#ccc', fontSize: 16, marginTop: 2 }} />
                              <Text style={{ fontSize: 14, color: '#999' }}>{item}</Text>
                            </Space>
                          </List.Item>
                        )}
                      />
                    </>
                  )}

                  <Link href={plan.price === 'Custom' ? '/contact' : '/register-client'} style={{ display: 'block', marginTop: 24 }}>
                    <Button
                      type={plan.popular ? 'primary' : 'default'}
                      size="large"
                      block
                      style={{
                        height: 56,
                        fontSize: 16,
                        borderRadius: 12,
                        fontWeight: 'bold',
                        background: plan.popular ? plan.gradient : 'white',
                        borderColor: plan.color,
                        color: plan.popular ? 'white' : plan.color,
                      }}
                    >
                      {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Title level={2} style={{ fontSize: 38, marginBottom: 16 }}>
              Detailed <span style={{ color: '#E63946' }}>Comparison</span>
            </Title>
            <Paragraph style={{ fontSize: 16, color: '#666' }}>
              Compare all features across our pricing tiers
            </Paragraph>
          </div>

          <Card style={{ borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '20px', textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>Feature</th>
                    <th style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#E63946' }}>Starter</th>
                    <th style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#FFB703' }}>Business Pro</th>
                    <th style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#8338EC' }}>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 500 }}>{item.feature}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center', color: '#666' }}>{item.starter}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center', color: '#666' }}>{item.business}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center', color: '#666' }}>{item.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Distance Pricing */}
      <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <CalculatorOutlined style={{ fontSize: 48, color: '#FFB703', marginBottom: 16 }} />
            <Title level={2} style={{ fontSize: 38, marginBottom: 16 }}>
              Distance-Based <span style={{ color: '#E63946' }}>Pricing</span>
            </Title>
            <Paragraph style={{ fontSize: 16, color: '#666' }}>
              Transparent pricing based on delivery distance
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {distancePricing.map((item, index) => (
              <Col xs={24} sm={12} lg={Math.floor(24 / distancePricing.length)} key={index}>
                <Card
                  style={{
                    textAlign: 'center',
                    borderRadius: 16,
                    border: item.popular ? '2px solid #FFB703' : 'none',
                    boxShadow: item.popular ? '0 8px 24px rgba(255,183,3,0.2)' : '0 4px 12px rgba(0,0,0,0.08)',
                    height: '100%',
                  }}
                >
                  {item.popular && (
                    <Tag color="warning" style={{ position: 'absolute', top: 12, right: 12, fontSize: 11 }}>
                      POPULAR
                    </Tag>
                  )}
                  <Title level={4} style={{ color: '#E63946', marginBottom: 8, fontSize: 20 }}>
                    {item.range}
                  </Title>
                  <div style={{ fontSize: 36, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 }}>
                    {item.price}
                  </div>
                  <Space>
                    <ClockCircleOutlined style={{ color: '#666' }} />
                    <Text style={{ color: '#666', fontSize: 14 }}>{item.time}</Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          <Card style={{ marginTop: 40, background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)', border: 'none', borderRadius: 16 }}>
            <Text style={{ color: 'white', fontSize: 14 }}>
              <SafetyOutlined /> Base rates shown. Additional charges may apply for express delivery, after-hours service, or special handling requirements.
            </Text>
          </Card>
        </div>
      </section>

      {/* Additional Services */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Title level={2} style={{ fontSize: 38, marginBottom: 16 }}>
              Additional <span style={{ color: '#E63946' }}>Services</span>
            </Title>
            <Paragraph style={{ fontSize: 16, color: '#666' }}>
              Enhance your delivery with premium add-ons
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {additionalServices.map((item, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: 16,
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {React.cloneElement(item.icon, { style: { fontSize: 28, color: item.color } })}
                    </div>
                    <div>
                      <Title level={4} style={{ marginBottom: 8, fontSize: 18 }}>
                        {item.service}
                      </Title>
                      <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 12 }}>
                        {item.description}
                      </Text>
                      <Tag color={item.color} style={{ fontSize: 16, padding: '6px 16px', fontWeight: 'bold' }}>
                        {item.price}
                      </Tag>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ 
        padding: '80px 20px', 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#FFB703', fontSize: 38, marginBottom: 16 }}>
            Frequently Asked Questions
          </Title>
          <Paragraph style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', marginBottom: 48 }}>
            Have questions? We've got answers
          </Paragraph>

          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Card style={{ textAlign: 'left', borderRadius: 16, height: '100%' }}>
                <Title level={5} style={{ color: '#E63946', marginBottom: 12 }}>
                  Can I switch plans anytime?
                </Title>
                <Text style={{ color: '#666' }}>
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </Text>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={{ textAlign: 'left', borderRadius: 16, height: '100%' }}>
                <Title level={5} style={{ color: '#E63946', marginBottom: 12 }}>
                  What payment methods do you accept?
                </Title>
                <Text style={{ color: '#666' }}>
                  We accept Mobile Money, bank transfers, credit/debit cards, and cash on delivery.
                </Text>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={{ textAlign: 'left', borderRadius: 16, height: '100%' }}>
                <Title level={5} style={{ color: '#E63946', marginBottom: 12 }}>
                  Is there a contract period?
                </Title>
                <Text style={{ color: '#666' }}>
                  No long-term contracts! Monthly plans are flexible. Yearly plans offer 20% savings.
                </Text>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={{ textAlign: 'left', borderRadius: 16, height: '100%' }}>
                <Title level={5} style={{ color: '#E63946', marginBottom: 12 }}>
                  What happens if I exceed my delivery limit?
                </Title>
                <Text style={{ color: '#666' }}>
                  Additional deliveries are billed at standard pay-per-delivery rates. No penalties!
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 20px', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title level={2} style={{ fontSize: 42, marginBottom: 20, lineHeight: 1.3 }}>
            Ready to Transform Your<br />
            <span style={{ color: '#E63946' }}>Delivery Experience?</span>
          </Title>
          <Paragraph style={{ fontSize: 18, color: '#666', marginBottom: 40, lineHeight: 1.8 }}>
            Join thousands of satisfied customers who trust Taadiway for reliable, 
            fast, and professional delivery services across Takoradi.
          </Paragraph>
          
          <Space size="large" wrap style={{ marginBottom: 40 }}>
            <Link href="/register-client">
              <Button
                type="primary"
                size="large"
                danger
                style={{
                  height: 60,
                  padding: '0 48px',
                  fontSize: 18,
                  borderRadius: 12,
                  fontWeight: 'bold',
                }}
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="large"
                style={{
                  height: 60,
                  padding: '0 48px',
                  fontSize: 18,
                  borderRadius: 12,
                  fontWeight: 'bold',
                  borderColor: '#E63946',
                  color: '#E63946',
                }}
              >
                Talk to Sales
              </Button>
            </Link>
          </Space>

          <Divider />

          <Space size="large" wrap style={{ justifyContent: 'center' }}>
            <a href="tel:0559220442" style={{ textDecoration: 'none' }}>
              <Space>
                <PhoneOutlined style={{ fontSize: 20, color: '#E63946' }} />
                <Text style={{ fontSize: 16, color: '#666' }}>0559 220 442</Text>
              </Space>
            </a>
            <a href="mailto:taadiway@gmail.com" style={{ textDecoration: 'none' }}>
              <Space>
                <MailOutlined style={{ fontSize: 20, color: '#E63946' }} />
                <Text style={{ fontSize: 16, color: '#666' }}>taadiway@gmail.com</Text>
              </Space>
            </a>
          </Space>
        </div>
      </section>
    </PublicLayout>
  );
}

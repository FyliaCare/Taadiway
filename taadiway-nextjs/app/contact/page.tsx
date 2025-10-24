'use client';

import React from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Space } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function ContactPage() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    // TODO: Implement contact form submission
    form.resetFields();
  };

  const contactInfo = [
    {
      icon: <PhoneOutlined />,
      title: 'Phone',
      details: ['0256039212', '0256039213', '0256039214'],
      color: '#E63946',
    },
    {
      icon: <MailOutlined />,
      title: 'Email',
      details: ['info@taadiway.com', 'support@taadiway.com'],
      color: '#FFB703',
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Address',
      details: ['Takoradi, Ghana', 'Delivery coverage across Takoradi and Western Region'],
      color: '#06d6a0',
    },
    {
      icon: <ClockCircleOutlined />,
      title: 'Business Hours',
      details: ['Mon - Sat: 6:00 AM - 10:00 PM', 'Sunday: 8:00 AM - 8:00 PM'],
      color: '#8338EC',
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
          <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 16 }}>
            Contact Us
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            We'd love to hear from you. Get in touch with our team.
          </Paragraph>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {contactInfo.map((info, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  variant="borderless"
                  style={{
                    height: '100%',
                    textAlign: 'center',
                    borderTop: `4px solid ${info.color}`,
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: `${info.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {React.cloneElement(info.icon, {
                      style: { fontSize: 32, color: info.color },
                    })}
                  </div>
                  <Title level={4} style={{ marginBottom: 12 }}>
                    {info.title}
                  </Title>
                  {info.details.map((detail, i) => (
                    <Text key={i} style={{ display: 'block', color: '#666', marginBottom: 4 }}>
                      {detail}
                    </Text>
                  ))}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946' }}>
              Send Us a Message
            </Title>
            <Paragraph style={{ fontSize: 16, color: '#666' }}>
              Fill out the form below and we'll get back to you within 24 hours
            </Paragraph>
          </div>

          <Card variant="borderless" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Form form={form} layout="vertical" onFinish={handleSubmit} size="large">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="John Doe" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input placeholder="john@example.com" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <Input placeholder="0241234567" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[{ required: true, message: 'Please enter a subject' }]}
                  >
                    <Input placeholder="General Inquiry" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <TextArea rows={6} placeholder="Tell us how we can help you..." />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      danger
                      block
                      icon={<SendOutlined />}
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </section>

      {/* Quick Contact */}
      <section style={{ padding: '60px 20px', background: '#1a1a1a', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#FFB703', marginBottom: 16 }}>
            Need Immediate Assistance?
          </Title>
          <Paragraph style={{ fontSize: 18, color: '#999', marginBottom: 32 }}>
            Call us now for immediate support or to place an urgent delivery order
          </Paragraph>
          <Space size="large" wrap>
            <a href="tel:0256039212">
              <Button type="primary" size="large" danger icon={<PhoneOutlined />}>
                Call 0256039212
              </Button>
            </a>
            <a href="mailto:info@taadiway.com">
              <Button size="large" style={{ background: '#FFB703', color: '#1a1a1a', borderColor: '#FFB703' }}>
                Email Us
              </Button>
            </a>
          </Space>
        </div>
      </section>
    </PublicLayout>
  );
}

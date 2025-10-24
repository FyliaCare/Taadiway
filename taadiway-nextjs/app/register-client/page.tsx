'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, Typography, Select, Row, Col, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  ShopOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export default function ClientRegisterPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [businessType, setBusinessType] = useState('INDIVIDUAL');

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Registration successful! Please check your email for verification.');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        message.error(data.error || 'Registration failed');
      }
    } catch (error) {
      message.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: '#E63946' }}>
            Create Client Account
          </Title>
          <Paragraph>
            Register as a customer to start using our delivery services
          </Paragraph>
        </div>

        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ businessType: 'INDIVIDUAL' }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="John" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Doe" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="john@example.com" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="0241234567" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: 'Please enter your password' },
                    { min: 6, message: 'Password must be at least 6 characters' },
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="••••••" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match'));
                      },
                    }),
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="••••••" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="businessType"
              label="Account Type"
              rules={[{ required: true }]}
            >
              <Select size="large" onChange={setBusinessType}>
                <Option value="INDIVIDUAL">Individual Customer</Option>
                <Option value="SHOP_OWNER">Shop Owner</Option>
                <Option value="ONLINE_SHOP">Online Shop</Option>
                <Option value="RESTAURANT">Restaurant</Option>
                <Option value="PHARMACY">Pharmacy</Option>
                <Option value="CORPORATE">Corporate/Business</Option>
              </Select>
            </Form.Item>

            {businessType !== 'INDIVIDUAL' && (
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="businessName"
                    label="Business Name"
                    rules={[{ required: true, message: 'Please enter business name' }]}
                  >
                    <Input prefix={<ShopOutlined />} placeholder="ABC Shop" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="businessPhone" label="Business Phone">
                    <Input prefix={<PhoneOutlined />} placeholder="0301234567" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="businessAddress" label="Business Address">
                    <Input.TextArea placeholder="Business address" rows={2} />
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="city" label="City">
                  <Input prefix={<EnvironmentOutlined />} placeholder="Accra" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="region" label="Region">
                  <Input prefix={<EnvironmentOutlined />} placeholder="Greater Accra" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="address" label="Address">
                  <Input.TextArea placeholder="Your address" rows={2} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                danger
                loading={loading}
              >
                Create Account
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Text>
                Already have an account? <Link href="/login">Login here</Link>
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

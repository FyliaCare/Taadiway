'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, Typography, Select, Row, Col, message, DatePicker } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  CarOutlined,
  IdcardOutlined,
  BankOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export default function DriverRegisterPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        licenseExpiry: values.licenseExpiry?.toISOString(),
      };

      const response = await fetch('/api/auth/register-driver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Registration successful! Your application is pending verification.');
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
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <CarOutlined style={{ fontSize: 48, color: '#E63946', marginBottom: 16 }} />
          <Title level={2} style={{ color: '#E63946' }}>
            Become a Delivery Rider
          </Title>
          <Paragraph>
            Join our team and start earning with flexible hours
          </Paragraph>
        </div>

        <Card>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Title level={4}>Personal Information</Title>
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

            <Title level={4} style={{ marginTop: 24 }}>Driver Information</Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="licenseNumber"
                  label="Driver's License Number"
                  rules={[{ required: true, message: 'Please enter your license number' }]}
                >
                  <Input prefix={<IdcardOutlined />} placeholder="DL123456" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="licenseExpiry" label="License Expiry Date">
                  <DatePicker size="large" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="vehicleType"
                  label="Vehicle Type"
                  rules={[{ required: true, message: 'Please select vehicle type' }]}
                >
                  <Select size="large" placeholder="Select vehicle type">
                    <Option value="MOTORCYCLE">Motorcycle</Option>
                    <Option value="BICYCLE">Bicycle</Option>
                    <Option value="CAR">Car</Option>
                    <Option value="VAN">Van</Option>
                    <Option value="TRUCK">Truck</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Title level={4} style={{ marginTop: 24 }}>Address Information</Title>
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
                <Form.Item name="address" label="Residential Address">
                  <Input.TextArea placeholder="Your address" rows={2} />
                </Form.Item>
              </Col>
            </Row>

            <Title level={4} style={{ marginTop: 24 }}>Payment Information (Optional)</Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="bankName" label="Bank Name">
                  <Input prefix={<BankOutlined />} placeholder="Bank name" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="accountNumber" label="Account Number">
                  <Input placeholder="Account number" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="accountName" label="Account Name">
                  <Input placeholder="Account holder name" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="mobileMoneyNumber" label="Mobile Money Number">
                  <Input prefix={<PhoneOutlined />} placeholder="024XXXXXXX" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginTop: 32 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                danger
                loading={loading}
              >
                Submit Application
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

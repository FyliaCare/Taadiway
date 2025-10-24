'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Typography, Space, Divider, App } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, RocketOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title, Text } = Typography;
const { useApp } = App;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { message } = useApp();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Login successful! Redirecting to your dashboard...');
    } catch (err: any) {
      message.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@taadiway.com', password: 'Admin@123456' },
    { role: 'Driver', email: 'driver@taadiway.com', password: 'Driver@123' },
    { role: 'Client', email: 'client@taadiway.com', password: 'Client@123' },
  ];

  return (
    <div className="login-container">
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #E63946 0%, #FFB703 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .login-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
          max-width: 480px;
          width: 100%;
          animation: fadeInUp 0.5s ease-out;
        }
        
        @media (max-width: 767px) {
          .login-card {
            padding: 24px 20px;
            border-radius: 12px;
          }
          
          .login-logo :global(.anticon) {
            font-size: 2.5rem !important;
          }
          
          .login-logo h1 {
            font-size: 24px !important;
          }
          
          .demo-account {
            font-size: 12px !important;
            padding: 6px 8px !important;
          }
        }
        
        .login-logo {
          text-align: center;
          margin-bottom: 24px;
        }
        
        .brand-tagline {
          color: #666;
          font-style: italic;
        }
        
        .back-home {
          margin-bottom: 16px;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="login-card">
        <div className="back-home">
          <Link href="/">
            <Button type="link" icon={<ArrowLeftOutlined />} size="small">
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="login-logo">
          <RocketOutlined style={{ fontSize: '3rem', color: '#E63946' }} />
          <Title level={1} style={{ margin: '0.5rem 0' }}>
            TAADIWAY
          </Title>
          <Text className="brand-tagline">We deliver with passion!</Text>
        </div>

        <Divider />

        <Form name="login" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email Address" autoComplete="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" autoComplete="current-password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              icon={<LoginOutlined />}
              size="large"
              danger
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>

        <Divider>Demo Accounts</Divider>

        <Space direction="vertical" style={{ width: '100%' }} size="small">
          {demoAccounts.map((account) => (
            <div
              key={account.email}
              className="demo-account"
              style={{
                padding: '8px 12px',
                background: '#f5f5f5',
                borderRadius: '6px',
                fontSize: '0.875rem',
              }}
            >
              <Text strong style={{ color: '#E63946' }}>
                {account.role}:
              </Text>{' '}
              <Text type="secondary">{account.email}</Text> / <Text code>{account.password}</Text>
            </div>
          ))}
        </Space>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <Space split={<Divider type="vertical" />} wrap>
            <Text type="secondary" style={{ fontSize: 13 }}>📞 0256039212</Text>
            <Text type="secondary" style={{ fontSize: 13 }}>📧 info@taadiway.com</Text>
          </Space>
        </div>
      </div>
    </div>
  );
}

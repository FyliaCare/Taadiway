'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { Row, Col, Typography, Space, Input, Button } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  RocketOutlined,
  SendOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const PublicFooter = memo(function PublicFooter() {
  return (
    <>
      <style jsx>{`
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 16px;
        }
        
        .footer-title {
          font-size: 16px !important;
          margin-bottom: 12px !important;
        }
        
        .footer-link {
          color: #999;
          font-size: 14px;
          line-height: 2;
        }
        
        .footer-link:hover {
          color: #FFB703;
        }
        
        .social-icon {
          font-size: 20px;
          color: #FFB703;
          cursor: pointer;
          transition: color 0.3s;
        }
        
        .social-icon:hover {
          color: #E63946;
        }
        
        .newsletter-section {
          margin-top: 32px;
          padding-top: 32px;
        }
        
        @media (min-width: 768px) {
          .footer-container {
            padding: 0 20px;
          }
          
          .footer-title {
            font-size: 18px !important;
            margin-bottom: 16px !important;
          }
          
          .footer-link {
            font-size: 15px;
          }
          
          .social-icon {
            font-size: 24px;
          }
          
          .newsletter-section {
            margin-top: 40px;
            padding-top: 40px;
          }
        }
      `}</style>
      
      <footer style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', color: 'white', paddingTop: 40 }}>
        <div className="footer-container">
          <Row gutter={[24, 24]}>
            {/* Company Info */}
            <Col xs={24} sm={12} lg={6}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <img src="/Logo.png" alt="Taadiway Logo" style={{ width: 40, height: 40, objectFit: 'contain' }} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 'bold', color: '#FFB703', lineHeight: 1.2 }}>
                    TAADIWAY
                  </div>
                  <div style={{ fontSize: 10, color: '#E63946', fontWeight: 500 }}>
                    We Deliver with Passion!
                  </div>
                </div>
              </div>
              <Paragraph style={{ color: '#999', fontSize: 13, marginBottom: 16 }}>
                Your trusted partner for fast, reliable, and professional delivery services across Ghana.
              </Paragraph>
              <Space size="middle">
                <FacebookOutlined className="social-icon" />
                <TwitterOutlined className="social-icon" />
                <InstagramOutlined className="social-icon" />
                <LinkedinOutlined className="social-icon" />
              </Space>
            </Col>

            {/* Quick Links */}
            <Col xs={12} sm={12} lg={6}>
              <Title level={4} className="footer-title" style={{ color: '#FFB703' }}>
                Quick Links
              </Title>
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Link href="/about" className="footer-link">About Us</Link>
                <Link href="/services" className="footer-link">Our Services</Link>
                <Link href="/pricing" className="footer-link">Pricing</Link>
                <Link href="/track" className="footer-link">Track Order</Link>
                <Link href="/careers" className="footer-link">Careers</Link>
              </Space>
            </Col>

            {/* Support */}
            <Col xs={12} sm={12} lg={6}>
              <Title level={4} className="footer-title" style={{ color: '#FFB703' }}>
                Support
              </Title>
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Link href="/faq" className="footer-link">FAQ</Link>
                <Link href="/contact" className="footer-link">Contact Us</Link>
                <Link href="/terms" className="footer-link">Terms</Link>
                <Link href="/privacy" className="footer-link">Privacy</Link>
                <Link href="/register-driver" className="footer-link">Be a Driver</Link>
              </Space>
            </Col>

            {/* Contact Info */}
            <Col xs={24} sm={12} lg={6}>
              <Title level={4} className="footer-title" style={{ color: '#FFB703' }}>
                Contact Us
              </Title>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Space size="small">
                  <PhoneOutlined style={{ color: '#E63946', fontSize: 16 }} />
                  <a href="tel:+233559220442" style={{ color: '#999', fontSize: 13, textDecoration: 'none' }}>0559 220 442</a>
                </Space>
                <Space size="small">
                  <MailOutlined style={{ color: '#E63946', fontSize: 16 }} />
                  <a href="mailto:taadiway@gmail.com" style={{ color: '#999', fontSize: 13, textDecoration: 'none' }}>taadiway@gmail.com</a>
                </Space>
                <Space size="small" align="start">
                  <EnvironmentOutlined style={{ color: '#E63946', fontSize: 16 }} />
                  <Text style={{ color: '#999', fontSize: 13 }}>Takoradi, Ghana</Text>
                </Space>
              </Space>
            </Col>
          </Row>

          {/* Newsletter */}
          <Row className="newsletter-section" style={{ borderTop: '1px solid #333', paddingTop: 40, paddingBottom: 40 }} gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <Title level={4} style={{ color: '#FFB703', marginBottom: 8, fontSize: 18, marginTop: 0 }}>
                Subscribe to Newsletter
              </Title>
              <Text style={{ color: '#999', fontSize: 14 }}>Get updates on special offers</Text>
            </Col>
            <Col xs={24} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Space.Compact style={{ width: '100%', maxWidth: 450 }}>
                <Input
                  placeholder="Enter your email"
                  size="large"
                  style={{ flex: 1 }}
                />
                <Button
                  type="primary"
                  size="large"
                  danger
                  icon={<SendOutlined />}
                >
                  Subscribe
                </Button>
              </Space.Compact>
            </Col>
          </Row>

          {/* Bottom Bar */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 16,
              paddingBottom: 16,
              borderTop: '1px solid #333',
              textAlign: 'center',
            }}
          >
            <Text style={{ color: '#666', fontSize: 12 }}>
              © {new Date().getFullYear()} Taadiway. All rights reserved.
            </Text>
          </div>
        </div>
      </footer>
    </>
  );
});

export default PublicFooter;

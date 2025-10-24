'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Drawer, Button, Space } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  CustomerServiceOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  LoginOutlined,
  MenuOutlined,
  RocketOutlined,
  DollarOutlined,
  FileTextOutlined,
  SafetyOutlined,
  CarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import InstallPWA from './InstallPWA';

const PublicHeader = React.memo(function PublicHeader() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { key: '/', label: 'Home', icon: <HomeOutlined /> },
    { key: '/about', label: 'About Us', icon: <InfoCircleOutlined /> },
    { key: '/services', label: 'Services', icon: <CustomerServiceOutlined /> },
    { key: '/pricing', label: 'Pricing', icon: <DollarOutlined /> },
    { key: '/track', label: 'Track Order', icon: <CarOutlined /> },
    { key: '/contact', label: 'Contact', icon: <PhoneOutlined /> },
    { key: '/faq', label: 'FAQ', icon: <QuestionCircleOutlined /> },
  ];

  return (
    <>
      <style jsx>{`
        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        
        .logo-icon {
          font-size: 24px;
          color: #E63946;
        }
        
        .logo-text-container {
          display: flex;
          flex-direction: column;
        }
        
        .logo-title {
          font-size: 16px;
          font-weight: bold;
          color: #E63946;
          line-height: 1.2;
          white-space: nowrap;
        }
        
        .logo-tagline {
          font-size: 9px;
          color: #FFB703;
          font-weight: 500;
          white-space: nowrap;
        }
        
        .desktop-menu {
          display: none;
        }
        
        .desktop-actions {
          display: none;
        }
        
        .mobile-menu-btn {
          display: flex !important;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }
        
        @media (min-width: 1024px) {
          .header-container {
            padding: 0 20px;
            height: 70px;
          }
          
          .logo-icon {
            font-size: 32px;
          }
          
          .logo-title {
            font-size: 20px;
          }
          
          .logo-tagline {
            font-size: 11px;
          }
          
          .desktop-menu {
            display: block;
          }
          
          .desktop-actions {
            display: flex !important;
          }
          
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
      
      <header
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          boxShadow: '0 4px 12px rgba(230, 57, 70, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="header-container">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className="logo-container">
              <img src="/Logo.png" alt="Taadiway Logo" style={{ width: 50, height: 50, objectFit: 'contain' }} />
              <div className="logo-text-container">
                <div className="logo-title" style={{ color: '#FFB703' }}>TAADIWAY</div>
                <div className="logo-tagline" style={{ color: '#E63946' }}>We Deliver with Passion!</div>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            <Menu
              mode="horizontal"
              selectedKeys={[pathname]}
              style={{ border: 'none', minWidth: 700, background: 'transparent', color: 'white' }}
              theme="dark"
              items={menuItems.map(item => ({
                key: item.key,
                label: <Link href={item.key} style={{ color: 'white' }}>{item.label}</Link>,
                icon: item.icon,
              }))}
            />
          </div>

          {/* Desktop Actions */}
          <Space className="desktop-actions" size="middle">
            <InstallPWA />
            <Link href="/login">
              <Button type="primary" icon={<LoginOutlined />} size="large" danger>
                Login
              </Button>
            </Link>
          </Space>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            className="mobile-menu-btn"
            icon={<MenuOutlined style={{ fontSize: 24, color: '#FFB703' }} />}
            onClick={() => setDrawerVisible(true)}
          />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="/Logo.png" alt="Taadiway Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              <span style={{ color: '#E63946', fontWeight: 'bold' }}>TAADIWAY</span>
            </div>
          }
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={280}
        >
          <Menu
            mode="vertical"
            selectedKeys={[pathname]}
            onClick={() => setDrawerVisible(false)}
            style={{ border: 'none' }}
            items={menuItems.map(item => ({
              key: item.key,
              label: <Link href={item.key}>{item.label}</Link>,
              icon: item.icon,
            }))}
          />
          <div style={{ marginTop: 20, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <InstallPWA />
            <Link href="/login">
              <Button type="primary" icon={<LoginOutlined />} block size="large" danger>
                Login
              </Button>
            </Link>
          </div>
        </Drawer>
      </header>
    </>
  );
});

export default PublicHeader;

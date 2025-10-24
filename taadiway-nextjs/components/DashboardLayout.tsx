'use client';

import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Typography, Badge, Button } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  RocketOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  SafetyOutlined,
  CarOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/dashboard'),
    },
    {
      key: '/dashboard/new-order',
      icon: <PlusOutlined />,
      label: 'New Order',
      onClick: () => router.push('/dashboard/new-order'),
    },
    {
      key: '/dashboard/orders',
      icon: <UnorderedListOutlined />,
      label: 'All Orders',
      onClick: () => router.push('/dashboard/orders'),
    },
    {
      key: '/dashboard/drivers',
      icon: <CarOutlined />,
      label: 'Drivers',
      onClick: () => router.push('/dashboard/drivers'),
    },
    {
      key: '/dashboard/documents',
      icon: <FileTextOutlined />,
      label: 'Documents',
      onClick: () => router.push('/dashboard/documents'),
    },
  ];

  const userMenu = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => router.push('/dashboard/profile'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: collapsed ? '1.5rem' : '1.2rem',
            fontWeight: 'bold',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <RocketOutlined style={{ color: '#FFB703', marginRight: collapsed ? 0 : 8 }} />
          {!collapsed && <span>TAADIWAY</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ marginTop: 16 }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              style: { fontSize: '18px', cursor: 'pointer' },
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>

          <Space size="large">
            <Badge count={3} size="small">
              <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Badge>

            <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
              <Space style={{ cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: '#E63946' }} icon={<UserOutlined />} />
                <div>
                  <div style={{ lineHeight: '20px' }}>
                    <Text strong>
                      {user?.firstName} {user?.lastName}
                    </Text>
                  </div>
                  <div style={{ lineHeight: '16px' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {user?.role}
                    </Text>
                  </div>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content
          style={{
            margin: '24px',
            padding: '24px',
            minHeight: 'calc(100vh - 118px)',
            background: '#f0f2f5',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

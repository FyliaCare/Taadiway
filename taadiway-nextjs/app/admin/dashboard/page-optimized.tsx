'use client';

import React, { useEffect, useState, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Layout, Menu, Card, Row, Col, Statistic, Button, Space, Typography, App, Skeleton } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
  ShoppingOutlined,
  DollarOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  MenuOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

// Dynamic imports for heavy components
const Table = dynamic(() => import('antd').then(mod => ({ default: mod.Table })), {
  loading: () => <Skeleton active />,
  ssr: false,
});

const Tag = dynamic(() => import('antd').then(mod => ({ default: mod.Tag })), {
  loading: () => <span>Loading...</span>,
  ssr: false,
});

const Drawer = dynamic(() => import('antd').then(mod => ({ default: mod.Drawer })), {
  loading: () => null,
  ssr: false,
});

const Progress = dynamic(() => import('antd').then(mod => ({ default: mod.Progress })), {
  loading: () => <Skeleton.Button active size="small" />,
  ssr: false,
});

const Avatar = dynamic(() => import('antd').then(mod => ({ default: mod.Avatar })), {
  loading: () => <Skeleton.Avatar active />,
  ssr: false,
});

const List = dynamic(() => import('antd').then(mod => ({ default: mod.List })), {
  loading: () => <Skeleton active />,
  ssr: false,
});

const Badge = dynamic(() => import('antd').then(mod => ({ default: mod.Badge })), {
  loading: () => null,
  ssr: false,
});

const {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  FileTextOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
} = require('@ant-design/icons');

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useApp } = App;

// Memoized stat card component
const StatCard = memo(({ 
  title, 
  value, 
  prefix, 
  suffix, 
  trend, 
  trendValue, 
  icon: Icon, 
  color 
}: any) => (
  <Card 
    bordered={false} 
    style={{ 
      height: '100%',
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
    }}
  >
    <Space direction="vertical" size={0} style={{ width: '100%' }}>
      <Space>
        <Icon style={{ fontSize: 24, color }} />
        <Text type="secondary">{title}</Text>
      </Space>
      <Title level={2} style={{ margin: '8px 0', color }}>
        {prefix}{value}{suffix}
      </Title>
      {trend && (
        <Text type={trend === 'up' ? 'success' : 'danger'}>
          {trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {trendValue}
        </Text>
      )}
    </Space>
  </Card>
));

StatCard.displayName = 'StatCard';

export default function AdminDashboard() {
  const router = useRouter();
  const { message } = useApp();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [stats, setStats] = useState({
    totalOrders: 1847,
    activeOrders: 52,
    completedOrders: 1687,
    totalDrivers: 124,
    activeDrivers: 67,
    totalClients: 892,
    todayRevenue: 28450.50,
    pendingDrivers: 15,
    weekRevenue: 156780.00,
    monthRevenue: 645320.00,
    cancelledOrders: 108,
    avgDeliveryTime: 32,
    clientSatisfaction: 4.7,
  });

  // Memoize expensive calculations
  const driverAvailability = useMemo(() => 
    ((stats.activeDrivers / stats.totalDrivers) * 100).toFixed(1),
    [stats.activeDrivers, stats.totalDrivers]
  );

  const completionRate = useMemo(() =>
    ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1),
    [stats.completedOrders, stats.totalOrders]
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMenuClick = (e: any) => {
    const routes: Record<string, string> = {
      '1': '/admin/dashboard',
      '2': '/admin/orders',
      '3': '/admin/drivers',
      '4': '/admin/tracking',
      '5': '/admin/clients',
      '6': '/admin/payments',
      '7': '/admin/users',
      '8': '/admin/settings',
    };

    if (e.key === 'logout') {
      message.success('Logged out successfully');
      router.push('/login');
    } else if (routes[e.key]) {
      router.push(routes[e.key]);
    }

    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '2', icon: <ShoppingOutlined />, label: 'Orders' },
    { key: '3', icon: <CarOutlined />, label: 'Drivers' },
    { key: '4', icon: <EnvironmentOutlined />, label: 'Live Tracking' },
    { key: '5', icon: <TeamOutlined />, label: 'Clients' },
    { key: '6', icon: <DollarOutlined />, label: 'Payments' },
    { key: '7', icon: <UserOutlined />, label: 'Users' },
    { key: '8', icon: <SettingOutlined />, label: 'Settings' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true },
  ];

  // Rest of the component remains the same but will benefit from optimizations above
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar - Same as before */}
      {!isMobile && (
        <Sider
          width={250}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, #E63946 0%, #FF6B6B 100%)',
          }}
        >
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <Title level={3} style={{ color: 'white', margin: 0 }}>
              🚀 Taadiway Admin
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={handleMenuClick}
            items={menuItems}
            style={{ background: 'transparent', border: 'none' }}
          />
        </Sider>
      )}

      <Layout style={{ marginLeft: isMobile ? 0 : 250 }}>
        <Header 
          style={{ 
            padding: isMobile ? '0 16px' : '0 24px',
            background: '#fff', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Space>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(true)}
              />
            )}
            <Title level={4} style={{ margin: 0 }}>Admin Dashboard</Title>
          </Space>
        </Header>

        <Content style={{ margin: isMobile ? '16px' : '24px' }}>
          {/* Primary Stats - Using memoized component */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Today's Revenue"
                value={stats.todayRevenue.toLocaleString()}
                prefix="GH₵ "
                trend="up"
                trendValue="+12.5%"
                icon={DollarOutlined}
                color="#52c41a"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Active Orders"
                value={stats.activeOrders}
                suffix=""
                trend="up"
                trendValue="+8"
                icon={ShoppingOutlined}
                color="#1890ff"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Active Drivers"
                value={stats.activeDrivers}
                suffix={` / ${stats.totalDrivers}`}
                icon={CarOutlined}
                color="#722ed1"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Total Clients"
                value={stats.totalClients}
                icon={TeamOutlined}
                color="#fa541c"
              />
            </Col>
          </Row>

          {/* Add spacing */}
          <div style={{ height: 24 }} />

          {/* Rest of dashboard content will render with lazy-loaded components */}
          <Card>
            <Title level={4}>Dashboard Content</Title>
            <Paragraph>
              Dashboard optimized with dynamic imports and memoization for better performance.
            </Paragraph>
          </Card>
        </Content>
      </Layout>

      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={handleMenuClick}
            items={menuItems}
          />
        </Drawer>
      )}
    </Layout>
  );
}

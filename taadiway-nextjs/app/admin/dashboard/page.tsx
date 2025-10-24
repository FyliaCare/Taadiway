'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Tag, Button, Space, Typography, Drawer, Progress, Avatar, List, Badge, App } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
  ShoppingOutlined,
  DollarOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MenuOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  FileTextOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useApp } = App;

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
    monthRevenue: 542390.00,
    todayOrders: 43,
    cancelledOrders: 108,
    averageDeliveryTime: 28, // minutes
    customerSatisfaction: 4.7,
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [pendingDrivers, setPendingDrivers] = useState<any[]>([]);
  const [topDrivers, setTopDrivers] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Load comprehensive mock data
    loadDashboardData();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const loadDashboardData = () => {
    // Recent Orders
    setRecentOrders([
      { key: '1', orderId: 'TA-2025-001847', customer: 'Ama Adjei', driver: 'Kwame Mensah', status: 'DELIVERED', amount: 'GH₵45.50', time: '2 mins ago', pickup: 'Market Circle', delivery: 'Kokompe' },
      { key: '2', orderId: 'TA-2025-001846', customer: 'Kofi Asante', driver: 'Abena Osei', status: 'IN_TRANSIT', amount: 'GH₵32.00', time: '5 mins ago', pickup: 'Harbor Area', delivery: 'New Takoradi' },
      { key: '3', orderId: 'TA-2025-001845', customer: 'Yaw Boateng', driver: 'Kwesi Prempeh', status: 'PICKED_UP', amount: 'GH₵28.50', time: '12 mins ago', pickup: 'Takoradi Mall', delivery: 'Sekondi' },
      { key: '4', orderId: 'TA-2025-001844', customer: 'Efua Mensah', driver: 'Ama Darko', status: 'ASSIGNED', amount: 'GH₵15.00', time: '18 mins ago', pickup: 'Market Circle', delivery: 'Effia' },
      { key: '5', orderId: 'TA-2025-001843', customer: 'Samuel Owusu', driver: 'Pending', status: 'PENDING', amount: 'GH₵52.00', time: '25 mins ago', pickup: 'Airport Road', delivery: 'Takoradi Harbor' },
    ]);

    // Pending Driver Applications
    setPendingDrivers([
      { key: '1', name: 'Kwadwo Mensah', phone: '0244123456', vehicle: 'Motorcycle', appliedDate: '2025-01-24', rating: 'New', experience: '3 years' },
      { key: '2', name: 'Abena Osei', phone: '0201234567', vehicle: 'Motorcycle', appliedDate: '2025-01-23', rating: 'New', experience: '2 years' },
      { key: '3', name: 'Kofi Asamoah', phone: '0554123789', vehicle: 'Bicycle', appliedDate: '2025-01-22', rating: 'New', experience: '1 year' },
    ]);

    // Top Performing Drivers
    setTopDrivers([
      { key: '1', name: 'Kwame Mensah', avatar: 'K', deliveries: 187, rating: 4.9, earnings: 'GH₵8,450' },
      { key: '2', name: 'Abena Osei', avatar: 'A', deliveries: 165, rating: 4.8, earnings: 'GH₵7,290' },
      { key: '3', name: 'Kwesi Prempeh', avatar: 'K', deliveries: 142, rating: 4.7, earnings: 'GH₵6,125' },
      { key: '4', name: 'Ama Darko', avatar: 'A', deliveries: 138, rating: 4.8, earnings: 'GH₵5,980' },
    ]);

    // Recent Activities
    setRecentActivities([
      { id: 1, type: 'order', message: 'New order #TA-2025-001847 created', time: '2 mins ago', icon: 'ShoppingOutlined', color: '#E63946' },
      { id: 2, type: 'driver', message: 'Driver Kwame Mensah completed delivery', time: '5 mins ago', icon: 'CheckCircleOutlined', color: '#06d6a0' },
      { id: 3, type: 'user', message: 'New client registered: Ama Adjei', time: '12 mins ago', icon: 'UserOutlined', color: '#0096FF' },
      { id: 4, type: 'payment', message: 'Payment of GH₵45.50 received', time: '15 mins ago', icon: 'DollarOutlined', color: '#FFB703' },
      { id: 5, type: 'driver', message: 'Driver application from Kwadwo Mensah', time: '25 mins ago', icon: 'CarOutlined', color: '#8338EC' },
      { id: 6, type: 'order', message: 'Order #TA-2025-001840 cancelled', time: '35 mins ago', icon: 'CloseCircleOutlined', color: '#E63946' },
    ]);

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
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
  ];

  const handleMenuClick = (e: any) => {
    const routes: any = {
      '2': '/admin/orders',
      '3': '/admin/drivers',
      '4': '/admin/tracking',
      '5': '/admin/clients',
      '6': '/admin/payments',
      '7': '/admin/users',
      '8': '/admin/settings',
    };
    
    if (routes[e.key]) {
      router.push(routes[e.key]);
    }
    
    // Close mobile menu after navigation
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      'IN_TRANSIT': 'processing',
      'PICKED_UP': 'cyan',
      'PENDING': 'warning',
      'DELIVERED': 'success',
      'CANCELLED': 'error',
    };
    return colors[status] || 'default';
  };

  // Helper function for activity icons
  const getActivityIcon = (iconName: string) => {
    const icons: any = {
      'ShoppingOutlined': <ShoppingOutlined />,
      'CheckCircleOutlined': <CheckCircleOutlined />,
      'UserOutlined': <UserOutlined />,
      'DollarOutlined': <DollarOutlined />,
      'CarOutlined': <CarOutlined />,
      'CloseCircleOutlined': <CloseCircleOutlined />,
    };
    return icons[iconName] || <ShoppingOutlined />;
  };

  // Table columns with responsive config
  const orderColumns = [
    { 
      title: 'Order ID', 
      dataIndex: 'orderId', 
      key: 'orderId',
      render: (text: string) => (
        <Text strong style={{ color: '#E63946', fontSize: isMobile ? '12px' : '14px' }}>
          {text}
        </Text>
      ),
    },
    { 
      title: 'Customer', 
      dataIndex: 'customer', 
      key: 'customer',
      responsive: ['sm'] as any,
    },
    { 
      title: 'Route', 
      key: 'route',
      responsive: ['md'] as any,
      render: (_: any, record: any) => (
        <div style={{ fontSize: '12px' }}>
          <div>{record.pickup}</div>
          <Text type="secondary">→ {record.delivery}</Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.replace('_', ' ')}</Tag>
      ),
    },
    { 
      title: 'Amount', 
      dataIndex: 'amount', 
      key: 'amount',
      render: (amount: string) => <Text strong>{amount}</Text>,
    },
    { 
      title: 'Time', 
      dataIndex: 'time', 
      key: 'time',
      responsive: ['lg'] as any,
      render: (time: string) => <Text type="secondary" style={{ fontSize: '12px' }}>{time}</Text>,
    },
  ];

  const driverColumns = [
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name',
      render: (name: string) => <Text strong>{name}</Text>,
    },
    { 
      title: 'Phone', 
      dataIndex: 'phone', 
      key: 'phone',
      responsive: ['sm'] as any,
    },
    { 
      title: 'Vehicle', 
      dataIndex: 'vehicle', 
      key: 'vehicle',
      render: (vehicle: string) => <Tag color="blue">{vehicle}</Tag>,
    },
    { 
      title: 'Experience', 
      dataIndex: 'experience', 
      key: 'experience',
      responsive: ['md'] as any,
      render: (exp: string) => <Text type="secondary">{exp}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button 
            type="primary" 
            size="small" 
            style={{ background: '#06d6a0', borderColor: '#06d6a0' }}
            onClick={() => message.success(`Approved driver: ${record.name}`)}
          >
            Approve
          </Button>
          <Button 
            danger 
            size="small"
            onClick={() => message.error(`Rejected driver: ${record.name}`)}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const SidebarMenu = () => (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0 }}
      onClick={handleMenuClick}
      items={menuItems}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <style jsx global>{`
        .ant-card {
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .ant-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        .ant-statistic-title {
          font-size: 14px;
          font-weight: 500;
          color: #666;
        }
        .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-weight: 600;
          color: #333;
        }
        .ant-list-item {
          transition: background 0.2s;
        }
        .ant-list-item:hover {
          background: #fafafa;
        }
      `}</style>
      
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          width={250}
          style={{
            background: '#fff',
            borderRight: '1px solid #f0f0f0',
            boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ 
            padding: '24px 16px', 
            borderBottom: '1px solid #f0f0f0',
            background: 'linear-gradient(135deg, #E63946 0%, #FF6B6B 100%)'
          }}>
            <Title level={4} style={{ margin: 0, color: '#fff' }}>
              🚀 Taadiway Admin
            </Title>
            <Text style={{ color: '#fff', fontSize: '12px', opacity: 0.9 }}>
              Management Dashboard
            </Text>
          </div>
          <SidebarMenu />
        </Sider>
      )}

      {/* Mobile Drawer */}
      <Drawer
        title={<Text strong style={{ color: '#E63946' }}>Admin Panel</Text>}
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        styles={{ body: { padding: 0 } }}
      >
        <SidebarMenu />
      </Drawer>

      <Layout>
        <Header 
          style={{ 
            background: '#fff', 
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(true)}
                style={{ fontSize: '20px' }}
              />
            )}
            <div>
              <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
                📊 Dashboard Overview
              </Title>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Real-time platform analytics
              </Text>
            </div>
          </div>
          <Space size="middle" wrap>
            <Badge dot status="success">
              <Button icon={<DashboardOutlined />} type="text">
                {!isMobile && 'Live'}
              </Button>
            </Badge>
            <Button icon={<SettingOutlined />} type="text" onClick={() => router.push('/admin/settings')}>
              {!isMobile && 'Settings'}
            </Button>
            <Button icon={<LogoutOutlined />} onClick={handleLogout} danger>
              {!isMobile && 'Logout'}
            </Button>
          </Space>
        </Header>

        <Content style={{ padding: isMobile ? '16px' : '24px', background: '#f0f2f5' }}>
          {/* Primary Stats Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable style={{ borderLeft: '4px solid #E63946' }}>
                <Statistic
                  title="Today's Revenue"
                  value={stats.todayRevenue}
                  precision={2}
                  prefix="GH₵"
                  valueStyle={{ color: '#E63946', fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold' }}
                  suffix={
                    <Tag color="success" icon={<ArrowUpOutlined />} style={{ marginLeft: 8 }}>
                      12.5%
                    </Tag>
                  }
                />
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                  <span>Week: GH₵{stats.weekRevenue.toLocaleString()}</span>
                  <span>Month: GH₵{stats.monthRevenue.toLocaleString()}</span>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable style={{ borderLeft: '4px solid #FFB703' }}>
                <Statistic
                  title="Active Orders"
                  value={stats.activeOrders}
                  valueStyle={{ color: '#FFB703', fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold' }}
                  prefix={<ClockCircleOutlined />}
                  suffix={
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      / {stats.todayOrders} today
                    </span>
                  }
                />
                <Progress 
                  percent={Math.round((stats.activeOrders / stats.todayOrders) * 100)} 
                  strokeColor="#FFB703" 
                  showInfo={false}
                  style={{ marginTop: 12 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable style={{ borderLeft: '4px solid #06d6a0' }}>
                <Statistic
                  title="Active Drivers"
                  value={stats.activeDrivers}
                  valueStyle={{ color: '#06d6a0', fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold' }}
                  prefix={<CarOutlined />}
                  suffix={
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      / {stats.totalDrivers}
                    </span>
                  }
                />
                <Progress 
                  percent={Math.round((stats.activeDrivers / stats.totalDrivers) * 100)} 
                  strokeColor="#06d6a0" 
                  showInfo={false}
                  style={{ marginTop: 12 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable style={{ borderLeft: '4px solid #0096FF' }}>
                <Statistic
                  title="Total Clients"
                  value={stats.totalClients}
                  valueStyle={{ color: '#0096FF', fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold' }}
                  prefix={<TeamOutlined />}
                  suffix={
                    <Tag color="processing" icon={<RiseOutlined />} style={{ marginLeft: 8 }}>
                      +8.3%
                    </Tag>
                  }
                />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Avg. Satisfaction: {stats.customerSatisfaction}/5.0 ⭐
                </Text>
              </Card>
            </Col>
          </Row>

          {/* Secondary Stats */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Completed"
                  value={stats.completedOrders}
                  prefix={<CheckCircleOutlined style={{ color: '#06d6a0' }} />}
                  valueStyle={{ fontSize: isMobile ? '18px' : '20px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Cancelled"
                  value={stats.cancelledOrders}
                  prefix={<CloseCircleOutlined style={{ color: '#E63946' }} />}
                  valueStyle={{ fontSize: isMobile ? '18px' : '20px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Avg Delivery"
                  value={stats.averageDeliveryTime}
                  suffix="mins"
                  prefix={<ThunderboltOutlined style={{ color: '#FFB703' }} />}
                  valueStyle={{ fontSize: isMobile ? '18px' : '20px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Pending Drivers"
                  value={stats.pendingDrivers}
                  prefix={<SafetyOutlined style={{ color: '#8338EC' }} />}
                  valueStyle={{ fontSize: isMobile ? '18px' : '20px', color: stats.pendingDrivers > 0 ? '#FFB703' : '#666' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Main Content Grid */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {/* Recent Orders */}
            <Col xs={24} lg={16}>
              <Card 
                title={
                  <Space>
                    <ShoppingOutlined style={{ color: '#E63946' }} />
                    <span>Recent Orders</span>
                  </Space>
                }
                extra={
                  <Button type="link" onClick={() => router.push('/admin/orders')}>
                    View All <EyeOutlined />
                  </Button>
                }
                styles={{ header: { fontSize: isMobile ? '16px' : '18px' } }}
              >
                <Table
                  dataSource={recentOrders}
                  columns={orderColumns}
                  pagination={false}
                  scroll={{ x: isMobile ? 900 : undefined }}
                  size={isMobile ? 'small' : 'middle'}
                />
              </Card>
            </Col>

            {/* Activity Feed */}
            <Col xs={24} lg={8}>
              <Card 
                title={
                  <Space>
                    <ThunderboltOutlined style={{ color: '#FFB703' }} />
                    <span>Recent Activity</span>
                  </Space>
                }
                styles={{ header: { fontSize: isMobile ? '16px' : '18px' } }}
                style={{ height: '100%' }}
              >
                <List
                  dataSource={recentActivities}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            style={{ 
                              backgroundColor: item.color,
                              fontSize: '16px'
                            }} 
                            icon={getActivityIcon(item.icon)}
                          />
                        }
                        title={<Text style={{ fontSize: isMobile ? '13px' : '14px' }}>{item.message}</Text>}
                        description={
                          <Text type="secondary" style={{ fontSize: '11px' }}>
                            {item.time}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                  style={{ maxHeight: 450, overflowY: 'auto' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Bottom Section */}
          <Row gutter={[16, 16]}>
            {/* Top Performing Drivers */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <Space>
                    <TrophyOutlined style={{ color: '#FFB703' }} />
                    <span>Top Performing Drivers</span>
                  </Space>
                }
                styles={{ header: { fontSize: isMobile ? '16px' : '18px' } }}
              >
                <List
                  dataSource={topDrivers}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Badge count={index + 1} style={{ backgroundColor: index === 0 ? '#FFB703' : '#52c41a' }}>
                            <Avatar size="large" style={{ backgroundColor: '#E63946' }}>
                              {item.avatar}
                            </Avatar>
                          </Badge>
                        }
                        title={<Text strong>{item.name}</Text>}
                        description={
                          <Space split="|" size="small">
                            <Text type="secondary">{item.deliveries} deliveries</Text>
                            <Text type="secondary">⭐ {item.rating}</Text>
                          </Space>
                        }
                      />
                      <Text strong style={{ color: '#06d6a0' }}>{item.earnings}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Pending Driver Applications */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <Space>
                    <SafetyOutlined style={{ color: '#8338EC' }} />
                    <span>Pending Driver Applications</span>
                    <Badge count={stats.pendingDrivers} style={{ backgroundColor: '#FFB703' }} />
                  </Space>
                }
                extra={
                  <Button type="primary" size="small" onClick={() => router.push('/admin/drivers')}>
                    Review All
                  </Button>
                }
                styles={{ header: { fontSize: isMobile ? '16px' : '18px' } }}
              >
                <Table
                  dataSource={pendingDrivers}
                  columns={driverColumns}
                  pagination={false}
                  scroll={{ x: isMobile ? 600 : undefined }}
                  size={isMobile ? 'small' : 'middle'}
                />
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <Card 
            title="Quick Actions" 
            style={{ marginTop: 24 }}
            styles={{ header: { fontSize: isMobile ? '16px' : '18px' } }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6} md={4}>
                <Button 
                  type="primary" 
                  danger
                  block 
                  size="large" 
                  icon={<ShoppingOutlined />}
                  onClick={() => router.push('/admin/orders')}
                >
                  Orders
                </Button>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  icon={<CarOutlined />}
                  style={{ background: '#06d6a0', borderColor: '#06d6a0' }}
                  onClick={() => router.push('/admin/drivers')}
                >
                  Drivers
                </Button>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  icon={<EnvironmentOutlined />}
                  style={{ background: '#FFB703', borderColor: '#FFB703' }}
                  onClick={() => router.push('/admin/tracking')}
                >
                  Live Track
                </Button>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  icon={<TeamOutlined />}
                  style={{ background: '#0096FF', borderColor: '#0096FF' }}
                  onClick={() => router.push('/admin/users')}
                >
                  Users
                </Button>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  icon={<DollarOutlined />}
                  style={{ background: '#8338EC', borderColor: '#8338EC' }}
                  onClick={() => router.push('/admin/payments')}
                >
                  Payments
                </Button>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  icon={<FileTextOutlined />}
                  style={{ background: '#ff6b6b', borderColor: '#ff6b6b' }}
                  onClick={() => router.push('/admin/reports')}
                >
                  Reports
                </Button>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

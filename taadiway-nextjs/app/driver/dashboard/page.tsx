'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Row, Col, Statistic, Switch, Button, List, Tag, Typography, Space, Avatar, Drawer, Menu } from 'antd';
import {
  CarOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  StarOutlined,
  BellOutlined,
  UserOutlined,
  MenuOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function DriverDashboard() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [stats, setStats] = useState({
    todayEarnings: 0,
    todayDeliveries: 0,
    totalDeliveries: 0,
    rating: 5.0,
    completionRate: 0,
  });

  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [availableOrders, setAvailableOrders] = useState<any[]>([]);

  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Mock data
    setStats({
      todayEarnings: 145.50,
      todayDeliveries: 8,
      totalDeliveries: 234,
      rating: 4.8,
      completionRate: 96,
    });

    setActiveOrders([
      {
        id: '1',
        orderId: 'GE-2025-001234',
        pickup: 'Osu, Accra',
        delivery: 'East Legon, Accra',
        status: 'PICKED_UP',
        amount: 25,
        distance: '5.2 km',
      },
    ]);

    setAvailableOrders([
      {
        id: '2',
        orderId: 'GE-2025-001235',
        pickup: 'Labone, Accra',
        delivery: 'Cantonments, Accra',
        amount: 20,
        distance: '3.8 km',
      },
      {
        id: '3',
        orderId: 'GE-2025-001236',
        pickup: 'Osu, Accra',
        delivery: 'Airport, Accra',
        amount: 30,
        distance: '7.5 km',
      },
    ]);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleOnline = (checked: boolean) => {
    setIsOnline(checked);
  };

  const handleAcceptOrder = (orderId: string) => {
    console.log('Accepting order:', orderId);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  const quickActions = [
    { icon: <DollarOutlined />, label: 'Earnings', route: '/driver/earnings', color: '#E63946' },
    { icon: <HistoryOutlined />, label: 'History', route: '/driver/history', color: '#06d6a0' },
    { icon: <UserOutlined />, label: 'Profile', route: '/driver/profile', color: '#8338EC' },
    { icon: <QuestionCircleOutlined />, label: 'Support', route: '/driver/support', color: '#FFB703' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Mobile Drawer Menu */}
      <Drawer
        title={<Text strong style={{ color: '#E63946' }}>Driver Menu</Text>}
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
      >
        <Menu
          mode="inline"
          items={quickActions.map((action, index) => ({
            key: index.toString(),
            icon: action.icon,
            label: action.label,
            onClick: () => {
              router.push(action.route);
              setMobileMenuOpen(false);
            },
          }))}
        />
      </Drawer>

      <Header 
        className="dashboard-header"
        style={{ 
          background: '#fff', 
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(true)}
              style={{ fontSize: '20px' }}
            />
          )}
          <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
            <CarOutlined style={{ color: '#E63946', marginRight: 8 }} />
            {!isMobile && 'Driver Dashboard'}
          </Title>
        </div>
        <Space size={isMobile ? "small" : "large"} wrap>
          <div>
            {!isMobile && <Text strong style={{ marginRight: 8 }}>Status:</Text>}
            <Switch
              checked={isOnline}
              onChange={handleToggleOnline}
              checkedChildren="Online"
              unCheckedChildren="Offline"
            />
          </div>
          {!isMobile && <Button icon={<BellOutlined />} />}
          {!isMobile && (
            <Button icon={<UserOutlined />} onClick={() => router.push('/driver/profile')} />
          )}
          <Button 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            size={isMobile ? 'small' : 'middle'}
          >
            {!isMobile && 'Logout'}
          </Button>
        </Space>
      </Header>

      <Content className="mobile-spacing">
        {/* Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Today's Earnings"
                value={stats.todayEarnings}
                prefix="GH₵"
                valueStyle={{ color: '#E63946', fontWeight: 'bold', fontSize: isMobile ? '20px' : '24px' }}
                suffix={
                  <Text type="secondary" style={{ fontSize: isMobile ? '12px' : '14px' }}>
                    /{stats.todayDeliveries}
                  </Text>
                }
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Deliveries"
                value={stats.totalDeliveries}
                prefix={<CheckCircleOutlined style={{ color: '#06d6a0' }} />}
                valueStyle={{ color: '#06d6a0', fontSize: isMobile ? '20px' : '24px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Rating"
                value={stats.rating}
                prefix={<StarOutlined style={{ color: '#FFB703' }} />}
                suffix="/ 5.0"
                valueStyle={{ color: '#FFB703', fontSize: isMobile ? '20px' : '24px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Completion Rate"
                value={stats.completionRate}
                suffix="%"
                valueStyle={{ color: '#8338EC', fontSize: isMobile ? '20px' : '24px' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {/* Active Deliveries */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <ClockCircleOutlined style={{ marginRight: 8, color: '#FFB703' }} />
                  Active Deliveries
                </span>
              }
              extra={<Tag color="processing">{activeOrders.length} Active</Tag>}
              styles={{ header: { fontSize: isMobile ? '16px' : '18px' } }}
            >
              {activeOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: isMobile ? '20px 0' : '40px 0' }}>
                  <Text type="secondary">No active deliveries</Text>
                  <Paragraph type="secondary" style={{ marginTop: 8 }}>
                    {isOnline ? 'Waiting for new orders...' : 'Go online to receive orders'}
                  </Paragraph>
                </div>
              ) : (
                <List
                  dataSource={activeOrders}
                  renderItem={(order) => (
                    <List.Item
                      actions={[
                        <Button
                          type="primary"
                          danger
                          onClick={() => router.push(`/driver/delivery/${order.id}`)}
                          size={isMobile ? 'small' : 'middle'}
                        >
                          View
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Space wrap>
                            <Text strong style={{ fontSize: isMobile ? '14px' : '16px' }}>
                              {order.orderId}
                            </Text>
                            <Tag color="blue">{order.status.replace('_', ' ')}</Tag>
                          </Space>
                        }
                        description={
                          <div style={{ fontSize: isMobile ? '12px' : '14px' }}>
                            <div>
                              <EnvironmentOutlined style={{ marginRight: 4 }} />
                              {order.pickup}
                            </div>
                            <div>
                              <EnvironmentOutlined style={{ marginRight: 4 }} />
                              {order.delivery}
                            </div>
                            <div style={{ marginTop: 4 }}>
                              <Text type="secondary">{order.distance}</Text>
                              <Text strong style={{ marginLeft: 16, color: '#E63946' }}>
                                GH₵{order.amount}
                              </Text>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>

          {/* Available Orders */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <CarOutlined style={{ marginRight: 8, color: '#E63946' }} />
                  Available Orders
                </span>
              }
              extra={
                isOnline ? (
                  <Tag color="success">Receiving</Tag>
                ) : (
                  <Tag color="default">Offline</Tag>
                )
              }
              styles={{ header: { fontSize: isMobile ? '16px' : '18px' } }}
            >
              {!isOnline ? (
                <div style={{ textAlign: 'center', padding: isMobile ? '20px 0' : '40px 0' }}>
                  <CarOutlined style={{ fontSize: isMobile ? 36 : 48, color: '#ccc', marginBottom: 16 }} />
                  <Paragraph type="secondary">
                    You are currently offline. Turn on "Online" status to receive delivery requests.
                  </Paragraph>
                  <Button
                    type="primary"
                    danger
                    size={isMobile ? 'middle' : 'large'}
                    onClick={() => setIsOnline(true)}
                  >
                    Go Online
                  </Button>
                </div>
              ) : availableOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: isMobile ? '20px 0' : '40px 0' }}>
                  <Text type="secondary">No available orders at the moment</Text>
                </div>
              ) : (
                <List
                  dataSource={availableOrders}
                  renderItem={(order) => (
                    <List.Item
                      actions={[
                        <Button
                          type="primary"
                          danger
                          onClick={() => handleAcceptOrder(order.id)}
                          size={isMobile ? 'small' : 'middle'}
                        >
                          Accept
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{ background: '#E63946' }}
                            size={isMobile ? 'default' : 'large'}
                          >
                            {order.amount}
                          </Avatar>
                        }
                        title={
                          <Text strong style={{ fontSize: isMobile ? '14px' : '16px' }}>
                            GH₵{order.amount}
                          </Text>
                        }
                        description={
                          <div style={{ fontSize: isMobile ? '12px' : '14px' }}>
                            <div>
                              <EnvironmentOutlined style={{ marginRight: 4 }} />
                              {order.pickup} → {order.delivery}
                            </div>
                            <Text type="secondary">{order.distance}</Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>
        </Row>

        {/* Quick Actions - More compact on mobile */}
        <Row gutter={[16, 16]}>
          {quickActions.map((action, index) => (
            <Col xs={12} sm={12} md={6} key={index}>
              <Card 
                hoverable 
                onClick={() => router.push(action.route)}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: isMobile ? '32px' : '40px', color: action.color }}>
                  {action.icon}
                </div>
                <Text strong style={{ fontSize: isMobile ? '12px' : '14px' }}>
                  {action.label}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
}

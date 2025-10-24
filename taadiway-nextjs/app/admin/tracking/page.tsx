'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Layout, Card, Row, Col, List, Avatar, Tag, Space, Typography, Button, 
  Select, Input, Badge, Statistic, Drawer, Descriptions, Timeline, App 
} from 'antd';
import {
  EnvironmentOutlined,
  CarOutlined,
  SearchOutlined,
  ReloadOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { useApp } = App;

interface Driver {
  id: string;
  name: string;
  phone: string;
  status: 'online' | 'offline' | 'busy';
  currentLocation: { lat: number; lng: number; address: string };
  vehicleType: string;
  rating: number;
  totalDeliveries: number;
  currentOrder?: string;
  lastUpdate: string;
  speed?: number;
  battery?: number;
}

export default function AdminTrackingPage() {
  const router = useRouter();
  const { message } = useApp();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'Kwame Mensah',
      phone: '0244123456',
      status: 'busy',
      currentLocation: { lat: 4.8967, lng: -1.7651, address: 'Market Circle, Takoradi' },
      vehicleType: 'Motorcycle',
      rating: 4.9,
      totalDeliveries: 187,
      currentOrder: 'TA-2025-001847',
      lastUpdate: '30 sec ago',
      speed: 45,
      battery: 85,
    },
    {
      id: '2',
      name: 'Abena Osei',
      phone: '0201234567',
      status: 'online',
      currentLocation: { lat: 4.9023, lng: -1.7589, address: 'New Takoradi Shopping Area' },
      vehicleType: 'Motorcycle',
      rating: 4.8,
      totalDeliveries: 165,
      lastUpdate: '1 min ago',
      speed: 0,
      battery: 92,
    },
    {
      id: '3',
      name: 'Kwesi Prempeh',
      phone: '0554123789',
      status: 'busy',
      currentLocation: { lat: 4.9145, lng: -1.7712, address: 'Sekondi Harbor Road' },
      vehicleType: 'Bicycle',
      rating: 4.7,
      totalDeliveries: 142,
      currentOrder: 'TA-2025-001845',
      lastUpdate: '45 sec ago',
      speed: 15,
      battery: 100,
    },
    {
      id: '4',
      name: 'Ama Darko',
      phone: '0244987654',
      status: 'online',
      currentLocation: { lat: 4.8890, lng: -1.7543, address: 'Takoradi Technical University Area' },
      vehicleType: 'Motorcycle',
      rating: 4.8,
      totalDeliveries: 138,
      lastUpdate: '2 min ago',
      speed: 0,
      battery: 78,
    },
    {
      id: '5',
      name: 'Kofi Asante',
      phone: '0201567890',
      status: 'offline',
      currentLocation: { lat: 4.8956, lng: -1.7601, address: 'Last known: Kokompe Junction' },
      vehicleType: 'Motorcycle',
      rating: 4.6,
      totalDeliveries: 95,
      lastUpdate: '25 min ago',
      speed: 0,
      battery: 45,
    },
    {
      id: '6',
      name: 'Yaw Boateng',
      phone: '0554789123',
      status: 'busy',
      currentLocation: { lat: 4.9078, lng: -1.7623, address: 'Airport Road, Takoradi' },
      vehicleType: 'Motorcycle',
      rating: 4.9,
      totalDeliveries: 210,
      currentOrder: 'TA-2025-001850',
      lastUpdate: '15 sec ago',
      speed: 52,
      battery: 88,
    },
  ]);

  const [stats, setStats] = useState({
    totalOnline: 4,
    totalBusy: 3,
    totalOffline: 1,
    activeDeliveries: 3,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (autoRefresh) {
        updateDriverLocations();
      }
    }, 5000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, [autoRefresh]);

  const updateDriverLocations = () => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => {
        if (driver.status === 'busy' && driver.speed) {
          // Simulate location updates for busy drivers
          const latChange = (Math.random() - 0.5) * 0.001;
          const lngChange = (Math.random() - 0.5) * 0.001;
          return {
            ...driver,
            currentLocation: {
              ...driver.currentLocation,
              lat: driver.currentLocation.lat + latChange,
              lng: driver.currentLocation.lng + lngChange,
            },
            lastUpdate: 'Just now',
          };
        }
        return driver;
      })
    );
  };

  const handleRefresh = () => {
    message.success('Refreshing driver locations...');
    updateDriverLocations();
  };

  const handleDriverClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setDrawerVisible(true);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      online: 'success',
      offline: 'default',
      busy: 'processing',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'busy') return '🚴';
    if (status === 'online') return '✅';
    return '⭕';
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
    const matchesSearch = driver.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         driver.phone.includes(searchText);
    return matchesStatus && matchesSearch;
  });

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <style jsx global>{`
        .driver-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .driver-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .status-badge {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .map-placeholder {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        .map-marker {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Header */}
      <Header style={{ 
        background: '#fff', 
        padding: isMobile ? '0 16px' : '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button 
            type="text" 
            icon={<DashboardOutlined />}
            onClick={() => router.push('/admin/dashboard')}
          >
            {!isMobile && 'Back to Dashboard'}
          </Button>
          <div>
            <Title level={isMobile ? 5 : 4} style={{ margin: 0 }}>
              📍 Live Driver Tracking
            </Title>
            {!isMobile && (
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Real-time location monitoring
              </Text>
            )}
          </div>
        </div>
        <Space>
          <Badge dot={autoRefresh} status="success">
            <Button 
              icon={<ReloadOutlined spin={autoRefresh} />}
              onClick={handleRefresh}
            >
              {!isMobile && 'Refresh'}
            </Button>
          </Badge>
        </Space>
      </Header>

      <Layout>
        {/* Sidebar - Driver List */}
        <Sider 
          width={isMobile ? '100%' : 350}
          style={{ 
            background: '#fff',
            borderRight: '1px solid #f0f0f0',
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
          }}
          breakpoint="lg"
          collapsedWidth={isMobile ? 0 : 80}
        >
          <div style={{ padding: 16 }}>
            {/* Stats */}
            <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <Card size="small">
                  <Statistic 
                    title="Online" 
                    value={stats.totalOnline} 
                    valueStyle={{ color: '#06d6a0', fontSize: '20px' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic 
                    title="Busy" 
                    value={stats.totalBusy} 
                    valueStyle={{ color: '#FFB703', fontSize: '20px' }}
                    prefix={<ThunderboltOutlined />}
                  />
                </Card>
              </Col>
            </Row>

            {/* Filters */}
            <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }} size="small">
              <Select
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: '100%' }}
                size="large"
              >
                <Option value="all">All Drivers ({drivers.length})</Option>
                <Option value="online">Online ({drivers.filter(d => d.status === 'online').length})</Option>
                <Option value="busy">Busy ({drivers.filter(d => d.status === 'busy').length})</Option>
                <Option value="offline">Offline ({drivers.filter(d => d.status === 'offline').length})</Option>
              </Select>
              <Input
                placeholder="Search driver name or phone..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                size="large"
                allowClear
              />
            </Space>

            {/* Driver List */}
            <List
              dataSource={filteredDrivers}
              renderItem={(driver) => (
                <Card 
                  className="driver-card"
                  size="small" 
                  style={{ marginBottom: 8 }}
                  onClick={() => handleDriverClick(driver)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Badge 
                      dot 
                      status={driver.status === 'offline' ? 'default' : 'processing'}
                      className={driver.status !== 'offline' ? 'status-badge' : ''}
                    >
                      <Avatar 
                        size="large" 
                        style={{ 
                          backgroundColor: driver.status === 'busy' ? '#FFB703' : 
                                          driver.status === 'online' ? '#06d6a0' : '#999'
                        }}
                      >
                        {driver.name.charAt(0)}
                      </Avatar>
                    </Badge>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong>{driver.name}</Text>
                        <Tag color={getStatusColor(driver.status)}>
                          {getStatusIcon(driver.status)} {driver.status.toUpperCase()}
                        </Tag>
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        <div>{driver.vehicleType} • ⭐ {driver.rating}</div>
                        {driver.currentOrder && (
                          <Tag color="orange" style={{ marginTop: 4, fontSize: '11px' }}>
                            Order: {driver.currentOrder}
                          </Tag>
                        )}
                        {driver.speed && driver.speed > 0 && (
                          <Tag color="blue" style={{ marginTop: 4, fontSize: '11px' }}>
                            🏍️ {driver.speed} km/h
                          </Tag>
                        )}
                      </div>
                      <Text type="secondary" style={{ fontSize: '11px' }}>
                        <ClockCircleOutlined /> {driver.lastUpdate}
                      </Text>
                    </div>
                  </div>
                </Card>
              )}
            />
          </div>
        </Sider>

        {/* Main Content - Map View */}
        <Content style={{ padding: isMobile ? 16 : 24 }}>
          <Card 
            style={{ height: 'calc(100vh - 112px)' }}
            bodyStyle={{ padding: 0, height: '100%' }}
          >
            <div className="map-placeholder" style={{ height: '100%' }}>
              {/* Map Placeholder with markers */}
              <div style={{ 
                position: 'absolute', 
                top: 20, 
                left: 20, 
                background: 'rgba(255,255,255,0.95)',
                padding: '12px 20px',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 10,
              }}>
                <Text strong style={{ fontSize: '16px' }}>
                  🗺️ Takoradi Region
                </Text>
                <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                  Tracking {filteredDrivers.length} driver(s)
                </div>
              </div>

              {/* Simulated map markers */}
              {filteredDrivers.slice(0, 6).map((driver, index) => (
                <div
                  key={driver.id}
                  className="map-marker"
                  style={{
                    left: `${20 + (index % 3) * 30}%`,
                    top: `${30 + Math.floor(index / 3) * 30}%`,
                    backgroundColor: driver.status === 'busy' ? '#FFB703' : 
                                    driver.status === 'online' ? '#06d6a0' : '#999',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                  onClick={() => handleDriverClick(driver)}
                >
                  <CarOutlined style={{ color: '#fff' }} />
                </div>
              ))}

              <div style={{ 
                color: '#fff', 
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}>
                <EnvironmentOutlined style={{ fontSize: 80, opacity: 0.3 }} />
                <Title level={3} style={{ color: '#fff', marginTop: 16 }}>
                  Interactive Map View
                </Title>
                <Paragraph style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Real-time driver tracking with Google Maps integration
                </Paragraph>
                <Button type="primary" size="large" style={{ marginTop: 16 }}>
                  Enable Maps API
                </Button>
              </div>
            </div>
          </Card>
        </Content>
      </Layout>

      {/* Driver Details Drawer */}
      <Drawer
        title={
          <Space>
            <Avatar style={{ backgroundColor: '#E63946' }}>
              {selectedDriver?.name.charAt(0)}
            </Avatar>
            <div>
              <div>{selectedDriver?.name}</div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Driver Details
              </Text>
            </div>
          </Space>
        }
        placement="right"
        width={isMobile ? '100%' : 450}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedDriver && (
          <>
            <Card style={{ marginBottom: 16 }}>
              <Tag 
                color={getStatusColor(selectedDriver.status)} 
                style={{ fontSize: '14px', padding: '4px 12px' }}
              >
                {getStatusIcon(selectedDriver.status)} {selectedDriver.status.toUpperCase()}
              </Tag>
              {selectedDriver.currentOrder && (
                <Tag color="orange" style={{ fontSize: '14px', padding: '4px 12px', marginLeft: 8 }}>
                  Order: {selectedDriver.currentOrder}
                </Tag>
              )}
            </Card>

            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Phone">
                <Space>
                  <PhoneOutlined />
                  <Text copyable>{selectedDriver.phone}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Vehicle">
                {selectedDriver.vehicleType}
              </Descriptions.Item>
              <Descriptions.Item label="Rating">
                ⭐ {selectedDriver.rating} / 5.0
              </Descriptions.Item>
              <Descriptions.Item label="Total Deliveries">
                {selectedDriver.totalDeliveries}
              </Descriptions.Item>
              <Descriptions.Item label="Current Speed">
                {selectedDriver.speed ? `${selectedDriver.speed} km/h` : 'Stationary'}
              </Descriptions.Item>
              <Descriptions.Item label="Battery">
                <Space>
                  {selectedDriver.battery}%
                  {selectedDriver.battery && selectedDriver.battery < 50 && (
                    <Tag color="warning">Low Battery</Tag>
                  )}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Last Update">
                <ClockCircleOutlined /> {selectedDriver.lastUpdate}
              </Descriptions.Item>
            </Descriptions>

            <Card title="Current Location" style={{ marginTop: 16 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>
                  <EnvironmentOutlined style={{ color: '#E63946' }} /> {selectedDriver.currentLocation.address}
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Lat: {selectedDriver.currentLocation.lat.toFixed(6)}, Lng: {selectedDriver.currentLocation.lng.toFixed(6)}
                </Text>
              </Space>
            </Card>

            <Card title="Recent Activity" style={{ marginTop: 16 }}>
              <Timeline
                items={[
                  {
                    color: 'green',
                    children: (
                      <>
                        <Text>Location updated</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {selectedDriver.lastUpdate}
                        </Text>
                      </>
                    ),
                  },
                  {
                    color: 'blue',
                    children: (
                      <>
                        <Text>{selectedDriver.currentOrder ? 'Delivery in progress' : 'Available for orders'}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          2 mins ago
                        </Text>
                      </>
                    ),
                  },
                  {
                    color: 'gray',
                    children: (
                      <>
                        <Text>Went online</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          15 mins ago
                        </Text>
                      </>
                    ),
                  },
                ]}
              />
            </Card>

            <Space style={{ marginTop: 16, width: '100%' }} direction="vertical">
              <Button 
                type="primary" 
                block 
                size="large"
                icon={<PhoneOutlined />}
                onClick={() => message.info(`Calling ${selectedDriver.name}...`)}
              >
                Call Driver
              </Button>
              <Button 
                block 
                size="large"
                icon={<EnvironmentOutlined />}
                onClick={() => message.info('Opening detailed map view...')}
              >
                View on Map
              </Button>
            </Space>
          </>
        )}
      </Drawer>
    </Layout>
  );
}

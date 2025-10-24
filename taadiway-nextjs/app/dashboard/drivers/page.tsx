'use client';

import React, { useState } from 'react';
import {
  Card,
  List,
  Avatar,
  Button,
  Space,
  Typography,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import {
  UserOutlined,
  CarOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

const { Title, Text } = Typography;

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_TRIP';
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'Kwame Mensah',
      email: 'kwame@example.com',
      phone: '+233 24 123 4567',
      vehicle: 'Motorbike - GH-1234-20',
      status: 'ACTIVE',
    },
    {
      id: '2',
      name: 'Ama Asante',
      email: 'ama@example.com',
      phone: '+233 24 234 5678',
      vehicle: 'Motorbike - GH-5678-20',
      status: 'ON_TRIP',
    },
    {
      id: '3',
      name: 'Kofi Osei',
      email: 'kofi@example.com',
      phone: '+233 24 345 6789',
      vehicle: 'Motorbike - GH-9012-20',
      status: 'ACTIVE',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [form] = Form.useForm();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  const showModal = (driver?: Driver) => {
    if (driver) {
      setEditingDriver(driver);
      form.setFieldsValue(driver);
    } else {
      setEditingDriver(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingDriver(null);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingDriver) {
        // Update existing driver
        setDrivers(
          drivers.map((d) =>
            d.id === editingDriver.id ? { ...d, ...values } : d
          )
        );
        message.success('Driver updated successfully');
      } else {
        // Add new driver
        const newDriver: Driver = {
          id: String(drivers.length + 1),
          ...values,
          status: 'ACTIVE',
        };
        setDrivers([...drivers, newDriver]);
        message.success('Driver added successfully');
      }
      handleCancel();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const handleDelete = (driverId: string) => {
    Modal.confirm({
      title: 'Delete Driver',
      content: 'Are you sure you want to delete this driver?',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        setDrivers(drivers.filter((d) => d.id !== driverId));
        message.success('Driver deleted successfully');
      },
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      ACTIVE: 'green',
      INACTIVE: 'red',
      ON_TRIP: 'blue',
    };
    return colors[status] || 'default';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div>
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} style={{ margin: 0, color: '#E63946' }}>
              <CarOutlined /> Drivers Management
            </Title>
            <Text type="secondary">Manage delivery drivers and their vehicles</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Add Driver
          </Button>
        </div>

        <Card variant="borderless" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <List
            itemLayout="horizontal"
            dataSource={drivers}
            renderItem={(driver) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => showModal(driver)}
                  >
                    Edit
                  </Button>,
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(driver.id)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#E63946' }} />
                  }
                  title={
                    <Space>
                      <Text strong style={{ fontSize: 16 }}>
                        {driver.name}
                      </Text>
                      <Tag color={getStatusColor(driver.status)}>{driver.status}</Tag>
                    </Space>
                  }
                  description={
                    <div>
                      <Space direction="vertical" size={4}>
                        <Text>
                          <MailOutlined /> {driver.email}
                        </Text>
                        <Text>
                          <PhoneOutlined /> {driver.phone}
                        </Text>
                        <Text>
                          <CarOutlined /> {driver.vehicle}
                        </Text>
                      </Space>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        <Modal
          title={editingDriver ? 'Edit Driver' : 'Add New Driver'}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit} size="large">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter driver name' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter valid email' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter email address" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="+233 24 123 4567" />
            </Form.Item>

            <Form.Item
              name="vehicle"
              label="Vehicle"
              rules={[{ required: true, message: 'Please enter vehicle details' }]}
            >
              <Input prefix={<CarOutlined />} placeholder="Motorbike - GH-1234-20" />
            </Form.Item>

            {editingDriver && (
              <Form.Item name="status" label="Status">
                <Select>
                  <Select.Option value="ACTIVE">Active</Select.Option>
                  <Select.Option value="INACTIVE">Inactive</Select.Option>
                  <Select.Option value="ON_TRIP">On Trip</Select.Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingDriver ? 'Update Driver' : 'Add Driver'}
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

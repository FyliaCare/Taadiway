'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Typography, Space, Button, Input, Select, message, Modal } from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  ShoppingOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

const { Title, Text } = Typography;
const { Search } = Input;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const { accessToken, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [isAuthenticated]);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter, searchText]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.data || []);
      } else {
        message.error('Failed to fetch orders');
      }
    } catch (error) {
      message.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((order: any) => order.status === statusFilter);
    }

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(
        (order: any) =>
          order.orderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
          order.pickupAddress.toLowerCase().includes(searchText.toLowerCase()) ||
          order.deliveryAddress.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleCancelOrder = async (orderId: string) => {
    Modal.confirm({
      title: 'Cancel Order',
      content: 'Are you sure you want to cancel this order?',
      okText: 'Yes, Cancel',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await fetch(`/api/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            message.success('Order cancelled successfully');
            fetchOrders();
          } else {
            message.error('Failed to cancel order');
          }
        } catch (error) {
          message.error('Network error');
        }
      },
    });
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      PENDING: 'orange',
      CONFIRMED: 'blue',
      ASSIGNED: 'cyan',
      PICKED_UP: 'purple',
      IN_TRANSIT: 'geekblue',
      DELIVERED: 'green',
      FAILED: 'red',
      CANCELLED: 'red',
    };
    return statusColors[status] || 'default';
  };

  const columns = [
    {
      title: 'Order #',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text: string) => <Text strong>{text.substring(0, 8)}...</Text>,
    },
    {
      title: 'Pickup Address',
      dataIndex: 'pickupAddress',
      key: 'pickupAddress',
      ellipsis: true,
    },
    {
      title: 'Delivery Address',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
      ellipsis: true,
    },
    {
      title: 'Package Type',
      dataIndex: 'deliveryType',
      key: 'deliveryType',
      render: (type: string) => <Tag>{type.replace('_', ' ')}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: 'Amount',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (amount: number, record: any) => (
        <Text strong>
          {record.currency} {amount.toFixed(2)}
        </Text>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/dashboard/orders/${record.id}`)}
          >
            View
          </Button>
          {['PENDING', 'CONFIRMED', 'ASSIGNED'].includes(record.status) && (
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleCancelOrder(record.id)}
            >
              Cancel
            </Button>
          )}
        </Space>
      ),
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div>
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: '#E63946' }}>
            <ShoppingOutlined /> All Orders
          </Title>
          <Text type="secondary">View and manage all delivery orders</Text>
        </div>

        <Card variant="borderless" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
            <Space>
              <Search
                placeholder="Search orders..."
                allowClear
                style={{ width: 300 }}
                onSearch={setSearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Select
                defaultValue="all"
                style={{ width: 150 }}
                onChange={setStatusFilter}
                suffixIcon={<FilterOutlined />}
              >
                <Select.Option value="all">All Status</Select.Option>
                <Select.Option value="PENDING">Pending</Select.Option>
                <Select.Option value="CONFIRMED">Confirmed</Select.Option>
                <Select.Option value="ASSIGNED">Assigned</Select.Option>
                <Select.Option value="PICKED_UP">Picked Up</Select.Option>
                <Select.Option value="IN_TRANSIT">In Transit</Select.Option>
                <Select.Option value="DELIVERED">Delivered</Select.Option>
                <Select.Option value="CANCELLED">Cancelled</Select.Option>
              </Select>
            </Space>
            <Text type="secondary">
              Showing {filteredOrders.length} of {orders.length} orders
            </Text>
          </Space>

          <Table
            dataSource={filteredOrders}
            columns={columns}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (total) => `Total ${total} orders` }}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, Tabs, Table, Button, Input, Select, Space, Typography, Tag, message } from 'antd';
import {
  FileTextOutlined,
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  PrinterOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import * as XLSX from 'xlsx';

const { Title, Text } = Typography;
const { Search } = Input;

interface DocumentData {
  key: string;
  number: string;
  customer: string;
  amount: number;
  date: string;
  status: string;
}

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchText, setSearchText] = useState('');
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  // Sample data - in production, fetch from API
  const invoicesData: DocumentData[] = [
    {
      key: '1',
      number: 'INV-2024-001',
      customer: 'John Doe',
      amount: 2500.0,
      date: '2024-01-15',
      status: 'PAID',
    },
    {
      key: '2',
      number: 'INV-2024-002',
      customer: 'Jane Smith',
      amount: 1800.0,
      date: '2024-01-16',
      status: 'PENDING',
    },
    {
      key: '3',
      number: 'INV-2024-003',
      customer: 'Acme Corp',
      amount: 5200.0,
      date: '2024-01-17',
      status: 'OVERDUE',
    },
  ];

  const receiptsData: DocumentData[] = [
    {
      key: '1',
      number: 'RCP-2024-001',
      customer: 'John Doe',
      amount: 2500.0,
      date: '2024-01-16',
      status: 'COMPLETED',
    },
    {
      key: '2',
      number: 'RCP-2024-002',
      customer: 'Alice Johnson',
      amount: 3100.0,
      date: '2024-01-18',
      status: 'COMPLETED',
    },
  ];

  const quotationsData: DocumentData[] = [
    {
      key: '1',
      number: 'QUO-2024-001',
      customer: 'Tech Solutions Ltd',
      amount: 8500.0,
      date: '2024-01-10',
      status: 'ACCEPTED',
    },
    {
      key: '2',
      number: 'QUO-2024-002',
      customer: 'Global Traders',
      amount: 4200.0,
      date: '2024-01-12',
      status: 'PENDING',
    },
    {
      key: '3',
      number: 'QUO-2024-003',
      customer: 'City Logistics',
      amount: 6700.0,
      date: '2024-01-14',
      status: 'REJECTED',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PAID: 'green',
      PENDING: 'orange',
      OVERDUE: 'red',
      COMPLETED: 'green',
      ACCEPTED: 'green',
      REJECTED: 'red',
    };
    return colors[status] || 'default';
  };

  const columns = [
    {
      title: 'Document #',
      dataIndex: 'number',
      key: 'number',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Amount (GHS)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <Text strong>₵{amount.toFixed(2)}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: DocumentData) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />}>
            View
          </Button>
          <Button type="link" size="small" icon={<FilePdfOutlined />}>
            PDF
          </Button>
          <Button type="link" size="small" icon={<PrinterOutlined />}>
            Print
          </Button>
        </Space>
      ),
    },
  ];

  const exportToExcel = (data: DocumentData[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
    message.success(`Exported ${data.length} records to Excel`);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'invoices':
        return invoicesData;
      case 'receipts':
        return receiptsData;
      case 'quotations':
        return quotationsData;
      default:
        return [];
    }
  };

  const filterData = (data: DocumentData[]) => {
    if (!searchText) return data;
    return data.filter(
      (item) =>
        item.number.toLowerCase().includes(searchText.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const getStats = (data: DocumentData[]) => {
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    const count = data.length;
    return { total, count };
  };

  const currentData = getCurrentData();
  const filteredData = filterData(currentData);
  const stats = getStats(filteredData);

  if (!isAuthenticated) {
    return null;
  }

  const tabItems = [
    {
      key: 'invoices',
      label: (
        <span>
          <FileTextOutlined /> Invoices
        </span>
      ),
      children: (
        <div>
          <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
            <Search
              placeholder="Search invoices..."
              allowClear
              style={{ width: 300 }}
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => exportToExcel(filteredData, 'invoices')}
              >
                Export Excel
              </Button>
              <Button type="primary" icon={<FileTextOutlined />}>
                New Invoice
              </Button>
            </Space>
          </Space>

          <div style={{ marginBottom: 16 }}>
            <Space size="large">
              <Card size="small" style={{ minWidth: 200 }}>
                <Text type="secondary">Total Invoices</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {stats.count}
                </Title>
              </Card>
              <Card size="small" style={{ minWidth: 200 }}>
                <Text type="secondary">Total Amount</Text>
                <Title level={3} style={{ margin: 0, color: '#E63946' }}>
                  ₵{stats.total.toFixed(2)}
                </Title>
              </Card>
            </Space>
          </div>

          <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 10 }} />
        </div>
      ),
    },
    {
      key: 'receipts',
      label: (
        <span>
          <FileTextOutlined /> Receipts
        </span>
      ),
      children: (
        <div>
          <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
            <Search
              placeholder="Search receipts..."
              allowClear
              style={{ width: 300 }}
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => exportToExcel(filteredData, 'receipts')}
              >
                Export Excel
              </Button>
              <Button type="primary" icon={<FileTextOutlined />}>
                New Receipt
              </Button>
            </Space>
          </Space>

          <div style={{ marginBottom: 16 }}>
            <Space size="large">
              <Card size="small" style={{ minWidth: 200 }}>
                <Text type="secondary">Total Receipts</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {stats.count}
                </Title>
              </Card>
              <Card size="small" style={{ minWidth: 200 }}>
                <Text type="secondary">Total Amount</Text>
                <Title level={3} style={{ margin: 0, color: '#E63946' }}>
                  ₵{stats.total.toFixed(2)}
                </Title>
              </Card>
            </Space>
          </div>

          <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 10 }} />
        </div>
      ),
    },
    {
      key: 'quotations',
      label: (
        <span>
          <FileTextOutlined /> Quotations
        </span>
      ),
      children: (
        <div>
          <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
            <Search
              placeholder="Search quotations..."
              allowClear
              style={{ width: 300 }}
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => exportToExcel(filteredData, 'quotations')}
              >
                Export Excel
              </Button>
              <Button type="primary" icon={<FileTextOutlined />}>
                New Quotation
              </Button>
            </Space>
          </Space>

          <div style={{ marginBottom: 16 }}>
            <Space size="large">
              <Card size="small" style={{ minWidth: 200 }}>
                <Text type="secondary">Total Quotations</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {stats.count}
                </Title>
              </Card>
              <Card size="small" style={{ minWidth: 200 }}>
                <Text type="secondary">Total Amount</Text>
                <Title level={3} style={{ margin: 0, color: '#E63946' }}>
                  ₵{stats.total.toFixed(2)}
                </Title>
              </Card>
            </Space>
          </div>

          <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 10 }} />
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div>
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: '#E63946' }}>
            <FileTextOutlined /> Documents
          </Title>
          <Text type="secondary">Manage invoices, receipts, and quotations</Text>
        </div>

        <Card variant="borderless" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </Card>
      </div>
    </DashboardLayout>
  );
}

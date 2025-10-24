'use client';

// AntD Provider Component for Next.js App Router
import React from 'react';
import { ConfigProvider, App } from 'antd';

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#E63946',
          colorSuccess: '#06d6a0',
          colorWarning: '#FFB703',
          colorError: '#E63946',
          colorInfo: '#0096FF',
          borderRadius: 12,
          fontSize: 16,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          colorBgContainer: '#ffffff',
          colorText: '#1a1a1a',
          colorTextSecondary: '#666666',
          controlHeight: 44,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
        components: {
          Button: {
            controlHeight: 44,
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 10,
            primaryShadow: '0 4px 16px rgba(230, 57, 70, 0.3)',
          },
          Input: {
            controlHeight: 44,
            fontSize: 16,
            borderRadius: 10,
          },
          Card: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          },
          Menu: {
            itemBorderRadius: 8,
            itemActiveBg: 'rgba(230, 57, 70, 0.1)',
          },
          Table: {
            headerBg: '#f8f9fa',
            headerColor: '#1a1a1a',
            borderRadius: 12,
          },
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}

'use client';

import React from 'react';
import { Collapse, Typography, Input, Space } from 'antd';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph } = Typography;

export default function FAQPage() {
  const faqs = [
    {
      key: '1',
      label: 'How do I place an order?',
      children: (
        <p>
          You can place an order by calling us at 0256039212, 0256039213, or 0256039214. You can also log into our platform
          and create an order online. Simply provide pickup and delivery details, and we'll assign a rider immediately.
        </p>
      ),
    },
    {
      key: '2',
      label: 'What are your delivery hours?',
      children: (
        <p>
          We operate Monday to Saturday from 6:00 AM to 10:00 PM, and Sundays from 8:00 AM to 8:00 PM. 
          After-hours delivery is available with an additional fee of GH₵5.
        </p>
      ),
    },
    {
      key: '3',
      label: 'How much does delivery cost?',
      children: (
        <p>
          Our base rate starts at GH₵10 for deliveries within 5km. Pricing is distance-based:
          5-10km (GH₵15), 10-15km (GH₵20), 15-20km (GH₵25). Additional services like express delivery, 
          fragile handling, or insurance may incur extra charges.
        </p>
      ),
    },
    {
      key: '4',
      label: 'Can I track my delivery in real-time?',
      children: (
        <p>
          Yes! All our deliveries come with real-time tracking. Once your order is confirmed, you'll receive a tracking 
          link via SMS or email. You can also track your order on our platform by entering your tracking number.
        </p>
      ),
    },
    {
      key: '5',
      label: 'What payment methods do you accept?',
      children: (
        <p>
          We accept Mobile Money (MTN, Vodafone, AirtelTigo), bank transfers, cash on delivery, and for business 
          accounts, we offer monthly invoicing.
        </p>
      ),
    },
    {
      key: '6',
      label: 'Is my package insured?',
      children: (
        <p>
          Yes, all deliveries include basic insurance coverage up to GH₵500. For valuable items, we offer additional 
          insurance at GH₵3 per GH₵1000 of declared value.
        </p>
      ),
    },
    {
      key: '7',
      label: 'What areas do you cover?',
      children: (
        <p>
          We currently cover Takoradi and surrounding areas in the Western Region. 
          Contact us for specific location availability.
        </p>
      ),
    },
    {
      key: '8',
      label: 'How long does delivery take?',
      children: (
        <p>
          Standard deliveries typically take 45-90 minutes depending on distance and traffic. Express delivery (30 minutes) 
          is available for an additional GH₵10.
        </p>
      ),
    },
    {
      key: '9',
      label: 'Can I schedule a delivery for later?',
      children: (
        <p>
          Yes! You can schedule deliveries for any time within our business hours. Simply specify your preferred delivery 
          time when placing your order.
        </p>
      ),
    },
    {
      key: '10',
      label: 'What if my recipient is not available?',
      children: (
        <p>
          Our riders will attempt to contact the recipient. If unavailable, we can reschedule delivery, leave the package 
          with security (with your permission), or return it to the sender. Waiting time charges may apply.
        </p>
      ),
    },
    {
      key: '11',
      label: 'Do you deliver fragile items?',
      children: (
        <p>
          Yes, we handle fragile items with special care. Please inform us when placing your order so we can assign an 
          experienced rider and use appropriate packaging. Fragile handling costs an additional GH₵8.
        </p>
      ),
    },
    {
      key: '12',
      label: 'How do I become a rider with Taadiway?',
      children: (
        <p>
          We're always looking for reliable riders! Visit our Careers page or call 0256039212 for more information about 
          rider requirements and the application process.
        </p>
      ),
    },
    {
      key: '13',
      label: 'Can businesses get special rates?',
      children: (
        <p>
          Yes! We offer Business Plans starting at GH₵400/month for 40 deliveries, with benefits like priority assignment, 
          dedicated account manager, and API access. Contact our sales team for custom Enterprise plans.
        </p>
      ),
    },
    {
      key: '14',
      label: 'What items cannot be delivered?',
      children: (
        <p>
          We cannot deliver illegal substances, hazardous materials, weapons, or perishable items without proper refrigeration. 
          Contact us if you're unsure about a specific item.
        </p>
      ),
    },
    {
      key: '15',
      label: 'How do I file a complaint or give feedback?',
      children: (
        <p>
          We value your feedback! Contact us at info@taadiway.com, call 0256039212, or use the contact form on our 
          website. We respond to all inquiries within 24 hours.
        </p>
      ),
    },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          padding: '80px 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <QuestionCircleOutlined style={{ fontSize: 64, marginBottom: 16 }} />
          <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 16 }}>
            Frequently Asked Questions
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            Find answers to common questions about our delivery services
          </Paragraph>
        </div>
      </section>

      {/* Search Bar */}
      <section style={{ padding: '40px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Input
            size="large"
            placeholder="Search for questions..."
            prefix={<SearchOutlined />}
            style={{ borderRadius: 8 }}
          />
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: '40px 20px 80px', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Collapse
            accordion
            size="large"
            items={faqs}
            style={{ background: 'white' }}
            expandIconPosition="end"
          />
        </div>
      </section>

      {/* Still Have Questions */}
      <section style={{ padding: '60px 20px', background: '#fafafa', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#E63946', marginBottom: 16 }}>
            Still Have Questions?
          </Title>
          <Paragraph style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
            Can't find what you're looking for? Our team is here to help!
          </Paragraph>
          <Space size="large">
            <a href="/contact">
              <button
                style={{
                  height: 50,
                  padding: '0 32px',
                  fontSize: 16,
                  background: '#E63946',
                  border: 'none',
                  borderRadius: 8,
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Contact Us
              </button>
            </a>
            <a href="tel:0256039212">
              <button
                style={{
                  height: 50,
                  padding: '0 32px',
                  fontSize: 16,
                  background: 'white',
                  border: '2px solid #E63946',
                  borderRadius: 8,
                  color: '#E63946',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Call 0256039212
              </button>
            </a>
          </Space>
        </div>
      </section>
    </PublicLayout>
  );
}

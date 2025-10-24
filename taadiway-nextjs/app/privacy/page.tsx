'use client';

import React from 'react';
import { Typography } from 'antd';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph } = Typography;

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Title level={1} style={{ color: '#E63946', marginBottom: 40 }}>
            Privacy Policy
          </Title>

          <Paragraph style={{ fontSize: 14, color: '#666', marginBottom: 40 }}>
            Last Updated: October 20, 2025
          </Paragraph>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>1. Information We Collect</Title>
            <Paragraph>
              We collect information that you provide directly to us, including:
            </Paragraph>
            <Paragraph>
              - Name, email address, and phone number
            </Paragraph>
            <Paragraph>
              - Delivery addresses (pickup and drop-off locations)
            </Paragraph>
            <Paragraph>
              - Payment information
            </Paragraph>
            <Paragraph>
              - Order history and preferences
            </Paragraph>
            <Paragraph>
              - Communication preferences
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>2. How We Use Your Information</Title>
            <Paragraph>
              We use the information we collect to:
            </Paragraph>
            <Paragraph>
              - Process and fulfill your delivery orders
            </Paragraph>
            <Paragraph>
              - Communicate with you about your orders
            </Paragraph>
            <Paragraph>
              - Send you service updates and promotional materials (with your consent)
            </Paragraph>
            <Paragraph>
              - Improve our services and customer experience
            </Paragraph>
            <Paragraph>
              - Prevent fraud and ensure platform security
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>3. Information Sharing</Title>
            <Paragraph>
              We may share your information with:
            </Paragraph>
            <Paragraph>
              - Delivery riders (only information necessary to complete your delivery)
            </Paragraph>
            <Paragraph>
              - Payment processors to handle transactions
            </Paragraph>
            <Paragraph>
              - Service providers who assist in our operations
            </Paragraph>
            <Paragraph>
              - Law enforcement when required by law
            </Paragraph>
            <Paragraph>
              We do not sell your personal information to third parties.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>4. Data Security</Title>
            <Paragraph>
              We implement appropriate technical and organizational measures to protect your personal 
              data against unauthorized access, alteration, disclosure, or destruction. However, no 
              internet transmission is completely secure, and we cannot guarantee absolute security.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>5. Your Rights</Title>
            <Paragraph>
              You have the right to:
            </Paragraph>
            <Paragraph>
              - Access your personal data
            </Paragraph>
            <Paragraph>
              - Correct inaccurate data
            </Paragraph>
            <Paragraph>
              - Request deletion of your data
            </Paragraph>
            <Paragraph>
              - Opt-out of marketing communications
            </Paragraph>
            <Paragraph>
              - Withdraw consent for data processing
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>6. Cookies and Tracking</Title>
            <Paragraph>
              We use cookies and similar tracking technologies to improve your experience on our 
              platform. You can control cookie settings through your browser preferences.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>7. Data Retention</Title>
            <Paragraph>
              We retain your personal information for as long as necessary to provide our services 
              and comply with legal obligations. Order history is retained for accounting and legal purposes.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>8. Children's Privacy</Title>
            <Paragraph>
              Our services are not directed to individuals under 18 years of age. We do not knowingly 
              collect personal information from children.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>9. Changes to This Policy</Title>
            <Paragraph>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last Updated" date.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2}>10. Contact Us</Title>
            <Paragraph>
              If you have questions about this Privacy Policy or how we handle your data:
            </Paragraph>
            <Paragraph>
              Email: info@taadiway.com
            </Paragraph>
            <Paragraph>
              Phone: 0256039212 / 0256039213 / 0256039214
            </Paragraph>
            <Paragraph>
              Address: Takoradi, Ghana
            </Paragraph>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

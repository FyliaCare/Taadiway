'use client';

import React from 'react';
import { Typography, Anchor } from 'antd';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph, Text } = Typography;

export default function TermsPage() {
  return (
    <PublicLayout>
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Title level={1} style={{ color: '#E63946', marginBottom: 40 }}>
            Terms & Conditions
          </Title>

          <Paragraph style={{ fontSize: 14, color: '#666', marginBottom: 40 }}>
            Last Updated: October 20, 2025
          </Paragraph>

          <div style={{ marginBottom: 48 }}>
            <Title level={2} id="acceptance">1. Acceptance of Terms</Title>
            <Paragraph>
              By using Taadiway delivery services, you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, you may not use our services.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2} id="services">2. Services</Title>
            <Paragraph>
              Taadiway provides delivery and errand services including but not limited to food delivery, 
              parcel delivery, grocery shopping, pharmaceutical delivery, and custom errands. We reserve the right 
              to refuse service for items we deem inappropriate, illegal, or hazardous.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2} id="pricing">3. Pricing and Payment</Title>
            <Paragraph>
              - All prices are in Ghana Cedis (GH₵) and are subject to change
            </Paragraph>
            <Paragraph>
              - Payment is due at the time of order unless otherwise agreed
            </Paragraph>
            <Paragraph>
              - We accept Mobile Money, bank transfers, and cash
            </Paragraph>
            <Paragraph>
              - Business accounts may be offered monthly invoicing subject to approval
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2} id="liability">4. Liability and Insurance</Title>
            <Paragraph>
              - All deliveries include basic insurance coverage up to GH₵500
            </Paragraph>
            <Paragraph>
              - Additional insurance is available for valuable items
            </Paragraph>
            <Paragraph>
              - Customers must declare the value of items being delivered
            </Paragraph>
            <Paragraph>
              - Taadiway is not liable for damages resulting from improper packaging
            </Paragraph>
            <Paragraph>
              - We are not responsible for delays caused by traffic, weather, or circumstances beyond our control
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2} id="prohibited">5. Prohibited Items</Title>
            <Paragraph>
              We do not deliver:
            </Paragraph>
            <Paragraph>
              - Illegal substances or contraband
            </Paragraph>
            <Paragraph>
              - Weapons, ammunition, or explosives
            </Paragraph>
            <Paragraph>
              - Hazardous materials
            </Paragraph>
            <Paragraph>
              - Live animals (without prior arrangement)
            </Paragraph>
            <Paragraph>
              - Perishable items without proper refrigeration
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2} id="cancellation">6. Cancellation and Refunds</Title>
            <Paragraph>
              - Orders can be cancelled free of charge before rider assignment
            </Paragraph>
            <Paragraph>
              - After rider assignment, cancellation fees may apply
            </Paragraph>
            <Paragraph>
              - Refunds are processed within 5-7 business days
            </Paragraph>
            <Paragraph>
              - Rescheduling is free if done at least 30 minutes before scheduled pickup
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2} id="privacy">7. Privacy and Data Protection</Title>
            <Paragraph>
              We collect and process personal data in accordance with our Privacy Policy. 
              By using our services, you consent to such processing and warrant that all data provided is accurate.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2} id="disputes">8. Dispute Resolution</Title>
            <Paragraph>
              Any disputes arising from these terms shall be resolved through good-faith negotiation. 
              If unresolved, disputes shall be subject to the jurisdiction of Ghanaian courts.
            </Paragraph>
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title level={2} id="contact">9. Contact Information</Title>
            <Paragraph>
              For questions about these Terms & Conditions:
            </Paragraph>
            <Paragraph>
              Email: info@taadiway.com
            </Paragraph>
            <Paragraph>
              Phone: 0256039212 / 0256039213 / 0256039214
            </Paragraph>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

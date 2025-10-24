'use client';

import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Typography } from 'antd';
import { DownloadOutlined, CloseOutlined, AppleOutlined, AndroidOutlined, ChromeOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as installed PWA
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    
    setIsStandalone(isStandaloneMode);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Only show install button if not already installed
    if (!isStandaloneMode) {
      // Listen for beforeinstallprompt event (Chrome, Edge, Samsung Internet)
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowInstallButton(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // For iOS, always show the button with instructions
      if (iOS) {
        setShowInstallButton(true);
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // Show iOS installation instructions
      setShowInstructions(true);
    } else if (deferredPrompt) {
      // Show native install prompt for Chrome/Edge/Samsung
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowInstallButton(false);
      }
      
      setDeferredPrompt(null);
    } else {
      // Fallback: show manual instructions
      setShowInstructions(true);
    }
  };

  // Don't show anything if already installed
  if (isStandalone) {
    return null;
  }

  // Don't show if install not supported and not iOS
  if (!showInstallButton) {
    return null;
  }

  return (
    <>
      {/* Install Button */}
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={handleInstallClick}
        size="large"
        style={{
          background: 'linear-gradient(135deg, #E63946 0%, #FFB703 100%)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(230, 57, 70, 0.4)',
          fontWeight: 'bold',
        }}
      >
        Install App
      </Button>

      {/* Installation Instructions Modal */}
      <Modal
        open={showInstructions}
        onCancel={() => setShowInstructions(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setShowInstructions(false)}>
            Got it!
          </Button>
        ]}
        width={500}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <DownloadOutlined style={{ fontSize: 48, color: '#E63946', marginBottom: 16 }} />
          <Title level={3}>Install Taadiway App</Title>
          
          {isIOS ? (
            // iOS Installation Instructions
            <>
              <Paragraph>
                <AppleOutlined style={{ fontSize: 20, color: '#E63946' }} /> 
                <Text strong> iOS Installation:</Text>
              </Paragraph>
              <Space direction="vertical" align="start" style={{ textAlign: 'left', width: '100%' }}>
                <Text>1. Tap the <strong>Share</strong> button <span style={{ fontSize: 20 }}>⎙</span> (at the bottom)</Text>
                <Text>2. Scroll down and tap <strong>"Add to Home Screen"</strong> <span style={{ fontSize: 20 }}>➕</span></Text>
                <Text>3. Tap <strong>"Add"</strong> in the top right corner</Text>
                <Text>4. Find the app icon on your home screen!</Text>
              </Space>
            </>
          ) : (
            // Android/Desktop Installation Instructions
            <>
              <Paragraph>
                <AndroidOutlined style={{ fontSize: 20, color: '#E63946' }} /> 
                <Text strong> Android Installation:</Text>
              </Paragraph>
              <Space direction="vertical" align="start" style={{ textAlign: 'left', width: '100%' }}>
                <Text>1. Tap the <strong>menu</strong> (⋮) in Chrome</Text>
                <Text>2. Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></Text>
                <Text>3. Confirm by tapping <strong>"Install"</strong></Text>
                <Text>4. App will appear on your home screen!</Text>
              </Space>
              
              <Paragraph style={{ marginTop: 20 }}>
                <ChromeOutlined style={{ fontSize: 20, color: '#E63946' }} /> 
                <Text strong> Desktop (Chrome/Edge):</Text>
              </Paragraph>
              <Space direction="vertical" align="start" style={{ textAlign: 'left', width: '100%' }}>
                <Text>1. Look for the <strong>install icon</strong> in the address bar</Text>
                <Text>2. Or go to Settings → <strong>"Install Taadiway..."</strong></Text>
                <Text>3. Click <strong>"Install"</strong></Text>
                <Text>4. App will open in its own window!</Text>
              </Space>
            </>
          )}

          <Paragraph style={{ marginTop: 20, color: '#666' }}>
            <Text type="secondary">
              ✨ Enjoy faster loading, offline access, and a native app experience!
            </Text>
          </Paragraph>
        </div>
      </Modal>
    </>
  );
}

'use client';

import { memo } from 'react';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

const PublicLayout = memo(function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main style={{ minHeight: '50vh' }}>{children}</main>
      <PublicFooter />
    </>
  );
});

export default PublicLayout;

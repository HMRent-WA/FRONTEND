import { RetvProvider } from '@/providers/retv-date-range-provider';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <RetvProvider>{children}</RetvProvider>;
};

export default Layout;

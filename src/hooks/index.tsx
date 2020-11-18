import React from 'react';

import { ThemeProvider } from './theme';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <ToastProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </ToastProvider>
);

export default AppProvider;

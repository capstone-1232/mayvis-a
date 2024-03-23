import React from 'react'

// Importing font and styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-quill/dist/quill.snow.css';
import '../styles/globals.css';

// Importing components and providers
import DashboardLayout from '@/components/DashboardLayout';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';

require('dotenv').config();

export default function App({ Component, pageProps, ...appProps }) {
  // Conditional rendering for the login page
  if (['/login'].includes(appProps.router.pathname)) {
    return (
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}> {/* Apply ThemeProvider here */}
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    );
  }

  // Default application structure with ThemeProvider applied
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}> {/* Wrap ThemeProvider around the layout and components */}
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </ThemeProvider>
    </SessionProvider>
  );
}

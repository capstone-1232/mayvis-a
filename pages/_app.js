import React from 'react'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../styles/globals.css';
import DashboardLayout from '@/components/DashboardLayout';

require('dotenv').config();

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps, ...appProps }) {
  
  if(['/login'].includes(appProps.router.pathname))
    return <Component {...pageProps} />;

  return (
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  );
}

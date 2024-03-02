import React from 'react'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

require('dotenv').config();

// import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  //   <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
  //   </GoogleOAuthProvider>
  );
}

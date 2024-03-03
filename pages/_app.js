import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { GoogleOAuthProvider } from "@react-oauth/google";


export default function App({ Component, pageProps }) {
  return <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">
  <Component {...pageProps} />
</GoogleOAuthProvider>
}

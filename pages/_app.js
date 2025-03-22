import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css'

import {Toaster} from 'react-hot-toast';
export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
	  <Toaster/>
    </SessionProvider>
	
  );
}



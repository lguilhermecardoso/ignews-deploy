import { AppProps } from 'next/app';
import { HeaderAplication } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client';

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
    <HeaderAplication />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp

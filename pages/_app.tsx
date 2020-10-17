import React from 'react';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import jaTranslations from '@shopify/polaris/locales/ja.json';

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Head>
        <title>sample</title>
        <meta charSet="utf-8" />
      </Head>
      <AppProvider i18n={jaTranslations}>
        <Component {...pageProps} />
      </AppProvider>
    </React.StrictMode>
  )
}

export default MyApp

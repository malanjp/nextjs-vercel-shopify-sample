import React from 'react';
import { AppProvider } from '@shopify/polaris';
import { useRouter } from 'next/router'
import jaTranslations from '@shopify/polaris/locales/ja.json';

function MyApp({ Component, pageProps }) {
  const { query } = useRouter();
  console.log(query);
  console.log(process.env);

  return (
    <React.StrictMode>
      <AppProvider i18n={jaTranslations}>
        <Component {...pageProps} />
      </AppProvider>
    </React.StrictMode>
  )
}

export default MyApp

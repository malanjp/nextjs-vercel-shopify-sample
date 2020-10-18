import { Button } from '@shopify/polaris';
import React from 'react';
import { useRouter } from 'next/router'

export default function Home() {
  const app = (
    <Button onClick={() => alert('Button clicked!')}>Example button</Button>
  );
  return app
}

Home.getInitialProps = async ({ query, res }) => {
  console.log(query);
  console.log(process.env);
  console.log(process.env.SHOPIFY_API_KEY);
  const { SHOPIFY_API_KEY } = process.env;
  const scopes = 'read_orders';
  const redirect_uri = `${process.env.APP_URL}terms`;
  const url = `https://${query.shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${scopes}&redirect_uri=${redirect_uri}`;
  console.log(url);
  if (res) {
    res.writeHead(301, {
      Location: url,
    })
    res.end();
  }
  return {};
}
import { Button } from '@shopify/polaris';
import React from 'react';

export default function Home() {
  const app = (
    <Button onClick={() => alert('Button clicked!')}>Example button</Button>
  );
  return app
}

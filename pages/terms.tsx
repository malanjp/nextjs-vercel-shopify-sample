import { useState } from "react";
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button } from '@shopify/polaris';

export default function Terms() {
  const [checked, setChecked] = useState(String);
  const router = useRouter();

  const submit = () => {
    if (!checked) {
      throw 'no terms checked';
    }
    router.push('/dashboard');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>terms page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          terms page
        </h1>
        <div>
          <label>同意しますか？</label>
          <input type="checkbox" onChange={e => setChecked(e.target.value)} />
          <Button onClick={submit}>Submit</Button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}


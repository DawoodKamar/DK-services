import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';

export default function Contact() {

    return (
      <Layout>
        <Head>
          <title>Contact page</title>
        </Head>
        
        <h1>Contact us</h1>

        <h2>
        <Link href="/">Back to home</Link>
      </h2>
      </Layout>
    );
  }
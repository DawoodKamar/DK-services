import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';

export default function WorkOrder() {

    return (
      <Layout>
        <Head>
          <title>Work Order Form</title>
        </Head>
        {/* <DkLogo/> */}
        <h1>work order form</h1>

        <h2>
        <Link href="/">Back to home</Link>
      </h2>
      </Layout>
    );
  }
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import AboutUs from "../components/AboutUs";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About us</title>
      </Head>

      <h1>About us</h1>
      <AboutUs />
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  );
}

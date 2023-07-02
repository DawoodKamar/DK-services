import ContactForm from "../components/ContactForm";
import Head from "next/head";
import Layout from "../components/layout";
import AboutUs from "../components/AboutUs";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About us</title>
      </Head>

      <AboutUs />
      <ContactForm />
    </Layout>
  );
}

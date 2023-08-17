import React from 'react';
import Head from 'next/head';
import ContactForm from '../components/ContactForm';
import Layout from '../components/Layout';

export default function Contact() {

  return (
    <Layout>
      <Head>
        <title>Contact Page</title>
      </Head>
      <ContactForm/>

    </Layout>
    );
  }
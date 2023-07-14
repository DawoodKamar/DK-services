import React from "react";
import Head from "next/head";
import Submitions from "../components/Submitions";
import Layout from "../components/layout";
import Shortcuts from "../components/shortcuts";

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Submited Work Orders List</title>
      </Head>
      <Shortcuts />
      <Submitions />
    </Layout>
  );
}

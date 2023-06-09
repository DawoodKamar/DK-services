import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import WorkOrderForm from "../components/WorkOrderForm";
import Shortcuts from "../components/shortcuts";

export default function WorkOrder() {
  return (
    <Layout>
      <Head>
        <title>Work Order Form</title>
      </Head>
      {/* <DkLogo/> */}
      <Shortcuts />
      <WorkOrderForm />
    </Layout>
  );
}

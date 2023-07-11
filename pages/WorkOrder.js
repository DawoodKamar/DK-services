import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import WorkOrderForm from "../components/WorkOrderForm";

export default function WorkOrder() {
  return (
    <Layout>
      <Head>
        <title>Work Order Form</title>
      </Head>
      {/* <DkLogo/> */}
      <Link href="/WorkOrderList">Submitions</Link>
      <p>list</p>
      <WorkOrderForm />
    </Layout>
  );
}

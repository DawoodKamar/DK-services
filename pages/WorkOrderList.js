import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";

export default function WorkOrderList() {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    fetch("/api/workOrders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setWorkOrders(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Layout>
      <Head>
        <title>Work Order Form Submissions</title>
      </Head>
      <ul>
        {workOrders.map((workOrder) => (
          <li key={workOrder.id}>{workOrder.workOrderNumber}</li>
        ))}
      </ul>
    </Layout>
  );
}

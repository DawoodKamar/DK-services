import Layout from "../../components/layout";
import Image from "next/image";
import dk from "../../public/images/dkLogo.jpg";
import styles from "../../styles/wo.module.css";

export default function SubmittedWorkOrder({ workOrderData }) {
  const {
    workOrderNumber,
    jobDate,
    client,
    address,
    streetAddress,
    city,
    unitNumber,
    vin,
    licensePlate,
    hubometer,
    totalHours,
    descriptions,
    parts,
  } = workOrderData;
  console.log(workOrderData);
  return (
    <Layout>
      <div className={styles.container}>
        <Image
          src={dk}
          alt="dk logo image"
          placeholder="blur"
          className={styles.logo}
        />
        <h1>Work Order {workOrderNumber}</h1>

        <div className={styles.workOrderInfo}>
          <div className={styles.client}>
            <p>Date: &emsp;{new Date(jobDate).toLocaleDateString()}</p>
            <p>Client: &emsp;{client}</p>
            <p>Address: &emsp;{address}</p>
            <p>City: &emsp;{city}</p>
          </div>

          <div className={styles.workOrderUnit}>
            <p>Unit Number: &emsp;{unitNumber}</p>
            <p>License Plate: &emsp;{licensePlate}</p>
            <p>Hubometer: &emsp;{hubometer}</p>
            <p>VIN: {vin}</p>
          </div>
        </div>

        <div className={styles.workOrderItem}>
          <p>Total Hours:</p>
          <p>{totalHours}</p>
        </div>
        <h2>Descriptions</h2>
        {descriptions &&
          descriptions.map((description, index) => (
            <div key={index} className={styles.workOrderItem}>
              <p>{description.description}</p>
              <p>{description.time} hours</p>
            </div>
          ))}
        <h2>Parts</h2>
        {parts &&
          parts.map((part, index) => (
            <div key={index}>
              <p>
                {part.quantity} &emsp;  {part.part}
              </p>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Get the workOrderNumber from the context
  const { workOrderNumber } = context.params;

  // Fetch the data from the server-side route "/api/work-orders/[workOrderNumber]"
  const res = await fetch(
    `http://localhost:3000/api/work-orders/${workOrderNumber}`
  );

  // Verify that the server response contains data before attempting to parse it
  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();

  // The fetched data will be passed into your page component as props
  return {
    props: { workOrderData: data },
  };
}

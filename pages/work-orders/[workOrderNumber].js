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
        <div className={styles.workOrderItem}>
          <p>Date:</p>
          <p>{new Date(jobDate).toLocaleDateString()}</p>
        </div>
        <div className={styles.workOrderItem}>
          <p>Client:</p>
          <p>{client}</p>
        </div>
        <div className={styles.workOrderItem}>
          <p>Address:</p>
          <p>{address}</p>
        </div>
        <div className={styles.workOrderItem}>
          <p>Street Address:</p>
          <p>{streetAddress}</p>
        </div>
        <div className={styles.workOrderItem}>
          <p>City:</p>
          <p>{city}</p>
        </div>
        <div className={styles.workOrderItem}>
          <p>Unit Number:</p>
          <p>{unitNumber}</p>
        </div>
        <div className={styles.workOrderItem}>
          <p>VIN:</p>
          <p>{vin}</p>
        </div>
        <div className={styles.workOrderItem}>
          <p>License Plate:</p>
          <p>{licensePlate}</p>
        </div>
        <div className={styles.workOrderItem}>
          <p>Hubometer:</p>
          <p>{hubometer}</p>
        </div>
        <div className={styles.workOrderItem}>
          <p>Total Hours:</p>
          <p>{totalHours}</p>
        </div>

        <h2>Descriptions</h2>
        {descriptions &&
          descriptions.map((description, index) => (
            <div key={index} className={styles.workOrderItem}>
              <p>Description:</p>
              <p>{description.description}</p>
              <p>Time:</p>
              <p>{description.time}</p>
            </div>
          ))}

        <h2>Parts</h2>
        {parts &&
          parts.map((part, index) => (
            <div key={index} className={styles.workOrderItem}>
              <p>Quantity:</p>
              <p>{part.quantity}</p>
              <p>Part:</p>
              <p>{part.part}</p>
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

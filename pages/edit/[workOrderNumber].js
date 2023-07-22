import Layout from "../../components/layout";
import styles from "../../styles/wo.module.css";//----------------------------------------------------------------
import Shortcuts from "../../components/shortcuts";

export default function EditWorkOrder({ workOrderData }) {
  const {
    workOrderNumber,
    jobDate,
    client,
    address,
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
        <Shortcuts/>
      {/* <div className={styles.container}>
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
            <p>VIN:&emsp; {vin}</p>
          </div>
        </div>

        
        <h2>Descriptions</h2>
        {descriptions &&
          descriptions.map((description, index) => (
            <div key={index} className={styles.descriptionItem}>
              <p className={styles.descriptionDetails}>{description.description}</p>
              <p className={styles.descriptionTime}>{description.time} hours</p>
            </div>
          ))}
          <div className={styles.workOrderItem}>
          <p>Total Hours:</p>
          <p>{totalHours}</p>
        </div>
        <h2>Parts</h2>
        <div className={styles.parts}>
        {parts &&
          parts.map((part, index) => (
            <div key={index} >
              <p>
                {part.quantity} &emsp;  {part.part}
              </p>
            </div>
          ))}</div>
      </div>*/}
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

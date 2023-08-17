import Layout from "../../components/Layout";
import Image from "next/image";
import dk from "../../public/images/dkLogo.jpg";
import styles from "../../styles/wo.module.css";
import Shortcuts from "../../components/Shortcuts";
import dynamic from "next/dynamic";

let html2pdf;
const Html2PdfDynamic = dynamic(
  () =>
    import("html2pdf.js").then((mod) => {
      html2pdf = mod.default;
    }),
  { ssr: false, loading: () => <p>Loading...</p> }
);
export default function SubmittedWorkOrder({ workOrderData }) {
  const {
    id,
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

  const handleDownloadPDF = async () => {
    if (html2pdf) {
      const element = document.querySelector("." + styles.container);

      const opt = {
        margin: 10,
        filename: `WorkOrder${workOrderNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().from(element).set(opt).save();
    }
    try {
      const response = await fetch(`/api/work-orders/${id}/downloaded`, {
        method: "PUT",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  return (
    <Layout>
      <Shortcuts id={id} displayMode="Edit" />
      <Html2PdfDynamic />
      <button onClick={handleDownloadPDF} className={styles.button}>
        Download as PDF
      </button>
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
            <p>VIN:&emsp; {vin}</p>
          </div>
        </div>

        <h2>Descriptions</h2>
        {descriptions &&
          descriptions.map((description, index) => (
            <div key={index} className={styles.descriptionItem}>
              <p className={styles.descriptionDetails}>
                {description.description}
              </p>
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
              <div key={index}>
                <p>
                  {part.quantity} &emsp; {part.part}
                </p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Get the workOrderNumber from the context
  const { id } = context.params;

  // Fetch the data from the server-side route "/api/work-orders/[workOrderNumber]"
  const res = await fetch(`http://localhost:3000/api/work-orders/${id}`);

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

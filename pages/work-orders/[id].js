import Layout from "../../components/layout";
import Image from "next/image";
import dk from "../../public/images/dkLogo.jpg";
import styles from "../../styles/wo.module.css";
import Shortcuts from "../../components/Shortcuts";
import { jsPDF } from "jspdf";

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
  const datePart = jobDate.split("T")[0]; // This will give "2023-08-19"
  const [year, month, day] = datePart.split("-").map(Number);

  const dateObject = new Date(year, month - 1, day); // month is 0-indexed
  const formattedDate = dateObject.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    // Convert the image to a Base64 string
    const img = new window.Image();
    img.src = dk.src;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);
      const dataURL = canvas.toDataURL("image/jpeg");

      // Add the image to the PDF
      doc.addImage(dataURL, "JPEG", 20, 10, 164, 32);

      doc.setFontSize(30);
      doc.text("Work Order " + workOrderNumber, 10, 55);

      doc.setFontSize(12);
      doc.text("Date: " + formattedDate, 10, 70);
      doc.text("Client: " + client, 10, 80);
      doc.text("Address: " + address, 10, 90);
      doc.text("City: " + city, 10, 100);
      doc.text("Unit Number: " + unitNumber, 130, 70);
      doc.text("License Plate: " + licensePlate, 130, 80);
      doc.text("Hubometer: " + hubometer, 130, 90);
      doc.text("VIN: " + vin, 130, 100);

      doc.setFontSize(24);
      doc.text("Descriptions", 10, 120);

      doc.setFontSize(12);
      let yCoordinate = 130; // Starting y-coordinate
      const maxWidth = 150; // Maximum width for each line
      const lineHeight = 10; // Height of each line

      descriptions.forEach((description) => {
        // Split the description text into lines
        const lines = doc.splitTextToSize(
          "- " + description.description,
          maxWidth
        );

        // Print the time for the description
        doc.text(description.time + " hours", 165, yCoordinate);

        // Print each line to the PDF
        lines.forEach((line, lineIndex) => {
          doc.text(line, 10, yCoordinate + lineIndex * lineHeight);
        });

        // Adjust the y-coordinate for the next description
        yCoordinate += lines.length * lineHeight + 5;
      });
      doc.setFontSize(20);
      doc.text("Total Hours: " + totalHours, 75, yCoordinate);
      yCoordinate += lineHeight + 10;

      doc.setFontSize(24);
      doc.text("Parts", 10, yCoordinate);
      doc.setFontSize(12);
      yCoordinate += lineHeight;
      parts.forEach((part) => {
        doc.text(part.quantity + " - " + part.part, 10, yCoordinate);
        yCoordinate += lineHeight;
      });

      doc.save("WorkOrder" + workOrderNumber + ".pdf");
    };
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
            <p>Date:&emsp;{formattedDate}</p>
            <p>Client: &emsp;{client}</p>
            <p>Address: &emsp;{address}</p>
            <p>City: &emsp;{city}</p>
          </div>

          <div className={styles.workOrderUnit}>
            <p>Unit Number:&emsp;{unitNumber}</p>
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
  const { req } = context;

  // Determine the base URL
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = `${protocol}://${req.headers.host}`;

  // Fetch the data from the server-side route "/api/work-orders/[workOrderNumber]"
  const res = await fetch(`${baseUrl}/api/work-orders/${id}`);

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

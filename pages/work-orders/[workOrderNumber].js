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
    <div>
      <h1>Work Order {workOrderNumber}</h1>
      <p>Date: {new Date(jobDate).toLocaleDateString()}</p>
      <p>Client: {client}</p>
      <p>Address: {address}</p>
      <p>Street Address: {streetAddress}</p>
      <p>City: {city}</p>
      <p>Unit Number: {unitNumber}</p>
      <p>VIN: {vin}</p>
      <p>License Plate: {licensePlate}</p>
      <p>Hubometer: {hubometer}</p>
      <p>Total Hours: {totalHours}</p>

      <h2>Descriptions</h2>
      {descriptions &&
        descriptions.map((description, index) => (
          <div key={index}>
            <p>Description: {description.description}</p>
            <p>Time: {description.time}</p>
          </div>
        ))}

      <h2>Parts</h2>
      {parts &&
        parts.map((part, index) => (
          <div key={index}>
            <p>Quantity: {part.quantity}</p>
            <p>Part: {part.part}</p>
          </div>
        ))}
    </div>
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

import { useRouter } from "next/router";

export default function SubmittedWorkOrder() {
  const router = useRouter();
  const { workOrderNumber } = router.query;

  return (
    <div>
      <h1>Work Order {workOrderNumber}</h1>
      {/* Display work order data here */}
    </div>
  );
}

// import { useRouter } from "next/router";

// export default function SubmittedWorkOrder() {
//   const router = useRouter();
//   const { workOrderNumber } = router.query;

//   return (
//     <div>
//       <h1>Work Order {workOrderNumber}</h1>

//     </div>
//   );
// }
import prisma from "../../../lib/prisma.js";

export default async function workOrderHandler(req, res) {
  const { method } = req;
  const { workOrderNumber } = req.query;

  switch (method) {
    case "GET":
      try {
        const workOrder = await prisma.WorkOrder.findUnique({
          where: { workOrderNumber: parseInt(workOrderNumber) },
          include: {
            descriptions: true, // This includes the descriptions in the response
            parts: true, // This includes the parts in the response
          },
        });

        if (!workOrder) {
          res.status(404).json({ error: "Work order not found" });
          return;
        }

        res.status(200).json(workOrder);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching work order" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

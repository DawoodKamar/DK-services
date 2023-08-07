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

    case "DELETE":
      try {
        const deletedWorkOrder = await prisma.WorkOrder.delete({
          where: { workOrderNumber: parseInt(workOrderNumber) },
        });

        res.status(200).json(deletedWorkOrder);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error deleting work order" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

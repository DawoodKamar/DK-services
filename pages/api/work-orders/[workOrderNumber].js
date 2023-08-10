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
        // Check if the work order exists first before deleting.
        const workOrderToDelete = await prisma.WorkOrder.findUnique({
          where: { workOrderNumber: parseInt(workOrderNumber) },
        });

        if (!workOrderToDelete) {
          res.status(404).json({ error: "Work order not found." });
          return;
        }

        const userIdForDeletedWorkOrder = workOrderToDelete.userId;

        // Use transaction to delete work order and decrement submission count.
        await prisma.$transaction([
          prisma.WorkOrder.delete({
            where: { workOrderNumber: parseInt(workOrderNumber) },
          }),
          prisma.user.update({
            where: { id: userIdForDeletedWorkOrder },
            data: {
              submissionCount: {
                decrement: 1,
              },
            },
          }),
        ]);

        res.status(200).json({ message: "Work order deleted successfully." });
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

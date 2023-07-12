import prisma from "../../lib/prisma.js";

export default async function assetHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const workOrders = await prisma.WorkOrder.findMany();
        res.status(200).json(workOrders);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching posts" });
      }
      break;

    case "POST":
      try {
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
          descriptions,
          parts,
          totalHours,
        } = req.body;

        const newWorkOrder = await prisma.workOrder.create({
          data: {
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
            descriptions,
            parts,
            totalHours,
          },
        });

        res.status(201).json(newWorkOrder);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error creating work order" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

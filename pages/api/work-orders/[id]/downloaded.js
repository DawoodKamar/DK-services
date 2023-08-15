import prisma from "../../../../lib/prisma.js";

export default async (req, res) => {
  if (req.method !== "PUT") {
    // Handle unsupported methods
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;

  try {
    const workOrder = await prisma.workOrder.findUnique({
      where: { id: parseInt(id) },
    });

    if (!workOrder) {
      // If no work order is found, send a 404 Not Found response
      return res.status(404).json({ error: "Work order not found" });
    }

    // If a work order is found, update its isDownloaded property
    await prisma.workOrder.update({
      where: { id: parseInt(id) },
      data: { isDownloaded: true },
    });

    // Send a 200 OK response after the update
    return res.status(200).json({ message: "Work order updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

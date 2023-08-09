import prisma from "../../../lib/prisma.js";

export default async function handler(req, res) {
  const userId = req.query.id;

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching user data: ${error.message}" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed if it's not a GET request
  }
}

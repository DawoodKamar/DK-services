import prisma from "../../lib/prisma.js";

// asynchronous function because it will be doing asynchronous database operations.
export default async function assetHandler(req, res) {
  //destructuring the `method` property from the `req` object, which represents the HTTP method of the request.
  //   const { method } = req; is equivalent to const method = req.method;
  const { method } = req;

  // A switch statement to handle different request methods.
  switch (method) {
    case "GET":
      try {
        const searchQuery = req.query.search || "";
        const userIdQuery = req.query.userId;
        const parsedQueryNumber = parseInt(searchQuery);
        const parsedQueryDate = new Date(searchQuery);

        const validNumberQuery = !isNaN(parsedQueryNumber)
          ? parsedQueryNumber
          : undefined;
        const validDateQuery = !isNaN(parsedQueryDate.getTime())
          ? parsedQueryDate
          : undefined;

        const whereClause = {
          userId: userIdQuery,
          OR: [
            { workOrderNumber: validNumberQuery },
            { jobDate: validDateQuery },
            { client: { contains: searchQuery } },
            { address: { contains: searchQuery } },
            { streetAddress: { contains: searchQuery } },
            { city: { contains: searchQuery } },
            { unitNumber: { contains: searchQuery } },
            { vin: { contains: searchQuery } },
            { licensePlate: { contains: searchQuery } },
            { hubometer: { contains: searchQuery } },
            { totalHours: validNumberQuery },
          ],
        };

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const workOrders = await prisma.WorkOrder.findMany({
          where: whereClause,
          orderBy: {
            workOrderNumber: "desc",
          },
          take: limit,
          skip: (page - 1) * limit,
        });

        const totalCount = await prisma.WorkOrder.count({
          where: whereClause,
        });

        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
          results: workOrders,
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalCount,
        });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching posts" });
      }
      break;
    case "POST":
      // This block of code will execute if the HTTP method is POST.
      try {
        // Destructure the properties from the request body. This is the data that was sent in the POST request.
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
          userId,
        } = req.body;
        // Check if user exists
        let user;
        try {
          user = await prisma.user.findUnique({ where: { id: userId } });
          // Rest of user-related logic
        } catch (e) {
          console.error("Error fetching/creating user:", e.message);
          return res
            .status(500)
            .json({ error: "Error fetching/creating user." });
        }

        // If the user doesn't exist, create them
        if (!user) {
          user = await prisma.user.create({
            data: { id: userId, submissionCount: 0, submissionLimit: 10 }, // Adding other required fields if necessary
          });
        }

        // If the user reached the submission limit, return
        if (user.submissionCount >= user.submissionLimit) {
          res.status(403).json({ error: "Submission limit reached" });
          return;
        }

        // Here, we're mapping over the descriptions, parsing the time property from a string to a float, and creating a new array of descriptions.
        const parsedDescriptions = descriptions.map((desc) => {
          let time = parseFloat(desc.time);
          if (isNaN(time)) {
            time = 0; // or whatever default value you want to use
          }
          return { ...desc, time: time };
        });

        // Parse number-like values to their appropriate type
        const parsedWorkOrderNumber = parseInt(workOrderNumber);
        const parsedJobDate = new Date(jobDate);
        const parsedTotalHours = parseFloat(totalHours);

        const newWorkOrder = await prisma.$transaction([
          prisma.workOrder.create({
            data: {
              workOrderNumber: parsedWorkOrderNumber,
              jobDate: parsedJobDate,
              client,
              address,
              streetAddress,
              city,
              unitNumber,
              vin,
              licensePlate,
              hubometer,
              descriptions: {
                create: parsedDescriptions,
              },
              parts: {
                create: parts,
              },
              totalHours: parsedTotalHours,
              userId,
            },
          }),
          // Increment user's submission count
          prisma.user.update({
            where: { id: userId },
            data: {
              submissionCount: {
                increment: 1,
              },
            },
          }),
        ]);

        // Respond with status code 201, which means "Created", and send the newly created work order back in the response.
        res.status(201).json(newWorkOrder);
      } catch (e) {
        // If there was an error in the above code, it gets caught here and is logged to the console.
        // A status code of 500, which means "Internal Server Error", is sent back in the response, along with an error message.
        console.error("Request error", e);
        res.status(500).json({ error: "Error creating work order" });
      }
      break;
  }
}

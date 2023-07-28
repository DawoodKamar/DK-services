import prisma from "../../lib/prisma.js";

// asynchronous function because it will be doing asynchronous database operations.
export default async function assetHandler(req, res) {
  //destructuring the `method` property from the `req` object, which represents the HTTP method of the request.
  //   const { method } = req; is equivalent to const method = req.method;
  const { method } = req;

  // A switch statement to handle different request methods.
  switch (method) {
    case "GET":
      // This block of code will execute if the HTTP method is GET.
      try {
        const searchQuery = req.query.search || "";
        const parsedQueryNumber = parseInt(searchQuery);
        const parsedQueryDate = new Date(searchQuery);

        // Check if the parsed values are valid numbers or dates
        const validNumberQuery = !isNaN(parsedQueryNumber)
          ? parsedQueryNumber
          : undefined;
        const validDateQuery = !isNaN(parsedQueryDate.getTime())
          ? parsedQueryDate
          : undefined;

        const workOrders = await prisma.WorkOrder.findMany({
          where: {
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
          },
        });

        // Sends the fetched work orders back in the response with a status code of 200, which means "OK".
        res.status(200).json(workOrders);
      } catch (e) {
        // If there was an error in the above code, it gets caught here and is logged to the console.
        // A status code of 500, which means "Internal Server Error", is sent back in the response, along with an error message.
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
        } = req.body;

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

        // Check if the work order with this number already exists in the database.
        const existingWorkOrder = await prisma.workOrder.findUnique({
          where: { workOrderNumber: parsedWorkOrderNumber },
        });

        // If the work order already exists, return an error with status code 409, which represents a conflict.
        if (existingWorkOrder) {
          res
            .status(409)
            .json({ error: "Work order with this number already exists" });
          return;
        }

        // If the work order doesn't already exist, create a new work order in the database with the data from the request.
        const newWorkOrder = await prisma.workOrder.create({
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
          },
        });

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

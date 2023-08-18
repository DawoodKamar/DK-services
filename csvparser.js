const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const Papa = require('papaparse');

const prisma = new PrismaClient();

async function main() {
    const dataToInsert = [];

    const fileStream = fs.createReadStream("C:\\Users\\dawoo\\Downloads\\Work_Order_Form2023-08-15_23_17_41.csv");

    Papa.parse(fileStream, {
        header: true,
        step: function(result) {
            const row = result.data;

            dataToInsert.push({
                workOrderNumber: parseInt(row.workOrderNumber),
                jobDate: new Date(row.jobDate),
                client: row.client,
                address: row.address,
                city: row.city.trim(),  // Trim to remove any extra spaces
                unitNumber: row.unitNumber,
                vin: row.vin,
                licensePlate: row.licensePlate,
                hubometer: row.hubometer,
                totalHours: parseFloat(row.totalHours),
                isDownloaded: row.isDownloaded === '1', 
                userId: row.userId,
            });
        },
        complete: async function() {
            try {
                console.log(dataToInsert);
                await prisma.workOrder.createMany({
                    data: dataToInsert,
                    skipDuplicates: true,  // Optional: skip duplicate records
                });
                console.log('Data imported successfully!');
            } catch (error) {
                console.error('Error importing data:', error);
            } finally {
                await prisma.$disconnect();
            }
        }
    });
}

main();

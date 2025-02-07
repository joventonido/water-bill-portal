import type { NextApiRequest, NextApiResponse } from "next"; // Import types

interface BillingData {
  // Define TypeScript interface
  customerName: string;
  currentReading: number;
  previousReading: number;
  billAmount: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { customerName, currentReading, previousReading, billAmount } =
        req.body as BillingData; // Type assertion

      // Validation (essential!)
      if (
        !customerName ||
        typeof customerName !== "string" ||
        !currentReading ||
        typeof currentReading !== "number" ||
        !previousReading ||
        typeof previousReading !== "number" ||
        !billAmount ||
        typeof billAmount !== "number"
      ) {
        return res.status(400).json({ message: "Invalid billing data" });
      }

      // Save to database or external service here
      console.log("Saving billing data", {
        customerName,
        currentReading,
        previousReading,
        billAmount,
      });

      // Example database interaction (replace with your actual logic)
      // await prisma.billing.create({  // Assuming you are using Prisma
      //   data: {
      //     customerName,
      //     currentReading,
      //     previousReading,
      //     billAmount,
      //   },
      // });

      res.status(200).json({ message: "Bill saved successfully!" });
    } catch (error) {
      console.error("Error saving bill:", error);
      res.status(500).json({ message: "Failed to save bill" }); // Generic error message for security
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

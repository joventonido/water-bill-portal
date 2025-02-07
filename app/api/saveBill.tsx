// export default function handler(req: any, res: any) {
//   if (req.method === "POST") {
//     const { customerName, currentReading, previousReading, billAmount } =
//       req.body;

//     // Save this data to a database or an external service here
//     console.log("Saving billing data", {
//       customerName,
//       currentReading,
//       previousReading,
//       billAmount,
//     });

//     res.status(200).json({ message: "Bill saved successfully!" });
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }

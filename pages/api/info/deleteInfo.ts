import connectDB from "@/config/db";
import Info from "@/models/Info";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    connectDB();
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    await Info.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
      message: "Data deleted successfully",
    });
  }
}

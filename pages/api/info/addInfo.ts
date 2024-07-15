import connectDB from "@/config/db";
import Info from "@/models/Info";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    connectDB();
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const info = await Info.create({
      message,
    });

    res.status(201).json({
      success: true,
      message: "Data added successfully",
      info,
    });
  }
}

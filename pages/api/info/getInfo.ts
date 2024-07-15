import connectDB from "@/config/db";
import Info from "@/models/Info";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    connectDB();

    const info = await Info.find({});

    res.status(201).json({
      success: true,
      info,
    });
  }
}

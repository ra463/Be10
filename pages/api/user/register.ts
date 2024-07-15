import connectDB from "@/config/db";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

const sendData = async (
  res: NextApiResponse,
  statusCode: number,
  user: any,
  message: string
) => {
  const token = user.getJWTToken();

  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    user,
    token,
    message,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    connectDB();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    sendData(res, 201, user, "User created successfully");
  }
}

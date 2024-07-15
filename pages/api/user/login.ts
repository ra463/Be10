import connectDB from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    sendData(res, 201, user, "User Logged in successfully");
  }
}

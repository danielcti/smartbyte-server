import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

class LoginController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({
        message: "Invalid input fields.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({
        message: "User not found.",
      });
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (match) {
      return response.status(200).json({
        message: "User authenticated.",
      });
    }

    return response.status(401).json({
      message: "Invalid password.",
    });
  }
}

export default new LoginController();

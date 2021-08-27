import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

class UsersController {
  async index(request: Request, response: Response) {
    if (!request.body.email) {
      const users = await User.find();
      return response.status(200).json(users);
    }

    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      return response.status(404).json({
        message: "User not found.",
      });
    }

    return response.status(200).json(user);
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Invalid input fields.",
      });
    }

    const password_hash = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password_hash });

    return response.status(200).json(user);
  }

  async update(request: Request, response: Response) {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Invalid input fields.",
      });
    }

    let user = await User.findOne({ email: email });

    const password_hash = await bcrypt.hash(password, 8);
    user.name = name;
    user.password_hash = password_hash;
    await user.save();

    return response.status(200).json(user);
  }

  async delete(request: Request, response: Response) {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({
        message: "Invalid input fields.",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        message: "Invalid email.",
      });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return response.status(200).json({
        message: "Invalid password.",
      });
    }

    await User.findByIdAndDelete(user._id);

    return response.status(204).json();
  }
}

export default new UsersController();

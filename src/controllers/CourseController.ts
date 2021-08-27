import { Request, Response } from "express";
import Course from "../models/Course";

class CoursesController {
  async index(request: Request, response: Response) {
    const courses = await Course.find();
    return response.status(200).json(courses);
  }

  async show(request: Request, response: Response) {
    const course = await Course.findById(request.params.id);
    return response.status(200).json(course);
  }

  async store(request: Request, response: Response) {
    const course = await Course.create(request.body);

    return response.status(200).json(course);
  }
}

export default new CoursesController();

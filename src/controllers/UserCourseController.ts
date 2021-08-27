import { Request, Response } from "express";
import User from "../models/User";

class UserCourseController {
  async index(request: Request, response: Response) {
    const user = await User.findById(request.params.userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }

    return response.status(200).json(user.courses);
  }
  async store(request: Request, response: Response) {
    let user = await User.findById(request.params.userId);
    const userHasAlreadySubscribedToCourse = user.courses.some(
      (course: any) => course.course_id === request.params.courseId
    );
    if (!userHasAlreadySubscribedToCourse) {
      user.courses.push({
        course_id: request.params.courseId,
        classes: [],
        active: true,
      });
    } else {
      user.courses.forEach((course: any) => {
        if (course.course_id === request.params.courseId) {
          course.active = true;
        }
      });
    }

    await user.save();
    return response.status(200).json(user);
  }

  async delete(request: Request, response: Response) {
    let user = await User.findById(request.params.userId);

    user.courses.forEach((course: any) => {
      if (course.course_id === request.params.courseId) {
        course.active = false;
      }
    });

    user.save();

    return response.status(200).json(user);
  }
}

export default new UserCourseController();

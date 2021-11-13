import { Request, Response } from "express";
import User from "../models/User";

class UserClassController {
  async store(request: Request, response: Response) {
    let user = await User.findById(request.params.userId);

    const userCourse = user.courses.find(
      (course: any) => course.course_id === request.params.courseId
    );
    const userAlreadyWatchedClass = userCourse.classes.some(
      (_class: any) => _class.class_id === request.params.classId
    );

    if (!userAlreadyWatchedClass) {
      user.courses.forEach((course: any) => {
        if (course.course_id === request.params.courseId) {
          course.classes.push({
            class_id: request.params.classId,
            last_video_time_watched: request.body.last_video_time_watched || 0,
          });
        }
      });
    } else {
      user.courses.forEach((course: any) => {
        if (course.course_id === request.params.courseId) {
          course.classes.forEach((_class: any) => {
            if (_class.class_id === request.params.classId) {
              _class.last_video_time_watched =
                request.body.last_video_time_watched;
            }
          });
        }
      });
    }
    await user.save();

    return response.status(200).json(user);
  }
}

export default new UserClassController();

import { Router } from "express";
import UserController from "../controllers/UserController";
import CourseController from "../controllers/CourseController";
import ClassController from "../controllers/ClassController";
import LoginController from "../controllers/LoginController";
import UserCourseController from "../controllers/UserCourseController";
import UserClassController from "../controllers/UserClassController";

const routes = Router();

routes.get("/user", UserController.index);
routes.post("/user", UserController.create);
routes.put("/user", UserController.update);
routes.delete("/user", UserController.delete);

routes.get("/course", CourseController.index);
routes.get("/course/:id", CourseController.show);
routes.post("/course", CourseController.store);

routes.get("/class", ClassController.index);
routes.get("/class/:id", ClassController.show);
routes.post("/class", ClassController.store);

routes.post("/login", LoginController.login);

routes.get("/user/:userId/course", UserCourseController.index);
routes.post("/user/:userId/course/:courseId", UserCourseController.store);
routes.delete("/user/:userId/course/:courseId", UserCourseController.delete);

routes.post(
  "/user/:userId/course/:courseId/class/:classId",
  UserClassController.store
);

export default routes;

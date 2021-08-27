import { Request, Response } from "express";
import Class from "../models/Class";

class ClasssController {
  async index(request: Request, response: Response) {
    const classes = await Class.find();
    return response.status(200).json(classes);
  }

  async show(request: Request, response: Response) {
    const _class = await Class.findById(request.params.id);
    return response.status(200).json(_class);
  }

  async store(request: Request, response: Response) {
    const _class = await Class.create(request.body);

    return response.status(200).json(_class);
  }
}

export default new ClasssController();

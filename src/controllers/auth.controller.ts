import { Request, Response, NextFunction } from "express";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service";
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await registerUserService({ name, email, password });
    res
      .status(201)
      .json({ message: "Account created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};
export const logInController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const user = await loginUserService({ email, password });
    res.status(201).json({ message: "Login successfull", user });
  } catch (error) {
    next(error);
  }
};

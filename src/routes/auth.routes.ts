import { Router } from "express";
import {
  logInController,
  registerController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", logInController);

export default router;

import { Router } from "express";
import { createUser, getAllUser } from "../controllers/user.controller";
import { getUserById, updateById } from "../controllers/user.controller";
import { deleteById } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  validate(createUserValidation),
  protect,
  restrictTo("admin"),
  createUser,
);
router.get("/", protect, restrictTo("admin"), getAllUser);
router.get("/:userid", protect, restrictTo("admin"), getUserById);
router.patch("/:userid", protect, restrictTo("admin"), updateById);
router.delete("/:userid", protect, restrictTo("admin"), deleteById);

export default router;

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
  protect,
  restrictTo("admin"),
  validate(createUserValidation),
  createUser,
);
router.get("/", protect, restrictTo("admin"), getAllUser);
router.get("/:id", protect, restrictTo("admin"), getUserById);
router.patch("/:id", protect, restrictTo("admin"), updateById);
router.delete("/:id", protect, restrictTo("admin"), deleteById);

export default router;

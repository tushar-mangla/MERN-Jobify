import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

router.get("/get", getCurrentUser);
router.put(
  "/update",
  updateUser
);
export default router;

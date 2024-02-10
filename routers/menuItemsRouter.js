import { Router } from "express";
const router = Router();

import { createMenuItems, getAllMenuItems, getSingleMenuItem, updateSingleMenuItem, deleteMenuItem } from "../controllers/menuItemsController";

router.post("/", createMenuItems);

router.get("/", getAllMenuItems);

router.get("/:id", getSingleMenuItem);

router.put("/:id", updateSingleMenuItem);

router.delete("/:id", deleteMenuItem);

export default router;
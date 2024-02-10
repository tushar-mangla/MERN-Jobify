import { Router } from "express";
const router = Router();

import { createOrder, deleteOrder, updateOrderStatus, getOrderList } from "../controllers/orderContoller";

router.post('/', createOrder);

router.delete('/:id', deleteOrder);

router.put('/:id/status', updateOrderStatus);

router.get('/', getOrderList);

export default router;
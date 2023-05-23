import { Router } from "express";
import checkoutProduct, { recieveEvents } from "../../controllers/checkout";
import { addOrder, deleteOrder, getOrders, updateOrder } from "../../controllers/orders";

const router = Router();

router.post("/add-order", addOrder);
router.get("/get-orders", getOrders);
router.delete("/delete-order", deleteOrder);
router.patch("/update-order", updateOrder);
router.post("/checkout", checkoutProduct);
router.post("/webhook/transaction", recieveEvents);
// router.post("/transaction", verifTransaction)


export default router;
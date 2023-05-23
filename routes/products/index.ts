import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../../controllers/products/products";

const router = Router();

router.post("/add-product", addProduct);
router.get("/get-products", getProducts);
router.patch("/update-product", updateProduct);
router.delete("/delete-product/:productid", deleteProduct)

export default router;
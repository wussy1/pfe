import express from "express";
import {
    getProducts,
    registerProduct,deleteProduct,updateProduct,getProductByCat
} from "../controllers/Products_controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/prodbycat/:id_cat", getProductByCat);
router.post("/register", registerProduct);
router.delete("/delete/:id_prod", deleteProduct);
router.put("/update/:id_prod", updateProduct);

export default router;
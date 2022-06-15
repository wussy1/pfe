import express from "express";
import {
    getProducts,
    registerProduct,deleteProduct,updateProduct,getProductByCat, getProd, getProd_disc
} from "../controllers/Products_controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/prodbycat/:id_cat", getProductByCat);
router.get("/prod/:prod_name", getProd);
router.get("/discount", getProd_disc);
router.post("/register", registerProduct);
router.delete("/delete/:id_prod", deleteProduct);
router.put("/update/:id_prod", updateProduct);

export default router;

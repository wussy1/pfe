import express from "express";
import { deleteCat, getCategory, registerCat, updateCat } from "../controllers/Category_controller.js";


const router = express.Router();

router.get("/", getCategory);
router.post("/register", registerCat);
router.delete("/delete/:id_cat", deleteCat);
router.put("/update/:id_cat", updateCat);

export default router;
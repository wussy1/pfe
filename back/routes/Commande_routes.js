import express from "express";
import { CreateComd, deleteComd,addCommand, getCommande, updateComd } from "../controllers/Commande_controller.js";
import {
    
} from "../controllers/Products_controller.js";

const router = express.Router();


router.get("/", getCommande);
router.post("/create", CreateComd);
router.put("/update/:id_comd", updateComd);
router.delete("/delete/:id_comd", deleteComd);
router.post("/add",addCommand)


export default router;
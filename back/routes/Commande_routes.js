import express from "express";
import { CreateComd,acceptannulecommande,getAll, deleteComd,getusercommandes,addCommand, getCommande, updateComd } from "../controllers/Commande_controller.js";
import {
    
} from "../controllers/Products_controller.js";

const router = express.Router();


router.get("/", getCommande);
router.get("/getAll", getAll);
router.post("/create", CreateComd);
router.put("/update/:id_comd", updateComd);
router.put("/accept-deny/:id/:status", acceptannulecommande);
router.delete("/delete/:id_comd", deleteComd);
router.post("/add",addCommand)
router.get("/all/:id",getusercommandes)


export default router;
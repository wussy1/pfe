import express from "express";
import { AddItem, DeleteItem, MinusItem, PlusItem } from "../controllers/Ligne_pc_controller.js";


const router = express.Router();


router.post("/plus",PlusItem)
router.post("/minus",MinusItem)
router.delete("/delete", DeleteItem);
router.post("/add", AddItem);



export default router;
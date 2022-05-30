import express from "express";
import { AddItem, DeleteItem, getpanier_by_user, MinusItem, PlusItem } from "../controllers/Ligne_pc_controller.js";


const router = express.Router();

router.get("/by-user-id/:id",getpanier_by_user)
router.post("/plus",PlusItem)
router.post("/minus",MinusItem)
router.delete("/delete", DeleteItem);
router.post("/add", AddItem);



export default router;
import express from "express";

import { AddServ, deleteServ, getorder_serv_by_user, updateServ } from "../controllers/Service_controller.js";

const router = express.Router();

router.get("/by-user-id/:id",getorder_serv_by_user);
router.post("/add",AddServ);
router.put("/update/:id", updateServ);
router.delete("/delete/:id", deleteServ);
export default router;

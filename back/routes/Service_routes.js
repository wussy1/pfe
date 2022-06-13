import express from "express";

import { addCommandeService,acceptDenty, AddServ,  deleteServv, getorder_serv, getorder_serv_by_user, getservices,  updateServv } from "../controllers/Service_controller.js";

const router = express.Router();

router.get("/by-user-id/:id",getorder_serv_by_user);
router.post("/add-commande",addCommandeService);
router.post("/add",AddServ);
router.get("/",getservices);
router.put("/accept-deny/:id/:status",acceptDenty);
router.get("/orders",getorder_serv);
router.put("/update/:id", updateServv);
router.delete("/delete/:id", deleteServv);
export default router;

import express from "express";

import { addCommandeService,acceptDenty, AddServ,  deleteServv, getorder_serv, getorder_serv_by_user, getservices,  updateServv } from "../controllers/Service_controller.js";

const router = express.Router();

router.get("/by-user-id/:id",getorder_serv_by_user);
router.get("/orders",getorder_serv);
router.get("/",getservices);
router.post("/add-commande",addCommandeService);
router.post("/add",AddServ);
router.put("/accept-deny/:id/:status",acceptDenty);
router.put("/update/:id", updateServv);
router.delete("/delete/:id", deleteServv);
export default router;

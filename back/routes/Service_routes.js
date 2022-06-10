import express from "express";

import { getorder_serv_by_user } from "../controllers/Service_controller.js";

const router = express.Router();

router.get("/by-user-id/:id",getorder_serv_by_user);


export default router;

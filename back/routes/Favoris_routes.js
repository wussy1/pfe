import express from "express";
import { addRemoveFavoris,GetUserFavoris, Isfavoris } from "../controllers/Favoris_controller.js";


const router = express.Router();

router.post("/add-remove",addRemoveFavoris)
router.get("/get/:id",GetUserFavoris)
router.post("/get",Isfavoris)




export default router;
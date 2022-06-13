import express from "express";
import { getAds, AddAd, removeAd, updateAd } from "../controllers/Ads_controller.js";


const router = express.Router();

router.get("/", getAds);
router.post("/add", AddAd);
router.delete("/delete/:id", removeAd);
router.put("/update/:id", updateAd);

export default router;
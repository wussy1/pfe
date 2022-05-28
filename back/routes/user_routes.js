import express from "express";
import {
    loginUser,registerUser,getUsers,getUser,updateUserPassword, updateuser
} from "../controllers/user_controller.js";

const router = express.Router();
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updatepassword/:id", updateUserPassword);
router.put("/updateuser/:id", updateuser);



export default router;
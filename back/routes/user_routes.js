import express from "express";
import {
  loginUser,
  registerUser,
  getUsers,
  getUser,
  updateUserPassword,
  updateuser,
  verifyCode,
  forgetPassword,
  updateUserPasswordbyEmail,
} from "../controllers/user_controller.js";

const router = express.Router();
router.get("/", getUsers);
router.get("/verifycode/:code", verifyCode);
router.put("/updatepasswordbyemail", updateUserPasswordbyEmail);
router.post("/forgetpassword", forgetPassword);
router.get("/:id", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updatepassword/:id", updateUserPassword);
router.put("/updatepasswordbyemail", updateUserPassword);
router.put("/updateuser/:id", updateuser);

export default router;

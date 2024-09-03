import express from "express";
// import { verifyToken } from "../helpers/verifyToken";
import { login, register } from "../controllers/authController.js";
import { verifyToken } from "../helpers/verifyToken.js";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/auth/register',register);
router.post('/auth/login',login);


router.get("/user",verifyToken,getUser);








export default router;
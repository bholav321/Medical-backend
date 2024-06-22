import express from 'express';
import { SignUp,SignIn, findByEmail, updateUser, updatePassword } from '../controller/user.controller.js';
import { VerifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/signUp",SignUp);
router.post("/signIn",VerifyToken,SignIn);
router.post("/findUserByEmail",findByEmail);
router.post("/updatedetail",updateUser)
router.post("/updatePassword",updatePassword)
export default router;
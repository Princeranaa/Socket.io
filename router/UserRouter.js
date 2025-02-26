import express from "express";
const UserRouter = express.Router();
import { registerUser, userLogin } from "../controller/authController.js";


UserRouter.post('/register', registerUser)
UserRouter.post('/register', userLogin)

export default UserRouter;


import express from "express";
import authMiddleware from '../middelware/authUser.js'
const UserRouter = express.Router();

import { getMessages, getUsers, registerUser, userLogin } from "../controller/authController.js";


UserRouter.get("/login", (req, res) => res.render("login"));
UserRouter.get("/register", (req, res) => res.render("register"));
UserRouter.post("/register", registerUser);
UserRouter.post("/login",  userLogin);
UserRouter.get("/users", authMiddleware, getUsers);
UserRouter.get("/messages/:sender/:receiver", authMiddleware, getMessages);
// router.get("/logout", authController.logout);



export default UserRouter;


import express from "express";
import authMiddleware from '../middelware/authUser.js'
const UserRouter = express.Router();

// Import only user-related controllers
import { registerUser, userLogin } from "../controller/authController.js";

// User authentication routes
UserRouter.get("/login", (req, res) => res.render("login"));
UserRouter.get("/register", (req, res) => res.render("register"));
UserRouter.post("/register", registerUser);
UserRouter.post("/login", userLogin);

// Remove the users and messages routes from here as they're chat-related
// UserRouter.get("/users", authMiddleware, getUsers);
// UserRouter.get("/messages/:sender/:receiver", authMiddleware, getMessages);

export default UserRouter;


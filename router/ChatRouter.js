import express from "express";
// import {  } from "../controller/chatController.js";
import authMiddleware from "../middelware/authUser.js";
import { getMessages } from "../controller/authController.js";
import User from "../model/UserModel.js";
import { getChatPage } from "../controller/chatController.js";
// import User from "../model/UserModel.js"; // Import User Model

const router = express.Router();

// Allow unauthenticated access to the main chat page
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find({}, "name _id");
//     res.render("ChatPage", {
//       messages: [],
//       currentUser: req.user || null,
//       users,
//       receiver: null,
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).send("Server error");
//   }
// });




// Apply authMiddleware only to chat-related routes
// router.get("/chat/:receiverId", authMiddleware, getMessages);
// router.post("/chat/:receiverId", authMiddleware, sendMessage);
// router.get("/chat", authMiddleware, "");




// Render Chat Page
router.get("/chat", authMiddleware, getChatPage);

router.get('/messages', getMessages);
// API to fetch messages between two users
router.get("/messages/:sender/:receiver", authMiddleware, getMessages);



export default router;

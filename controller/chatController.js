// import Chat from "../model/ChatModel.js";
// import User from "../model/UserModel.js";

// export const getMessages = async (req, res) => {
//   try {
//     const senderId = req.query.senderId;
//     const receiverId = req.params.receiverId;

//     const messages = await Chat.find({
//       $or: [
//         { sender: senderId, receiver: receiverId },
//         { sender: receiverId, receiver: senderId },
//       ],
//     }).populate("sender receiver");

//     const users = await User.find({}, "name _id");
//     const receiver = await User.findById(receiverId);

//     console.log("Receiver ID:", receiverId);

//     res.render("ChatPage", { messages, users, currentUser: { _id: senderId }, receiver });
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const sendMessage = async (req, res) => {
//   try {
//     const { message, senderId, receiverId } = req.body;

//     if (!message) return res.status(400).json({ message: "Message is required" });

//     const newMessage = await Chat.create({ sender: senderId, receiver: receiverId, message });
//     res.json({ success: true, newMessage });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import Chat from "../model/ChatModel.js";
import User from "../model/UserModel.js";

export const getChatPage = async (req, res) => {
 
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }); // Fetch all users except the logged-in user

        res.render("ChatPage", {
            loggedInUserId: req.user._id,
            users,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error: Unable to load chat page." });
    }

};



export const getMessages = async (req, res) => {
    try {
        const { sender, receiver } = req.query;
        const room = [sender, receiver].sort().join("_");

        const messages = await Chat.find({ room })
            .sort({ createdAt: 1 });
            
        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const saveMessage = async (sender, receiver, message) => {
  try {
      const room = [sender, receiver].sort().join("_");
      const newMessage = new Chat({ sender, receiver, message, room });
      await newMessage.save();
  } catch (error) {
      console.error("Error saving message:", error);
  }
};
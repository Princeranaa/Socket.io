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
    res
      .status(500)
      .json({ message: "Server Error: Unable to load chat page." });
  }
};

export const getMessages = async (req, res) => {
  try {
    const sender = req.params.sender || req.query.sender;
    const receiver = req.params.receiver || req.query.receiver;
    
    const participants = [sender, receiver].sort();
    const room = participants.join("_");
    
    console.log('Fetching messages for room:', room);
    const messages = await Chat.find({ room }).sort({ createdAt: 1 });
    console.log('Found messages:', messages.length);
    
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

import Chat from "../model/ChatModel.js"; // Correct import

export const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().populate("sender receiver");
    res.render("chat", { messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    if (!sender || !receiver || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Chat.create({ sender, receiver, message });
    res.redirect("/chat");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

import { Server } from "socket.io";
import { saveMessage } from './controller/chatController.js'; // Import message-saving function

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "https://localhost:3000",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`✅ User connected: ${socket.id}`);
        

        // ✅ Join private chat room
        socket.on("join room", (room) => {
            
            socket.join(room);
            console.log(`📌 User ${socket.id} joined room: ${room}`);
        });

        // ✅ Handle private messages
        socket.on("private message", async ({ sender, receiver, message, room }) => {
            console.log(`📩 Message from ${sender} to ${receiver}: ${message}`);
            console.log(`📌 Broadcasting to room: ${room}`);
            
            try {
                // Save message to database
                await saveMessage(sender, receiver, message);
                
                // Broadcast message to the room
                io.in(room).emit("private message", {
                    sender,
                    message
                });
            } catch (error) {
                console.error("Error handling private message:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${socket.id}`);
        });
    });

    return io;
};

export default initSocket;

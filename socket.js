import { Server } from "socket.io";

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`✅ User connected: ${socket.id}`);

        socket.on("message", (data) => {
            console.log(`📩 Received message from ${socket.id}:`, data);
            io.emit("message", data); // Send message to all clients
        });

        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${socket.id}`);
        });
    });

    return io;
};

export default initSocket;

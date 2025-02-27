import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import userRouter from "./router/UserRouter.js";
import chatRouter from "./router/ChatRouter.js";
import connectToDb from "./config/database.js";
import initSocket from "./socket.js";  // ✅ Now it works!


// Convert __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");



// Routes
app.use("/", userRouter);
app.use("/", chatRouter);

 // This will now work correctly
connectToDb();


// Initialize Socket.io
initSocket(server);

// Start Server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


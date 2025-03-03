// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";  // Make sure the path is correct

 const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded user:", decoded);  // Debugging step

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }

        req.user = user;  // Attach user to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};


export default authMiddleware;
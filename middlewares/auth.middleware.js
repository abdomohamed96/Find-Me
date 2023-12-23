import { client } from "../models/data-model.js";
import jwt from "jsonwebtoken";

export async function auth_middleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ message: 'No found token' });
        }
        if (!authHeader.startsWith("Bearer") || authHeader.split(" ").length !== 2) {
            return res.status(401).json({ error: "Invalid token" });
        }
        const token = authHeader.split(" ")[1];
        const { id, user_type } = jwt.verify(token, process.env.SECRET);
        const user = (await client.query(`select * from Users where user_id = ${id}`)).rows;
        if (user.length === 0) {
            return res.status(403).json({ error: 'User not found"' });
        }
        req.user = { ...user[0], user_type };
        next();

    } catch (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Your token has expired. Please log in again." });
        }
        res.status(401).json({ error: "Invalid token" });
    }


}
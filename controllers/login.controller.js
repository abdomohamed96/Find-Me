import { client, user_verify } from "../models/data-model.js";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


async function LogIn(req, res) {
    try {
        const data = req.body;
        const { error } = user_verify.logIn.validate(data, { abortEarly: false });
        if (error) {
            return res.status(400).json({ err: error.details[0].message });

        }
        
        const found_user = (await client.query(`select * from Users where email = '${data.email}';`)).rows;
        if ((found_user).length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const hashedPass = await bcrypt.compare(data.password, found_user[0].password);
        if (!hashedPass) {
            res.status(400).json({ error: 'Invalid email or password' })
            return;
        }

        const token = Jwt.sign({ id: found_user[0].user_id }, process.env.SECRET, { expiresIn: process.env.EXPIRE });
        return res.status(201).json({ message: "User looged in successfully", token });

    } catch (err) {
        console.log('there is error happenning while logging up');
        return res.status(400).json({ error: "An error occurred while logging in your account. Please try again." });
    }
}

export default LogIn;
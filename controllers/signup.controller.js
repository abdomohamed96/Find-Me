import { client, user_verify } from "../models/data-model.js";
import bcrypt from 'bcrypt';


async function SignUp(req, res) {
    try {
        const data = req.body;
        const { error } = user_verify.signUp.validate(data, { abortEarly: false });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const already_found = (await client.query(`select * from users where email = '${data.email}';`)).rowCount;
        if (already_found !== 0) {
            res.status(400).json({ error: 'Email is already exist' });
            return;
        }
        const hash_pass = await bcrypt.hash(data.password, 10);
        await client.query(`call add_user('${data.fname}','${data.lname}',${data.phone_number},'${data.email}','${hash_pass}','${data.sex}',${data.age},'${data.location}');`);
        res.status(202).json({ status: 'success' });
    } catch (err) {
        res.status(400).json({ error: "An error occurred while creating your account. Please try again." });
        console.log('there is error happenning while signning up');
        return;
    }
}

export default SignUp;
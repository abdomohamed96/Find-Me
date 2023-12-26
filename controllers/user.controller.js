import { client, user_verify } from "../models/data-model.js";
import bcrypt from 'bcrypt';


async function AddUser(req, res) {
    try {
        const data = req.body;
        if (data.user_type === 'Delivery') {
            const { error } = user_verify.Delivery.validate(data, { abortEarly: false });
            if (error) {
                res.status(400).json({ error: error.details[0].message });
                return;
            }
        } else if (data.user_type === 'Employee') {
            const { error } = user_verify.Employee.validate(data, { abortEarly: false });
            if (error) {
                res.status(400).json({ error: error.details[0].message });
                return;
            }
        } else {
            const { error } = user_verify.Normal_user.validate(data, { abortEarly: false });
            if (error) {
                res.status(400).json({ error: error.details[0].message });
                return;
            }
        }
        const already_found = (await client.query(`select * from users where email = '${data.email}';`)).rowCount;
        if (already_found !== 0) {
            res.status(400).json({ error: 'Email is already exist' });
            return;
        }
        const hash_pass = await bcrypt.hash(data.password, 10);
        await client.query(`call add_user('${data.fname}','${data.lname}',${data.phone_number},'${data.email}','${hash_pass}','${data.sex}',${data.age ?? null},'${data.location ?? null}');`);
        const id = (await client.query(`select * from users where email = '${data.email}';`)).rows[0].user_id;
        if (data.user_type === 'Normal_user') {
            await client.query(`insert into normal_users (user_id) values(${id})`);
        } else if (data.user_type === 'Delivery') {
            await client.query(`insert into delivery values(${id},'${data.transmission}',${data.price_km},true,${data.account_number},${data.balance})`);
        } else {
            await client.query(`insert into employee values (${id},${data.salary},${data.working_hours},${data.centerID ?? null})`);
        }

        res.status(202).json({ status: 'success' });
    } catch (err) {
        res.status(400).json({ mess: "An error occurred while creating your account. Please try again.", err });
        console.log('there is error happenning while signning up');
        return;
    }
}

export { AddUser };
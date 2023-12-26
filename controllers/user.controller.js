import Joi from "joi";
import { client, user_verify } from "../models/data-model.js";
import bcrypt from 'bcrypt';
import { auth_middleware } from "../middlewares/auth.middleware.js";
import permission from "../middlewares/permission.middleware.js";


<<<<<<< HEAD
async function AddUser(req, res) {      //(sign up for normal user ,deliveries) for employees: done by admin(other employees)
=======
async function AddUser(req, res) {
    console.log("hi")
>>>>>>> a773d22d361fe7b3aafa727b9faaa68b0c80f568
    try {
        let base_att = ['fname', 'lname', 'phone_number', 'email', 'password', 'confirm_password',
            'sex', 'age', 'location', 'user_type'];
        const data = req.body;
        let common_part = {};
        base_att.forEach((ele) => {
            common_part = { ...common_part, [ele]: data[ele] };
            delete data[ele];
        });
        const { error } = user_verify.add.Normal_user.validate(common_part, { abortEarly: false });
        if (error) {
            res.status(400).json({ status: 'failed', err: error.details[0].message });
            return;
        }
        if (common_part.user_type === 'Delivery') {
            const { error } = user_verify.add.Delivery.validate(data, { abortEarly: false });
            if (error) {
                res.status(400).json({ status: 'failed', err: error.details[0].message });
                return;
            }
        } else if (common_part.user_type === 'Employee') {
            auth_middleware();
            permission.employee();
            const { error } = user_verify.add.Employee.validate(data, { abortEarly: false });
            if (error) {
                res.status(400).json({ status: 'failed', err: error.details[0].message });
                return;
            }
            if (!req.user.is_admin) {
                res.status(400).json({ status: 'failed', mess: 'You are not admin to add a new employee;' });
                return;
            }
        }
        const already_found = (await client.query(`select * from users where email = '${common_part.email ?? null}';`)).rowCount;
        if (already_found !== 0) {
            res.status(400).json({ error: 'Email is already exist' });
            return;
        }
        const hash_pass = await bcrypt.hash(common_part.password, 10);
        await client.query(`call add_user('${common_part.fname ?? null}','${common_part.lname ?? null}',${common_part.phone_number ?? null},'${common_part.email ?? null}','${hash_pass ?? null}','${common_part.sex ?? null}',${common_part.age ?? null},'${common_part.location ?? null}');`);
        const id = (await client.query(`select * from users where email = '${common_part.email ?? null}';`)).rows[0].user_id;
        if (common_part.user_type === 'Normal_user') {
            await client.query(`insert into normal_users (user_id) values(${id});`);
        } else if (common_part.user_type === 'Delivery') {
            await client.query(`insert into delivery values(${id},'${data.transmission}',${data.price_km},true,${data.account_number},${data.balance});`);
        } else {
            await client.query(`insert into employee values (${id},${data.salary},${data.working_hours},${data.centerID ?? null},${data.isAdmin});`);
        }

        res.status(202).json({ status: 'success' });
    } catch (err) {
        res.status(400).json({ mess: "An error occurred while creating new account. Please try again.", err });
        console.log('there is error happenning creating new account');
        return;
    }
}

async function getAllusers(req, res) {      //can done only by employees
    try {
        const data = (await client.query(`select * from users`)).rows;
        res.status(200).json({ status: 'success', data });
        return;
    } catch (err) {
        res.status(400).json({ mess: "An error occurred while showing all users.", err });
        console.log('there is error happenning while showing all users');
        return;
    }
}

async function getUser(req, res) {      ////can done only by employees
    try {
        const { id } = req.params;
        const { error } = Joi.object({ id: Joi.number().integer().required() }).validate({ id }, { abortEarly: false });
        if (error) {
            res.status(400).json({ status: 'failed', err: error.details[0].message });
            return;
        }
        const normal = (await client.query(`select * from normal_users where user_id = ${id};`));
        if (normal.rowCount !== 0) {
            res.status(200).json({ status: 'success', data: { ...(normal.rows[0]), user_type: 'Normal_user' } });
            return;
        }
        const employee = (await client.query(`select * from employee where user_id = ${id};`));
        if (employee.rowCount !== 0) {
            res.status(200).json({ status: 'success', data: { ...(employee.rows[0]), user_type: 'Employee' } });
            return;
        }
        const delivery = (await client.query(`select * from delivery where user_id = ${id};`));
        if (delivery.rowCount !== 0) {
            res.status(200).json({ status: 'success', data: { ...(delivery.rows[0]), user_type: 'Delivery' } });
            return;
        }
        res.status(400).json({ status: 'failed', mess: `Can't found this user` });
        return;
    } catch (err) {
        res.status(400).json({ mess: "An error occurred while showing this user.", err });
        console.log('there is error happenning while showing this user');
        return;
    }
}

async function delMy_account(req, res) {    //can done by anyone
    try {
        await client.query(`delete from users where user_id = ${req.user.user_id}`);
    } catch (err) {
        res.status(400).json({ mess: "An error occurred while deleting my account.", err });
        console.log('there is error happenning while deleting my account');
        return;
    }
}

async function update_user(req, res) {
    try {
        let base_att = ['fname', 'lname', 'phone_number', 'email', 'password',
            'sex', 'age', 'location'];
        const data = req.body;
        let common_part = {};
        base_att.forEach((ele) => {
            common_part = { ...common_part, [ele]: data[ele] };
            delete data[ele];
        });
        const { error } = user_verify.update.user.validate(common_part, { abortEarly: false });
        if (error) {
            res.status(400).json({ status: 'failed', err: error.details[0].message });
            return;
        }
        let change_str = '';
        base_att.forEach((ele) => {
            if (common_part[ele] !== undefined) {
                change_str += `${ele}='${common_part[ele]}',`;
            }
        });


        if (req.user.user_type === 'Normal_user') {
            const { error } = Joi.object({
                account_number: Joi.number().integer(),
                balance: Joi.number().integer()
            }).validate(data, { abortEarly: false });
            if (error) {
                res.status(400).json({ status: 'failed', err: error.details[0].message });
                return;
            }
            let str_normal = '';
            if (data.account_number !== undefined) {
                str_normal += `account_number = ${data.account_number},`;
            }
            if (data.balance !== undefined) {
                str_normal += `balance = ${data.balance}`;
            }
            if (str_normal !== '') {

                await client.query(`update normal_users set ${str_normal} where user_id = ${req.user.user_id};`);
            }
        } else if (req.user.user_type === 'Delivery') {
            const { error } = user_verify.update.Delivery.validate(data, { abortEarly: false });
            if (error) {
                res.status(400).json({ status: 'failed', err: error.details[0].message });
                return;
            }
            let str_deliv = '';
            let lis = ['transmission', 'price_km', 'account_number', 'balance'];
            lis.forEach((ele) => {
                if (data[ele] !== undefined) {
                    str_deliv += `${ele}='${data[ele]}',`;
                }
            });
            if (str_deliv !== '') {
                str_deliv = str_deliv.slice(0, str_deliv.length - 1);
                await client.query(`update delivery set ${str_deliv} where user_id = ${req.user.user_id};`);
            }
        }
        ////add update query for users table
        let updated_rows = 0;
        if (change_str !== '') {
            change_str = change_str.slice(0, change_str.length - 1);
            console.log(change_str);
            updated_rows = (await client.query(`update users set ${change_str} where user_id = ${req.user.user_id};`)).rowCount;
        }
        res.status(200).json({ status: 'success', updated_rows });
        return;

    } catch (err) {
        res.status(400).json({ mess: "An error occurred while updating my account.", err });
        console.log('there is error happenning while updating my account');
        return;
    }
}

export { AddUser, getAllusers, getUser, delMy_account, update_user };
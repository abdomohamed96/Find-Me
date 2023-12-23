import dotenv from 'dotenv';
import Joi from 'joi';
import pkg from 'pg';
const { Client } = pkg;
dotenv.config({ path: './.env' });



const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})



const user_verify = {
    Normal_user: Joi.object({
        fname: Joi.string().alphanum().min(3).max(50).required(),
        lname: Joi.string().alphanum().min(3).max(50).required(),
        phone_number: Joi.number().integer().required(),
        email: Joi.string().max(50).email().required(),
        password: Joi.string().min(8).required(),
        confirm_password: Joi.string().min(8).valid(Joi.ref('password')).required(),
        sex: Joi.string().valid('Male', 'Female').required(),
        age: Joi.number().integer(),
        location: Joi.string().alphanum(),
        user_type: Joi.string().valid('Normal_user', 'Delivery', 'Employee').required()
    }),
    Delivery: Joi.object({
        fname: Joi.string().alphanum().min(3).max(50).required(),
        lname: Joi.string().alphanum().min(3).max(50).required(),
        phone_number: Joi.number().integer().required(),
        email: Joi.string().max(50).email().required(),
        password: Joi.string().min(8).required(),
        confirm_password: Joi.string().min(8).valid(Joi.ref('password')).required(),
        sex: Joi.string().valid('Male', 'Female').required(),
        age: Joi.number().integer(),
        location: Joi.string().alphanum(),
        user_type: Joi.string().valid('Normal_user', 'Delivery', 'Employee').required(),
        transmission: Joi.string().valid('Manual', 'Automatic', 'Both').required(),
        price_km: Joi.number().precision(3).required(),
        account_number: Joi.number().integer().required(),
        balance: Joi.number().integer().required()
    }),
    Employee: Joi.object({
        fname: Joi.string().alphanum().min(3).max(50).required(),
        lname: Joi.string().alphanum().min(3).max(50).required(),
        phone_number: Joi.number().integer().required(),
        email: Joi.string().max(50).email().required(),
        password: Joi.string().min(8).required(),
        confirm_password: Joi.string().min(8).valid(Joi.ref('password')).required(),
        sex: Joi.string().valid('Male', 'Female').required(),
        age: Joi.number().integer(),
        location: Joi.string().alphanum(),
        user_type: Joi.string().valid('Normal_user', 'Delivery', 'Employee').required(),
        salary: Joi.number().integer().required(),
        working_hours: Joi.number().integer().required(),
        centerID: Joi.number().integer()
    }),
    logIn: Joi.object({
        email: Joi.string().max(50).email().required(),
        password: Joi.string().min(8).required(),
        user_type: Joi.string().valid('Employee', 'Normal_user', 'Delivery').required()
    })

};

const comp_verify = {
    add_comp: Joi.object({
        name: Joi.string().min(5).alphanum().required(),
        item_id: Joi.number().integer().required(),
        duration: Joi.number().integer().required(),    //days from start date to end date
        description: Joi.string().min(10).required(),
        price: Joi.number().precision(3).required()
    }),
    del_comp: Joi.object({
        item_id: Joi.number().integer().required(),
        name: Joi.string().min(5).alphanum().required()
    })
};

export { client, user_verify, comp_verify };

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
    signUp: Joi.object({
        fname: Joi.string().alphanum().min(3).max(50).required(),
        lname: Joi.string().alphanum().min(3).max(50).required(),
        phone_number: Joi.number().required(),
        email: Joi.string().max(50).email().required(),
        password: Joi.string().min(8).required(),
        confirm_password: Joi.string().min(8).valid(Joi.ref('password')).required(),
        sex: Joi.string().valid('Male', 'Female').required(),
        age: Joi.number(),
        location: Joi.string()
    }),
    logIn: Joi.object({
        email: Joi.string().max(50).email().required(),
        password: Joi.string().min(8).required(),
    })
}
const item_verify = {
    postItem: Joi.object({
        item_location: Joi.string().alphanum().min(3).required(),
        item_color: Joi.string().alphanum().min(3),
        is_lost: Joi.bool().required(),
        item_date: Joi.date().required(),
        item_type: Joi.string().required(),
        brand: Joi.string(),
        version_type: Joi.string(),
        glass_size: Joi.string(),
        glass_lens_type: Joi.string(),
        phone_ip: Joi.string(),
        owner_id: Joi.number(),
    })
}
export { client, user_verify, item_verify };

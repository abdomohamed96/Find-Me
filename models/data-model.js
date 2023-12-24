import dotenv from 'dotenv';
import { json } from 'express';
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

const notification_verify = {
    postNotification_: Joi.object({
        sender_id: Joi.number().required(),
        reciever_id: Joi.number().required(),
        notification_date: Joi.date().default(new Date()),
        description: Joi.string().required(),
    })
}

const complaint_verify = {
    post_complaints: Joi.object({
        description: Joi.string().required(),
        send_date: Joi.date(),
        user_id: Joi.number().required()
    })
}

const userTrip_verify = {
    add_trip: Joi.object({
        driver_id:  Joi.number().integer().required(),
        owner_id: Joi.number().integer().required(),
        item_id: Joi.number().integer().required(),
        distance: Joi.number().precision(3).required(),
        rate: Joi.number().precision(2)
    })
}

export { client, user_verify, comp_verify, item_verify, notification_verify, complaint_verify, userTrip_verify };

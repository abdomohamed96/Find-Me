import { client } from "../models/data-model.js";

async function get_available_deliv(req, res) {
    try {
        const delivery_data = (await client.query(`
        select 	user_id,transmission,price_km,avg(rate) as "overall rate"	from (delivery as d left outer join user_trips as t on d.user_id = t.driver_id) 
        where d.is_available = true
        group by user_id;
        `)).rows;
        res.status(200).json({ status: 'success', delivery_data });
        return;
    } catch (err) {
        console.log("there is an error occured during getting available deliveries");
        res.status(400).json({ message: "there is an error occured during getting available deliveries", error: err.details });
    }
}

export { get_available_deliv };
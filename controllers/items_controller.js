import { client, item_verify } from "../models/data-model.js";
async function postItem(req, res) {
    try {
        const data = req.body;
        const { error } = item_verify.postItem.validate(data, { abortEarly: false });
        if (error) {
            return res.status(400).send({ msg: error, status: "failed" });
        }
        if (!data.owner_id) {
            data.owner_id = null
        }
        if (!data.item_color) {
            var item_color = null
        }
        else {
            var item_color = `'${data.item_color}'`
        }
        if (!data.brand) {
            var brand = null
        } else {
            var brand = `'${data.brand}'`
        }
        const q = `INSERT INTO public.items(
            item_location, item_color, is_lost, item_date, item_type, brand, version_type, glass_size, glass_lens_type, phone_ip, owner_id)
            VALUES ('${data.item_location}', ${item_color}, ${data.is_lost},'${data.item_date}','${data.item_type}', ${brand}, '${data.version_type}', '${data.glass_size}', '${data.glass_lens_type}', '${data.phone_ip}',${data.owner_id});`
        const result = await client.query(q)
        res.status(200).send({ msg: "inserted successfuly", status: "success" })
    } catch (error) {
        res.status(400).send({ msg: error, status: "failed" });
    }
}
export { postItem }
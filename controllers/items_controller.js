import { client, item_verify } from "../models/data-model.js";
async function postItem(req, res) {
    try {
        const data = req.body;
        const { error } = item_verify.postItem.validate(data);
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
        if (!data.version_type) {
            var version_type = null
        } else {
            var version_type = `'${data.version_type}'`
        }
        if (!data.glass_size) {
            var glass_size = null
        } else {
            var glass_size = `'${data.glass_size}'`
        }

        if (!data.glass_lens_type) {
            var glass_lens_type = null
        } else {
            var glass_lens_type = `'${data.glass_lens_type}'`
        }
        if (!data.phone_ip) {
            var phone_ip = null
        } else {
            var phone_ip = `'${data.phone_ip}'`
        }
        const q = `INSERT INTO public.items(
            item_location, item_color, is_lost, item_date, item_type, brand, version_type, glass_size, glass_lens_type, phone_ip, owner_id)
            VALUES ('${data.item_location}', ${item_color}, ${data.is_lost},'${data.item_date}','${data.item_type}', ${brand}, ${version_type}, ${glass_size}, ${glass_lens_type}, ${phone_ip},${data.owner_id});`
        const result = await client.query(q)
        res.status(200).send({ msg: "inserted successfuly", status: "success" })
    } catch (error) {
        res.status(400).send({ msg: error, status: "failed" });
    }
}
async function get_items_by_id(req, res, next) {
    try {
        const { id, lost } = req.query;
        if (!id || !lost) {
            const err = new Error();
            err.message = "you should specify the query parameter id = & found or lost for lost set lost =1"
            throw err
        }
        let q = `select * from items where item_id=${id} and is_lost=true`;
        if (lost != "1") {
            q = `select * from items where item_id=${id} and is_lost=false`;
        }
        const result = await client.query(q);
        res.status(200).send({ data: result.rows, status: "success" })
    } catch (error) {
        res.status(500).send({ msg: error, status: "failed" })
    }
}
async function delete_items(req, res) {
    try {
        const { id } = req.params;
        if (!parseInt(id)) {
            const err = new Error();
            err.message = "id should be number"
            throw err
        }
        let q = `DELETE FROM public.items WHERE item_id=${id};`
        console.log(q)
        const result = await client.query(q)
        return res.status(200).send({ deleted_rows: result.rowCount, status: "success" })
    } catch (error) {
        return res.status(400).send({ msg: error, status: "failed" });

    }
}

async function update_items(req, res) {
    try {
        const { id } = req.params;
        if (!parseInt(id)) {
            const err = new Error();
            err.message = "id should be number"
            throw err
        }
        let q = `UPDATE public.items
        SET item_location=?, item_color=?, is_lost=?, item_date=?, item_type=?, brand=?, version_type=?, glass_size=?, glass_lens_type=?, phone_ip=?, owner_id=?
        WHERE item_id=${id};`
        console.log(q)
        const result = await client.query(q)
        return res.status(200).send({ deleted_rows: result.rowCount, status: "success" })
    } catch (error) {
        return res.status(400).send({ msg: error, status: "failed" });

    }
}
export { postItem, get_items_by_id, delete_items }
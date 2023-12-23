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
async function history_of_items(req,res,next){
    try{    
    const  q=`select * from items`;
    const result=await client.query(q);
    res.status(200).send({ data:result.rows, status: "success" })
    }catch(error){
        res.status(500).send({msg:error,status:"failed"})
    }
}
export { postItem,history_of_items }
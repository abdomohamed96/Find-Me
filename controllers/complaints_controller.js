import { client, complaint_verify } from "../models/data-model.js";
/*
create table complaints(
	complaint_id serial primary key,
	description varchar not null,
	status varchar default 'in progress',
	send_date date,
	resolved_date date,
	feedback varchar,
	user_id integer not null
	);
*/
async function post_complaint(req,res){
    try{
        const data = req.body;
        const { error } = complaint_verify.post_complaints.validate(data, { abortEarly: false })
        if (error) {
            return res.status(400).send({ msg: error, status: "failed" });
        }
        if (!data.send_date) {
            data.send_date = new Date().toJSON().split("T")[0];
        }
        const q = `INSERT INTO public.complaints(
            description, send_date,user_id)
            VALUES  ('${data.description}','${data.send_date}', '${data.user_id}');`
        await client.query(q);
        return res.status(200).send({ msg: "inserted successfully", status: "success" })
    }catch(error){
        return res.status(400).send({ msg: error, status: "failed" });

    }
}
async function delete_complaints(req, res) {
    try {
        const { id } = req.params;
        if (!parseInt(id)) {
            const err = new Error();
            err.message = "id should be number"
            throw err
        }
        let q = `DELETE FROM public.complaints WHERE complaint_id=${id};`
        const result = await client.query(q)
        return res.status(200).send({ deleted_rows: result.rowCount, status: "success" })
    } catch (error) {
        return res.status(400).send({ msg: error, status: "failed" });

    }
}

export {post_complaint,delete_complaints}
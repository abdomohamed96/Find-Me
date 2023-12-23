import { client, notification_verify } from "../models/data-model.js";
async function postNotification(req, res) {
    try {
        const data = req.body;
        const { error } = notification_verify.postNotification_.validate(data, { abortEarly: false })
        if (error) {
            return res.status(400).send({ msg: error, status: "failed" });
        }
        if (!data.notification_date) {
            data.notification_date = new Date().toJSON().split("T")[0];
        }
        if (data.reciever_id.toString() == data.sender_id.toString()) {
            console.log("error")
            const err = new Error();
            err.message = "you are not allowed to send notification to yourself";
            throw err
        }
        const q = `INSERT INTO public.notification(
        sender_id, reciever_id, description, notification_date)
        VALUES (${data.sender_id},${data.reciever_id},'${data.description}', '${data.notification_date}');`
        await client.query(q);
        return res.status(200).send({ msg: "inserted successfully", status: "success" })
    } catch (error) {
        return res.status(400).send({ msg: error, status: "failed" });
    }

}
async function get_sended_or_recieved_notification_byID(req, res) {
    try {
        const { id, sender } = req.query;
        if (!id || !sender) {
            const err = new Error();
            err.message = "you should specify the query parameter id = & sender or reciceve for sending set sender =1"
            throw err
        }
        if (!parseInt(id)) {
            const err = new Error();
            err.message = "id should be number"
            throw err
        }
        let q = `select * from notification where sender_id=${id}`;
        if (sender != '1') {
            q = `select * from notification where reciever_id=${id}`;
        }
        const result = await client.query(q)
        return res.status(200).send({ data: result.rows, status: "success" })
    } catch (error) {
        return res.status(400).send({ msg: error, status: "failed" });
    }
}

async function delete_notification(req, res) {
    try {
        const { id } = req.params;
        if (!parseInt(id)) {
            const err = new Error();
            err.message = "id should be number"
            throw err
        }
        let q = `DELETE FROM public.notification WHERE sender_id=${id};`
        console.log(q)
        const result = await client.query(q)
        return res.status(200).send({ deleted_rows: result.rowCount, status: "success"})
    } catch (error) {
        return res.status(400).send({ msg: error, status: "failed" });

    }
}

export { postNotification, get_sended_or_recieved_notification_byID, delete_notification }
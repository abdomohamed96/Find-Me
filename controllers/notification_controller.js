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
        console.log(error)
        return res.status(400).send({ msg: error, status: "failed" });
    }

}
export { postNotification }
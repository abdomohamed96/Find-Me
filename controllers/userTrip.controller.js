import { client, userTrip_verify } from "../models/data-model";


async function make_trip(req, res) {
    try {
        const data = req.body;
        const { error } = userTrip_verify.add_trip.validate(data, { abortEarly: false });
    } catch (err) {
        console.log('there is a error occuring during adding new user trip.');
        res.status(403).json({ mess: 'there is a error occuring during adding new user trip.', err });
        return;
    }
}
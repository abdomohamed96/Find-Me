import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { client } from './models/data-model.js'
import { AddUser } from './controllers/user.controller.js';
import LogIn from './controllers/login.controller.js';
import { auth_middleware } from './middlewares/auth.middleware.js';
import { comp_router } from './routes/competition.route.js';
import itemRouter from './routes/itemRoute.js';
import notificationRouter from './routes/notificationRoute.js';
import complaintsRouter from './routes/complaintsRouter.js';
import user_trip_Route from './routes/userTrip.route.js';
import { get_available_deliv } from './controllers/delivery.controller.js';
import userRoute from './routes/user.route.js';

const app = express();
dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 3001
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



async function start() {
    try {
        app.listen(PORT, () => console.log(`Hello, I'm Find Me server ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}
start();
const connectDB = async () => {
    try {
        await client.connect()
        console.log('successful connection');
        // console.log((await client.query(`
        // update users set phone_number = 1111111111 where user_id = 1
        // `)));
        // console.log( await client.query(`call add_user('ahmed','rabie',0254,'pp@gmail.com','8988','Male',44,'cairo');`));
        // await client.end()   //end connection in the end of program

        // console.log((await client.query(`select pay(2,10);`)))
    } catch (error) {
        console.log(error)
    }
}
connectDB();

// app.post('/add_user/', AddUser);
app.use('/users',userRoute);
app.post('/login/', LogIn);
app.use(auth_middleware);
app.get('/home/', (req, res) => {
    return res.status(200).json({ status: 'success', user_data: req.user });
});
//routes 
app.use("/api/items", itemRouter);
app.use("/api/notifications", notificationRouter)
app.use("/api/complaints", complaintsRouter)
app.use('/competiton', comp_router);
app.use('/userTrip', user_trip_Route);
app.get('/Avai_delivery',get_available_deliv);


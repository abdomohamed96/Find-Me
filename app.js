import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { client } from './models/data-model.js'
import SignUp from './controllers/signup.controller.js';
import LogIn from './controllers/login.controller.js';
import { auth_middleware } from './middlewares/auth.middleware.js';

const app = express();
dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 3000
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
        // insert into users values(
        //     1,'omar','oo',0112598,'o@gmail.com','555','Male',44,'giza'
        // );
        // `)));
        // client.query(`call add_user('ahmed','rabie',0254,'pp@gmail.com','8988','Male',44,'cairo');`)
        // await client.end()   //end connection in the end of program
    } catch (error) {
        console.log(error)
    }
}
connectDB();

app.post('/signup/', SignUp);
app.post('/login/', LogIn);
app.get('/home/', auth_middleware, (req, res) => {
    return res.status(200).json({ status: 'success', user_data: req.user });
})


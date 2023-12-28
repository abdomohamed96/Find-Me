import { Router } from "express";
import { auth_middleware } from "../middlewares/auth.middleware.js";
import { AddUser, choose_car, delMy_account, getAllusers, getUser, get_available_car, get_available_deliv, update_user } from "../controllers/user.controller.js";
import permission from "../middlewares/permission.middleware.js";


const userRoute = Router();

userRoute.post('/', AddUser);

userRoute.delete('/', auth_middleware, delMy_account);

userRoute.patch('/', auth_middleware, update_user);

userRoute.get('/', auth_middleware, permission.employee, getAllusers);

userRoute.get('/Avai_delivery', auth_middleware, permission.employee, get_available_deliv);

userRoute.get('/Avai_cars', auth_middleware, get_available_car);

userRoute.post('/drive_car', auth_middleware, permission.delivery, choose_car);

userRoute.get('/:id', auth_middleware, permission.employee, getUser); //note put it at the down as if put up in avai_delivery request will enter this get as id = avai_delivery


export default userRoute;
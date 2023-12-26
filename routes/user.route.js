import { Router } from "express";
import { auth_middleware } from "../middlewares/auth.middleware.js";
import { AddUser, delMy_account, getAllusers, getUser, update_user } from "../controllers/user.controller.js";
import permission from "../middlewares/permission.middleware.js";


const userRoute = Router();

userRoute.post('/', AddUser);
userRoute.get('/', auth_middleware, permission.employee, getAllusers);
userRoute.get('/:id', auth_middleware, permission.employee, getUser);
userRoute.delete('/', auth_middleware, delMy_account);
userRoute.patch('/', auth_middleware, update_user)

export default userRoute;
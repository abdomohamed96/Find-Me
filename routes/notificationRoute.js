import { Router } from "express";
const notificationRouter = Router();
//controllers
import {postNotification } from '../controllers/notification_controller.js'

//opertions 
notificationRouter.route('/')
    .post(postNotification)

export default notificationRouter;
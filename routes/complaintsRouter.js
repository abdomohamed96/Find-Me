import { Router } from "express";
const complaintsRouter = Router();
//controllers
import { post_complaint } from '../controllers/complaints_controller.js'

//opertions 
complaintsRouter.route('/')
    .post(post_complaint)

export default complaintsRouter;
import { Router } from "express";
const complaintsRouter = Router();
//controllers
import { post_complaint, delete_complaints } from '../controllers/complaints_controller.js'

//opertions 
complaintsRouter.route('/')
    .post(post_complaint)

complaintsRouter.delete('/:id', delete_complaints)
export default complaintsRouter;
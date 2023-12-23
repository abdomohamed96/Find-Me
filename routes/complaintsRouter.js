import { Router } from "express";
const complaintsRouter = Router();
//controllers
import { post_complaint, delete_complaints,get_all_complaints} from '../controllers/complaints_controller.js'

//opertions 
complaintsRouter.route('/')
    .post(post_complaint)
    .get(get_all_complaints)

complaintsRouter.delete('/:id', delete_complaints)
export default complaintsRouter;
import { Router } from "express";
const itemRouter = Router();
//controllers
import { postItem, get_items_by_id} from '../controllers/items_controller.js'

//opertions 
itemRouter.route('/')
    .post(postItem)
    .get(get_items_by_id)

//itemRouter.delete('/:id',deleteItem)
//itemRouter.update('updateItem)
export default itemRouter;
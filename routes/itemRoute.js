import { Router } from "express";
const itemRouter = Router();
//controllers
import { postItem, get_items_by_id,delete_items} from '../controllers/items_controller.js'

//opertions 
itemRouter.route('/')
    .post(postItem)
    .get(get_items_by_id)

itemRouter.delete('/:id',delete_items)
//itemRouter.update('updateItem)
export default itemRouter;
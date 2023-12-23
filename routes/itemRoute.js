import { Router } from "express";
const itemRouter = Router();
//controllers
import { postItem, history_of_items } from '../controllers/items_controller.js'

//opertions 
itemRouter.route('/')
    .post(postItem)
    .get(history_of_items)

export default itemRouter;
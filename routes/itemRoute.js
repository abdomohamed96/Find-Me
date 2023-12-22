import { Router } from "express";
const itemRouter = Router();
//controllers
import { postItem } from '../controllers/items_controller.js'

//opertions 
itemRouter.post('/', postItem)
export default itemRouter;
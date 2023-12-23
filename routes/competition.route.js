import { add_comp, delete_comp, showAll } from "../controllers/competition.controller.js";
import { Router } from "express";

const comp_router = new Router();

comp_router.post('/', add_comp);
comp_router.delete('/', delete_comp);
comp_router.get('/',showAll);


export { comp_router };
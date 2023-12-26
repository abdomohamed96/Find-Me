import { add_comp, delete_comp, showAll_Comp, updateComp } from "../controllers/competition.controller.js";
import { Router } from "express";
import permission from "../middlewares/permission.middleware.js";

const comp_router = new Router();

comp_router.post('/',permission.normal_user, add_comp);
comp_router.delete('/',permission.normal_user, delete_comp);
comp_router.get('/',showAll_Comp);
comp_router.patch('/',updateComp)


export { comp_router };
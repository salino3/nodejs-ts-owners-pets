import express from "express";
import { ownersControllers } from "../controllers/owner.controller";

const routerOwner = express.Router();

routerOwner.post("/owners", ownersControllers.fnCreateOwner);

routerOwner.get("/owners", ownersControllers.fnGetAllOwners);

routerOwner.get("/owners/:id", ownersControllers.fnGetOwnerByID);

routerOwner.delete("/owners/:id", ownersControllers.fnDeleteOwnerByID);

routerOwner.put("/owners/:id", ownersControllers.fnUpdateOwnerByID);

export default routerOwner;

import express from "express";
import { ownersControllers } from "../controllers/owner.controller";

const routerOwner = express.Router();

routerOwner.post("/owners", ownersControllers.fnCreateOwner);

routerOwner.get("/owners", ownersControllers.fnGetAllOwners);

export default routerOwner;

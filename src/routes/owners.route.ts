import express from "express";

const routerOwner = express.Router();

routerOwner.post("/owners", ownersControllers.fnCreateOwner);

export default routerOwner;

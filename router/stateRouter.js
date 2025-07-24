const {Router}=require("express");
const {stateCheck} = require("../controller/stateController");

stateRouter=Router();

stateRouter.get("/",stateCheck);

module.exports=stateRouter;
const {Router}=require("express");
const logoutUser = require("../controller/logoutController");

logoutRouter=Router();

logoutRouter.post("/",logoutUser);

module.exports=logoutRouter;
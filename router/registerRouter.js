const {Router}=require("express");
const {registerControl}=require("../controller/registerController")

registerRouter=Router();

registerRouter.post("/",registerControl);

module.exports=registerRouter;
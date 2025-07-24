const {Router}=require("express");
const {registerControl}=require("../controller/registerController")

loginRouter=Router();

loginRouter.post("/",registerControl);

module.exports=loginRouter;
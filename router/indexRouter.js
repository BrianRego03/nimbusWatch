const {Router}=require("express");
const {indexControl}=require("../controller/indexController")

indexRouter=Router();

indexRouter.get("/",indexControl);
module.exports=indexRouter;
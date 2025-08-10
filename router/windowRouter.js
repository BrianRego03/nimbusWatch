const {Router}=require("express");
const { windowCheck,windowSet } = require("../controller/windowController");

windowRouter=Router();

windowRouter.get("/",windowCheck);
windowRouter.post("/",windowSet);


module.exports=windowRouter;
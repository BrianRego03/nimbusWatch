const {Router}=require("express");
const { windowCheck,windowSet, soloWindow, deleteWindow } = require("../controller/windowController");

windowRouter=Router();

windowRouter.get("/",windowCheck);
windowRouter.post("/",windowSet);
windowRouter.get("/:id",soloWindow);
windowRouter.delete("/:id",deleteWindow);


module.exports=windowRouter;
const {Router}=require("express");
const { weatherCheck } = require("../controller/weatherController");

weatherRouter=Router();

weatherRouter.get("/",weatherCheck);

module.exports=weatherRouter;
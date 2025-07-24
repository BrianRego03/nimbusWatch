const {Router}=require("express");
const {loginUser} = require("../controller/loginController");

loginRouter=Router();

loginRouter.post("/",loginUser);

module.exports=loginRouter;
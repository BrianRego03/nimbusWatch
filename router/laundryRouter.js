const {Router}=require("express");
const { laundryCheck,laundrySet, soloLaundry, deleteLaundry } = require("../controller/laundryController");

laundryRouter=Router();

laundryRouter.get("/",laundryCheck);
laundryRouter.post("/",laundrySet);
laundryRouter.get("/:id",soloLaundry);
laundryRouter.delete("/:id",deleteLaundry);


module.exports=laundryRouter;
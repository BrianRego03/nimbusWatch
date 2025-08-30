const {Router}=require("express");
const { laundryCheck,laundrySet, soloLaundry, deleteLaundry, laundryPatch } = require("../controller/laundryController");

laundryRouter=Router();

laundryRouter.get("/",laundryCheck);
laundryRouter.post("/",laundrySet);
laundryRouter.get("/:id",soloLaundry);
laundryRouter.delete("/:id",deleteLaundry);
laundryRouter.patch("/:id",laundryPatch);


module.exports=laundryRouter;
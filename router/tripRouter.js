const {Router}=require("express");
const { tripSet } = require("../controller/tripController");

tripRouter=Router();

tripRouter.post("/",tripSet);
// laundryRouter.post("/",laundrySet);
// laundryRouter.get("/:id",soloLaundry);
// laundryRouter.delete("/:id",deleteLaundry);


module.exports=tripRouter;
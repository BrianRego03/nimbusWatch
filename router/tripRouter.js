const {Router}=require("express");
const { tripSet,deleteTrip } = require("../controller/tripController");

tripRouter=Router();

tripRouter.post("/",tripSet);
// laundryRouter.post("/",laundrySet);
// laundryRouter.get("/:id",soloLaundry);
tripRouter.delete("/:id",deleteTrip);


module.exports=tripRouter;
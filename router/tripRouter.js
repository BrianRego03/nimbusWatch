const {Router}=require("express");
const { tripSet,deleteTrip, showAllTrips } = require("../controller/tripController");

tripRouter=Router();

tripRouter.post("/",tripSet);
tripRouter.get("/",showAllTrips);
// laundryRouter.get("/:id",soloLaundry);
tripRouter.delete("/:id",deleteTrip);


module.exports=tripRouter;
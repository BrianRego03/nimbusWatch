const {Router}=require("express");
const { tripSet,deleteTrip, showAllTrips, showTrip } = require("../controller/tripController");

tripRouter=Router();

tripRouter.post("/",tripSet);
tripRouter.get("/",showAllTrips);
tripRouter.get("/:id",showTrip);
tripRouter.delete("/:id",deleteTrip);


module.exports=tripRouter;
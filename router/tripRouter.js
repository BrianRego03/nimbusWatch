const {Router}=require("express");
const { tripSet,deleteTrip, showAllTrips, showTrip, updateTrip } = require("../controller/tripController");

tripRouter=Router();

tripRouter.post("/",tripSet);
tripRouter.get("/",showAllTrips);
tripRouter.get("/:id",showTrip);
tripRouter.delete("/:id",deleteTrip);
tripRouter.patch("/:id",updateTrip);


module.exports=tripRouter;
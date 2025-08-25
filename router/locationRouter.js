const {Router}=require("express");
const { locationSet } = require("../controller/locationController");

locationRouter=Router();

locationRouter.post("/",locationSet);
// locationRouter.get("/",showAllTrips);
// locationRouter.get("/:id",showTrip);
// locationRouter.delete("/:id",deleteTrip);


module.exports=locationRouter;
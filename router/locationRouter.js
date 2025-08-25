const {Router}=require("express");
const { locationSet, locationDelete } = require("../controller/locationController");

locationRouter=Router();

locationRouter.post("/",locationSet);
// locationRouter.get("/",showAllTrips);
// locationRouter.get("/:id",showTrip);
locationRouter.delete("/:id",locationDelete);


module.exports=locationRouter;
const {Router}=require("express");
const { showTripReport } = require("../controller/tripController");

const tripReportRouter=Router();


tripReportRouter.get("/:id",showTripReport);



module.exports=tripReportRouter;
const {Router}=require("express");
// const { laundryCheck,laundrySet, soloLaundry, deleteLaundry } = require("../controller/laundryController");

laundryReportRouter=Router();

laundryReportRouter.get("/:id",soloLaundry);

module.exports=laundryReportRouter;
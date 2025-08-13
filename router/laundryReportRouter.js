const {Router}=require("express");
const { laundryReporter } = require("../controller/laundryReportController");

laundryReportRouter=Router();

laundryReportRouter.get("/:id",laundryReporter);

module.exports=laundryReportRouter;
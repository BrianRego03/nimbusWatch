const {Router}=require("express");
const { scheduleSet } = require("../controller/schedulerController");

schedulerRouter = new Router();

schedulerRouter.post("/",scheduleSet);

module.exports = schedulerRouter;
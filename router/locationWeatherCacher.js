const {Router}=require("express");
const { bulkUpdateWeather } = require("../controller/locationWeatherCacherController");


locationWeatherCacher=Router();

// locationWeatherCacher.post("/",locationSet);
// locationRouter.get("/",showAllTrips);
locationWeatherCacher.patch("/",bulkUpdateWeather);
// locationWeatherCacher.delete("/:id",locationDelete);


module.exports=locationWeatherCacher;
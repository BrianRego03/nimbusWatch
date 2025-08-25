const { updateLocationWeather,
    bulkUpdateLocationWeather, 
    fetchAllLocationID } = require("../db/query");


const bulkUpdateWeather=async(req,res)=>{

    const iDArray= await fetchAllLocationID();

    const updatedArray = await Promise.all(iDArray.map(async (item, index) => {
        const res = await fetch(
            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
            encodeURIComponent(item.name) +
            "?unitGroup=metric&key=" + process.env.weatherBee + "&contentType=json",
            { mode: "cors" }
        );
        const weatherData = await res.json();
        const daysArray = weatherData.days.slice(0,7);
        const dayString = JSON.stringify(daysArray);
        return {id:item.id,weatherData:dayString}

    }));

    const dbResponse= await bulkUpdateLocationWeather(updatedArray)
    res.json({message:"done"});
}

module.exports={bulkUpdateWeather};
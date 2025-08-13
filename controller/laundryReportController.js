const { fetchLaundry, fetchAllWindows } = require("../db/query");

const laundryReporter=async(req,res)=>{
    const laundryData =await fetchLaundry(+(req.params.id));
    const laundryWindows =await fetchAllWindows("laundryId",+(req.params.id));
    const windowCopy = [ ...laundryWindows ];
    const weatherData = await fetch(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        laundryData.location +
        "?unitGroup=metric&key=" + process.env.weatherBee + "&contentType=json",
        { mode: "cors" }
    );
    const weatherJson = await weatherData.json();
    const weatherArr = weatherDataFilter(weatherJson,windowCopy);

    const jsonObjector={
        laundry:laundryData,
        weather:weatherArr,
        location:weatherJson.resolvedAddress,
        description:weatherJson.description
    }
    res.json(jsonObjector);
}



const weatherDataFilter=(weatherObj,windowArr)=>{
    let weatherRequiredObj={};
    let weatherDayObj={};
    let windowDaysArr=windowArr.map((item,index)=>{
        return item.startWindowDay;
    })
   

    weatherObj.days.slice(0, 7).forEach((day, dayIndex) => {
        let dayObj = new Date(day.datetime);

        let windowDay =dayObj.toLocaleDateString("en-US", { weekday: "long" });
        let windowDayIndex=windowDaysArr.indexOf(windowDay);

        if (windowDaysArr.includes(windowDay)) {
            let hourArr = day.hours.map((item, index) => {
                let itemHour = parseInt(item.datetime.split(":")[0]);
                let itemMin = parseInt(item.datetime.split(":")[1]);
                let rainStatus = Boolean(item.precipprob > 40);
                return {
                    datetime: item.datetime,
                    hour: itemHour,
                    minute: itemMin,
                    precipprob: item.precipprob,
                    precip: item.precip,
                    preciptype: (item.preciptype===null)?"null":"rain",
                    conditions: item.conditions,
                    icon: item.icon,
                    temp: item.temp,
                    rain: rainStatus
                }

            })

            weatherDayObj[dayObj.toLocaleDateString("en-US", { weekday: "long" })] =
            {
                day: day.datetime,
                Index: dayIndex
            }

            weatherRequiredObj[windowDay]= {
                day: dayObj.toLocaleDateString("en-US", { weekday: "long" }),
                hours: hourArr,
                date: day.datetime,
                month: dayObj.toLocaleDateString("en-US", { month: "long" }),
                year: dayObj.toLocaleDateString("en-US", { year: "numeric" })
            }
        }
        
    });

    finalWindowArr = windowArr.map((item, index) => {
        item.date = weatherDayObj[item.startWindowDay].day;
        item.windowHours = weatherRequiredObj[item.startWindowDay].hours.filter((weatherItem) => {
            if ((weatherItem.hour >= item.startWindowHour) && (weatherItem.hour <= item.endWindowHour)) {
                return weatherItem;
            }
        });


        return item;
    })
    finalWindowArr.sort((a, b) => {
        const dateDiff = new Date(a.date) - new Date(b.date);
        if (dateDiff !== 0) return dateDiff;

     
        return a.startWindowHour - b.startWindowHour;
    });





    return finalWindowArr;
}
module.exports={laundryReporter};
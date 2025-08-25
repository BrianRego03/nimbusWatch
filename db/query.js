const { PrismaClient } = require("../generated/prisma");
const prisma=new PrismaClient();

async function registerUser(username,password){
    const user = await prisma.user.create({
        data:{
            username: username,
            password:password
        },
        select:{
            id:true
        }
        
    })

    if(user){
        return 1;
    }else{
        return 0;
    }
}

async function findUser(username){
    const user =await prisma.user.findUnique({
        where:{
            username:username
        }
    });
    return user;
}

async function findUserByID(id) {
    const user=await prisma.user.findUnique({
        where:{
            id:id
        }
    })
    return user;
    
}

async function fetchAllWindows(wtype,parentid,userIdentity){
    const particularWindows = await prisma.windows.findMany({
        where:{
            [wtype]:parentid,
            userId:userIdentity

        }
    })

    return particularWindows;
}

async function createWindow(startObj,endObj,parentid,windowType,dayIndex,userIdentity){
    
    const particularWindow = await prisma.windows.create({
        data:{
            startWindowDay:startObj.Day,
            startWindowHour:startObj.Hour,
            startWindowMin:startObj.Min,
            endWindowDay:endObj.Day,
            endWindowHour:endObj.Hour,
            endWindowMin:endObj.Min,
            [windowType]:parentid,
            startDayIndex:dayIndex,
            userId:userIdentity
        },
        select:{
            id:true
        }

    })

    return particularWindow;
}

async function fetchWindow(id){
    const particularWindow = await prisma.windows.findUnique({
        where:{
            id:id

        }
    })

    return particularWindow;
}

async function dropWindow(id,userIdentity){
    const laundryIdentity = await prisma.windows.delete({
        where:{
            id:id,
            userId:userIdentity

        },
        select:{
            laundryId:true,
            tripId:true
        }
    })

    return laundryIdentity;
}

async function fetchAllLaundry(userid){
    const particularLoad = await prisma.laundry.findMany({
        where:{
            userId:userid

        }
    })

    return particularLoad;
}

async function createLaundry(name,location,userid){
    const particularLoad = await prisma.laundry.create({
        data:{
            name:name,
            location:location,
            userId:userid
        },
        select:{
            id:true
        }

    })

    return particularLoad;
}

async function fetchLaundry(id,userIdentity){
    const particularLoad = await prisma.laundry.findFirst({
        where:{
            id:id,
            userId:userIdentity,

        },
        include:{
            windows:true,
        }
    })

    if(!particularLoad){
        return particularLoad;
    }



    particularLoad.windows.sort((a, b) => a.startDayIndex - b.startDayIndex);

    return particularLoad;
}

async function dropLaundry(id,userIdentity){
    const particularLoad = await prisma.laundry.delete({
        where:{
            id:id,
            userId:userIdentity,

        },
        select:{
            userId:true
        }
    })

    return 1;
}

async function createTrip(name,date,userIdentity){
    const tripID= await prisma.trip.create(
        {
            data:{
                name:name,
                userId:userIdentity,
                date:new Date(date)
            },
            select:{
                id:true
            }
        }
    )

    return tripID;
}

async function dropTrip(id,userIdentity) {
    const tripDelete= await prisma.trip.delete(
        {
            where:{
                id:id,
                userId:userIdentity
            },
            select:{
                userId:true
            }
        }
    )

    return tripDelete;
    
}

async function fetchAllTrips(userIdentity){
    const fetchTrips=await prisma.trip.findMany(
        {
            where:{
                userId:userIdentity
            },
            include:{
                location:{
                    select:{
                        id:true,
                        name:true,
                        tripId:true
                    }
                },
                window:true
            }
        }
    )

    return fetchTrips;


}

async function fetchSoloTrip(id,userIdentity) {
    const fetchTrip=await prisma.trip.findFirst(
        {
            where:{
                id:id,
                userId:userIdentity
            },
            include:{
                location:true,
                window:true
            }
        }
    )

    return fetchTrip;
    
}

async function createLocation(name,ltype,parentid,userIdentity){
    const location=await prisma.location.create(
        {
            data:{
                name:name,
                [ltype]:parentid,
                userId:userIdentity
            },
            select:{
                id:true
            }
        }
    )

    return location; 
}

async function dropLocation(id, userIdentity) {
    const drop = await prisma.location.deleteMany(
        {
            where: {
                id: id,
                userId: userIdentity
            },
            select:{
                id:true
            }
        }

    )

    return drop

}

async function updateLocationWeather(id,userIdentity,weatherData){
    const weather = await prisma.location.updateMany(
        {
            where:{
                id:id,
                userId:userIdentity
            },
            data:{
                weatherData:weatherData
            }
        }
    )
}

async function bulkUpdateLocationWeather(itemArray,chunkSize=200) {

    for(let i=0;i<itemArray.length;i+=chunkSize){
        const chunk=itemArray.slice(i,i + chunkSize);
        await prisma.$transaction(
            chunk.map(({id,weatherData})=>
                prisma.location.update({
                    where:{id:id},
                    data:{weatherData:weatherData}
                })
            )
        )

    }

    return;
    
}

async function fetchAllLocationID(params) {
    const locations=await prisma.location.findMany(
        {
            select:{
                name:true,
                id:true,
                tripId:true

            }
        }
    )

    return locations;
    
}


module.exports={registerUser,findUser,findUserByID,fetchAllWindows,createWindow,
    fetchWindow,dropWindow,fetchAllLaundry,createLaundry,fetchLaundry,dropLaundry,
    createTrip,dropTrip,fetchAllTrips,fetchSoloTrip,
    createLocation,dropLocation,updateLocationWeather,bulkUpdateLocationWeather,fetchAllLocationID
}
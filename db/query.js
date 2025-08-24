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

async function fetchAllWindows(wtype,parentid){
    const particularWindows = await prisma.windows.findMany({
        where:{
            [wtype]:parentid

        }
    })

    return particularWindows;
}

async function createWindow(startObj,endObj,parentid,windowType,dayIndex){
    
    const particularWindow = await prisma.windows.create({
        data:{
            startWindowDay:startObj.Day,
            startWindowHour:startObj.Hour,
            startWindowMin:startObj.Min,
            endWindowDay:endObj.Day,
            endWindowHour:endObj.Hour,
            endWindowMin:endObj.Min,
            [windowType]:parentid,
            startDayIndex:dayIndex
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

async function dropWindow(id){
    const laundryIdentity = await prisma.windows.delete({
        where:{
            id:id

        },
        select:{
            laundryId:true
        }
    })

    return laundryIdentity;
}

async function fetchAllLaundry(userid){
    const particularLoad = await prisma.Laundry.findMany({
        where:{
            userId:userid

        }
    })

    return particularLoad;
}

async function createLaundry(name,location,userid){
    const particularLoad = await prisma.Laundry.create({
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
    const particularLoad = await prisma.Laundry.findUnique({
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
    const particularLoad = await prisma.Laundry.delete({
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



module.exports={registerUser,findUser,findUserByID,fetchAllWindows,createWindow,
    fetchWindow,dropWindow,fetchAllLaundry,createLaundry,fetchLaundry,dropLaundry
}
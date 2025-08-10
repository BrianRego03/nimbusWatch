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

async function fetchAllWindows(userid){
    const particularWindows = await prisma.windows.findMany({
        where:{
            userId:userid

        }
    })

    return particularWindows;
}

async function createWindow(startObj,endObj,userid){
    const particularWindow = await prisma.windows.create({
        data:{
            startWindowDay:startObj.Day,
            startWindowHour:startObj.Hour,
            startWindowMin:startObj.Min,
            endWindowDay:endObj.Day,
            endWindowHour:endObj.Hour,
            endWindowMin:endObj.Min,
            userId:userid
        },
        select:{
            id:true
        }

    })

    return particularWindow;
}


module.exports={registerUser,findUser,findUserByID,fetchAllWindows,createWindow}
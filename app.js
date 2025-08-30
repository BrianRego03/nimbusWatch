const path=require("node:path");
const express=require("express");
const cookieParser=require('cookie-parser');
const cors = require('cors');
const rateLimit = require("express-rate-limit")

const app = express();

const indexRouter=require("./router/indexRouter");
const registerRouter=require("./router/registerRouter");
const loginRouter=require("./router/loginRouter");
const logoutRouter=require("./router/logoutRouter");
const stateRouter=require("./router/stateRouter");
const weatherRouter=require("./router/weatherRouter");
const windowRouter=require("./router/windowRouter");
const laundryRouter=require("./router/laundryRouter");
const laundryReportRouter=require("./router/laundryReportRouter");
const tripRouter = require("./router/tripRouter");
const locationRouter = require("./router/locationRouter");
const locationWeatherCacher=require("./router/locationWeatherCacher");
const tripReportRouter = require("./router/tripReportRouter");
const schedulerRouter = require("./router/schedulerRouter");
const authMiddleware = require("./config/authMiddleware");

const limiter = rateLimit({
    windowMs:60*60*1000,
    max:2000,
    standardHeaders: true,
    handler: (req,res,next)=>{
        res.status(429).json({
            success:false,
            message:"Stop spamming the server!",
        })
    }
})


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    // origin:true,
    credentials:true
}))
app.use(limiter);

app.use("/",indexRouter);
app.use("/register",registerRouter);
app.use("/login",loginRouter);
app.use("/logout",authMiddleware,logoutRouter);
app.use("/userState",authMiddleware,stateRouter)
app.use("/protected",authMiddleware,(req,res)=>{
    res.json({message:"Your're in"})
})
app.use("/weather",authMiddleware,weatherRouter);
app.use("/windows",authMiddleware,windowRouter);
app.use("/laundry",authMiddleware,laundryRouter);
app.use("/laundryReport",authMiddleware,laundryReportRouter);
app.use("/trip",authMiddleware,tripRouter);
app.use("/location",authMiddleware,locationRouter);
app.use("/locationWeatherCacher",authMiddleware,locationWeatherCacher);
app.use("/tripReport",authMiddleware,tripReportRouter);
app.use("/scheduleLaundry",authMiddleware,schedulerRouter);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("we're up and running")
})
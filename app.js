const path=require("node:path");
const express=require("express");
const cookieParser=require('cookie-parser');
const cors = require('cors');

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
const authMiddleware = require("./config/authMiddleware");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    // origin:true,
    credentials:true
}))

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

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("we're up and running")
})
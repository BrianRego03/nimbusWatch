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
const authMiddleware = require("./config/authMiddleware");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    // origin: "http://localhost:3000",
    origin:true,
    credentials:true
}))

app.use("/",indexRouter);
app.use("/register",registerRouter);
app.use("/login",loginRouter);
app.use("/logout",logoutRouter);
app.use("/userState",authMiddleware,stateRouter)
app.use("/protected",authMiddleware,(req,res)=>{
    res.json({message:"Your're in"})
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("we're up and running")
})
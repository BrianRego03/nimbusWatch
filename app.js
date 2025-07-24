const path=require("node:path");
const express=require("express");

const app = express();

const indexRouter=require("./router/indexRouter");
const registerRouter=require("./router/registerRouter");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",indexRouter);
app.use("/register",registerRouter);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("we're up and running")
})
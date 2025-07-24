const path=require("node:path");
const express=require("express");

const app = express();

const indexRouter=require("./router/indexRouter");


app.use("/",indexRouter);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("we're up and running")
})
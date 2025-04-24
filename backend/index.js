const express=require("express");
const MainRouter=require("./routes/index");
const cors=require("cors");
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/v1",MainRouter);
app.listen(3000,()=>{
    console.log("server started")
});
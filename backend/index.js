const express=require("express");
const MainRouter=require("./routes/index");
const cors=require("cors");
const app=express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use("/api/v1",MainRouter);
app.listen(3002,()=>{
    console.log("server started")
});
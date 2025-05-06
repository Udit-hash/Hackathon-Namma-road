const express=require("express");
const MainRouter=require("./routes/index");
const LeaderboardRouter = require("./routes/leaderboard"); 
const cors=require("cors");
const app=express();

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use("/api/v1",MainRouter);
app.use("/api/v1/leaderboard", LeaderboardRouter);

app.listen(3000,()=>{
    console.log("server started")
});
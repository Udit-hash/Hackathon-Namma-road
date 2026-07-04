const express=require('express');
const UserRouter=require("./user");
const PotholeRouter=require("./pothole");
const leaderboardRoutes=require('./leaderboard');

const router=express.Router();

router.use("/user",UserRouter);

router.use("/potholes",PotholeRouter);


router.use("/leaderboard", leaderboardRoutes);


module.exports=router;
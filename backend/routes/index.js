import express from 'express';
const UserRouter=require("./user");

const router=express.Router();

router.use("./user",UserRouter);

router.use("./potholes",PotholeRouter);


module.exports=router;
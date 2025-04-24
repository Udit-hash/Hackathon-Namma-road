import express from 'express';
import zod from 'zod';
import {User} from "../db";

const router=express.Router();

const signupBody=zod.object({
    fistname:zod.string(),
    lastname:zod.string(),
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string()
});

router.post("./signup",async  (req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg:"Incorect Inputs/ Username already taken"
        })
    }

    const existingUser=await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        res.status(411).json({
            msg:"User already exists"
        })
    }

    const user=await User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })

    const userId=user._id; 

})

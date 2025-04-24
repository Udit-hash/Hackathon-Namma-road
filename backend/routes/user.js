const express=require('express');
const zod=require('zod');
const {User} = require("../db");
const {jwt_secret} =require('./config');
const router=express.Router();
const {authMiddleware}=require("../middleware/userAuth")
const jwt=require("jsonwebtoken")



const signupBody=zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string()
});

router.post("/signup",async(req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Incorect Inputs/ Username already taken"
        })
    }

    const existingUser=await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(411).json({
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

    const token=jwt.sign({
        userId
    },jwt_secret);

    res.json({
        msg:"user created succesfully",
        token:token
    })
})

const signinBody=zod.object({
    email:zod.string(),
    password:zod.string()
})

router.post("/signin",async(req,res)=>{
    const {success}= signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg:"Email already taken/User exists already"
        })
    }
    const user=await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if(user){
        const token=jwt.sign({
            userId:user._id
        },jwt_secret)

        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        msg:"Error while logging in"
    })

})

const updateBody=zod.object({
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
    username:zod.string().optional(),
    email:zod.string().email().optional(),
    password:zod.string().optional()
})

router.put("/update",authMiddleware,async(req,res)=>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Error while updating information"
        })
    }

    await User.updateOne({
        _id:req.userId
    },req.body)

    res.json({
        msg:"updated succesfully"
    })

})
module.exports=router;
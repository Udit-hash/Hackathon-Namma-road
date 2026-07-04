const express=require('express');
const zod=require('zod');
const {User} = require("../db");
const {jwt_secret} =require('./config');
const router=express.Router();
const {authMiddleware}=require("../middleware/userAuth")
const jwt=require("jsonwebtoken");
const { Underline } = require('lucide-react');
const bcrypt = require("bcrypt");


const signupBody=zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string()
});

router.post("/signup", async (req, res) => {

    const { success } = signupBody.safeParse(req.body);


    if (!success) {

        return res.status(411).json({

            msg: "Incorrect inputs"

        });

    }


    const existingUser = await User.findOne({

        username: req.body.username

    });



    if (existingUser) {

        return res.status(411).json({

            msg: "User already exists"

        });

    }


    // password hashing
    const hashedPassword = await bcrypt.hash(
        req.body.password,
        10
    );



    const user = await User.create({

        firstname: req.body.firstname,

        lastname: req.body.lastname,

        username: req.body.username,

        email: req.body.email,


        password: hashedPassword,


        badges: [
            "Road Warrior"
        ]

    });



    const token = jwt.sign(

        {

            userId: user._id,

            role: user.role

        },

        jwt_secret

    );




    res.json({

        msg: "User created successfully",

        token

    });


});

router.post("/signin", async(req,res)=>{


    const {success} =
        signinBody.safeParse(req.body);



    if(!success){

        return res.status(411).json({

            msg:"Invalid inputs"

        });

    }

    const user =
        await User.findOne({

            email:req.body.email

        });


    if(!user){


        return res.status(411).json({

            msg:"User not found"

        });


    }



    const passwordMatch =
        await bcrypt.compare(

            req.body.password,

            user.password

        );


    if(!passwordMatch){


        return res.status(403).json({

            msg:"Incorrect password"

        });


    }

    const token = jwt.sign(

        {

            userId:user._id,

            role:user.role

        },


        jwt_secret

    );

    res.json({

        token

    });


});

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

router.get("/me", authMiddleware, async(req,res)=>{

    const user = await User.findById(req.userId);

    if(!user){

        return res.status(404).json({
            msg:"User not found"
        });

    }


    res.json({

        firstname:user.firstname,

        lastname:user.lastname,

        username:user.username,

        email:user.email,

        role:user.role,

        totalreport:user.totalreport,

        points:user.points,

        badges:user.badges

    });

});
module.exports=router;
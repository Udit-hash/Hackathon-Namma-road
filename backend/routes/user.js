const express = require("express");

const zod = require("zod");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");


const { User } = require("../db");

const { jwt_secret } = require("./config");

const { authMiddleware } = require("../middleware/userAuth");



const router = express.Router();




// SIGNUP VALIDATION


const signupBody = zod.object({


    firstname:zod.string(),

    lastname:zod.string(),

    username:zod.string(),

    email:zod.string().email(),

    password:zod.string()


});





// SIGNIN VALIDATION


const signinBody = zod.object({


    email:zod.string().email(),

    password:zod.string()


});








// SIGNUP


router.post(

    "/signup",


    async(req,res)=>{


        try{


            const result =
                signupBody.safeParse(
                    req.body
                );




            if(!result.success){


                return res.status(411).json({


                    msg:"Invalid inputs",


                    error:
                    result.error.errors


                });


            }





            const existingUser =
                await User.findOne({

                    username:req.body.username

                });





            if(existingUser){


                return res.status(411).json({


                    msg:"User already exists"


                });


            }






            const hashedPassword =
                await bcrypt.hash(

                    req.body.password,

                    10

                );








            const user =
                await User.create({



                    firstname:
                    req.body.firstname,



                    lastname:
                    req.body.lastname,



                    username:
                    req.body.username,



                    email:
                    req.body.email,



                    password:
                    hashedPassword,



                    badges:[
                        "Road Warrior"
                    ]



                });








            const token =
                jwt.sign(


                    {

                        userId:user._id,

                        role:user.role


                    },


                    jwt_secret


                );








            res.json({


                msg:"User created successfully",

                token


            });








        }catch(error){



            res.status(500).json({


                msg:error.message


            });



        }


    }

);










// SIGNIN



router.post(

    "/signin",


    async(req,res)=>{


        try{


            const result =
                signinBody.safeParse(
                    req.body
                );





            if(!result.success){


                return res.status(411).json({


                    msg:"Invalid inputs"


                });


            }








            const user =
                await User.findOne({


                    email:req.body.email


                });







            if(!user){


                return res.status(403).json({


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


                    msg:"Wrong password"


                });



            }








            const token =
                jwt.sign(


                    {

                        userId:user._id,

                        role:user.role


                    },


                    jwt_secret


                );








            res.json({


                token


            });








        }catch(error){



            res.status(500).json({


                msg:error.message


            });



        }



    }

);










// GET USER DATA



router.get(

    "/me",


    authMiddleware,


    async(req,res)=>{


        const user =
            await User.findById(
                req.userId
            );



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


    }

);





module.exports = router;
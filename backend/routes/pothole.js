const express = require("express");

const upload = require("../middleware/multer");

const { authMiddleware } = require("../middleware/userAuth");

const { adminAuth } = require("../middleware/adminAuth");

const { uploadToCloudinary } = require("../utils/cloud");

const { PotholeValidator } = require("../middleware/validateporthole");

const { User, Pothole } = require("../db");



const router = express.Router();




// ===============================
// USER REPORT POTHOLE
// ===============================


router.post(
    "/report",

    authMiddleware,

    upload.single("image"),

    PotholeValidator,


    async (req, res) => {


        try {


            if (!req.file) {

                return res.status(400).json({

                    message: "No file uploaded"

                });

            }



            const lat = Number(req.body.lat);

            const long = Number(req.body.long);

            const description = req.body.description;



            if (isNaN(lat) || isNaN(long)) {

                return res.status(400).json({

                    message: "Invalid location"

                });

            }




            const cloudinaryResult =
                await uploadToCloudinary(
                    req.file.path
                );





            const newPothole =
                await Pothole.create({


                    lat,


                    long,


                    description,


                    photoUrl:
                        cloudinaryResult.secure_url,


                    reportedBy:
                        req.userId,


                    status:"pending"


                });






            await User.findByIdAndUpdate(

                req.userId,


                {

                    $inc: {

                        points:100,

                        totalreport:1

                    }

                }

            );






            const reportCount =
                await Pothole.countDocuments({

                    reportedBy:req.userId

                });






            const user =
                await User.findById(
                    req.userId
                );





            if(reportCount === 1){


                if(
                    !user.badges.includes(
                        "First Report"
                    )
                ){

                    user.badges.push(
                        "First Report"
                    );

                }


            }





            if(reportCount >= 10){


                if(
                    !user.badges.includes(
                        "Top Contributor"
                    )
                ){

                    user.badges.push(
                        "Top Contributor"
                    );

                }

            }




            await user.save();




            res.status(201).json({

                message:
                    "Pothole reported successfully",


                pothole:newPothole


            });




        } catch(error){


            console.log(error);


            res.status(500).json({

                message:
                    "Failed to report pothole",


                error:error.message

            });


        }


    }
);









// ===============================
// USER DASHBOARD REPORTS
// ===============================



router.get(
    "/my-report",

    authMiddleware,


    async(req,res)=>{


        try{


            const reports =
                await Pothole.find({

                    reportedBy:req.userId

                })

                .sort({

                    createdAt:-1

                });





            res.json({

                reports,


                count:reports.length

            });




        }catch(error){


            res.status(500).json({

                message:error.message

            });


        }


    }
);









// ===============================
// PUBLIC ALL POTHOLES MAP
// ===============================



router.get(
    "/all",

    async(req,res)=>{


        try{


            const potholes =
                await Pothole.find()

                .sort({

                    createdAt:-1

                });





            res.json({

                potholes

            });




        }catch(error){


            res.status(500).json({

                message:error.message

            });


        }


    }
);











// ===============================
// ADMIN GET ALL + FILTER
// ===============================



router.get(
    "/admin/all",

    authMiddleware,

    adminAuth,


    async(req,res)=>{


        try{


            const { status } = req.query;



            let filter = {};



            if(status){


                filter.status = status;


            }






            const potholes =
                await Pothole.find(filter)


                .populate(

                    "reportedBy",


                    "firstname lastname email"

                )


                .sort({

                    createdAt:-1

                });






            res.json({

                potholes

            });





        }catch(error){


            res.status(500).json({

                message:error.message

            });


        }


    }
);









// ===============================
// ADMIN UPDATE STATUS
// ===============================



router.put(
    "/admin/update/:id",

    authMiddleware,

    adminAuth,


    async(req,res)=>{


        try{


            const { status } = req.body;





            const pothole =
                await Pothole.findByIdAndUpdate(


                    req.params.id,



                    {

                        status:status

                    },



                    {

                        new:true

                    }


                );






            res.json({

                message:
                    "Status updated successfully",


                pothole

            });





        }catch(error){



            res.status(500).json({

                message:error.message

            });



        }


    }
);










// ===============================
// ADMIN DELETE REPORT
// ===============================



router.delete(
    "/admin/delete/:id",

    authMiddleware,

    adminAuth,


    async(req,res)=>{


        try{


            await Pothole.findByIdAndDelete(

                req.params.id

            );





            res.json({

                message:
                    "Report deleted successfully"

            });





        }catch(error){



            res.status(500).json({

                message:error.message

            });



        }


    }
);





module.exports = router;
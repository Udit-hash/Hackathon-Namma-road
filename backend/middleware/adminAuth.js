const adminAuth=(req,res,next)=>{


    if(req.role !== "admin"){


        return res.status(403).json({

            message:"Admin only"

        })

    }


    next();

}


module.exports={
    adminAuth
}
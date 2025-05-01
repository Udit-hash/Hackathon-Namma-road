const z=require('zod');
const potholeValidation = z.object({
  
    lat: z.preprocess((val) => parseFloat(val), z.number()),
    long: z.preprocess((val) => parseFloat(val), z.number()),
  description: z.string().min(5, "Description must be at least 5 characters")
});


const PotholeValidator=(req,res,next)=>{
     const result=potholeValidation.safeParse(req.body);
     if(!result.success){
        return res.status(400).json({
            message:"something went wrong,Please Try again",
            errors: result.error.errors,
        })
     }
     next();
}

module.exports={
  potholeValidation,
    PotholeValidator,
};

  


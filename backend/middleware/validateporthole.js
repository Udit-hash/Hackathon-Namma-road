const z = require("zod");

const potholeValidation = z.object({

    lat: z.preprocess(
        (val)=> Number(val),
        z.number()
    ),

    long: z.preprocess(
        (val)=> Number(val),
        z.number()
    ),

    description:z
    .string()
    .min(5,"Description must be at least 5 characters")
});


const PotholeValidator=(req,res,next)=>{

    const result=potholeValidation.safeParse(req.body);

    if(!result.success){

        console.log(result.error.errors);

        return res.status(400).json({
            message:"Invalid pothole data",
            errors:result.error.errors
        })
    }

    next();
}


module.exports={
    PotholeValidator
}
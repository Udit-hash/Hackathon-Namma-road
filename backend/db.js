import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://raj:raj111aryan@cluster1.ufnm0.mongodb.net/NAMMAROAD");

const Potholeschema=new mongoose.schema({
    location:{
     lat:Number,
     long:Number
    },
    photoUrl:String ,
    photoDesc:String ,
    reportedBy:{type: mongoose.Schema.Types.ObjectId , ref:'user'},
    Status:{type:String, 
            default:'pending'
      },

    timestamp:{
        type:Date,
        default:Date.now

    }
})


const UserSchema=new mongoose.schema({

    firstname:{
        type:String,
        required:true,
        trim:true,
        maxlength:12
     },
     lastname:{
        type:String,
        required:true,
        trim:true,
        maxlength:12

     },
    username:{
        type:String, 
        required:true,
        minlength:3,
        maxlength:12,
        trim:true,
        lowercase:true
    },
    email:{type:String, 
          required:true, 
          Unique:true
        },
    password:{type:String, 
             require:true   
            },
    
    totalreport:{type:Number, 
                 default:0
         },
    
    Badges:[String],
    creationTime:{type:Date  , default:Date.now}

})

const Pothole=mongoose.model("Pothole",Potholeschema);
const User=mongoose.model("User",UserSchema);

module.exports={
    Pothole,
    User
}


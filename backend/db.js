const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Udit:D1fHFkob41JOjQ4Z@cluster0.um125dd.mongodb.net/");

const Potholeschema=new mongoose.Schema({
    lat:Number,
    long:Number,
    photoUrl:String ,
    description:String ,
    reportedBy:{type: mongoose.Schema.Types.ObjectId , ref:'user'},
    Status:{type:String, 
            default:'pending'
      },

    timestamp:{
        type:Date,
        default:Date.now

    }
})




const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12
        
     },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12
     },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 12,
        trim: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
     },
    password: {
        type: String,
        required: true
    },
    totalreport:{type:Number, 
                  default:0
         }
    
    // Badges:[String],
    // creationTime:{type:Date  , default:Date.now}
})

const Pothole=mongoose.model("Pothole",Potholeschema);
const User=mongoose.model("User",UserSchema);

module.exports={
    Pothole,
    User
}


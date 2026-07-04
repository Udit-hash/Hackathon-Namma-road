const mongoose = require("mongoose");
require('dotenv').config(); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });

const PotholeSchema = new mongoose.Schema({

      lat:Number,

      long:Number,

      description:String,

      photoUrl:String,


  reportedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },


  status:{
      type:String,
      enum:[
          "pending",
          "important",
          "completed",
          "resolved"
      ],
      default:"pending"
  }


  },
  {
  timestamps:true
});

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
  totalreport: {
    type: Number, 
    default: 0
  },
   badges:{
    type:[String],
    default:[]
  },

   date:{type:Date  , default:Date.now},
   points: {
    type: Number,
    default: 0,
  },
   role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
   }
});

const Pothole = mongoose.model("Pothole", PotholeSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
  Pothole,
  User
};
const mongoose = require("mongoose");

// Add connection error handling
mongoose.connect("mongodb://localhost:27017/pothole_reporting")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if cannot connect to database
  });

const Potholeschema = new mongoose.Schema({
  lat: Number,
  long: Number,
  photoUrl: String,
  description: String,
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  status: {
    type: String, 
    default: 'pending'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
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
  }
});

const Pothole = mongoose.model("Pothole", Potholeschema);
const User = mongoose.model("User", UserSchema);

module.exports = {
  Pothole,
  User
};
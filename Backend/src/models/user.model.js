import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
    },
    isActiveStatus: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    resetOtp:{
      type:String,
      default:null
    },
    resetOtpExpiry:{
      type: Date,
      default:null
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

user.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  (this.password = await bcrypt.hash(this.password, 10)), next();
});
user.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

user.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
     process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:  process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

user.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
           process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY

        }
    )
}

export const User = mongoose.model("User", user);

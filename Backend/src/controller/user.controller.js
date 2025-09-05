import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { VerifyUser } from "../mailControll/sendVerification.js";
import bcrypt from 'bcrypt'

import {welcomeMail} from "../mailControll/welocomeMail.js"

import crypto from "crypto";
import { resetPassword } from "../mailControll/restPassword.js";


function generateSecureOTP() {
  return crypto.randomInt(100000, 999999).toString();
}


const generateRefreshTokenAndAccessToken = async(user)=>{
    try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken}
    } catch (error) {
       return new ApiError(500,"Something went wrong in token generation")
    }
}

const registerUser = async function (req, res) {
  try {
    //get user infromation
    //check if user already exists
    //if not create user
    //send verification mail
    //after verification activate user
    //send response
    console.log(req.body);
    console.log("        ");
  
    const { name, email, password, gender, age } = req.body;
  
    // if([name,email,password,gender,age].some((feild)=> feild?.trim()==="")){
    //     throw new ApiError(400,"All feilds are required")
    // }
    const isAlreadyExist = await User.findOne({ email });
    if (isAlreadyExist) throw new ApiError(409, "User already exit");
  
    const user = await User.create({ name, email, password, gender, age });
    if (!user) throw new ApiError(500, "Unable to create user");
    await VerifyUser(email,user._id,name)
    console.log("send mail sucessfull ")
   
    
  
    res
      .status(201)
      .json(new ApiResponce(200, user, "User created successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "User creation failed in controller");
  }
};

const verifyUser = async function (req, res) {
    console.log("control come here")
  try {
    console.log(req.params)
    const value = req.params.token;
    const decoded = jwt.verify(value, process.env.EMAIL_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.userId);
    if (!user) throw new ApiError(404, "User not found in mail verification ");
    if(user.isVerified){
      return res.status(201).json(new ApiResponce(200,"User already verified"))
    }
    user.isVerified=true;
    await user.save({validateBeforeSave:false});
    await welcomeMail(user.email,user.name)
    return res.status(200).json(new ApiResponce(201,"User verified successfully"))
  } catch (error) {
    console.log("error Occure in verification "+error);
    res.status(500).json(new ApiError(500,"         Verificaiton failed in controller "))
  }
};


const login = async (req, res,next) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    // 1. Validate fields
    // if (!email?.trim() || !password?.trim()) {
    //   return next(new ApiError(400, "All fields are required"));
    // }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return (new ApiError(404, "User not found in database"));
    }

    // 3. Verify password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password");
    }
    if(user.isVerified===false) throw new ApiError(401,"please verify your   email first")
     console.log("get here")
    // 4. Generate tokens
    const { refreshToken, accessToken } = generateRefreshTokenAndAccessToken(user);

    // Save refresh token in DB (important!)
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false});

    // 5. Return safe user (without password, refreshToken)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // 6. Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only secure in prod
      sameSite: "strict"
    };

    // 7. Send response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponce(200, { user: loggedInUser, accessToken }, "User logged in successfully"));
  } catch (error) {
    console.error("Login error:", error);
    return next(new ApiError(500, "Internal server error"));
  }
};



const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json(new ApiError(404,"User not fount in record"));

  const otp = generateSecureOTP();
  const hashedOtp = await bcrypt.hash(otp, 10);
  
  user.resetOtp = hashedOtp;
  user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
  await user.save({validateBeforeSave:false});

  // send OTP via email
  await resetPassword(user.email,otp);

  res.json({ message: "OTP sent to email" });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json(new ApiError(404,"User not fount in record"));

  if (user.resetOtpExpiry < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const isMatch = await bcrypt.compare(otp, user.resetOtp);

  if (!isMatch) return res.status(400).json(        new  ApiError(401,"Invalid otp or expired"));

  res.json({ message: "OTP verified, proceed to reset password" });
};




const resetUserPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if(user.resetOtp == null) throw new ApiError(401,"Otp not genrated ")

  user.password = newPassword;  // plain password, hook will hash
  user.resetOtp = null;
  user.resetOtpExpiry = null;
  await user.save()

  res.json({ message: "Password reset successful" });
};



export { registerUser,
        verifyUser,
        login,
        requestPasswordReset,
        verifyOtp,
        resetUserPassword
        
       };

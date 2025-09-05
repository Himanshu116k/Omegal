import {User} from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";


export const verifyToken = asynchandler(async(req,_,next)=>{
    
    try{
        
        const token =  req.cookies?accessToken || req.header("Authorization").replace("Bearer ",""):null;
        if(!token){
            return next(new ApiError("You are not logged in! Please log in to get access.",401));
        }
        
       
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user.isVerified) throw new ApiError(401,"Please verify your email address to access this resource")
        
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next();
    }catch(error){
      throw new ApiError(401, error?.message || "Invalid access token")
    }

})
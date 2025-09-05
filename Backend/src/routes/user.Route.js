import { Router } from "express"
const router = Router();

import {registerUser,verifyUser,  login, requestPasswordReset,verifyOtp,resetUserPassword} from "../controller/user.controller.js"
router.route("/register").post(registerUser)
router.route("/verify-email/:token").get(verifyUser)
router.route("/login").post(login)
router.route("/requestPasswordReset").post(requestPasswordReset)
router.route("/verifyOtp").post(verifyOtp)
router.route("/resetUserPassword").post(resetUserPassword)



export default router;
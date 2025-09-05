import nodemailer from "nodemailer";
import { createTransporter } from "./createTransportMail.js";

const resetPassword = async (email, otp) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Omegal made by Himanshu" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Password Reset OTP",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  });
};
export { resetPassword };

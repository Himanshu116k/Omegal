import nodemailer from "nodemailer";

import { createTransporter } from "./createTransportMail.js";
import jwt from "jsonwebtoken";



const VerifyUser = async function (to,id,name) {
  
  
  
  const  emailToken = jwt.sign(
    {userId:id},
    process.env.EMAIL_SECRET,
    {expiresIn:'1h'}
  )

  const verificationUrl = `${process.env.BACEKEND_URL}/verify-email/${emailToken}`

  const transporter = createTransporter();


  await transporter.sendMail({
    from: `"Omegal made by Himanshu" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "Verifiaction Mail",
    html: `
      <h2>Welcome  ${name} !</h2>
      <p>Please verify your email to activate your Omegal account  account.</p>
      <a       href='${verificationUrl}'> Click       here</a>
    `,
  });

  console.log("✅ Mail sent");
};

export { VerifyUser };

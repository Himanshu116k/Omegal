
import nodemailer from "nodemailer"

import { createTransporter } from "./createTransportMail.js";
const welcomeMail = async (userEmail,name)=>{
    
    const transporter = createTransporter();
    
    await transporter.sendMail({
        from: `"Omegal made by Himanshu" <${process.env.EMAIL_USER}>`,
        to:userEmail ,
        subject:`Welcome ${name} to Our web site `,
        
        html:`
        <h2>Welcome  ${name} !</h2>
        <p>Site is under Develpment  </p>
        `
    })
    console.log("welocme mail send")
}
export{welcomeMail}
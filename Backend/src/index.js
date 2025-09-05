import dotenv from "dotenv" 
dotenv.config()

import {app} from "./app.js"
import connectDB from "./config/db.js";




import { VerifyUser} from "./mailControll/sendVerification.js";
// VerifyUser("himanshu1991patna@gmail.com")

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`📡Server started at PORT 🔐 ${process.env.PORT}`);
    app.on("error",(error)=>{
        console.log("ERROR:",error); 
        throw error;
    })
    })
})
.catch((err)=>{
    console.log("Failed to connect to the database",err);
    process.exit(1);
})


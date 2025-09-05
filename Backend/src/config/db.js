
import mongoose from "mongoose"
import {DB_NAME} from '../constants/constant.js'


const connectDB =  async()=>{
    try{

        const connectionInsctance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("Conection to db is succesfull")
        console.log(`the connection instance is ${connectionInsctance.connection.host}`)
     }catch(err){ 
         console.error("Error while connecting to database",err);
        process.exit(1) 
     }
}
      
export default connectDB;
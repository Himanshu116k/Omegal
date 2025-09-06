import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();


app.use(express.json());

app.use(cors({
    origin:'http://localhost:5173',
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
import userRoute from"./routes/user.Route.js"

app.use("/api/v1/users",userRoute)




export {app};
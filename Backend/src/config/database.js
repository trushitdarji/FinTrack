import mongoose from "mongoose";

function ConnectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected")
    })
}

export default ConnectDB;
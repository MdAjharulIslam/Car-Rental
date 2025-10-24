import mongoose from "mongoose";
import  Mongoose  from "mongoose";


const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database connected"))
        await mongoose.connect(`${process.env.MONGOBD_URI}/carRental`)
    } catch (error) {
        console.log(error.mongoose)
    }
}

export default connectDB;
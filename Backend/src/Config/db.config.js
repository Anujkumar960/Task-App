require("dotenv").config();

const mongoose = require("mongoose");

const connectToDb=async()=>{
    try{
        await mongoose.connect(`${process.env.DB_URL}`)
        console.log(process.env.DB_URL)
        console.log("Database is connected");
        console.log('All models were synchronized successfully.');
    }catch(error){
        console.log("Internal server Error"+error);
        process.exit(1);
    } 
}

module.exports={connectToDb}
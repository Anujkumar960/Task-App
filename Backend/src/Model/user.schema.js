const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    image: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {type:String,enum:["user","admin"],default:"user"}
}, { versionKey: false });

const userModel=mongoose.model("user",userSchema)

module.exports={userModel};

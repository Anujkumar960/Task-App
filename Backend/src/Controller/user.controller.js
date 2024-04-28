require("dotenv").config();

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { userModel } = require("../Model/user.schema");
const { BlacklistModel } = require("../Model/blacklist.model");
const { taskModel } = require("../Model/task.schema");



const SignUp=async(req,res)=>{
    const {username,email,roles,password,userId,image}=req.body;
    try{
        const user= await userModel.findOne({email});
        if(user){
            return res.status(401).json({msg:"user is already registered ,please try to login"});
        }
        bcrypt.hash(password,10,async(err,data)=>{
            if(err) throw new Error(err)
            if(roles){
                const newUser=new userModel({userId,email,username,password:data,roles,image});
                await newUser.save();
            }else{
                const newUser=new userModel({userId,email,username,password:data,image});
                await newUser.save();
            }
          //  await newUser.save();
            return res.status(201).json({msg:`${username} you are registered Successfully, please try to login`})
        })

    }catch(error){
        console.log(error);
        res.status(400).json({msg:"Please provide correct details"})
    }
}


const logIn=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await userModel.findOne({email});
        if(!user){
            return res.status(401).json({msg:"user not found please provide correct credential"});
        }
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(err) throw new Error(err);
            if(result){
                console.log(user);
                const token=jwt.sign({email,role:user.roles,userId:user.userId},process.env.SECRET_KEY,{expiresIn: '1h'});

                res.json({token,roles:user.roles})
            }else{
                return res.status(401).json({msg:"please provide correct credential, password not matched !"});
            }
        })
    }catch(error){
        console.log(error);
        res.status(400).json({msg:"Please provide correct details"})
    }
}


const logout=async(req,res)=>{
    const header=req.headers["authorization"]
    const token=header.split(" ")[1];
    try{
       if(!token){
          res.status(401).send("token not provided");
       }
       const userToken= new BlacklistModel({token});
       await userToken.save();
       return res.status(201).send("user logout successfully");
    }catch(err){
      res.status(400).json({msg:err.message});
    }
  }
  
  const getUsersTask = async (req, res) => {
    const userId = req.userId;
    // console.log(id);
    try {
      const user = await userModel.findOne({userId});
      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }
      console.log(user);
      const allTasks = await taskModel.find({ userId });
      console.log(allTasks); 
      const details={allTasks,user}
      res.status(201).json({ msg: "User details found", tasks:details });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ msg: error.message }); 
    }
  };







module.exports={SignUp,logIn,logout,getUsersTask};
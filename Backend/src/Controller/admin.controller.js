const { taskModel } = require("../Model/task.schema");
const { userModel } = require("../Model/user.schema");

const updateUser=async(req,res)=>{
    const userId=req.params.id;
    try{
    const user=await userModel.findOne({userId});
    if(!user){
        return res.status(401).json({msg:`please provide correct id, person with ${userId} not found`})
    }
    const updateUser = await userModel.findByIdAndUpdate(userId, req.body)
     res.status(200).json({msg:`user with ${userId} updated successfully`})
    }catch(error){
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const deleteUser=async(req,res)=>{
    const userId=req.params.id;
    try{
    const user=await userModel.findOne({userId});
    if(!user){
        return res.status(401).json({msg:`please provide correct id, person with ${userId} not found`})
    }
    const updateUser = await userModel.findByIdAndDelete(userId)
     res.status(200).json({msg:`user with ${userId} deleted successfully`})
    }catch(error){
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const getUserTask = async (req, res) => {
    const userId = req.params.id;
    // console.log(id);
    try {
      const user = await userModel.findOne({userId});
      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }
      const allTasks = await taskModel.find({ userId });
      const details={allTasks,user}
      res.status(201).json({ msg: "User details found", tasks:details });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ msg: error.message }); 
    }
  };

  const getSummary=async(req,res)=>{
    try{
      const allTask = await taskModel.find();
      if(allTask.length==0){
        return  res.status(401).json({msg:"tasks not found"});
      }
      const completedTask = allTask.filter(task=>
         task.status=="completed"
        )
      const admin=await userModel.findOne({userId:req.userId})
      const pending=allTask.length-completedTask.length;
      
      const data={totalTask:allTask.length,completed:completedTask.length,pending,admin}
      res.status(200).json({msg:"task summary",data})
    }catch(error){
      console.log(error.message)
      res.status(400).json({msg:error})
    }
  }

  
  const getAllUsers = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const totalUsers=await userModel.find();
        const users = await userModel.find()
            .skip(skip)
            .limit(parseInt(limit));
        if (users.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }
        const totalPages = Math.ceil(totalUsers.length / limit);
        res.json({users,totalPages});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

  module.exports={updateUser,deleteUser,getUserTask,getSummary,getAllUsers};
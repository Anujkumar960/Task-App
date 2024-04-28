const { taskModel } = require("../Model/task.schema");
const { userModel } = require("../Model/user.schema");





const getAllTask=async(req,res)=>{
  try{
      const allTask = await taskModel.find();
      res.status(201).json({msg:"new task added successfully",tasks:allTask})
  }catch(error){
      console.log(error.message)
      res.status(400).json({msg:error})
  }
}




const addTask=async(req,res)=>{
  const {taskId,title,description,dueDate}=req.body;
  const userId=req.userId;
  const isDisable=req.isDisable;
  try{
      const user=await userModel.findOne({userId});
      if(!user){
        return  res.status(401).json({msg:"user not found"});
      }
          const newTask=new taskModel({taskId,title,description,userId,dueDate})
          await newTask.save();
          console.log(newTask);
          res.status(201).json({msg:"new task added successfully"})
  }catch(error){
      console.log(error.message)
      res.status(400).json({msg:error})
  }
}


// updateTask

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const updatedData = req.body;
  try {
    const task = await taskModel.findOne({ taskId });
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    if (task.userId !== req.userId) {
      return res.status(401).json({ msg: "Unauthorized activity" });
    }
    const taskUpdate = await taskModel.findOneAndUpdate(
      {  taskId },
      { status: updatedData.status }
    );
    res.status(200).json({ msg: "Task updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: error.message });
  }
};





const deleteTask=async(req,res)=>{
  const taskId=req.params.id;
  try{
    const task = await taskModel.findOne({taskId});
    if(task.userId!=req.userId){
      return  res.status(401).json({msg:"unauthorized activity"});
    }
    const taskUpdate = await taskModel.findOneAndDelete({taskId});
    res.status(200).json({msg:"task deleted successfully successfully"})
  }catch(error){
    console.log(error.message)
    res.status(400).json({msg:error})
  }
}

//for getting one task

const getOneTask=async(req,res)=>{
  const taskId=req.params.id;
  try{
    const task=await taskModel.findOne({taskId})

  }catch(error){
    console.log(error.message)
    res.status(400).json({msg:error})
  }
}

//for admin to get Summary
const getSummary=async(req,res)=>{
  console.log("Hi");
  try{
    const allTask = await taskModel.find();
    console.log(allTask.length)
    if(allTask.length==0){
      return  res.status(401).json({msg:"tasks not found"});
    }
    const completedTask = allTask.filter(task=>
       task.status=="completed"
      )
    console.log(completedTask)
    const avg=completedTask.length/allTask.length;
    const data={taskAvg:avg,totalTask:allTask.length,completed:completedTask.length}
    res.status(200).json({msg:"task summary",data})
  }catch(error){
    console.log(error.message)
    res.status(400).json({msg:error})
  }
}





  
module.exports={addTask,getAllTask,updateTask,deleteTask};
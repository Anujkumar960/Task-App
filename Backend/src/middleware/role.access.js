const access=(...roles)=>{
    return (req,res,next)=>{
      const userRole=req.roles;
      const hasCommonRole =  roles.includes(userRole);
      if(hasCommonRole){
        console.log("tc");
        next();
      }else{
        res.status(403).json({error:"Access forbidden"});
      }
    }
}

module.exports={access}
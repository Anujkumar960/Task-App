const express =require("express");
const { SignUp, logIn,  logout, getUsersTask } = require("../Controller/user.controller");
const { auth } = require("../middleware/auth");
const { requestLogger } = require("../middleware/logger");
const { limiter } = require("../middleware/limiter");
const { access } = require("../middleware/role.access");

const userRouter=express.Router();

userRouter.post("/register",SignUp);

userRouter.post("/login",logIn);

userRouter.get("/logout",logout)

userRouter.get("/task",limiter,requestLogger, auth, access("user"),getUsersTask)





module.exports={userRouter};

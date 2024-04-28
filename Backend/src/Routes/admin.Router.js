const express =require("express");

const { auth } = require("../middleware/auth");
const { requestLogger } = require("../middleware/logger");
const { limiter } = require("../middleware/limiter");
const { access } = require("../middleware/role.access");
const { getUserTask, deleteUser, getAllUsers, updateUser, getSummary } = require("../Controller/admin.controller");


const adminRouter=express.Router();



adminRouter.get("/user/:id",limiter,requestLogger,auth, access("admin","user"), getUserTask);

adminRouter.patch("/update/:id",limiter,requestLogger, auth, access("admin"),updateUser);

adminRouter.delete("/delete/:id",limiter,requestLogger, auth, access("admin"),deleteUser);

adminRouter.get("/users",limiter,requestLogger,auth,access("admin"),getAllUsers)

adminRouter.get("/admin",limiter,requestLogger,  auth, access("admin"), getSummary);

module.exports={adminRouter};
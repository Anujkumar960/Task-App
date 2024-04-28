const express = require("express");

const { auth } = require("../middleware/auth");
const { access } = require("../middleware/role.access");
const { addTask, getAllTask, updateTask, deleteTask, getSummary } = require("../Controller/task.controller");
const { limiter } = require("../middleware/limiter");
const {  requestLogger } = require("../middleware/logger");

const taskRouter = express.Router();

// taskRouter.get("/gettask", auth, access("user"), );

taskRouter.post("/add",limiter,requestLogger, auth, access("user"), addTask);

taskRouter.get("/tasks",limiter,requestLogger,  auth, access("manager"), getAllTask);

taskRouter.patch("/task/:id",limiter,requestLogger,  auth, access("user"), updateTask);

taskRouter.delete("/task/:id",limiter,requestLogger,  auth, access("user"), deleteTask);





module.exports = { taskRouter };

const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./src/Config/db.config");
const { userRouter } = require("./src/Routes/user.Router");
const { auth } = require("./src/middleware/auth");
const { access } = require("./src/middleware/role.access");
const { taskRouter } = require("./src/Routes/task.Router");
const { adminRouter } = require("./src/Routes/admin.Router");

const PORT = 5500;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.use("/task",taskRouter);

app.use("/admin",adminRouter);


app.listen(PORT, async () => {
  await connectToDb();
  console.log(`Your server is running on http://localhost:${PORT}`);
});

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskId: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum:["pending","in-progress","completed"], default: "pending" },
    userId: { type: Number, required: true }
}, { versionKey: false });

const taskModel = mongoose.model("Task", taskSchema);

module.exports = { taskModel };

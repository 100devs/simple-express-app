const mongoose = require("mongoose")
const TodoTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("TodoTask", TodoTaskSchema, "tasks")

const mongoose = require("mongoose");
const { Schema } = mongoose;

const to_doSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "done"],
    default: "to-do",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const To_Do = mongoose.model("To_Do", to_doSchema);
module.exports = To_Do;

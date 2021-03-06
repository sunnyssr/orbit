const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  score: { type: Number },
  review: { type: String }
});

const interview = mongoose.model("Interview", interviewSchema);

module.exports = interview;

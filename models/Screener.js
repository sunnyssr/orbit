const mongoose = require("mongoose");
const { Schema } = mongoose;

const sourcePlatform = [
  "Facebook",
  "Reddit",
  "Quora",
  "Twitter",
  "Email",
  "Search engine",
  "LinkedIn",
  "Instagram",
  "Medium",
  "Word of mouth",
  "Our blog",
  "Other blog"
];

const programmingExperience = [
  "Newbie",
  "Trying to learn",
  "Learning for 3 months",
  "Experienced"
];

const ScreenerSchema = Schema({
  sourcePlatform: {
    type: String,
    enum: sourcePlatform
  },
  screenerMotivation: { type: String },
  background: { type: String },
  programmingExperience: {
    type: String,
    enum: programmingExperience
  },
  location: { type: String },
  age: { type: Number },
  graduationYear: { type: "Number" },
  graduationDetails: { type: String },
  isCurrentlyEmployed: { type: Boolean, default: false },
  expectedJoiningMonth: { type: String },
  expectedJoiningYear: { type: Number },
  screenerRemarks: { type: String }
});

const Screener = mongoose.model("Screener", ScreenerSchema);

module.exports = Screener;

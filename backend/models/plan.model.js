const mongoose = require("mongoose");

const planSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      ref: "User",
      required: true,
    },
    title: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now },
    lock: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;

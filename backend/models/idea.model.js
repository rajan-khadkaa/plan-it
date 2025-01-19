const mongoose = require("mongoose");

const ideaSchema = mongoose.Schema(
  {
    uid: {
      // type: mongoose.Schema.Types.ObjectId,  //if it was to be foreign key of _id from user then use it
      type: String, //since the uid is being set as foreign key, it's type string is set
      ref: "User",
      required: true,
    },
    title: { type: String },
    content: { type: String },
    tags: { type: [String] },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;

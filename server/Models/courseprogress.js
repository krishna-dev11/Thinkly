const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses", 
      required: true,
    },
    completedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subSection",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model( "courseprogress" , courseProgressSchema);

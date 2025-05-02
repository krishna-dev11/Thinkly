const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
    index: true,
  },
  whatYouWillLearn: [
    {
      type: String,
      required: true,
    },
  ],
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratingAndReviews",
    },
  ],
  price: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    index: true,
  },
  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  tag: {
    type: [String],
  },
  instructions: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  TeachLive : {
    type:Boolean,
    default : false
  },
  totalDuration: {
    type: String, 
    default: "0m",
  },
  totalSubsections: {
    type: Number,
    default: 0,
  },
  progressPercentage: {
  type: Number,
  default: 0,
}
},
{
  timestamps: true,
});

module.exports = mongoose.model("courses", coursesSchema);

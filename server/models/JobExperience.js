import mongoose from "mongoose";

const jobExperienceSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    description: { type: String, required: true },
    email: {type: String, required: true},
    image: { type: String },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const JobExperience = mongoose.model("Experience", jobExperienceSchema);

export default JobExperience;

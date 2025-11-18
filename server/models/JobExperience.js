import mongoose from "mongoose";

const jobExperienceSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const JobExperience = mongoose.model("Experience", jobExperienceSchema);

export default JobExperience;

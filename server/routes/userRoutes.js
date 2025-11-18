import express from "express";
import {
  applyForJob,
  getJobExperience,
  getPortfolioByUserId,
  getUserData,
  getUserJobApplications,
  postUserExperience,
  postUserInfo,
  updateUserResume,
  userInfo,
} from "../controllers/userController.js";
import upload from "../controllers/multer.js";

const router = express.Router();

// Get user data
router.get("/user", getUserData);

// Apply for a job
router.post("/apply", applyForJob);

// Get applied jobs data
router.get("/applications", getUserJobApplications);

// Update user profile (resume)
router.post("/update-resume", upload.single("resume"), updateUserResume);

// Get user info
router.get("/user-info", userInfo);

// Get user info by id
router.get("/user-info/:userId", getPortfolioByUserId)

// Post user info data
router.post("/post-user-info", postUserInfo);

// Get job experience
router.get("/job-experieence", getJobExperience);

// Post job experience
router.post("/post-job-experience", postUserExperience);

export default router;

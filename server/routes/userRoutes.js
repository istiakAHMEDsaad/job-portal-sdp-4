import { Router } from 'express';
import {
  getUserData,
  applyForJob,
  getUserJobApplications,
  updateUserResume,
  getPortfolio,
  updatePortfolio,
  postUserExperience,
  getJobExperience,
  getJobExperienceById,
  deleteJobExperience,
} from '../controllers/userController.js';
import upload from '../config/multer.js';

const router = Router();

// Get user data
router.get('/user', getUserData);

// Apply for a job
router.post('/apply', applyForJob);

// Get applied jobs data
router.get('/applications', getUserJobApplications);

// Update user profile (resume)
router.post('/update-resume', upload.single('resume'), updateUserResume);

//!================== Extra Part Portfolio ==================\\
// Portfolio
router.get('/portfolio', getPortfolio);
router.put('/portfolio', updatePortfolio);

//!================== Extra Part Portfolio ==================\\
// Post a experience
router.post('/post-job-experience', postUserExperience);

// Get all experience
router.get('/job-experience', getJobExperience);

// Get experience by id
router.get('/job-experience/:id', getJobExperienceById);

// Delete job experience
router.delete('/delete-job-experience/:id', deleteJobExperience);

export default router;

import { Router } from 'express';
import {
  getUserData,
  applyForJob,
  getUserJobApplications,
  updateUserResume,
  getPortfolio,
  updatePortfolio,
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

//!================== Extra Part ==================\\
// Portfolio
// router.post('/portfolio', createPortfolio);
router.get('/portfolio', getPortfolio);
router.put('/portfolio', updatePortfolio);

export default router;

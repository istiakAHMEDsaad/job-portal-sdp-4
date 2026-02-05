import {Router} from 'express';
import {
  ChangeJobApplicationsStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middlewares/authMiddleware.js';

const router = Router();

// Register a company
router.post('/register', upload.single('image'), registerCompany);

// Company login
router.post('/login', loginCompany);

// Get company data
router.get('/company', protectCompany, getCompanyData);

// Post a job
router.post('/post-job', protectCompany, postJob);

// Get applicants data from the company
router.get('/applicants', protectCompany, getCompanyJobApplicants);

// Get company job list
router.get('/list-jobs', protectCompany, getCompanyPostedJobs);

// Change applications status
router.post('/change-status', protectCompany, ChangeJobApplicationsStatus);

// Change applicatations visibility
router.post('/change-visibility', protectCompany, changeVisibility);

export default router;

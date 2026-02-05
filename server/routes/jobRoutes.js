import { Router } from 'express';
import { getJobs, getJobById } from '../controllers/jobController.js';

const router = Router();

// Route to get all data
router.get('/', getJobs);

// Route to get single job by ID
router.get('/:id', getJobById);

export default router;

import User from '../models/User.js';
import JobApplication from '../models/JobApplication.js';
import Job from '../models/Job.js';
import { v2 as cloudinary } from 'cloudinary';
import Portfolio from '../models/PortFolio.js';
import JobExperience from '../models/JobExperience.js';

// Get user data
export const getUserData = async (req, res) => {
  // clerk middleware convert the token into .auth object which contain userId & user details
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User Not Found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth?.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied?.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Already Applied!' });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res
        .status(400)
        .json({ success: false, message: 'Job Not Found!' });
    }

    await JobApplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      date: Date.now(),
    });

    return res
      .status(200)
      .json({ success: true, message: 'Applied Successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Get user applied application
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate('companyId', 'name email image')
      .populate('jobId', 'title description location category level salary')
      .exec();

    if (!applications) {
      return res.status(400).json({
        success: false,
        message: 'No job applications found for this user',
      });
    }

    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Update user profile (resume)
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.status(200).json({ success: true, message: 'Resume Updated' });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//!================== Extra Part Portfolio ==================\\
// Create Portfolio
/*
export const createPortfolio = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const existing = await Portfolio.findOne({ userId });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Portfolio already exists',
      });
    }

    const portfolio = await Portfolio.create({
      userId,
      ...req.body,
    });

    return res.status(201).json({ success: true, portfolio });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
*/

// Get Portfolio
export const getPortfolio = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const portfolio = await Portfolio.findOne({ userId });

    return res.status(200).json({ success: true, portfolio });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Update Portfolio
export const updatePortfolio = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const portfolio = await Portfolio.findOneAndUpdate({ userId }, req.body, {
      new: true,
      upsert: true,
    });

    return res.status(200).json({ success: true, portfolio });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//!================== Extra Part Experience ==================\\
// Post job experience
export const postUserExperience = async (req, res) => {
  try {
    const userId = req.auth.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized access' });
    }

    const { description, email, image, name } = req.body;

    const experience = await JobExperience.create({
      userId,
      description,
      email,
      image,
      name,
    });

    return res.status(201).json({
      success: true,
      message: 'successfully upload the post!',
      data: experience,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Get all job experience
export const getJobExperience = async (req, res) => {
  try {
    const experiences = await JobExperience.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Job experiences fetched successfully',
      data: experiences,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: 'server error',
    });
  }
};

// Get job by id
export const getJobExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const singleJobData = await JobExperience.findOne({ _id: id });

    if (!singleJobData) {
      return res.status(404).json({
        success: false,
        message: 'Data not found!',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Data found',
      data: singleJobData,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Delete job experience
export const deleteJobExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePost = await JobExperience.findByIdAndDelete(id);

    if (!deletePost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found!',
      });
    }

    res.status(200).json({ success: true, message: 'Post have been deleted!' });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

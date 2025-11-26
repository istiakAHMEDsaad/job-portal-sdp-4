import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';
import JobExperience from '../models/JobExperience.js';
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';
import Portfolio from '../models/PortFolio.js';

// Get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User Not Found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.status(200).json({ success: true, message: 'Applied Successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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
    res.status(400).json({ success: false, message: error.message });
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
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get user info
export const userInfo = async (req, res) => {
  try {
    const userId = req.auth.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      res.status(404).json({ success: false, message: 'No portfolio found' });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio fetched successfully',
      portfolio,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get user info by id
export const getPortfolioByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'User info not found',
      });
    }

    return res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Post user info
export const postUserInfo = async (req, res) => {
  try {
    const userId = req.auth.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized access' });
    }

    const {
      name,
      email,
      image,
      phone,
      address,
      education,
      skill,
      experience,
      objective,
      about,
    } = req.body;

    const portfolioId = await Portfolio.findOne({ userId });

    if (portfolioId) {
      const update = await Portfolio.findOneAndUpdate(
        { userId },
        {
          name,
          email,
          image,
          phone,
          address,
          education,
          skill,
          experience,
          objective,
          about,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Portfolio updated successfully',
        portfolio: update,
      });
    }

    const newPortfolio = await Portfolio.create({
      userId,
      name,
      email,
      image,
      phone,
      address,
      education,
      skill,
      experience,
      about,
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio created successfully',
      portfolio: newPortfolio,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all job experience
export const getJobExperience = async (req, res) => {
  try {
    const experiences = await JobExperience.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Job experiences fetched successfully',
      data: experiences,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'server error',
    });
  }
};

// Get job by id
export const getJobExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const singleJobData = await JobExperience.findOne({ id });

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

    res.status(201).json({
      success: true,
      message: 'successfully upload the post!',
      data: experience,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'server error!' });
  }
};

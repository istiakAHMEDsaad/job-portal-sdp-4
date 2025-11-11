import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

// Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.status(404).json({ success: false, message: "Missing details" });
  }

  try {
    const companyExist = await Company.findOne({ email });

    if (companyExist) {
      return res
        .status(403)
        .json({ success: false, message: "Company already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.status(201).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      
    });
  } catch (error) {}
};

// Company Login
export const loginCompany = async (req, res) => {};

// Get company data
export const getCompanyData = async (req, res) => {};

// Post a new job
export const postJob = async (req, res) => {};

// Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {};

// Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {};

// Change job application status
export const ChangeJobApplicationsStatus = async (req, res) => {};

// Change job visibility
export const changeVisibility = async (req, res) => {};

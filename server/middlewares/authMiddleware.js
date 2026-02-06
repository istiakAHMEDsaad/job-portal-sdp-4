import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';
import { JWT_SECRET } from '../config/env.js';

export const protectCompany = async (req, res, next) => {
  const token = await req.headers.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorized, Login again!' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.company = await Company.findById(decoded.id).select('-password');

    if (!req.company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      success: false,
      // message: 'Invalid or expired token',
    });
  }
};

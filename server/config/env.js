import dotenv from 'dotenv';

dotenv.config({
  path: `.env`,
  quiet: true,
});

export const {
  PORT,
  JWT_SECRET,
  MONGODB_URI,
  SENTRY_DSN,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  CLERK_WEBHOOK_SECRET,
  CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
} = process.env;

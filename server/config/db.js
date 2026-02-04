import mongoose from 'mongoose';
import { MONGODB_URI } from './env.js';

const connectDB = async () => {
  mongoose.connection.on('connected', () =>
    console.log('Database is connected'),
  );

  await mongoose.connect(`${MONGODB_URI}/bubt-job-portal`);
};

export default connectDB;

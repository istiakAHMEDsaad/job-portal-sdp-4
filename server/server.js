import './config/instrument.js';
import connectCloudinary from './config/cloudinary.js';

import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import connectDB from './config/db.js';
import * as Sentry from '@sentry/node';
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js'

const app = express();

// Attach Sentry to Express
Sentry.setupExpressErrorHandler(app);
app.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks);

// connect to database
await connectDB();
// cloudinary
await connectCloudinary();

// Middleware
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.status(200).json({
    title: 'Bubt Job Portal',
    message: 'this is bubt job portal backend server 🐱',
  });
});

// Routes
app.use('/api/company', companyRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/users', userRoutes);

// Test error route
app.get('/debug-sentry', () => {
  throw new Error('Sentry Test Error!');
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

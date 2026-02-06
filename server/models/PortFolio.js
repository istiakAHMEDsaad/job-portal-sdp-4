import mongoose from 'mongoose';

const portFolioSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    education: { type: String, required: true },
    skill: [{ type: String }],
    experience: { type: String, required: true },
    objective: { type: String, required: true },
    about: { type: String, required: true },
  },
  { timestamps: true }
);

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portFolioSchema);

export default Portfolio;

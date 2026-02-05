import Job from '../models/Job.js';

// get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: 'companyId',
      select: '-password',
    });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate({
      path: 'companyId',
      select: '-password',
    });

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: 'Job not found in database' });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [JobData, setJobData] = useState(null);

  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const { getToken } = useAuth();

  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    // const data = jobs.filter((job) => job._id === id);
    // if (data.length !== 0) {
    //   setJobData(data[0]);
    // }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Login to apply for a jobs');
      }
      if (!userData?.resume) {
        navigate('/applications');
        return toast.warn('Upload resume to apply');
      }

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(
      (item) => item.jobId._id === JobData._id
    );

    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (userApplications?.length > 0 && JobData) {
      checkAlreadyApplied();
    }
  }, [JobData, userApplications, id]);

  const { companyId, title, location, level, salary, date, description } =
    JobData || {};

  return JobData ? (
    <>
      <Navbar />

      {/* header section container */}
      <div className='min-h-screen flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        {/* header section */}
        <div className='bg-white text-black rounded-lg w-full'>
          {/* left part */}
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
            {/* company data and details */}
            <div className='flex flex-col md:flex-row items-center'>
              <img
                className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200'
                src={companyId.image}
                alt='logo'
              />
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:text-4xl font-medium'>{title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt='suitcase icon' />
                    {companyId.name}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt='location icon' />
                    {location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt='person icon' />
                    {level}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt='money icon' />
                    CTC: {kconvert.convertTo(salary)}
                  </span>
                </div>
              </div>
            </div>

            {/* Hero section apply now button */}
            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
              <button
                onClick={applyHandler}
                className='bg-blue-600 hover:bg-blue-700 transition-colors p-2.5 px-10 text-white rounded cursor-pointer'
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
              <p className='mt-1 text-gray-600'>
                Posted {moment(date).fromNow()}
              </p>
            </div>
          </div>

          {/* Main apply now button */}
          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold text-2xl mb-4'>Job Description</h2>
              <div
                className='rich-text'
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
              <button
                onClick={applyHandler}
                className='bg-blue-600 hover:bg-blue-700 transition-colors p-2.5 px-10 text-white rounded mt-10 cursor-pointer'
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
            </div>

            {/* right section more jobs */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2>More jobs from {companyId.name}</h2>
              {jobs
                .filter(
                  (job) =>
                    job._id !== JobData._id &&
                    job.companyId._id === JobData.companyId._id
                )
                .filter((job) => {
                  // Set of applied jobIds
                  const appliedJobsIds = new Set(
                    userApplications.map((app) => app.jobId && app.jobId._id)
                  );
                  // Return true if the user has not already applied for this job
                  return !appliedJobsIds.has(job._id);
                })
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              {/* filter(() => true) */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;

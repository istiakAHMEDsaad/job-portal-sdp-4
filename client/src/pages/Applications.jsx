import { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { IoWarningOutline } from 'react-icons/io5';

const Applications = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  const handleConfirmReport = () => {
    toast(
      ({ closeToast }) => (
        <div className='text-center py-2'>
          <p className='font-semibold text-gray-800 mb-4'>
            Are you sure you want to report this job?
          </p>

          <div className='flex justify-center gap-4'>
            <button
              onClick={() => {
                // onConfirm();
                closeToast();
              }}
              className='px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1'
            >
              Yes
            </button>

            <button
              onClick={closeToast}
              className='px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1'
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: false,
        position: 'top-right',
        className: 'rounded-xl shadow-2xl',
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className='container md:px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Information</h2>

        {/* Resume + Biodata */}
        <div className='flex gap-2 mb-6 mt-3'>
          {isEdit || (userData && userData?.resume) === '' ? (
            <>
              <label className='flex items-center' htmlFor='resumeUpload'>
                <p className='bg-blue-100 text-blue-600 md:px-4 md:py-2 md:rounded-lg py-2 px-4 rounded-md mr-2'>
                  {resume ? resume.name : 'Select Resume'}
                </p>
                <input
                  id='resumeUpload'
                  onChange={(e) => setResume(e.target.files[0])}
                  accept='applications/pdf'
                  type='file'
                  hidden
                />
                <img src={assets.profile_upload_icon} alt='upload icon' />
              </label>
              <button
                onClick={updateResume}
                className='bg-green-100 hover:bg-green-200 transition-colors cursor-pointer border border-green-400 md:px-4 md:py-2 md:rounded-lg py-2 px-4 rounded-md'
              >
                Save
              </button>
            </>
          ) : (
            <div className='flex gap-2'>
              <a
                className='bg-blue-100 text-blue-600 md:px-4 md:py-2 md:rounded-lg py-2 px-4 rounded-md'
                href={userData?.resume}
                target='_blank'
              >
                Resume
              </a>

              <button
                onClick={() => setIsEdit(true)}
                className='text-gray-500 border border-gray-300 md:px-4 md:py-2 md:rounded-lg py-2 px-4 rounded-md'
              >
                Edit
              </button>

              <button
                onClick={() => navigate('/portfolio')}
                className='px-4 py-2 rounded-md md:px-4 md:py-2 md:rounded-lg bg-neutral-950 text-gray-100 cursor-pointer'
              >
                Portfolio
              </button>
            </div>
          )}
        </div>

        <h2 className='text-xl font-semibold mb-4'>Job Applied</h2>
        <div className='overflow-x-auto -mx-4 sm:-mx-0'>
          {' '}
          {/* Wrapper for horizontal scroll on small screens */}
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr>
                <th className='py-3 px-4 border-b border-gray-200 text-left'>
                  Company
                </th>
                <th className='py-3 px-4 border-b border-gray-200 text-left'>
                  Job Title
                </th>
                <th className='py-3 pr-4 border-b border-gray-200 text-left'>
                  Location
                </th>
                <th className='py-3 px-4 border-b border-gray-200 text-left'>
                  Date
                </th>
                <th className='py-3 px-4 border-b border-gray-200 text-left'>
                  Status
                </th>
                <th className='py-3 pr-4 border-b border-gray-200 text-left'>
                  Report
                </th>
              </tr>
            </thead>
            <tbody>
              {userApplications?.map((job, index) =>
                job.jobId ? (
                  <tr key={index}>
                    <td className='py-3 px-4 flex items-center gap-2 border-b border-gray-200'>
                      <img
                        className='w-8 h-8'
                        src={job.companyId.image}
                        alt={job.jobId.title}
                      />
                      {job.companyId.name}
                    </td>
                    <td className='py-2 px-4 border-b border-gray-200'>
                      {job.jobId.title}
                    </td>
                    <td className='py-2 pr-4 border-b border-gray-200'>
                      {job.jobId.location}
                    </td>
                    <td className='py-2 px-4 border-b border-gray-200'>
                      {moment(job.date).format('ll')}
                    </td>
                    <td className='py-2 px-4 border-b border-gray-200'>
                      <span
                        className={`${
                          job.status === 'Accepted'
                            ? 'bg-green-200'
                            : job.status === 'Rejected'
                            ? 'bg-red-200'
                            : 'bg-blue-200'
                        } px-4 py-1.5 rounded`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className='py-2 px-4 border-b border-gray-200'>
                      <IoWarningOutline
                        size={24}
                        className='text-red-600 cursor-pointer hover:opacity-95'
                        onClick={handleConfirmReport}
                      />
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Applications;

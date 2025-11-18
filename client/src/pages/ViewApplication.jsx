import { useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ViewApplication = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuRefs = useRef([]); // store refs for each menu

  // handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openMenuIndex !== null &&
        menuRefs.current[openMenuIndex] &&
        !menuRefs.current[openMenuIndex].contains(event.target)
      ) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuIndex]);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  // Function to fetch company job Applications data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div>
        <p>No data found</p>
      </div>
    ) : (
      <div className='container mx-auto p-4'>
        <div>
          <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
            <thead>
              <tr className='border-b border-b-gray-200'>
                <th className='py-2 px-4 text-left'>#</th>
                <th className='py-2 px-4 text-left'>User Name</th>
                <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
                <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
                <th className='py-2 px-4 text-left'>Resume</th>
                <th className='py-2 px-4 text-left'>Action</th>
              </tr>
            </thead>

            <tbody>
              {applicants
                ?.filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr className='text-gray-700' key={index}>
                    <td className='py-2 px-4 border-b border-gray-200 text-center'>
                      {index + 1}
                    </td>

                    <td className='py-2 px-4 border-b border-gray-200 text-center flex items-center'>
                      <img
                        className='w-10 h-10 rounded-full mr-3 max-sm:hidden'
                        src={applicant.userId.image}
                        alt='image'
                      />
                      <span>{applicant.userId.name}</span>
                    </td>

                    <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>
                      {applicant.jobId.title}
                    </td>

                    <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>
                      {applicant.jobId.location}
                    </td>

                    <td className='py-2 px-4 border-b border-gray-200'>
                      <a
                        href={applicant.userId.resume}
                        target='_blank'
                        className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'
                      >
                        Resume{' '}
                        <img src={assets.resume_download_icon} alt='download' />
                      </a>
                    </td>

                    {/* Accept / Reject menu */}
                    <td
                      className='py-2 px-4 border-b border-gray-200 relative'
                      ref={(el) => (menuRefs.current[index] = el)}
                    >
                      <div className='relative inline-block text-left'>
                        <button
                          onClick={() => toggleMenu(index)}
                          className='text-gray-500 action-button'
                        >
                          ...
                        </button>

                        {openMenuIndex === index && (
                          <div className='z-10 absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow'>
                            <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer'>
                              Accept
                            </button>
                            <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer'>
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplication;

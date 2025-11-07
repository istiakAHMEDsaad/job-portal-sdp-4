import { useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className='container md:px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Information</h2>

        {/* Resume + Biodata */}
        <div className='flex gap-2 mb-6 mt-3'>
          {isEdit ? (
            <>
              <label className='flex items-center' htmlFor='resumeUpload'>
                <p className='bg-blue-100 text-blue-600 md:px-4 md:py-2 md:rounded-lg py-2 px-4 rounded-md mr-2'>
                  Select Resume
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
                onClick={() => setIsEdit(false)}
                className='bg-green-100 border border-green-400 md:px-4 md:py-2 md:rounded-lg py-2 px-4 rounded-md'
              >
                Save
              </button>
            </>
          ) : (
            <div className='flex gap-2'>
              <a
                className='bg-blue-100 text-blue-600 md:px-4 md:py-2 md:rounded-lg py-2 px-4 rounded-md'
                href='#'
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
                onClick={() => navigate("/portfolio")}
                className='px-4 py-2 rounded-md md:px-4 md:py-2 md:rounded-lg bg-neutral-950 text-gray-100 cursor-pointer'
              >
                Portfolio
              </button>
            </div>
          )}
        </div>

        <h2 className='text-xl font-semibold mb-4'>Job Applied</h2>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b border-gray-200 text-left'>
                Company
              </th>
              <th className='py-3 px-4 border-b border-gray-200 text-left'>
                Job Title
              </th>
              <th className='py-3 px-4 border-b border-gray-200 text-left max-sm:hidden'>
                Location
              </th>
              <th className='py-3 px-4 border-b border-gray-200 text-left'>
                Date
              </th>
              <th className='py-3 px-4 border-b border-gray-200 text-left'>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {/* job.jobId */}
            {jobsApplied.map((job, index) =>
              job.jobId ? (
                <tr key={index}>
                  <td className='py-3 px-4 flex items-center gap-2 border-b border-gray-200'>
                    <img className='w-8 h-8' src={job.logo} alt={job.title} />
                    {job.company}
                  </td>
                  <td className='py-2 px-4 border-b border-gray-200'>
                    {job.title}
                  </td>
                  <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>
                    {job.location}
                  </td>
                  <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>
                    {moment(job.date).format("ll")}
                  </td>
                  <td className='py-2 px-4 border-b border-gray-200'>
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-200"
                          : job.status === "Rejected"
                          ? "bg-red-200"
                          : "bg-blue-200"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default Applications;

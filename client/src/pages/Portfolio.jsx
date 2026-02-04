import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';

const Portfolio = () => {
  const [userData, setUserData] = useState(null);

  const { isLoaded, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { user } = useUser();

  const fetchPortFolioData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(`${backendUrl}/api/users/user-info`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.portfolio);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPortFolioData();
    }
  }, [user]);

  if (!isLoaded) return <Loading />;

  const {
    image,
    name,
    phone,
    email,
    address,
    about,
    education,
    skill,
    experience,
    objective,
  } = userData || {};

  // PDF download handler (data-html2canvas-ignore)
  const handleDownloadPDF = () => {
    const element = document.getElementById('portfolio-pdf');

    html2pdf()
      .set({
        margin: 0.5,
        filename: `${name || 'portfolio'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait',
        },
      })
      .from(element)
      .save();
  };

  console.log(userData);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar />

      <div className='container mx-auto px-4 lg:px-16 mt-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold'>Portfolio Overview</h1>

          <div className='flex gap-3'>
            <button
              onClick={handleDownloadPDF}
              className='bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-md transition'
            >
              Download PDF
            </button>

            <button
              onClick={() => navigate('/portfolio/edit-portfolio')}
              className='bg-neutral-950 hover:bg-neutral-900 text-white px-5 py-2 rounded-md transition cursor-pointer'
            >
              Edit Profile
            </button>
          </div>
        </div>

        {!image &&
        !name &&
        !phone &&
        !email &&
        !address &&
        !about &&
        !education &&
        !skill &&
        !experience &&
        !objective ? (
          <p className='text-2xl'>Please Edit Your Info</p>
        ) : (
          <div id='portfolio-pdf' className='pdf-safe'>
            {/* Profile Card */}
            <div className='bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6'>
              <img
                src={image}
                alt='profile'
                crossOrigin='anonymous'
                className='w-40 h-40 rounded-full object-cover border-4 border-gray-200'
              />

              <div className='space-y-1 text-center md:text-left'>
                <h2 className='text-3xl font-bold text-gray-900'>{name}</h2>
                <p className='text-gray-600'>{email}</p>
                <p className='text-gray-600'>{phone}</p>
                <p className='text-gray-600'>{address}</p>
              </div>
            </div>

            {/* Content Grid */}
            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* About */}
              <div className='bg-white rounded-xl shadow-sm p-6 md:col-span-2'>
                <h3 className='text-2xl font-semibold border-b pb-2 mb-3'>
                  About Me
                </h3>
                <p className='text-gray-700 leading-relaxed'>{about}</p>
              </div>

              {/* Education */}
              <div className='bg-white rounded-xl shadow-sm p-6'>
                <h3 className='text-xl font-semibold mb-2'>Education</h3>
                <p className='text-gray-700'>{education}</p>
              </div>

              {/* Skills */}
              <div className='bg-white rounded-xl shadow-sm p-6'>
                <h3 className='text-xl font-semibold mb-3'>Skills</h3>
                <div className='flex flex-wrap gap-2'>
                  {skill?.map((item, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 bg-gray-100 border rounded-full text-sm'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className='bg-white rounded-xl shadow-sm p-6 md:col-span-2'>
                <h3 className='text-xl font-semibold mb-2'>Experience</h3>
                <p className='text-gray-700 leading-relaxed'>{experience}</p>
              </div>

              {/* Objective */}
              <div className='bg-white rounded-xl shadow-sm p-6 md:col-span-2'>
                <h3 className='text-xl font-semibold mb-2'>Career Objective</h3>
                <p className='text-gray-700 leading-relaxed'>{objective}</p>
              </div>
            </div>
          </div>
        )}
        {/* ================= PDF CONTENT START ================= */}

        {/* ================= PDF CONTENT END ================= */}
      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;

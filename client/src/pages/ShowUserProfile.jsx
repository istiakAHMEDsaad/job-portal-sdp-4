import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  User,
  Target,
  ArrowLeft,
} from 'lucide-react';

import Loading from '../components/Loading';

const ShowUserProfile = () => {
  const { backendUrl } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUserProfile = async () => {
    try {
      setIsLoad(true);
      const { data } = await axios.get(
        `${backendUrl}/api/users/user-info/${id}`,
      );
      if (data.success) {
        setUserData(data.portfolio);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'User profile not found');
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, [id]);

  if (isLoad) return <Loading />;

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

  return (
    <div className='bg-gray-50 min-h-screen pb-20'>
      {/* Navigation Bar */}
      <div className='max-w-5xl mx-auto px-4 py-6'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all font-medium'
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
      </div>

      <div className='max-w-5xl mx-auto px-4'>
        {!userData ? (
          <div className='bg-white rounded-2xl p-12 text-center shadow-sm border border-dashed border-gray-300'>
            <p className='text-gray-500 italic'>
              This user hasn't completed their professional profile yet.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* LEFT COLUMN: Profile Summary */}
            <div className='lg:col-span-1 space-y-6'>
              <div className='bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center'>
                <img
                  className='w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl shadow-lg border-4 border-white mb-4'
                  src={image}
                  alt={name}
                />
                <h1 className='text-2xl font-bold text-gray-900'>{name}</h1>
                <p className='text-blue-600 font-medium mb-6 uppercase text-xs tracking-widest'>
                  Candidate Profile
                </p>

                <div className='w-full space-y-4 text-left border-t pt-6'>
                  <div className='flex items-center gap-3 text-gray-600'>
                    <div className='p-2 bg-gray-50 rounded-lg'>
                      <Mail size={18} />
                    </div>
                    <span className='text-sm break-all'>{email}</span>
                  </div>
                  <div className='flex items-center gap-3 text-gray-600'>
                    <div className='p-2 bg-gray-50 rounded-lg'>
                      <Phone size={18} />
                    </div>
                    <span className='text-sm'>{phone}</span>
                  </div>
                  <div className='flex items-center gap-3 text-gray-600'>
                    <div className='p-2 bg-gray-50 rounded-lg'>
                      <MapPin size={18} />
                    </div>
                    <span className='text-sm'>{address}</span>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className='bg-white rounded-3xl p-8 shadow-sm border border-gray-100'>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  Skills & Expertise
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {skill?.map((item, index) => (
                    <span
                      key={index}
                      className='px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Detailed Info */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Objective */}
              <div className='bg-white rounded-3xl p-8 shadow-sm border border-gray-100'>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <Target className='text-blue-600' size={20} /> Career
                  Objective
                </h3>
                <p className='text-gray-600 leading-relaxed italic'>
                  "{objective}"
                </p>
              </div>

              {/* Experience */}
              <div className='bg-white rounded-3xl p-8 shadow-sm border border-gray-100'>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <Briefcase className='text-blue-600' size={20} /> Work
                  Experience
                </h3>
                <div className='text-gray-600 leading-relaxed whitespace-pre-line'>
                  {experience}
                </div>
              </div>

              {/* Education */}
              <div className='bg-white rounded-3xl p-8 shadow-sm border border-gray-100'>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <GraduationCap className='text-blue-600' size={20} />{' '}
                  Education
                </h3>
                <p className='text-gray-600 leading-relaxed'>{education}</p>
              </div>

              {/* About */}
              <div className='bg-white rounded-3xl p-8 shadow-sm border border-gray-100'>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <User className='text-blue-600' size={20} /> Professional
                  Summary
                </h3>
                <p className='text-gray-600 leading-relaxed'>{about}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowUserProfile;

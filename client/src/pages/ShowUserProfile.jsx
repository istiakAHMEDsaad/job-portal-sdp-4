import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShowUserProfile = () => {
  const { backendUrl } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  const handleUserProfile = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/users/user-info/${id}`
      );

      if (data.success) {
        setUserData(data.portfolio);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

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
    <div className='container md:px-4 2xl:px-20 mx-auto mt-4'>
      {/* head */}
      <div>
        <p className='text-center text-xl md:text-2xl lg:text-3xl font-semibold'>
          User Profile
        </p>
      </div>

      <Link
        className='bg-neutral-950 hover:bg-neutral-900 transition-colors text-white px-4 py-2 rounded'
        to={-1}
      >
        Back
      </Link>

      {/* Body */}

      <div>
        {!userData ? (
          <div className='min-h-[calc(100vh-270px)]'>
            <p className='italic text-red-500'>
              Please update your information to see this page!
            </p>
          </div>
        ) : (
          <div>
            {/* container */}
            <div className='mt-5 max-lg:px-10 max-xl:px-20 max-2xl:px-24 max-sm:px-2'>
              {/* first header section */}
              <div className='flex max-sm:flex-col max-sm:justify-center md:flex-row md:items-center justify-between gap-4'>
                <img
                  className='w-40 h-40 object-cover'
                  src={image}
                  alt='profile picture'
                />
                <div className='text-gray-900 font-semibold'>
                  <p>Name: {name}</p>
                  <p>Email: {email}</p>
                  <p>Mobile: {phone}</p>
                  <p>Address: {address}</p>
                </div>
              </div>

              {/* body section */}
              <div className='mt-5 space-y-3'>
                {/* 1 */}
                <div className='flex flex-col gap-2'>
                  <p className='text-2xl underline text-neutral-950'>
                    About Myself:
                  </p>
                  <p className='text-gray-800'>{about}</p>
                </div>

                {/* 2 */}
                <div>
                  <p className='text-2xl underline text-neutral-950'>
                    Education Qualification:
                  </p>
                  <p className='text-gray-800'>{education}</p>
                </div>

                {/* 3 */}
                <div>
                  <p className='text-2xl underline text-neutral-950'>Skills:</p>
                  <div className='text-gray-800 pl-5'>
                    <ul className='list-disc'>
                      {skill?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4 */}
                <div>
                  <p className='text-2xl underline text-neutral-950'>
                    Working Experience:
                  </p>
                  <p className='text-gray-800'>{experience}</p>
                </div>

                {/* 5 */}
                <div>
                  <p className='text-2xl underline text-neutral-950'>
                    Objective:
                  </p>
                  <p className='text-gray-800'>{objective}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowUserProfile;

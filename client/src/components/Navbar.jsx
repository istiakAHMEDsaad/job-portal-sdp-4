import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();

  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className='shadow py-4'>
      <div className='container md:px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img
          onClick={() => navigate('/')}
          className='cursor-pointer'
          src={assets.logo}
          alt='logo'
        />

        {/* Login Button */}
        {user ? (
          <div className='flex items-center gap-2'>
            <Link
              className='text-gray-600 hover:text-gray-900 hover:underline transition-all'
              to={'/applications'}
            >
              Applied Jobs
            </Link>
            <p className='maax-sm:flex md:hidden'> | </p>
            <div className='md:flex max-sm:hidden items-center gap-2'>
              <p> | </p>
              <p className='flex items-center gap-1'>
                Hi,
                <span className='italic capitalize'>
                  {user?.username
                    ? user.username
                    : user?.firstName + ' ' + user?.lastName}
                </span>
              </p>
            </div>
            <UserButton />
          </div>
        ) : (
          <div className='flex gap-4 max-sm:text-xs'>
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className='text-gray-600 hover:underline transition-transform cursor-pointer'
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className='bg-blue-600 hover:bg-blue-500 transition-colors text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

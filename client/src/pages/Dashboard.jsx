import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen'>
      {/* navbar for recruiter panael */}
      <div className='shadow py-4'>
        <div className='px-5 flex justify-between items-center'>
          <img
          onClick={()=>navigate('/')}
            className='max-sm:w-32 cursor-pointer'
            src={assets.logo}
            alt='logo'
          />
          <div className='flex items-center gap-3'>
            <p className='max-sm:hidden'>Welcome to JobPortal</p>
            <div className='relative group'>
              <img
                className='w-8 border border-gray-200 rounded-full'
                src={assets.company_icon}
                alt='company icon'
              />
              {/* dropdown */}
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border border-gray-200 text-sm'>
                  <li className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

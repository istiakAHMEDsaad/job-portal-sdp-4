import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img src={assets.logo} alt='logo' />

        {/* Login Button */}
        {user ? (
          <div className='flex items-center gap-3'>
            <Link
              className='text-gray-600 hover:text-gray-900 hover:underline transition-all'
              to={"/applications"}
            >
              Applied Jobs
            </Link>
            <p> | </p>
            <p>
              Hi,{" "}
              <span className='italic'>
                {user?.username.slice(0, 9)}
                {user?.username.length > 8 ? "..." : ""}
              </span>
            </p>
            <UserButton />
          </div>
        ) : (
          <div className='flex gap-4 max-sm:text-xs'>
            <button className='text-gray-600'>Recruiter Login</button>
            <button
              onClick={() => openSignIn()}
              className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'
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

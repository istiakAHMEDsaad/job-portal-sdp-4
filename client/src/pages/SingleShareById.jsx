import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import moment from 'moment';
import { useAuth } from '@clerk/clerk-react';

const SingleShareById = () => {
  const { id } = useParams();
  const { backendUrl, user } = useContext(AppContext);
  const { getToken } = useAuth();

  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isLoad, setIsLoad] = useState(true);

  const getDetails = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/users/job-experience/${id}`
      );
      if (data.success) {
        setDetails(data.data);
        setIsLoad(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleDeleteConfirm = () => {
    toast(
      ({ closeToast }) => (
        <div className='text-center'>
          <p className='font-medium mb-2'>Are you sure you want to delete?</p>
          <div className='flex justify-center items-center gap-3'>
            <button
              onClick={() => {
                closeToast();
                handleDelete();
              }}
              className='px-4 py-1 bg-red-600 text-white rounded'
            >
              Yes
            </button>

            <button
              onClick={closeToast}
              className='px-4 py-1 bg-gray-300 rounded'
            >
              No
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

  const handleDelete = async () => {
    const token = await getToken();

    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/users/delete-job-experience/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success('Post deleted successfully!');
        navigate('/share-experience');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const { description, email, image, name, updatedAt } = details || {};
  const authEmail = user?.primaryEmailAddress?.emailAddress;

  return (
    <div>
      <Navbar />
      <div className='mt-2 ml-1'>
        <button
          onClick={() => {
            navigate('/share-experience');
          }}
          className='px-4 py-2 rounded text-white bg-neutral-950 hover:bg-neutral-900 cursor-pointer'
        >
          &lt; Back
        </button>
      </div>

      {isLoad ? (
        <Loading />
      ) : (
        <div className='md:container mx-auto min-h-[calc(100vh-215px)] mt-5'>
          <div className='flex flex-col items-center justify-center'>
            {/* container */}
            <div className='w-full'>
              {/* image & name & button */}
              <div className='flex md:flex-row justify-between'>
                {/* img & name */}
                <div className='flex md:flex-row max-sm:flex-col gap-4 md:items-center'>
                  <img
                    src={image}
                    className='w-16 h-16 object-cover rounded-lg'
                    alt='img'
                  />
                  <div>
                    <p className='text-gray-500'>Name: {name}</p>
                    <p className='text-gray-500'>Email: {email}</p>
                    <p className='text-gray-500'>
                      Last Updated:{' '}
                      {moment(updatedAt).format('MMM DD, YYYY, h:mm A')}
                    </p>
                  </div>
                </div>

                {/* button */}
                {email && authEmail ? (
                  <div className='flex flex-col gap-4'>
                    <button
                      onClick={() => navigate(`/edit-job-experience/${id}`)}
                      className='bg-yellow-500 md:px-6 max-sm:px-4 py-1.5 rounded-md cursor-pointer hover:bg-yellow-400 transition-colors'
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDeleteConfirm}
                      className='bg-red-600 md:px-6 max-sm:px-4 py-1.5 rounded-md cursor-pointer hover:bg-red-500 transition-colors'
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* divider */}
              <div className='border-b border-gray-300 mt-3' />
              {/* description */}
              <div
                className='w-full rich-text'
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SingleShareById;

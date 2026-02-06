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
import { ArrowLeft } from 'lucide-react';

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
        `${backendUrl}/api/users/job-experience/${id}`,
      );
      if (data.success) {
        setDetails(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  const handleDeleteConfirm = () => {
    toast(
      ({ closeToast }) => (
        <div className='p-2'>
          <p className='font-semibold text-gray-800 mb-3'>
            Delete this post permanently?
          </p>
          <div className='flex justify-end gap-2'>
            <button
              onClick={closeToast}
              className='px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-all'
            >
              Cancel
            </button>
            <button
              onClick={() => {
                closeToast();
                handleDelete();
              }}
              className='px-4 py-1.5 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-all shadow-sm'
            >
              Confirm Delete
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeButton: false,
        position: 'top-center',
        className: 'rounded-xl shadow-2xl border border-gray-100',
      },
    );
  };

  const handleDelete = async () => {
    const token = await getToken();
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/users/delete-job-experience/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.success) {
        toast.success('Post removed');
        navigate('/share-experience');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { description, email, image, name, updatedAt } = details || {};
  const authEmail = user?.primaryEmailAddress?.emailAddress;

  if (isLoad) return <Loading />;

  return (
    <div className='bg-white min-h-screen font-sans text-gray-900'>
      <Navbar />

      {/* Breadcrumb / Back Navigation */}
      <div className='max-w-4xl mx-auto px-4 py-6'>
        <button
          onClick={() => navigate('/share-experience')}
          className='flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors group cursor-pointer'
        >
          <span className='group-hover:-translate-x-1 transition-transform'>
            {/* ← */}
            <ArrowLeft size={20} />
          </span>{' '}
          Back to Experiences
        </button>
      </div>

      <main className='max-w-4xl mx-auto px-4 pb-24'>
        {/* Header Section */}
        <header className='mb-10'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
            {/* Author Profile */}
            <div className='flex items-center gap-4'>
              <img
                src={image}
                className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-2xl shadow-md border-2 border-white ring-1 ring-gray-100'
                alt={name}
              />
              <div>
                <h1 className='text-2xl font-bold text-gray-900 leading-tight'>
                  {name}
                </h1>
                <p className='text-gray-500 text-sm mb-1'>{email}</p>
                <div className='flex items-center gap-2 text-xs font-medium text-gray-400'>
                  <span>
                    Published {moment(updatedAt).format('MMMM DD, YYYY')}
                  </span>
                  <span>•</span>
                  <span>{moment(updatedAt).format('h:mm A')}</span>
                </div>
              </div>
            </div>

            {/* Actions for Owner */}
            {email === authEmail && (
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => navigate(`/edit-job-experience/${id}`)}
                  className='flex-1 md:flex-none px-5 py-2 text-sm font-semibold border border-gray-200 rounded-full hover:bg-gray-50 transition-all text-gray-700'
                >
                  Edit Post
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className='flex-1 md:flex-none px-5 py-2 text-sm font-semibold bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-all'
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className='h-[1px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 mt-10' />
        </header>

        {/* Article Body */}
        <article className='prose prose-lg prose-indigo max-w-none'>
          {/* Using a wrapper to handle Quill's specific styling */}
          <div
            className='rich-text-content text-gray-700 leading-relaxed'
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </article>
      </main>

      <Footer />

      {/* Global CSS injected via style tag for the rich text content */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .rich-text-content h2 { font-size: 1.875rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #111827; }
        .rich-text-content p { margin-bottom: 1.25rem; }
        .rich-text-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .rich-text-content blockquote { border-left: 4px solid #4f46e5; padding-left: 1rem; font-style: italic; color: #4b5563; }
      `,
        }}
      />
    </div>
  );
};

export default SingleShareById;

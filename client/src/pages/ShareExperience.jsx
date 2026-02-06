import { useEffect, useState, useRef, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { AppContext } from '../context/AppContext';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Components
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

const ShareExperience = () => {
  const [shareData, setShareData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [isLoad, setIsLoad] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { backendUrl, user } = useContext(AppContext);
  const { getToken } = useAuth();

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const fetchShareData = async () => {
    try {
      setIsLoad(true);
      const token = await getToken();
      const { data } = await axios.get(
        `${backendUrl}/api/users/job-experience`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        setShareData(data.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchShareData();
  }, []);

  // Initialize Quill
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'clean'],
          ],
        },
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = quillRef.current.root.innerHTML;

    // Simple validation: check if editor is empty
    if (quillRef.current.getText().trim().length < 10) {
      return toast.warn('Please share a bit more detail.');
    }

    try {
      setIsSubmitting(true);
      const token = await getToken();
      const formData = {
        description,
        email: user.primaryEmailAddress.emailAddress,
        image: user.imageUrl,
        name:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.username,
      };

      const res = await axios.post(
        `${backendUrl}/api/users/post-job-experience`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data.success) {
        quillRef.current.root.innerHTML = '';
        fetchShareData();
        toast.success('Experience shared successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions for content preview
  const getCleanText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstIndex = lastPostIndex - postsPerPage;
  const currentPosts = shareData?.slice(firstIndex, lastPostIndex);
  const pageCount = Math.ceil(shareData?.length / postsPerPage);

  return (
    <div className='bg-gray-50 min-h-screen font-sans'>
      <Navbar />

      <main className='max-w-6xl mx-auto px-4 py-12'>
        {/* Header Section */}
        <section className='text-center mb-12'>
          <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight mb-4'>
            Community Insights
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Real stories from real professionals. Share your journey to help
            others navigate their career paths.
          </p>
        </section>

        {/* Post Form Card */}
        <section className='max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16'>
          <div className='flex items-center gap-3 mb-6'>
            <img
              src={user?.imageUrl}
              className='w-10 h-10 rounded-full border shadow-sm'
              alt='User'
            />
            <span className='font-semibold text-gray-700'>
              Share your experience
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='rounded-lg overflow-hidden border border-gray-200'>
              <div
                ref={editorRef}
                style={{ height: '200px', border: 'none' }}
              ></div>
            </div>

            <div className='mt-4 flex justify-end'>
              <button
                disabled={isSubmitting}
                className={`px-8 py-2.5 rounded-full font-medium transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg active:scale-95'
                }`}
                type='submit'
              >
                {isSubmitting ? 'Posting...' : 'Post Insight'}
              </button>
            </div>
          </form>
        </section>

        <hr className='border-gray-200 mb-16' />

        {/* Feed Section */}
        {isLoad ? (
          <Loading />
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
              {currentPosts.map((item) => (
                <Link
                  to={`/share-experience/${item._id}`}
                  key={item._id}
                  className='group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between'
                >
                  <div>
                    <div className='flex items-center gap-4 mb-5'>
                      <img
                        className='w-12 h-12 object-cover rounded-full ring-2 ring-gray-50'
                        src={item?.image}
                        alt={item?.name}
                      />
                      <div className='overflow-hidden'>
                        <h3 className='text-sm font-bold text-gray-900 truncate'>
                          {item?.name}
                        </h3>
                        <p className='text-xs text-gray-400'>
                          {moment(item?.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <div className='prose prose-sm text-gray-600 line-clamp-4 mb-4'>
                      {getCleanText(item?.description)}
                    </div>
                  </div>

                  <div className='pt-4 border-t border-gray-50 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all'>
                    Read full story <span>→</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {shareData.length > postsPerPage && (
              <div className='flex justify-center mt-8'>
                <ReactPaginate
                  previousLabel={'←'}
                  nextLabel={'→'}
                  pageCount={pageCount}
                  onPageChange={(e) => setCurrentPage(e.selected + 1)}
                  containerClassName={'flex items-center gap-2'}
                  pageClassName={
                    'w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors'
                  }
                  activeClassName={
                    '!bg-indigo-600 !border-indigo-600 !text-white'
                  }
                  previousClassName={
                    'w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100'
                  }
                  nextClassName={
                    'w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100'
                  }
                  disabledClassName={'opacity-30 cursor-not-allowed'}
                />
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShareExperience;

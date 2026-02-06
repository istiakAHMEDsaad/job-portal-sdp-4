import  { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EditJobExperience = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { id } = useParams();
  const { backendUrl, user } = useContext(AppContext);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

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

  // Fetch existing experience
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setIsFetching(true);
        const { data } = await axios.get(
          `${backendUrl}/api/users/job-experience/${id}`,
        );

        if (data.success && quillRef.current) {
          quillRef.current.root.innerHTML = data.data.description;
        }
      } catch (error) {
        toast.error('Failed to load experience data');
        navigate('/share-experience');
      } finally {
        setIsFetching(false);
      }
    };

    if (id) fetchExperience();
  }, [id, backendUrl, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = quillRef.current.root.innerHTML;

    if (quillRef.current.getText().trim().length < 10) {
      return toast.warn('Content is too short!');
    }

    try {
      setIsSubmitting(true);
      const token = await getToken();

      const { data } = await axios.patch(
        `${backendUrl}/api/users/edit-job-experience/${id}`,
        { description },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success('Changes saved successfully');
        navigate(`/share-experience/${id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen font-sans flex flex-col'>
      <Navbar />

      <main className='flex-grow max-w-4xl mx-auto w-full px-4 py-8'>
        {/* Top Navigation */}
        <div className='mb-8'>
          <button
            onClick={() => navigate(`/share-experience/${id}`)}
            className='flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-all group cursor-pointer'
          >
            <ArrowLeft
              size={18}
              className='group-hover:-translate-x-1 transition-transform'
            />
            Cancel and go back
          </button>
        </div>

        {/* Content Card */}
        <div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-8 border-b border-gray-50 bg-gray-50/50'>
            <h1 className='text-3xl font-bold text-gray-900'>Edit Insight</h1>
            <p className='text-gray-500 mt-1'>
              Refine your story to help the community better.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <img
                src={user?.imageUrl}
                className='w-10 h-10 rounded-full ring-2 ring-white shadow-sm'
                alt='User'
              />
              <div>
                <span className='block font-bold text-gray-800 text-sm'>
                  {user?.fullName || 'Editor'}
                </span>
                <span className='text-xs text-gray-400 font-medium uppercase tracking-wider'>
                  Author
                </span>
              </div>
            </div>

            <div className='relative'>
              {isFetching && (
                <div className='absolute inset-0 bg-white/80 z-10 flex items-center justify-center rounded-xl'>
                  <Loader2 className='animate-spin text-blue-600' size={32} />
                </div>
              )}

              <div className='rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-500 transition-colors'>
                <div
                  ref={editorRef}
                  style={{ height: '350px', border: 'none' }}
                  className='text-lg'
                ></div>
              </div>
            </div>

            <div className='mt-8 flex items-center justify-between'>
              <p className='text-xs text-gray-400 italic'>
                All changes are public once you hit save.
              </p>
              <button
                disabled={isSubmitting || isFetching}
                className={`flex items-center gap-2 px-10 py-3 rounded-full font-bold transition-all duration-300 ${
                  isSubmitting || isFetching
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 shadow-lg hover:shadow-blue-300 active:scale-95'
                }`}
                type='submit'
              >
                {isSubmitting ? (
                  <>
                    {' '}
                    <Loader2 size={18} className='animate-spin' />{' '}
                    Saving...{' '}
                  </>
                ) : (
                  <>
                    {' '}
                    <Save size={18} /> Save Changes{' '}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />

      {/* Custom styles for Quill toolbar to match modern UI */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ql-toolbar.ql-snow {
          border: none !important;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb !important;
          padding: 12px !important;
        }
        .ql-container.ql-snow {
          border: none !important;
          font-family: inherit !important;
          font-size: 1.1rem !important;
        }
        .ql-editor.ql-blank::before {
          color: #9ca3af !important;
          font-style: normal !important;
        }
      `,
        }}
      />
    </div>
  );
};

export default EditJobExperience;

import Quill from 'quill';
import { useContext, useEffect, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const EditJobExperience = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);
  const { getToken } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    // intiate quill
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  // Fetch existing experience
  const fetchExperience = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/users/job-experience/${id}`
      );

      if (data.success) {
        // Set the existing description into Quill
        if (quillRef.current) {
          quillRef.current.root.innerHTML = data.data.description;
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      fetchExperience();
    }
  }, [quillRef.current]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = quillRef.current.root.innerHTML;
    const token = await getToken();

    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/users/edit-job-experience/${id}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        navigate(`/share-experience/${id}`);
        toast.success('Post updated successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  

  return (
    <div>
      <Navbar />
      <div className='mt-2 ml-1'>
        <button
          onClick={() => {
            navigate(`/share-experience/${id}`);
          }}
          className='bg-neutral-950 text-white px-5 py-2 rounded-md cursor-pointer'
        >
          &lt; Back
        </button>
      </div>

      {/* edit section */}

      <div className='md:container mx-auto min-h-[calc(100vh-215px)]'>
        {/* Heading */}
        <div className='text-center py-10'>
          <h1 className='text-3xl font-bold text-gray-900'>Edit your post</h1>
          <p className='text-gray-600 mt-2'>Update the latest news</p>
        </div>

        {/* Share Box */}
        <div className='w-full max-w-lg mb-10 mx-auto'>
          <p className='my-2'>Description Here</p>
          <form onSubmit={handleSubmit}>
            <div ref={editorRef} className='pb-10'></div>
            <button
              className='px-6 py-2 bg-neutral-950 rounded text-gray-200 hover:bg-neutral-900 transition-colors cursor-pointer mt-3'
              type='submit'
            >
              Update
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditJobExperience;

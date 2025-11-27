import Quill from 'quill';
import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EditJobExperience = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // intiate quill
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  const handleSubmit = async () => {};

  return (
    <div>
      <Navbar />
      <div className='md:container mx-auto min-h-[calc(100vh-215px)]'>
        {/* Heading */}
        <div className='text-center py-10'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Edit your post
          </h1>
          <p className='text-gray-600 mt-2'>
            Update the latest news
          </p>
        </div>

        {/* Share Box */}
        <div className='w-full max-w-lg mb-10'>
          <p className='my-2'>Description Here</p>
          <form onSubmit={handleSubmit}>
            <div ref={editorRef} className='pb-10'></div>
            <button
              className='px-6 py-2 bg-neutral-950 rounded text-gray-200 hover:bg-neutral-900 transition-colors cursor-pointer mt-3'
              type='submit'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditJobExperience;

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditPortfolio = () => {
  const { userData, backendUrl } = useContext(AppContext);
  const { email, image, name } = userData || {};
  const { getToken } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const phone = form.get('phone');
    const address = form.get('address');
    const education = form.get('education');
    const rawSkill = form.get('programmingLanguage');
    const experience = form.get('experience');
    const about = form.get('about');
    const objective = form.get('objective');

    const skill = rawSkill
      ? rawSkill
          .split(/[\s,]+/)
          .map((ski) => ski.trim())
          .filter((s) => s.length > 0)
      : [];

    const finalData = {
      name,
      image,
      email,
      phone,
      address,
      education,
      skill,
      experience,
      objective,
      about,
    };

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/post-user-info`,
        finalData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    navigate('/portfolio');
  };

  return (
    <div>
      <Navbar />
      <div>
        <p className='text-2xl text-center py-8 text-gray-800'>
          Update Your Information Here
        </p>
        <form
          onSubmit={handleSubmit}
          className='mx-auto grid max-w-lg grid-cols-1 gap-4 rounded-lg border border-gray-300 p-6 sm:grid-cols-2'
        >
          {/* name */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              for='name'
            >
              Name
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='name'
              type='text'
              name='name'
              placeholder='Your name'
              defaultValue={name}
              disabled
            />
          </div>

          {/* image */}
          <label htmlFor='image'>Image</label>
          <div className='md:col-span-2'>
            <div
              id='image'
              className='border border-gray-300 shadow inline-block p-2 rounded'
            >
              <img className='w-14 rounded' src={image} alt='avatar' />
            </div>
          </div>

          {/* email */}
          <div>
            <label
              className='block text-sm font-medium text-gray-900'
              for='email'
            >
              Email
            </label>

            <input
              className='mt-1 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='email'
              name='email'
              type='email'
              placeholder='Your email'
              value={email}
              disabled
            />
          </div>

          {/* phone */}
          <div>
            <label
              className='block text-sm font-medium text-gray-900'
              for='phone'
            >
              Phone
            </label>

            <input
              className='mt-1 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='phone'
              name='phone'
              type='tel'
              placeholder='Your phone'
            />
          </div>

          {/* address */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              for='address'
            >
              Home Address
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='address'
              name='address'
              type='text'
              placeholder='Your home address'
            />
          </div>

          {/* education */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              for='education'
            >
              Education
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='education'
              name='education'
              type='text'
              placeholder='Please enter your degree'
            />
          </div>

          {/* skills */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              for='programmingLanguage'
            >
              Programming Language
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='programmingLanguage'
              name='programmingLanguage'
              type='text'
              placeholder='use comma (e.g: c, c++, java, python)'
            />
          </div>

          {/* experience */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              for='experience'
            >
              Experience
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='experience'
              name='experience'
              type='text'
              placeholder='Tell your previous job experience'
            />
          </div>

          {/* objective */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              for='objective'
            >
              Objective
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='objective'
              name='objective'
              type='text'
              placeholder='Tell your life objective or goal'
            />
          </div>

          {/* description */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              for='about'
            >
              About
            </label>

            <textarea
              className='mt-1 w-full resize-none rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='about'
              name='about'
              rows='4'
              placeholder='Tell about yourself...'
            ></textarea>
          </div>

          <div className='md:col-span-2'>
            <button
              className='block w-full rounded-lg border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-blue-600'
              type='submit'
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPortfolio;

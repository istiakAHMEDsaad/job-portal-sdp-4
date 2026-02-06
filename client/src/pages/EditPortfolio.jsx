import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditPortfolio = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, portfolioData, fetchPortfolio } =
    useContext(AppContext);

  const { email, image, name } = userData || {};

  const { about, address, education, experience, objective, phone, skill } =
    portfolioData || {};

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
      await axios.put(`${backendUrl}/api/users/portfolio`, finalData, {
        withCredentials: true,
      });

      fetchPortfolio();

      toast.success('Portfolio Updated');
      navigate('/portfolio');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        {/* back button */}
        <div className='ml-4 mt-6 max-sm:block lg:hidden'>
          <Link
            className='px-4 py-2 rounded bg-neutral-950 hover:bg-neutral-900 transition-colors cursor-pointer text-gray-200 mb-8'
            to={-1}
          >
            Back
          </Link>
        </div>

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
              htmlFor='name'
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
          <label>Image</label>
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
              htmlFor='email'
            >
              Email
            </label>

            <input
              className='mt-1 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='email'
              name='email'
              type='email'
              placeholder='Your email'
              defaultValue={email}
              disabled
            />
          </div>

          {/* phone */}
          <div>
            <label
              className='block text-sm font-medium text-gray-900'
              htmlFor='phone'
            >
              Phone
            </label>

            <input
              className='mt-1 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='phone'
              name='phone'
              type='tel'
              placeholder='Your phone'
              defaultValue={phone}
            />
          </div>

          {/* address */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              htmlFor='address'
            >
              Home Address
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='address'
              name='address'
              type='text'
              placeholder='Your home address'
              defaultValue={address}
            />
          </div>

          {/* education */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              htmlFor='education'
            >
              Education
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='education'
              name='education'
              type='text'
              placeholder='Please enter your degree'
              defaultValue={education}
            />
          </div>

          {/* skills */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              htmlFor='programmingLanguage'
            >
              Programming Language
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='programmingLanguage'
              name='programmingLanguage'
              type='text'
              placeholder='use comma (e.g: c, c++, java, python)'
              defaultValue={skill?.join(', ')}
            />
          </div>

          {/* experience */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              htmlFor='experience'
            >
              Experience
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='experience'
              name='experience'
              type='text'
              placeholder='Tell your previous job experience'
              defaultValue={experience}
            />
          </div>

          {/* objective */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              htmlFor='objective'
            >
              Objective
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='objective'
              name='objective'
              type='text'
              placeholder='Tell your life objective or goal'
              defaultValue={objective}
            />
          </div>

          {/* description */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              htmlFor='about'
            >
              About
            </label>

            <textarea
              className='mt-1 w-full resize-none rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='about'
              name='about'
              rows='4'
              placeholder='Tell about yourself...'
              defaultValue={about}
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

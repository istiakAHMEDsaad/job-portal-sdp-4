import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const EditPortfolio = () => {
  const [image, setImage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");
    const education = form.get("education");
    const rawSkill = form.get("programmingLanguage");
    const address = form.get("address");
    const about = form.get("about");

    const skill = rawSkill
      ? rawSkill
          .split(/[\s,]+/)
          .map((ski) => ski.trim())
          .filter((s) => s.length > 0)
      : [];

    const finalData = {
      name,
      email,
      phone,
      address,
      skill,
      education,
      about,
    };

    console.log(finalData);
  };

  return (
    <div>
      <Navbar />
      <div>
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
            />
          </div>

          {/* image */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              for='image'
            >
              Profile Picture
            </label>

            <input
              className='mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='image'
              name='image'
              type='file'
            />
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

          {/* description */}
          <div className='md:col-span-2'>
            <label
              className='block text-sm font-medium text-gray-900'
              for='description'
            >
              About
            </label>

            <textarea
              className='mt-1 w-full resize-none rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2'
              id='description'
              name='description'
              rows='4'
              placeholder='Description here...'
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

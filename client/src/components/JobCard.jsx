import { assets } from "../assets/assets";

const JobCard = ({ job }) => {
  const { title, location, level, description } = job || {};
  return (
    <div className='border border-gray-200 p-6 shadow rounded'>
      <div className='flex justify-between items-center'>
        <img className='h-8' src={assets.company_icon} alt='company logo' />
      </div>

      <h4 className='font-medium text-xl mt-2'>{title}</h4>

      <div className='flex items-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
          {location}
        </span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
          {level}
        </span>
      </div>

      <p
        className='text-gray-500 text-sm mt-4'
        dangerouslySetInnerHTML={{ __html: description.slice(0, 150) }}
      ></p>

      <div className='mt-4 flex gap-4 text-sm'>
        <button className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition-colors'>
          Apply Now
        </button>
        <button className='text-gray-500 border border-gray-500 rounded px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors'>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;

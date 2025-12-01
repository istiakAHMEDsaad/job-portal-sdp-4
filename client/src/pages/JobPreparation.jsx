import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobPrepare from '../assets/gif/interview.gif'
import ResumePrepare from '../assets/gif/resume.gif'

const JobPreparation = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const videos = [
    {
      type: 'Video',
      title: 'How to Prepare for Job Interviews',
      thumbnail: JobPrepare,
      link: 'https://www.youtube.com/watch?v=K2g_1TzE4n0',
      description:
        'Phosfluorescently mesh principle-centered expertise whereas installed base mindshare. Collaboratively e-enable extensible convergence via end-to-end systems. Quickly reintermediate go forward web-readiness.',
    },
    {
      type: 'Video',
      title: 'Resume & CV Writing Tips',
      thumbnail: ResumePrepare,
      link: 'https://www.youtube.com/watch?v=YlJ_4Z6oZKY',
      description:
        'Objectively synthesize principle-centered e-services with best-of-breed technology. Conveniently brand open-source bandwidth for error-free testing procedures. Quickly generate e-business internal or.',
    },
    {
      type: 'Video',
      title: 'Top 50 Interview Questions',
      thumbnail: JobPrepare,
      link: 'https://www.youtube.com/watch?v=DHDrj0_bMQ0',
      description:
        'Conveniently underwhelm end-to-end interfaces before excellent niche markets. Enthusiastically visualize impactful networks without emerging metrics. Enthusiastically myocardinate bleeding-edge paradigms before.',
    },
  ];

  const blogs = [
    {
      type: 'Blog',
      name: 'BDJobs Career Blog',
      thumbnail: JobPrepare,
      link: 'https://blog.bdjobs.com/',
      description:
        'Collaboratively redefine stand-alone deliverables rather than out-of-the-box action items. Rapidiously redefine performance based information rather than one-to-one infomediaries. Quickly strategize.',
    },
    {
      type: 'Blog',
      name: 'LinkedIn Career Advice',
      thumbnail: JobPrepare,
      link: 'https://www.linkedin.com/advice/',
      description:
        'Professionally negotiate leveraged supply chains with highly efficient meta-services. Quickly transform future-proof e-services through tactical niches. Quickly reconceptualize visionary core.',
    },
    {
      type: 'Blog',
      name: 'Indeed Career Guide',
      thumbnail: JobPrepare,
      link: 'https://www.indeed.com/career-advice',
      description:
        'Progressively re-engineer functionalized process improvements before just in time quality vectors. Appropriately disseminate distinctive best practices via installed base models.',
    },
  ];

  const books = [
    {
      type: 'Book',
      title: 'Cracking the Coding Interview',
      author: 'Gayle Laakmann McDowell',
      thumbnail: JobPrepare,
      link: 'https://www.amazon.com/dp/0984782850',
      description:
        'Monotonectally facilitate real-time resources via client-centered e-business. Monotonectally promote impactful channels before accurate internal or "organic" sources. Authoritatively promote covalent.',
    },
    {
      type: 'Book',
      title: 'The Software Developer’s Career Guide',
      author: 'John Sonmez',
      thumbnail: JobPrepare,
      link: 'https://www.amazon.com/dp/0999081411',
      description:
        'Collaboratively repurpose fully tested models and go forward e-business. Enthusiastically pursue extensive initiatives through pandemic services. Energistically evolve B2B innovation.',
    },
    {
      type: 'Book',
      title: 'Soft Skills — Developer’s Life',
      author: 'John Sonmez',
      thumbnail: JobPrepare,
      link: 'https://www.amazon.com/dp/1617292397',
      description:
        'Interactively synergize quality expertise rather than synergistic ROI. Conveniently exploit extensive imperatives after end-to-end manufactured products. Rapidiously develop focused portals.',
    },
  ];

  const allData = [...videos, ...blogs, ...books];

  // Filter logic
  const filteredData = allData.filter((item) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      item.title?.toLowerCase().includes(searchLower) ||
      item.name?.toLowerCase().includes(searchLower) ||
      item.author?.toLowerCase().includes(searchLower);

    const matchesFilter = filter === 'All' || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto px-5 py-12'>
        <h1 className='text-3xl font-bold text-center mb-10'>
          Job Preparation Hub
        </h1>

        {/* Search Bar */}
        <div className='mb-6'>
          <input
            type='text'
            placeholder='Search videos, blogs or books...'
            className='w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className='flex justify-center gap-3 mb-10'>
          {['All', 'Video', 'Blog', 'Book'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full border border-gray-300 transition ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white hover:bg-gray-100'
              } cursor-pointer`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className='grid md:grid-cols-3 gap-6'>
          {filteredData.map((item, idx) => (
            // <a
            //   key={i}
            //   href={item.link}
            //   target='_blank'
            //   className='p-6 bg-white border border-gray-300 rounded-xl shadow lg:hover:scale-[103%] transition-transform'
            // >
            //   <p className='text-sm font-semibold text-blue-600'>{item.type}</p>

            //   {/* <DotLottieReact src={item.lottiPath} loop autoplay /> */}
            //   <h3 className='text-md font-bold mt-2'>
            //     {item.title || item.name}
            //   </h3>
            //   {item.author && (
            //     <p className='text-gray-600 mt-1'>By: {item.author}</p>
            //   )}
            //   <button className='mt-4 inline-block text-blue-500 underline'>
            //     Open →
            //   </button>
            // </a>

            <div
              key={idx}
              className='relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-start justify-between'
            >
              <img
                className='rounded-t-lg w-96 h-56 object-cover object-top'
                src={item.thumbnail}
                alt='image'
              />

              <div className='p-5'>
                <div>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                    {item.title || item.name}
                  </h5>
                </div>

                <p className='text-gray-600'>
                  {item.description.slice(0, 100)}...
                </p>

                <p className='mb-3 font-mal text-blue-500 text-sm'>
                  #{item.type}
                </p>

                <a
                  href={item.link}
                  target='_blank'
                  className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors'
                >
                  Read more
                  <svg
                    className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M1 5h12m0 0L9 1m4 4L9 9'
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <p className='text-center mt-10 text-gray-600'>No results found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default JobPreparation;

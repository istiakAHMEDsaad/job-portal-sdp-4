import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const JobPreparation = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const videos = [
    {
      type: 'Video',
      title: 'How to Prepare for Job Interviews',
      link: 'https://www.youtube.com/watch?v=K2g_1TzE4n0',
    },
    {
      type: 'Video',
      title: 'Resume & CV Writing Tips',
      link: 'https://www.youtube.com/watch?v=YlJ_4Z6oZKY',
    },
    {
      type: 'Video',
      title: 'Top 50 Interview Questions',
      link: 'https://www.youtube.com/watch?v=DHDrj0_bMQ0',
    },
  ];

  const blogs = [
    {
      type: 'Blog',
      name: 'BDJobs Career Blog',
      link: 'https://blog.bdjobs.com/',
    },
    {
      type: 'Blog',
      name: 'LinkedIn Career Advice',
      link: 'https://www.linkedin.com/advice/',
    },
    {
      type: 'Blog',
      name: 'Indeed Career Guide',
      link: 'https://www.indeed.com/career-advice',
    },
  ];

  const books = [
    {
      type: 'Book',
      title: 'Cracking the Coding Interview',
      author: 'Gayle Laakmann McDowell',
      link: 'https://www.amazon.com/dp/0984782850',
    },
    {
      type: 'Book',
      title: 'The Software Developer’s Career Guide',
      author: 'John Sonmez',
      link: 'https://www.amazon.com/dp/0999081411',
    },
    {
      type: 'Book',
      title: 'Soft Skills — Developer’s Life',
      author: 'John Sonmez',
      link: 'https://www.amazon.com/dp/1617292397',
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
              className={`px-5 py-2 rounded-full border transition ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className='grid md:grid-cols-3 gap-6'>
          {filteredData.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target='_blank'
              className='p-6 bg-white border border-gray-300 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1'
            >
              <p className='text-sm font-semibold text-blue-600'>{item.type}</p>
              <h3 className='text-xl font-bold mt-2'>
                {item.title || item.name}
              </h3>
              {item.author && (
                <p className='text-gray-600 mt-1'>By: {item.author}</p>
              )}
              <button className='mt-4 inline-block text-blue-500 underline'>
                Open →
              </button>
            </a>
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

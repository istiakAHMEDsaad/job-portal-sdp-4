import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  assets,
  JobCategories,
  JobLevel,
  JobLocations,
} from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
  const { searchFilter, isSearched, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const numOfCard = 6;

  const [selectedLocation, setSelecteedLocation] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleLevelChange = (level) => {
    setSelectedLevel((prev) =>
      prev.includes(level)
        ? prev.filter((lvl) => lvl !== level)
        : [...prev, level]
    );
  };

  // if category is there it's remove from the array, if not new category are added
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cate) => cate !== category)
        : [...prev, category]
    );
  };

  // location
  const handleLocationChange = (location) => {
    setSelecteedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((loca) => loca !== location)
        : [...prev, location]
    );
  };

  // filter the data
  useEffect(() => {
    const matchesLevel = (job) =>
      selectedLevel.length === 0 || selectedLevel.includes(job.level);

    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === '' ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === '' ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    // reverse data for latest job
    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesLevel(job) &&
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentpage(1);
  }, [jobs, selectedLevel, selectedCategories, selectedLocation, searchFilter]);

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      {/* sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>
        {/* search filter from hero component */}
        {isSearched &&
          (searchFilter.title !== '' || searchFilter.location !== '') && (
            <>
              <h3 className='font-medium text-lg mb-4'>Current Search</h3>

              <div className='mb-4 text-gray-600'>
                {searchFilter.title && (
                  <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                    {searchFilter.title}{' '}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: '' }))
                      }
                      className='cursor-pointer'
                      src={assets.cross_icon}
                      alt='cross icon'
                    />
                  </span>
                )}

                {searchFilter.location && (
                  <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                    {searchFilter.location}{' '}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: '' }))
                      }
                      className='cursor-pointer'
                      src={assets.cross_icon}
                      alt='cross icon'
                    />
                  </span>
                )}
              </div>
            </>
          )}

        {/* Mobile Devices */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'
        >
          {showFilter ? 'Close' : 'Filters'}
        </button>

        {/* Level Filter */}
        <div className={showFilter ? '' : 'max-lg:hidden'}>
          <h4 className='font-medium text-lg py-4'>Search by Level</h4>

          <ul className='space-y-4 text-gray-600'>
            {JobLevel.map((level, index) => (
              <li className='flex gap-3 items-center' key={index}>
                <input
                  className='scale-125'
                  type='checkbox'
                  onChange={() => handleLevelChange(level)}
                  checked={selectedLevel.includes(level)}
                />
                {level}
              </li>
            ))}
          </ul>
        </div>

        {/* Category Filter */}
        <div className={showFilter ? '' : 'max-lg:hidden'}>
          <h4 className='font-medium text-lg py-4 pt-14'>
            Search by Categories
          </h4>

          <ul className='space-y-4 text-gray-600'>
            {JobCategories.map((category, index) => (
              <li className='flex gap-3 items-center' key={index}>
                <input
                  className='scale-125'
                  type='checkbox'
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className={showFilter ? '' : 'max-lg:hidden'}>
          <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>

          <ul className='space-y-4 text-gray-600'>
            {JobLocations.map((location, index) => (
              <li className='flex gap-3 items-center' key={index}>
                <input
                  className='scale-125'
                  type='checkbox'
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocation.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listing */}
      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>
          Latest Jobs
        </h3>
        <p className='mb-8'>Get your desire job from top companies</p>

        {/* card container */}
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {filteredJobs
            .slice((currentPage - 1) * numOfCard, currentPage * numOfCard)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* pagination */}
        {filteredJobs.length > 0 && (
          <div className='flex items-center justify-center space-x-2 mt-10'>
            {/* left arrow */}
            <a href='#job-list'>
              <img
                onClick={() => setCurrentpage(Math.max(currentPage - 1), 1)}
                src={assets.left_arrow_icon}
                alt='<'
              />
            </a>

            {Array.from({
              length: Math.ceil(filteredJobs.length / numOfCard),
            }).map((_, index) => (
              <a href='#job-list' key={index}>
                <button
                  onClick={() => setCurrentpage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-100 text-blue-500'
                      : 'text-gray-500'
                  } cursor-pointer`}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            {/* right arrow 1, 4 */}
            <a href='#job-list'>
              <img
                onClick={() =>
                  setCurrentpage(
                    Math.min(currentPage + 1),
                    Math.ceil(filteredJobs.length / numOfCard)
                  )
                }
                src={assets.right_arrow_icon}
                alt='>'
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;

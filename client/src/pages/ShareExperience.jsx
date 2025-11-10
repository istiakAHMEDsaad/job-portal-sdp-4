import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { experiences } from "../assets/assets";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ShareExperience = () => {
  const [shareData, setShareData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const fetchShareDate = async () => {
    setShareData(experiences);
  };

  useEffect(() => {
    fetchShareDate();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstIndex = lastPostIndex - postsPerPage;
  const currentPosts = shareData?.slice(firstIndex, lastPostIndex);
  const pageCount = Math.ceil(shareData?.length / postsPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e?.selected + 1);
  };

  return (
    <div>
      <Navbar />

      <div className='min-h-screen bg-gray-50 text-gray-800 flex flex-col'>
        {/* Heading */}
        <div className='text-center py-10'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Share Your Thoughts
          </h1>
          <p className='text-gray-600 mt-2'>
            Tell others about your job experience and inspire them!
          </p>
        </div>

        {/* Share Box */}
        <div className='w-full xl:max-w-5xl lg:max-w-4xl md:max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mb-10'>
          <textarea
            rows='4'
            placeholder='Write about your job experience...'
            className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-gray-400'
          ></textarea>
          <button className='mt-3 bg-neutral-950 text-white px-6 py-2 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer'>
            Share
          </button>
        </div>

        {/* Experiences Section */}
        <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
          {currentPosts.map((item) => (
            <div key={item.id} class='flex flex-row-reverse items-end gap-4'>
              <img
                alt='image'
                src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;w=1160'
                class='size-20 rounded object-cover'
              />

              <div>
                <h3 class='font-medium text-gray-900 sm:text-lg'>
                  {item.name}
                </h3>

                <p className='text-sm text-gray-500 mb-2'>
                  {item.jobTitle} @ {item.company}
                </p>

                <p class='mt-0.5 text-gray-700'>{item.experience}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='flex justify-center mb-10'>
          <ReactPaginate
            previousLabel={"< Prev"}
            breakLabel={"..."}
            nextLabel={"Next >"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName='flex gap-1 items-center'
            pageClassName='px-3 py-1 border rounded border-gray-500 cursor-pointer block'
            activeClassName='bg-neutral-950 border px-3 py-1 text-white'
            previousClassName='px-3 py-1 border border-gray-500 rounded cursor-pointer'
            nextClassName='px-3 py-1 border border-gray-500 rounded cursor-pointer'
            disabledClassName='opacity-50 cursor-not-allowed'
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShareExperience;

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
// import { experiences } from '../assets/assets';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Quill from 'quill';
import { useRef } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ShareExperience = () => {
  const [shareData, setShareData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, _] = useState(6);

  const [isLoad, setIsLoad] = useState(true);

  const { backendUrl, user } = useContext(AppContext);
  const { getToken } = useAuth();

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const fetchShareDate = async () => {
    // setShareData(experiences);
    try {
      const token = await getToken();

      const { data } = await axios.get(
        `${backendUrl}/api/users/job-experience`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setShareData(data.data);
        setIsLoad(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
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

  useEffect(() => {
    // intiate quill
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  // Post Experience Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = quillRef.current.root.innerHTML;
    const token = await getToken();

    // const userId = await user.id;
    const userImg = await user.imageUrl;
    const userEmail = await user.primaryEmailAddress.emailAddress;
    const userName =
      user.firstName && user.lastName
        ? user.firstName + ' ' + user.lastName
        : user.username;

    const formData = {
      description,
      email: userEmail,
      image: userImg,
      name: userName,
    };

    try {
      const res = await axios.post(
        `${backendUrl}/api/users/post-job-experience`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        quillRef.current.root.innerHTML = '';
        fetchShareDate();
        toast.success('Your post have been uploaded!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const extractH2Text = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const h2 = doc.querySelector("h2");
    return h2 ? h2.textContent : "";
  };

  const extractPara = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const p = doc.querySelector("p");
    return p ? p.textContent : "";
  }


  return (
    <div>
      <Navbar />

      <div className='min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center'>
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
        <div className='w-full max-w-lg mb-10'>
          <p className='my-2'>Job Description</p>
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

        {isLoad ? (
          <Loading />
        ) : (
          <>
            {/* Experiences Section */}
            <div className='container grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 justify-center mx-auto gap-6'>
              {currentPosts.map((item) => (
                <Link to={`/share-experience/${item._id}`}
                  key={item._id} className="w-full border border-gray-200 p-6 rounded-xl mx-2 max-w-4xl">
                  <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between w-full text-gray-500">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <img className="w-20 h-20 object-cover rounded-md" src={item?.image} alt="image" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-800">{item?.name}</h3>
                        <div>{extractH2Text(item?.description)}</div>
                      </div>
                    </div>
                    <div>{moment(item?.createdAt).format('MMM DD, YYYY, h:mm A')}</div>
                  </div>
                  <p className='text-gray-500'>{extractPara(item?.description).slice(0, 100)}</p>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {shareData.length > 5 ? (
              <div className='flex justify-center mb-10'>
                <ReactPaginate
                  previousLabel={'< Prev'}
                  breakLabel={'...'}
                  nextLabel={'Next >'}
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
            ) : (
              ''
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ShareExperience;

import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SingleShareById = () => {
  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [details, setDetails] = useState(null);
  const [isLoad, setIsLoad] = useState(true);

  const getDetails = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/users/job-experience/${id}`
      );
      console.log(data);
      if (data.success) {
        setDetails(data.data);
        setIsLoad(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const { description, email, image, name } = setDetails;

  console.log(details);

  return (
    <div>
      <Navbar />
      <div className='mt-2 ml-1'>
        <Link
          to={-1}
          className='px-4 py-2 rounded text-white bg-neutral-950 hover:bg-neutral-900'
        >
          &lt; Back
        </Link>
      </div>
      <div className='md:container mx-auto min-h-[calc(100vh-215px)]'></div>
      <Footer />
    </div>
  );
};

export default SingleShareById;

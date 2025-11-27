import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplication from './pages/ViewApplication';
import 'quill/dist/quill.snow.css';
import Portfolio from './pages/Portfolio';
import EditPortfolio from './pages/EditPortfolio';
import ShareExperience from './pages/ShareExperience';
import ErrorPage from './pages/ErrorPage';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowUserProfile from './pages/ShowUserProfile';
import SingleShareById from './pages/SingleShareById';
import EditJobExperience from './pages/EditJobExperience';

function App() {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Slide}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/portfolio/edit-portfolio' element={<EditPortfolio />} />
        {/* <Route path='/dashboard' element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path='add-job' element={<AddJob />} />
              <Route path='manage-job' element={<ManageJobs />} />
              <Route path='view-applications' element={<ViewApplication />} />
            </>
          ) : null}
        </Route> */}
        {companyToken ? (
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='add-job' element={<AddJob />} />
            <Route path='manage-job' element={<ManageJobs />} />
            <Route path='view-applications' element={<ViewApplication />} />
          </Route>
        ) : null}
        <Route path='/share-experience' element={<ShareExperience />} />
        <Route path='/share-experience/:id' element={<SingleShareById />} />
        <Route path='/view-applications/:id' element={<ShowUserProfile />} />
        <Route path='/edit-job-experience/:id' element={<EditJobExperience />} />
        {/* <Route path='*' element={<Navigate to='/' />} /> */}
      </Routes>
    </div>
  );
}

export default App;

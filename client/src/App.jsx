import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import RecruiterLogin from "./components/RecruiterLogin";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplication from "./pages/ViewApplication";
import "quill/dist/quill.snow.css";
import Portfolio from "./pages/Portfolio";
import EditPortfolio from "./pages/EditPortfolio";
import ShareExperience from "./pages/ShareExperience";

function App() {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/portfolio/edit-portfolio' element={<EditPortfolio />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='add-job' element={<AddJob />} />
          <Route path='manage-job' element={<ManageJobs />} />
          <Route path='view-applications' element={<ViewApplication />} />
        </Route>
        <Route path='/share-experience' element={<ShareExperience />} />
      </Routes>
    </div>
  );
}

export default App;

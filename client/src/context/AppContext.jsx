import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();


  // function to fetch job data
  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /*useEffect(() => {
    const jobData = async () => {
      try {
      } catch (err) {
        alert(err.message);
      }
    };

    jobData();

  }, []);*/

  const value = {
    user,
    isLoaded,
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

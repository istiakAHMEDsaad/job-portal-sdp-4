import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

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
    isLoaded,
    user,
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

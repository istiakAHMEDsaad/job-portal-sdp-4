import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";

const Portfolio = () => {
  const { user, isLoaded } = useContext(AppContext);
  console.log(user);

  return (
    <div>
      <Navbar />

      {!isLoaded ? (
        <Loading />
      ) : (
        <div>
          

        </div>
      )}

      <Footer />
    </div>
  );
};

export default Portfolio;

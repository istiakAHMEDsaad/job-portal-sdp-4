import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const OthersProtected = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OthersProtected;

import { useState } from "react";
import { assets } from "../assets/assets";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);

  const [isNextDataSubmitted, setIsNextDataSubmitted] = useState(false);

  return (
    <div>
      <form action=''>
        <h1>Recruiter {state}</h1>
        <p>Welcome back! Please sign in to continue</p>
        <>
        {/* company name field */}
          <div>
            <img src={assets.person_icon} alt='person icon' />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              placeholder='Company Name'
              required
            />
          </div>

          {/* company name field */}
          <div>
            <img src={assets.person_icon} alt='person icon' />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              placeholder='Company Name'
              required
            />
          </div>
        </>
      </form>
    </div>
  );
};

export default RecruiterLogin;

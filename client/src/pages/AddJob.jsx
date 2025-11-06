import { useState } from "react";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Gulshan");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  return (
    <form>
      <div>
        <p>Job Title</p>
        <input
          type='text'
          placeholder='Type Here'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      <div>
        
      </div>
    </form>
  );
};

export default AddJob;

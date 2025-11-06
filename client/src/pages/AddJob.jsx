import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming");
  const [location, setLocation] = useState("Gulshan");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // intiate quill
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

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
        <p>Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div>
        {/* category */}
        <div>
          <p>Job Category</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* category */}
        <div>
          <p>Job Location</p>
          <select onChange={(e) => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* category */}
        <div>
          <p>Job Level</p>
          <select onChange={(e) => setLevel(e.target.value)}>
            <option value='Beginner Level'>Beginner Level</option>
            <option value='Intermediate Level'>Intermediate Level</option>
            <option value='Senior Level'>Senior Level</option>
          </select>
        </div>
      </div>

      <div>
        <p>Job Salary</p>
        <input
          onChange={(e) => setSalary(e.target.value)}
          type='number'
          placeholder='$0000'
        />
      </div>

      <button>ADD</button>
    </form>
  );
};

export default AddJob;

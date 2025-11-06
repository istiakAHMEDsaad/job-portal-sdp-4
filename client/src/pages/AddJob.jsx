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
    <form className='container p-4 flex flex-col w-full items-start gap-3'>
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input
          type='text'
          placeholder='Type Here'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>

      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        {/* category */}
        <div>
          <p className='mb-2'>Job Category</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((gory, index) => (
              <option key={index} value={gory}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* category */}
        <div>
          <p className='mb-2'>Job Location</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((loca, index) => (
              <option key={index} value={loca}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* category */}
        <div>
          <p className='mb-2'>Job Level</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            onChange={(e) => setLevel(e.target.value)}
          >
            {/* <option value='Beginner Level'>Beginner Level</option>
            <option value='Intermediate Level'>Intermediate Level</option>
            <option value='Senior Level'>Senior Level</option> */}
            <option value={level}>Beginner Level</option>
            <option value={level}>Intermediate Level</option>
            <option value={level}>Senior Level</option>
          </select>
        </div>
      </div>

      <div>
        <p>Job Salary</p>
        <input
          className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'
          onChange={(e) => setSalary(e.target.value)}
          type='number'
          placeholder='$0000'
          min={0}
          value={salary}
        />
      </div>

      <button className='w-28 py-3 max-sm:w-20 mt-4 bg-neutral-950 text-white rounded cursor-pointer hover:bg-neutral-900 transition-colors'>
        ADD
      </button>
    </form>
  );
};

export default AddJob;

import { useEffect, useRef, useState } from "react";
import Quill from "quill";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Gulshan");
  const [category, setCategory] = useState("Programming");
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
    </form>
  );
};

export default AddJob;

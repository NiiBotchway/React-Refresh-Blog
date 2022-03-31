import BlogList from "./BlogList";
import useFetch from "./useFetch";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const { data, isPending, error, setData } = useFetch(
    "http://localhost:8000/blogs"
  );
  // if (data !== null) {
  //   setBlogs(data);
  // }

  const controller = new AbortController();
  const signal = controller.signal;

  const handleDelete = (id) => {
    // const newBlogs = data.filter((blog) => blog.id !== id);
    // setData(newBlogs);

    axios
      .delete(`http://localhost:8000/blogs/${id}`, { signal })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw Error("Could not delete resource!");
        }
        const newBlogs = data.filter((blog) => blog.id !== id);
        setData(newBlogs);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(`Delete ${err.message}!`);
        } else {
          //setData(null);
        }
      });
  };

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <BlogList
          blogs={data}
          origin="All Blogs!"
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;

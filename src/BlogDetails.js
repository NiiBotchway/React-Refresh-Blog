import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    `http://localhost:8000/blogs/${id}`
  );
  const history = useHistory();

  return (
    <div className="blog-details">
      {error && <div>{error}</div>}
      {isPending && <div>loading...</div>}
      {data && (
        <div className="blog-preview">
          <h2>{data.title}</h2>
          <p>{data.body}</p>
          <div className="author" style={{ marginTop: "10px" }}>
            <small className="by">Written by: {data.author}</small>
          </div>
          <div className="btn">
            <button className="delete">Delete Blog</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;

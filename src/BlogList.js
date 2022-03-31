import { Link } from "react-router-dom";

const BlogList = ({ blogs, origin, handleDelete }) => {
  return (
    <div className="blog-list">
      <h2>{origin}</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "None" }}>
            <h2>{blog.title}</h2>
            {/* <p>{blog.body}</p> */}
          </Link>
          <div className="author">
            <small className="by">By: {blog.author}</small>
          </div>
          <div className="btn">
            <button className="delete" onClick={() => handleDelete(blog.id)}>
              Delete Blog
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

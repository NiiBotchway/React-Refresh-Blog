import { useState } from "react";
import { useHistory } from "react-router-dom";
import usePost from "./usePost";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Isaac");
  const [isPending, setIsPending] = useState(false);
  //const {} = usePost("http://localhost:8000/blogs", );
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { title, body, author };
    setIsPending(true);

    
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    }).then(() => {
      setIsPending(false);
      setTitle("");
      setBody("");
      setAuthor("Ishmael");
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Blog Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={title}
          onInput={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body">Blog Body:</label>
        <textarea
          type="text"
          name="body"
          id="body"
          required
          value={body}
          onInput={(e) => setBody(e.target.value)}
        />
        <label htmlFor="author">Blog Author:</label>
        <select
          name="author"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Ishmael">Ishmael</option>
          <option value="Isaac">Isaac</option>
          <option value="Nicholas">Nicholas</option>
        </select>

        {!isPending && <button type="submit">Add Blog</button>}
        {isPending && (
          <button type="submit" disabled>
            Adding Blog...
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;

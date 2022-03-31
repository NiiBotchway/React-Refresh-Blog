import { useState, useEffect } from "react";

const usePost = (url, payload) => {
  const [status, setStatus] = useState(false);
  //const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, {
      signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Error Deleting Resource!");
        } else {
          setStatus(true);
          return res.json();
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setStatus(false);
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, [url, payload]);

  return { status, error };
};

export default usePost;

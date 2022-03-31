import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // const cancelToken = axios.CancelToken;
    // const source = cancelToken.source();

    axios
      .get(url, { signal })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw Error("Could not fetch resource!");
        }
        setData(res.data);
        setError(null);
        setIsPending(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(`Fetch ${err.message}!`);
        } else {
          setError(err.message);
          setData(null);
        }
      });

    // fetch(url, { signal })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw Error("Could not fetch resource!");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setData(data);
    //     setError(null);
    //     setIsPending(false);
    //   })
    //   .catch((err) => {
    //     if (err.name !== "AbortError") {
    //       setIsPending(false);
    //       setError(err.message);
    //       setData(null);
    //     } else {
    //       console.log("Fetch Aborted");
    //     }
    //   });

    return () => controller.abort();
  }, [url]);

  return { data, isPending, error, setData };
};

export default useFetch;

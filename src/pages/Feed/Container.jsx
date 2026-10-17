import React, { useState } from "react";
import axios from "axios";
import Post from "./Post";
const PAGE_SIZE = 10;

const Container = ({}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLast, setIsLast] = useState(false);
  const requestRef = React.useRef(0);

  React.useEffect(() => {
    setIsLoading(true);
    setError(null);
    const myRequestId = ++requestRef.current;

    axios
      .post("http://localhost:3001/api/getPosts", {
        pageNumber,
        pageSize: PAGE_SIZE,
        searchQuery: "",
        requestId: requestRef.current,
      })
      .then(({ data }) => {
        if (myRequestId === requestRef.current) {
          setPosts((prev) => [...prev, ...data.posts]);
          setIsLast(data.isLast);
        }
      })
      .finally(() => {
        if (myRequestId === requestRef.current) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (myRequestId === requestRef.current) {
          setError(error.message);
        }
      });
    return () => {
      requestRef.current++;
    };
  }, [pageNumber]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }
  if (posts.length === 0) {
    return <div>NO posts!!!</div>;
  }

  return (
    <div>
      <div></div>
      <div style={{ padding: "10px" }}>
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
        <div></div>
      </div>
    </div>
  );
};

export default Container;

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

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/api/getPosts", {
        pageNumber,
        pageSize: PAGE_SIZE,
        searchQuery: "",
      })
      .then(({ data }) => {
        setPosts(data.posts);
        setIsLast(data.isLast);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (posts.length === 0) {
    return <div>NO posts!!!</div>;
  }

  return (
    <div style={{ padding: "10px" }}>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Container;

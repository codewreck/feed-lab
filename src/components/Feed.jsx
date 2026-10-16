import { useRef, useEffect, useState, useMemo } from "react";
import { getPosts } from "../api/feed.js";
import Post from "./Post.jsx";
import { finalDebounce as debounce } from "../helper.js";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [nextCursor, setNextCursor] = useState(null);
  const [isLast, setIsLast] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const sentinelRef = useRef(null);
  const myReqRef = useRef(0);

  useEffect(() => {
    const requestId = ++myReqRef.current;
    getPosts({ cursor: null, searchQuery }).then(
      ({ hasNextPage, nextCursor, items }) => {
        if (requestId !== myReqRef.current) {
          return;
        }
        setPosts(items);
        setNextCursor(nextCursor);
        setIsLast(!hasNextPage);
        setStatus("success");
      },
    );
  }, [searchQuery]);

  useEffect(() => {
    if (status !== "success" || isLast || isLoadingMore || error) return;
    const sentinal = sentinelRef.current;
    if (!sentinal) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );
    observer?.observe(sentinelRef.current);
    return () => {
      observer.disconnect();
    };
  }, [status, nextCursor, isLast, isLoadingMore, error, searchQuery]);

  const debounceSearch = useMemo(() => {
    return debounce(
      (text) => {
        setSearchQuery(text);
      },
      3000,
      10000,
    );
  }, []);

  const handleLoadMore = () => {
    if (isLast || isLoadingMore) return;
    setError(null);
    setIsLoadingMore(true);
    const requestId = ++myReqRef.current;

    getPosts({ cursor: nextCursor, searchQuery })
      .then(({ hasNextPage, nextCursor: myNextCursor, items }) => {
        if (requestId !== myReqRef.current) {
          return;
        }
        setPosts((prevState) => [...prevState, ...items]);
        setNextCursor(myNextCursor);
        setIsLast(!hasNextPage);
        setStatus("success");
      })
      .catch(() => {
        if (requestId !== myReqRef.current) {
          return;
        }
        setError("Couldn’t load more posts. Please try again.");
      })
      .finally(() => {
        if (requestId !== myReqRef.current) {
          return;
        }
        setIsLoadingMore(false);
      });
  };

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <input
        style={{
          minWidth: "100%",
          borderRadius: "4px",
          boxShadow: "10px 5px 5px grey",
          outline: "none",
          height: "28px",
          border: "1px solid lightgrey",
        }}
        placeholder="Type to search caption..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          debounceSearch(e.target.value);
        }}
      />
      <div style={{ padding: "10px 0" }}>Input text: {inputValue}</div>
      <div style={{ padding: "" }}>Search text: {searchQuery}</div>
      {status === "success" && posts.length === 0 && (
        <div style={{ color: "green" }}>Sorry, no post matched your query</div>
      )}
      {/* <div className="section-heading">
        <div id="feed-heading">Your daily pause</div>
        <div className="muted">
          {status === "success" ? `${posts.length} fieldnotes` : "Fieldnotes"}
        </div>
      </div> */}
      <div className="post-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      {error && <p role="alert">{error}</p>}
      {isLast ? null : (
        <button onClick={handleLoadMore} disabled={isLoadingMore}>
          {isLoadingMore ? "loading..." : "Load More"}
        </button>
      )}
      <div ref={sentinelRef}>End of loaded posts</div>{" "}
    </div>
  );
}

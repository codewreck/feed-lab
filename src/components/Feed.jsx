import { useEffect, useState } from "react";
import { getInitialPosts } from "../api/feed.js";
import Post from "./Post.jsx";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;

    getInitialPosts({ delayMs: 6000 })
      .then((response) => {
        if (!ignore) {
          setPosts(response.items);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });

    // A completed request must not update an effect that has been cleaned up.
    // This ignores stale results; it does not cancel the underlying timer.
    return () => {
      ignore = true;
    };
  }, []);

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  return (
    <section aria-labelledby="feed-heading" aria-busy={status === "loading"}>
      <div className="section-heading">
        <div id="feed-heading">Your daily pause</div>
        <div className="muted">
          {status === "success" ? `${posts.length} fieldnotes` : "Fieldnotes"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

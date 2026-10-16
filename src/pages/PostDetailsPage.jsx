import { Link, useParams } from "react-router";
import { posts } from "../data/posts.js";
import Post from "../components/Post.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function PostDetailsPage() {
  const { postId } = useParams();
  // Use our local dataset for this routing lesson.
  const post = posts.find((item) => item.id === postId);

  if (!post) return <NotFoundPage />;

  return (
    <section>
      <Link to="/">Back to feed</Link>
      <h1>Post details</h1>
      <Post key={post.id} post={post} />
    </section>
  );
}

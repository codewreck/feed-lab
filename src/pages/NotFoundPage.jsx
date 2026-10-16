import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>This page or post does not exist.</p>
      <Link to="/">Back to feed</Link>
    </section>
  );
}

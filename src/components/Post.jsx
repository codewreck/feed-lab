import React from "react";
import { Link } from "react-router";
export default function Post({ post }) {
  const [isImageLoading, setImageLoading] = React.useState(true);
  const [isImageError, setImageError] = React.useState(null);
  const [shouldLoadImage, setShouldLoadImage] = React.useState(false); // this is to add the lazy loading of images
  // → should the network request START?
  const imageRef = React.useRef(null);

  console.log("imageRef", imageRef.current);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // as soon as it starts intersectiong according to the options then start downlaoding the image
          setShouldLoadImage(true);
          //  Stop observing once the image is eligible
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "300px",
      },
    );
    if (!imageRef.current) return;
    observer.observe(imageRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="post">
      <div className="post-header">
        <div className="avatar" aria-hidden="true">
          {post.author.initials}
        </div>
        <div>
          <div id={`author-${post.id}`}>{post.author.name}</div>
          <div className="muted">@{post.author.handle}</div>
          <Link to={`/posts/${post.id}`}>PostId {post.id}</Link>
        </div>
      </div>
      {isImageLoading && <p>Loading image…</p>}
      {isImageError === "error" && <p>Image couldn’t load.</p>}
      <img
        ref={imageRef}
        className="post-image"
        src={shouldLoadImage ? post.image.url : undefined}
        alt={post.image.alt}
        width={post.image.width}
        height={post.image.height}
        loading="lazy"
        onLoad={() => {
          setImageLoading(false);
        }}
        onError={() => {
          setImageError("error");
          setImageLoading(false);
        }}
      />
      <div className="post-copy">
        <p className="location">↗ {post.place}</p>
        <p>{post.caption}</p>
      </div>
    </div>
  );
}

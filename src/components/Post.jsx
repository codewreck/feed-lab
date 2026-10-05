const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default function Post({ post }) {
  return (
    <div style={{ border: "1px solid grey", width: "400px" }}>
      <div className="post-header">
        <div className="avatar" aria-hidden="true">
          {post.author.initials}
        </div>
        <div>
          <div id={`author-${post.id}`}>{post.author.name}</div>
          <div className="muted">@{post.author.handle}</div>
        </div>
      </div>
      <img
        className="post-image"
        src={post.image.url}
        alt={post.image.alt}
        width={post.image.width}
        height={post.image.height}
      />
      <div className="post-copy">
        <p className="location">↗ {post.place}</p>
        <p>{post.caption}</p>
      </div>
    </div>
  );
}

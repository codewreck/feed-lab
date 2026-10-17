import React from "react";

const Post = ({ post }) => {
  const { id, title, createdOn, author = {}, imageUrl } = post;
  return (
    <div style={{ border: "1px solid grey" }}>
      <div>{title}</div>
      <div>{author.userName}</div>
      <img src={imageUrl} />
    </div>
  );
};

export default Post;

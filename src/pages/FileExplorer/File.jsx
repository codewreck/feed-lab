import React from "react";

const File = ({ file }) => {
  console.log("file", file);
  return <div>📄{file.name}</div>;
};

export default File;

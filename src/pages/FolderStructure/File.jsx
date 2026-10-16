import React from "react";

const File = ({ file, itemRefs, activeNodeId }) => {
  return (
    <button
      style={{ border: 0 }}
      ref={(element) => {
        if (element) {
          itemRefs.current.set(file.id, element);
        } else {
          itemRefs.current.delete(file.id);
        }
      }}
      data-node-id={file.id}
      tabIndex={activeNodeId === file.id ? 0 : -1}
    >
      📄{file.name}
    </button>
  );
};

export default File;

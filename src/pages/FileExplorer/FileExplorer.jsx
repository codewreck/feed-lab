import React from "react";
import File from "./File.jsx";
import Folder from "./Folder.jsx";

const initialNodes = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          {
            id: "3",
            name: "Header.jsx",
            type: "file",
          },
        ],
      },
      {
        id: "4",
        name: "App.jsx",
        type: "file",
      },
    ],
  },
  {
    id: "5",
    name: "package.json",
    type: "file",
  },
];

function insertNode(nodes, parentId, newNode) {
  return nodes.map((node) => {
    if (node.type === "folder") {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      } else {
        return {
          ...node,
          children: insertNode(node.children || [], parentId, newNode),
        };
      }
    } else {
      return node;
    }
  });
}

const FileExplorer = () => {
  const [nodes, setNodes] = React.useState(initialNodes);
  const [openStates, setOpenStates] = React.useState([]);
  console.log("openStates", openStates);
  const handleAddFile = (parentId, newNode) => {
    setNodes(insertNode(nodes, parentId, newNode));
    setOpenStates((prev) => {
      if (prev.includes(parentId)) {
        return prev;
      } else return [...prev, parentId];
    });
  };
  console.log("openStates", openStates);
  return (
    <div>
      {nodes.map((node) => {
        if (node.type === "folder") {
          return (
            <Folder
              key={node.id}
              folder={node}
              openStates={openStates}
              setOpenStates={setOpenStates}
              handleAddFile={handleAddFile}
            />
          );
        } else if (node.type === "file") {
          return <File file={node} key={node.id} />;
        }
      })}
    </div>
  );
};

export default FileExplorer;

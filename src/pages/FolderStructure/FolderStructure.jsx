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

function getClickedFilePath(currentId, nodes) {
  const path = [];

  function getMypath(currentId, nodes) {
    for (let i = 0; i < nodes.length; i++) {
      path.push(nodes[i].name);
      if (currentId === nodes[i].id) {
        return true;
      }
      if (nodes[i].children) {
        const found = getMypath(currentId, nodes[i].children);
        if (found) {
          return true;
        }
      }

      if (currentId !== nodes[i].id) {
        path.pop();
      }
    }
  }
  getMypath(currentId, nodes);
  return path;
}

const insertNode = (nodes, parentId, newNode) => {
  return nodes.map((node) => {
    if (node.type === "folder") {
      if (node.id === parentId) {
        return { ...node, children: [...node.children, newNode] };
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
};

function getVisibleNodes(nodes, openFolders) {
  const myVisibleNodes = [];
  function myVisiblenodes(nodes, openFolders) {
    nodes.forEach((node) => {
      myVisibleNodes.push(node.id);
      if (openFolders.includes(node.id)) {
        if (node.children) {
          myVisiblenodes(node.children, openFolders);
        }
      }
    });
  }

  myVisiblenodes(nodes, openFolders);
  return myVisibleNodes;
}

function getNextNodeId(currentId, visibleNodes) {
  const myIndex = visibleNodes.indexOf(currentId) + 1;
  if (myIndex > visibleNodes.length - 1) {
    return currentId;
  }
  return visibleNodes[myIndex];
}

function getPreviousNodeId(currentId, visibleNodes) {
  const myIndex = visibleNodes.indexOf(currentId) - 1;
  if (myIndex < 0) {
    return currentId;
  }
  return visibleNodes[myIndex];
}

const FolderStructure = () => {
  const [openFolders, setOpenFolders] = React.useState([]);
  const [nodes, setNodes] = React.useState(initialNodes);
  const [activeNodeId, setActiveNodeId] = React.useState("1");
  const itemRefs = React.useRef(new Map());

  const handleAddNew = (newNode, parentId) => {
    setNodes((prev) => insertNode(prev, parentId, newNode));
  };

  const myVisibleNodes = getVisibleNodes(nodes, openFolders);
  //   const nextNodeId = getNextNodeId(currentId, myVisibleNodes);
  return (
    <div
      onKeyDown={(e) => {
        const path = getClickedFilePath(e.target.dataset.nodeId, nodes);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const currentId = e.target.dataset.nodeId;
          if (!currentId) return;
          const nextNodeId = getNextNodeId(currentId, myVisibleNodes);
          setActiveNodeId(nextNodeId); // schedules a React update to the tabIndex attributes.
          itemRefs.current?.get(nextNodeId)?.focus(); // moves actual focus immediately
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          const currentId = e.target.dataset.nodeId;
          if (!currentId) return;
          const prevNodeId = getPreviousNodeId(currentId, myVisibleNodes);
          setActiveNodeId(prevNodeId);

          itemRefs.current?.get(prevNodeId)?.focus();
        }
      }}
    >
      {nodes.map((node) => {
        if (node.type === "folder") {
          return (
            <Folder
              folder={node}
              key={node.id}
              openFolders={openFolders}
              setOpenFolders={setOpenFolders}
              handleAddNew={handleAddNew}
              itemRefs={itemRefs}
              activeNodeId={activeNodeId}
            />
          );
        } else if (node.type === "file") {
          return (
            <File
              file={node}
              key={node.id}
              itemRefs={itemRefs}
              activeNodeId={activeNodeId}
            />
          );
        }
      })}
    </div>
  );
};

export default FolderStructure;

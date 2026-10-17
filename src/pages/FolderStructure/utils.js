function insertNode(nodes, parentId, newNode) {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    } else {
      if (node.type === "folder") {
        return {
          ...node,
          children: insertNode(node.children || [], parentId, newNode),
        };
      }
      return node;
    }
  });
}

function removeNode(nodes, nodeId) {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => {
      if (node.type === "folder") {
        return {
          ...node,
          children: removeNode(node.children, nodeId),
        };
      } else {
        return node;
      }
    });
}

function updateNode(nodes, nodeId, newName) {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return {
        ...node,
        name: newName,
      };
    } else {
      if (node.type === "folder") {
        return {
          ...node,
          children: updateNode(node.children, nodeId, newName),
        };
      }
      return node;
    }
  });
}

function findNode(nodes, nodeId) {
  for (const node of nodes) {
    // Base case: Found the node
    if (node.id === nodeId) {
      return node;
    }

    // Recursive case: Search inside the folder
    if (node.type === "folder") {
      const foundNode = findNode(node.children, nodeId);

      if (foundNode !== null) {
        return foundNode;
      }
    }
  }

  // No match found anywhere in this subtree
  return null;
}

export function moveNode(nodes, draggedId, destinationId) {
  if (draggedId === destinationId) return nodes;

  // when moving parent to child
  // Your implementation
  const myDraggedNode = findNode(nodes, draggedId);
  if (!myDraggedNode) {
    return nodes;
  }

  if (
    myDraggedNode.type === "folder" &&
    findNode(myDraggedNode.children, destinationId)
  ) {
    return nodes;
  }

  const destinationNode = findNode(nodes, destinationId);
  if (!destinationNode || destinationNode.type !== "folder") {
    return nodes;
  }

  // folder into its descendent
  const newNodesTree = removeNode(nodes, myDraggedNode.id);
  return insertNode(newNodesTree, destinationId, myDraggedNode);
}

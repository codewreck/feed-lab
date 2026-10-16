import React from "react";
import File from "./File";

const Folder = ({
  folder,
  openFolders,
  setOpenFolders,
  handleAddNew,
  itemRefs,
  activeNodeId,
}) => {
  const [isAdding, setIsAdding] = React.useState(null);
  const [name, setName] = React.useState("");

  const handleToggleFolderTree = () => {
    setOpenFolders((prev) => {
      if (prev.includes(folder.id)) {
        return prev.filter((id) => id !== folder.id);
      } else {
        return [...prev, folder.id];
      }
    });
  };

  const handleSubmit = () => {
    if (name.trim() === "") {
      return alert("name cant be empty");
    }
    const newNode =
      isAdding === "folder"
        ? {
            id: crypto.randomUUID(),
            name: name.trim(),
            type: isAdding,
            children: [],
          }
        : {
            id: crypto.randomUUID(),
            name: name.trim(),
            type: isAdding,
          };
    handleAddNew(newNode, folder.id);
    setOpenFolders((prev) => {
      if (prev.includes(folder.id)) {
        return prev;
      } else {
        return [...prev, folder.id];
      }
    });
    setIsAdding(null);
    setName("");
  };

  return (
    <div>
      <button
        style={{ border: "0" }}
        onClick={handleToggleFolderTree}
        aria-expanded={openFolders.includes(folder.id)}
        ref={(element) => {
          if (element) {
            itemRefs.current.set(folder.id, element);
          } else {
            itemRefs.current.delete(folder.id);
          }
        }}
        data-node-id={folder.id}
        tabIndex={activeNodeId === folder.id ? 0 : -1}
      >
        📂{folder.name}
      </button>
      {isAdding ? (
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              } else if (e.key === "Escape") {
                setIsAdding(null);
                setName("");
              } else {
                null;
              }
            }}
            autoFocus="true"
          />
          <button
            onClick={handleSubmit}
            disabled={name.trim() === "" || !name.trim()}
          >
            Submit
          </button>
          <button
            onClick={() => {
              setName("");
              setIsAdding(null);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            style={{ border: 0, backgroundColor: "inherit" }}
            onClick={() => setIsAdding("folder")}
          >
            + Add Folder
          </button>
          <button
            style={{ border: 0, backgroundColor: "inherit" }}
            onClick={() => setIsAdding("file")}
          >
            + Add File
          </button>
        </div>
      )}
      {openFolders.includes(folder.id) && (
        <div style={{ paddingLeft: "10px" }}>
          {folder.children.map((node) => {
            if (node.type === "folder") {
              return (
                <div key={node.id}>
                  <Folder
                    folder={node}
                    openFolders={openFolders}
                    setOpenFolders={setOpenFolders}
                    handleAddNew={handleAddNew}
                    itemRefs={itemRefs}
                    activeNodeId={activeNodeId}
                  />
                </div>
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
      )}
    </div>
  );
};

export default Folder;

// if folder is opened and we added something our toggle is closing that folder :P

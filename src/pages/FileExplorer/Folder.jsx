import React from "react";
import File from "./File.jsx";

const Folder = ({ folder, openStates, setOpenStates, handleAddFile }) => {
  const { children = [] } = folder;
  const [isAdding, setAdding] = React.useState(null);
  const [nodeName, setNodeName] = React.useState("");

  const handleSubmit = (folderId) => {
    if (nodeName.trim() === "") return alert("name cant be null");
    handleAddFile(
      folderId,
      isAdding === "file"
        ? {
            id: crypto.randomUUID(),
            name: nodeName.trim(),
            type: "file",
          }
        : {
            id: crypto.randomUUID(),
            name: nodeName.trim(),
            children: [],
            type: "folder",
          },
    );
    setNodeName("");
    setAdding(null);
  };
  const handleCancel = () => {
    setAdding(null);
    setNodeName("");
  };

  return (
    <div>
      <div
        onClick={() =>
          setOpenStates((prev) => {
            if (prev.includes(folder.id)) {
              return prev.filter((id) => id !== folder.id);
            }
            return [...prev, folder.id];
          })
        }
        style={{ cursor: "pointer" }}
      >
        📂{folder.name}
      </div>
      {openStates.includes(folder.id) ? (
        <div style={{ paddingLeft: "12px" }}>
          {children.map((child) => {
            if (child.type === "folder")
              return (
                <Folder
                  key={child.id}
                  folder={child}
                  openStates={openStates}
                  setOpenStates={setOpenStates}
                  handleAddFile={handleAddFile}
                />
              );
            else {
              return <File key={child.id} file={child} />;
            }
          })}
        </div>
      ) : null}
      {isAdding ? (
        <div>
          <input
            value={nodeName}
            autoFocus
            onChange={(e) => setNodeName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(folder.id);
              }
              if (e.key === "Escape") {
                handleCancel();
              }
            }}
          />
          <button
            disabled={!nodeName.trim()}
            onClick={() => {
              handleSubmit(folder.id);
            }}
          >
            submit
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <button
            style={{ border: 0, cursor: "pointer" }}
            onClick={() => setAdding("file")}
          >
            +File
          </button>
          <button
            style={{ border: 0, cursor: "pointer" }}
            onClick={() => setAdding("folder")}
          >
            +Folder
          </button>
        </div>
      )}
    </div>
  );
};

export default Folder;

import React, { useContext, useEffect } from "react";
import noteContext from "../context/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  
  }, [])
  
  return (
    <>
    <AddNote />
    <div className="row my-3">
      <h2>Your notes</h2>
      {notes.map((note) => {
        return <Noteitem key={note._id} note={note} />;
      })}
    </div>
    </>
  );
};

export default Notes;
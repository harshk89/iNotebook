import React, {useContext} from "react";
import noteContext from "../context/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNode, showAlert} = props;
  const deleteNoteFunc = ()=> {
    if(window.confirm("You sure want to delete this note?")) {
      deleteNote(note._id);
      showAlert("Note deleted!", "success");
    }
    else {
      showAlert("Note note deleted", "info");
    }
    
  }
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNoteFunc()}}></i>
            <i className="fa-solid fa-pen-clip mx-2" onClick={()=>{updateNode(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

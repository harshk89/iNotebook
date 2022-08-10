import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000";
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      //Fetch all notes
      const getNotes = async ()=> {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)
      }

      //Add a note
      const addNote = async (title, description, tag)=> {

        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note))
      }

      //Delete a note
      const deleteNote = async (id)=> {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = response.json();
        console.log(json);

        console.log("Deleting the note with id:"+id);
        const newNotes = notes.filter((note)=>(note._id!==id));
        setNotes(newNotes);
      }
      //Edit a note
      const editNote = async (id, title, description, tag)=> {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json);

        //Logic to edit in cliet
        let newNotes = JSON.parse(JSON.stringify(notes));    //create deep copy of notes
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            setNotes(newNotes);
            break;
          }
        }
    }

    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
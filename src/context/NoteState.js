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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMzE3MzkxNjEyYTMwNTFiMThhOWY5In0sImlhdCI6MTY1NDk3MTE1MH0.rC5A7GwmPI9d3OG45LUOOXsi7mNnEjAkC8LQqaDsmdk"
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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMzE3MzkxNjEyYTMwNTFiMThhOWY5In0sImlhdCI6MTY1NDk3MTE1MH0.rC5A7GwmPI9d3OG45LUOOXsi7mNnEjAkC8LQqaDsmdk"
          },
          body: JSON.stringify({title, description, tag})
        });
        
        const note = {"_id": "62a4fdbba536af191dc8cea5",
        "user": "62a317391612a3051b18a9f9",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-06-11T20:40:27.377Z",
        "__v": 0}
        console.log("Adding a new note");
        setNotes(notes.concat(note))
      }

      //Delete a note
      const deleteNote = (id)=> {
        //TODO: API call
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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMzE3MzkxNjEyYTMwNTFiMThhOWY5In0sImlhdCI6MTY1NDk3MTE1MH0.rC5A7GwmPI9d3OG45LUOOXsi7mNnEjAkC8LQqaDsmdk"
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = response.json();

        //Logic to edit in cliet
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
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
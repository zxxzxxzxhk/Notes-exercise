import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from "./component/Note";
import noteSerive from './services/notes'
import Notification from './component/Error';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newnote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // show note
  useEffect(() => {
    noteSerive
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  if (!notes) { 
    return null 
  }

  // add note

  const addNew = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const newObj = {
      content: newnote,
      important: true,
    };
    
    if (newObj.content.length === 0) {
      return alert("please input");
    } else {noteSerive
      .create(newObj)
      .then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
    }
  };

 

  // update note

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteSerive.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }
   

  //show / hide important

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  

  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage}/>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all' }
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note 
          key={note.id}
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newnote} onChange={addNew} />
        <button type="sumit">sumit</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

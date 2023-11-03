import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from "./Note";

const App = () => {
  const [notes, setNotes] = useState([])
  const [newnote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')


  const addNote = (event) => {
    event.preventDefault();
    const newObj = {
      id: notes.length + 1,
      content: newnote,
      important: true,
    };

    if (newObj.content.length === 0) {
      return alert("please input");
    } else {
      setNotes(notes.concat(newObj));
      setNewNote("");
    }
  };

  const addNew = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all' }
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newnote} onChange={addNew} />
        <button type="sumit">sumit</button>
      </form>
    </div>
  );
};

export default App;

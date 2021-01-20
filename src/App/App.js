import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import ErrorBoundary from '../ErrorBoundary';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  fetchFolders = () => {
    fetch(`${config.API_ENDPOINT}/folders`)
      .then(data => {
        if (!data.ok) {
          throw new Error("Something went wrong")
        }
        return data.json()
      })
      .then(data => {
        this.setState({folders: data})
      })
  }



  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleAddFolder = () => {
    this.fetchFolders()
  }

  fetchNotes = () => {
    fetch(`${config.API_ENDPOINT}/notes`)
      .then(data => {
        if (!data.ok) {
          throw new Error('Something went wrong')
        }
        return data.json()
      })
      .then(data => {
        this.setState({notes: data})
      })
  }

  handleAddNote = () => {
    this.fetchNotes()
  }

  renderNavRoutes() {
    return (
      <ErrorBoundary>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        {/* note page */}
        <Route path="/note/:noteId" component={NotePageNav} />
        {/* add folder page */}
        <Route path="/add-folder" component={NotePageNav} />
        {/* add note page */}
        <Route path="/add-note" component={NotePageNav} />
      </ErrorBoundary>
    );
  }

  renderMainRoutes() {
    return (
      <ErrorBoundary>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}

        {/* these render the right side of the notes page, add folder page, and add note page */}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />

      </ErrorBoundary>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
      
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
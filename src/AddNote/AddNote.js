import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types'
import './AddNote.css'

class AddNote extends Component {
  static contextType = ApiContext;

  state = {
    noteName: '',
    description: '',
    selectedFolder: ''
  };

  handleChangeTitle = (e) => {
    this.setState({noteName: e.target.value})
  };

  handleChangeDescription = (e) => {
    this.setState({description: e.target.value})
  };

  handleSelectedFolder = (e) => {
    this.setState({selectedFolder: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault()

    const postBody = {
      name: this.state.noteName,
      description: this.state.description,
      folderId: this.state.selectedFolder,
      modified: new Date()
    }

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error
          })
        }
        return res.json()
      })
      .then((data) => {
        this.context.addNote(data)
        this.props.history.push('/')
      })
      .catch((error) => {
        this.setState({error})
      })
  };

  render () {
    const folderOptions = this.context.folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)
    return (
      <form onSubmit={this.handleSubmit}>

        <label htmlFor="note-title">Note Title</label>
        <br />
        <input id="note-title" onChange={this.handleChangeTitle} required></input>

        <br />
        <br />

        <label htmlFor="note-description">Write your notes here</label>
        <br />
        <input id="note-description" onChange={this.handleChangeDescription} required></input>

        <br />
        <br />

        <label>Select a Folder</label>
        <br />
        <select htmlFor="selected-folder" onChange={this.handleSelectedFolder} required>
          <option value='0'>Select a folder</option>
          {folderOptions}
        </select>

        <br />
        <br />

        <button type="submit">Add Note</button>
      </form>
    )
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired
}

export default AddNote

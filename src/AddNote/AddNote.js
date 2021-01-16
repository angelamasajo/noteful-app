import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config'

class AddNote extends Component {
  static contextType = ApiContext;

  state = {
    noteName: '',
    content: '',
    selectedFolder: ''
  }
  
  handleChangeTitle = (e) => {
    this.setState({noteName: e.target.value, content: e.target.value})
  }

  handleChangeContent

  handleSelectedFolder
  
  handleSubmit = (e) => {
    console.log('handleSubmit running')
    e.preventDefault();

    const newNote = {name: this.state.NoteName}

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(newFolder),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.context.addFolder(data)
        this.props.history.push('/')
        // console.log(data)
      })
      .catch(error => {
        this.setState({error})
      })
  
  }

  render() {
    console.log(this.context)
    return (
      <form onChange={this.whatever1}>
        <label htmlFor='note-title'>Note Title</label>
        <input id='note-title' onChange={this.handleChangeTitle}></input>
        <label htmlFor='note-content'>Write your notes here</label>
        <input id='note-content' onChange={this.whatever3}></input>
        <button type='submit'>Add Folder</button>
        
      </form>
    )
  }
}

export default AddNote;
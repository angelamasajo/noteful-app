import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config'

class AddFolder extends Component {
  static contextType = ApiContext;

  state = {
    folderName: '',
  }
  
  handleChange = (e) => {
    this.setState({folderName: e.target.value})
  }
  
  handleSubmit = (e) => {
    console.log('handleSubmit running')
    e.preventDefault();
    // this.context.addFolder(this.state.folderName);

    const newFolder = {name: this.state.folderName}

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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='folder-name'>Folder Name</label>
        <input id='folder-name' onChange={this.handleChange}></input>
        <button type='submit'>Add Folder</button>
      </form>
    )
  }
}

export default AddFolder;
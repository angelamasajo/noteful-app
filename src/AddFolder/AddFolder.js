import React, { Component } from 'react';
import ApiContext from '../ApiContext'

class AddFolder extends Component {
  static contextType = ApiContext;

  state = {
    folderName: '',
  }
  
  handleChange = (e) => {
    this.setState({folderName: e.target.value})
  }
  
  handleSubmit = (e) => {
    console.log('lalala')
    e.preventDefault();
    this.context.addFolder(this.state.folderName);
  
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
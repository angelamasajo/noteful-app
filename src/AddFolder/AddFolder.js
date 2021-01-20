import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types'

class AddFolder extends Component {
  static contextType = ApiContext;

  state = {
    folderName: ''
  }

  handleChange = (e) => {
    this.setState({folderName: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // this.context.addFolder(this.state.folderName);

    const newFolder = {name: this.state.folderName}

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(newFolder),
      headers: {
        'content-type': 'application/json'
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
        this.context.addFolder()
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({error})
      })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='folder-name'>Folder Name</label>
        <input id='folder-name' onChange={this.handleChange} required></input>
        <button type='submit'>Add Folder</button>
      </form>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object.isRequired
}

export default AddFolder

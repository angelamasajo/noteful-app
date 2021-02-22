import React, {Component} from 'react'

class Practice extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: true
    }
  }

  handleHideOnClick = () => {
    this.setState({visible: !this.state.visible})
  }

  render () {
    console.log(this.state.visible)
    return (
      <div>
        {this.state.visible && <h1>angela</h1>}
        <button onClick={this.handleHideOnClick}>clicky</button>
      </div>
    )
  }
}

export default Practice

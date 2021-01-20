import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError () {
    return {
      hasError: true
    }
  }

  render () {
    if (this.state.hasError) {
      return <h1>Error has occured</h1>
    } else {
      return this.props.children
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorBoundary

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MessageForm extends Component {
  static propTypes = {
    onMessageSend: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.input.focus()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.props.onMessageSend(this.input.value)
    this.input.scrollIntoView()
    this.input.value = ""
  }

  render() {
    return (
      <form className="chat-form" onSubmit={this.handleFormSubmit}>
        <div className="space-it">
          <input
            type="text"
            className="form-control"
            ref={(node) => (this.input = node)}
            placeholder="Type a message ...."
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary mb-2">
            Send
          </button>
        </div>
      </form>
    )
  }
}

export default MessageForm

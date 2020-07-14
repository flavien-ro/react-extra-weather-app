import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    messages: [],
    class: "",
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };


  componentDidUpdate() {
      this.scrollToBottom();
  }

  render() {
    return (
          <div >
            {this.props.messages.map((message, i) => (
              <div key={i}>
                <div className="user-photo"></div>
                    <div className={"chat " + message.class}>
                    <div><img src={require("./assets/img/" + message.class + ".png")} width="30" height="30" alt="profile"/></div>
                    <p className="chat-message" ref={(el) => { this.messagesEnd = el; }}>{message.body}</p>
                </div>
            </div>
            ))}
          </div>
    )
  }
}

export default MessageList

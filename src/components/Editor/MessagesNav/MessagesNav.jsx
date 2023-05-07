import React from 'react' 
import { NavLink } from 'react-router-dom'

export default function MessagesNav(props) {

  const {messages, applications} = props.data || {};

  return (
    <div className="messages-nav">
      <div className="contact-messages-nav">
        <NavLink className="message-link" to="/editor/messages">Messages</NavLink>
        <div className="message-counter">{messages ? messages.length : '0'}</div>
      </div>
      <div className="contact-messages-nav">
        <NavLink className="message-link" to="/editor/applications">Applications</NavLink>
        <div className="message-counter">{applications ? applications.length : '0'}</div>
      </div>
    </div>
  );
}

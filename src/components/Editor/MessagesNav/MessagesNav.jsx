import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom'

import { auth } from '../../../utils/auth'
import { fetchMessagesData, fetchApplicationsData } from "../../../utils/fetchData"

export default function MessagesNav() {

  const [data, setData] = useState({});
  const {messages, applications} = data || {};

  const getData = async () => {
    const messagesData = await fetchMessagesData();
    const applicationsData = await fetchApplicationsData();

    if (messagesData && applicationsData) {
      setData({
        messages: messagesData,
        applications: applicationsData,
      });
    }
  };

  useEffect(() => {
    if (auth) {
      getData();
    }
  }, []);

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

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

  console.log(data);

  return (
    <div className="messages-nav">
      <div className="contact-messages-nav">
        <NavLink to="/editor/messages">Messages</NavLink>
        <div>{messages ? messages.length : '0'}</div>
      </div>
      <div className="contact-messages-nav">
        <NavLink to="/editor/applications">Applications</NavLink>
        <div>{applications ? applications.length : '0'}</div>
      </div>
    </div>
  );
}

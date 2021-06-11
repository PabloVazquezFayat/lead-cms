import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Logout from "../Logout/Logout";
import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function EditorNav(props) {
	const { setAuth } = props;

	const [messageData, getMessages] = useAPI(urls.messages.read, "GET");
	const [applicationData, getApplications] = useAPI(urls.applications.read, "GET");

	const messages = messageData.data.messages;
	const applications = applicationData.data.applicationData;

	const handleLogoutClick = () => {
		const res = Logout();
		setAuth(res);
	};

	useEffect(() => {
		getMessages();
		getApplications();
	}, []);

	return (
		<div className="cms-navbar">
			<ul>
				<li>
					<NavLink to="/editor/home">Lead</NavLink>
				</li>
				<li>
					<NavLink to="/editor/about">About Us</NavLink>
				</li>
				<li>
					<NavLink to="/editor/projects">Projects</NavLink>
				</li>
				<li>
					<NavLink to="/editor/project">Project</NavLink>
				</li>
				<li>
					<NavLink to="/editor/news">News</NavLink>
				</li>
				<li>
					<NavLink to="/editor/article">Article</NavLink>
				</li>
				<li>
					<NavLink to="/editor/careers">Careers</NavLink>
				</li>
				<li>
					<NavLink to="/editor/contact">Contact</NavLink>
				</li>
				<li>
					<NavLink to="/editor/assets">Assets</NavLink>
				</li>
				<li>
					<button onClick={handleLogoutClick}>Logout</button>
				</li>
			</ul>
			<div>
				<div className="messages-nav">
					<div className="contact-messages-nav">
						<NavLink className="message-link" to="/editor/messages">
							Messages
						</NavLink>
						<div className="message-counter">{messages ? messages.length : "0"}</div>
					</div>
					<div className="contact-messages-nav">
						<NavLink className="message-link" to="/editor/applications">
							Applications
						</NavLink>
						<div className="message-counter">{applications ? applications.length : "0"}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

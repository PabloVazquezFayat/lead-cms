import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { logout } from "../../../utils/login";
import { useAPI } from "../../../API/services";
import { urls } from "../../../API/urls";

export default function EditorNav(props) {
	const { setAuth } = props;
	const [messageData, getMessages] = useAPI("GET", urls.messages.read);
	const [applicationData, getApplications] = useAPI("GET", urls.applications.read);

	const messages = messageData.data.messages;
	const applications = applicationData.data.applications;

	const handleLogoutClick = async () => {
		const auth = await logout();
		setAuth(auth);
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

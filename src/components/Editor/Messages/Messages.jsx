import React, { useEffect } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Message(props) {
	const [resGet, getMessages] = useAPI("GET", urls.messages.read);
	const [resDelete, deleteMessage] = useAPI("DELETE", urls.messages.delete);

	const {
		loading,
		data: { messages },
		error,
	} = resGet || {};

	const handleDeleteMessage = (e) => {
		deleteMessage(e.target.id);
	};

	const MessageList = () => {
		if (error) {
			return <li>Something went wrong</li>;
		}

		if (loading) {
			return <li>Loading...</li>;
		}

		if (messages.length === 0) {
			return <li>No messages found</li>;
		}

		return messages.map((message, i) => {
			return (
				<li key={i}>
					<div className="message-contact-info">
						<p>name: {message.name}</p>
						<p>email: {message.email}</p>
					</div>
					<div className="message-body">
						<p>subject: {message.subject}</p>
						<p>{message.message}</p>
					</div>
					<div className="messages-actions">
						<button id={message._id} className="delete-message btn-action btn-delete" onClick={handleDeleteMessage}>
							delete
						</button>
					</div>
				</li>
			);
		});
	};

	useEffect(() => {
		getMessages();
	}, [resDelete.data]);

	return (
		<div className="messages-container">
			<ul>
				<MessageList />
			</ul>
		</div>
	);
}

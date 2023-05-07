import React, { useEffect } from "react";

import Modal from "../Modal/Modal";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Contact() {
	const [res, getData] = useAPI("GET", urls.contact.read);
	const contact = res.data.contact || {};
	const { address, background, header, paragraph, city, state, zipcode, phone, fax, email, days, hours } =
		contact || {};

	const style = {
		background: background,
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="component">
			<Modal getData={getData} data={contact} dataKey="contact" />
			<div className="contact-container" style={style}>
				<div className="contact-wrapper">
					<div className="contact-info">
						<h3>{header}</h3>
						<p>{paragraph}</p>
						<ul>
							<li>
								<i className="fas fa-map-marker-alt"></i>
								<p className="footer-contact-text">
									{address} {city}, {state} {zipcode}
								</p>
							</li>
							<li>
								<i className="fas fa-phone"></i>
								<p className="footer-contact-text">{phone}</p>
							</li>
							<li>
								<i className="fas fa-fax"></i>
								<p className="footer-contact-text">{fax}</p>
							</li>
							<li>
								<i className="fas fa-envelope"></i>
								<p className="footer-contact-text">{email}</p>
							</li>
							<li>
								<i className="fas fa-calendar-day"></i>
								<p className="footer-contact-text">{days}</p>
							</li>
							<li>
								<i className="fas fa-hourglass-start"></i>
								<p className="footer-contact-text">{hours}</p>
							</li>
						</ul>
					</div>
					<div className="contact-form-container">
						<h3>message us</h3>
						<form>
							<input type="text" required placeholder="Full name" />
							<input type="text" required placeholder="Subject" />
							<input type="email" required placeholder="Email" />
							<textarea name="message" id="footer-message" cols="30" rows="10" placeholder="Message"></textarea>
							<button type="submit">Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

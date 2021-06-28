import React, { useEffect } from "react";

import Modal from "../Modal/Modal";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Careers() {
	const [res, getData] = useAPI("GET", urls.careers.read);
	const { backgroundColor, button, header, logo, paragraph } = res.data.careers || {};

	const componentStyle = { background: backgroundColor };

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="component">
			<Modal getData={getData} data={res.data.careers} dataKey="careers" />
			<div className="careers-container capture" style={componentStyle}>
				<div className="careers-wrapper">
					<div className="careers-content">
						<img src={logo} alt="lead-logo" />
						<h2>{header}</h2>
						<p>{paragraph}</p>
					</div>
					<div className="careers-content-cta">
						<a href="/careers">{button || "Button Text"}</a>
					</div>
				</div>
			</div>
		</div>
	);
}

import React, { useEffect } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Careers() {
	const [res, getData] = useAPI("GET", urls.careers.read);
	const { loading, data, error } = res || {};
	const { backgroundColor, button, header, logo, paragraph } = data.careers || {};

	const CareersPanel = () => {
		if (error) {
			return <div>Something went wrong</div>;
		}

		if (loading) {
			return <div>Loading...</div>;
		}

		const componentStyle = { background: backgroundColor };

		return (
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
		);
	};

	useEffect(() => {
		getData();
	}, []);

	return <CareersPanel />;
}

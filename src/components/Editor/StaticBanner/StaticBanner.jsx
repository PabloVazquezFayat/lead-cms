import React, { useEffect } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

import Modal from "../Modal/Modal";

export default function StaticBanner(props) {
	const [res, getData] = useAPI("GET", urls.staticBanner.read);
	const page = props.page || "";
	const banner = res.data.staticBanner ? res.data.staticBanner.find((banner) => banner.page === page) : {};
	const { backgroundImage, overlayColor, header, paragraph } = banner;

	const style = {
		component: {
			backgroundImage: `url(${backgroundImage})`,
			zIndex: "-1",
		},
		overlay: {
			background: overlayColor,
		},
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="component">
			<Modal getData={getData} data={banner} dataKey="staticBanner" />
			<div className="static-banner-container" style={style.component}>
				<div className="static-banner-overlay" style={style.overlay}>
					<h1>{header || "Header text here"}</h1>
					<h3>{paragraph || ""}</h3>
				</div>
			</div>
		</div>
	);
}

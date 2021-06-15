import React, { useEffect } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function StaticBanner(props) {
	const [res, getData] = useAPI("GET", urls.staticBanner.read);
	const { loading, data, error } = res || {};
	const page = props.page || "";
	const banner = data.staticBanner ? data.staticBanner.find((banner) => banner.page === page) : {};
	const { backgroundImage, overlayColor, header, paragraph } = banner || {};

	const StaticBannerPanel = () => {
		if (error) {
			return <div>Something went wrong</div>;
		}

		if (loading) {
			return <div>Loading...</div>;
		}

		const style = {
			component: {
				backgroundImage: `url(${backgroundImage})`,
			},
			overlay: {
				background: overlayColor,
			},
		};

		return (
			<div className="static-banner-container" style={style.component}>
				<div className="static-banner-overlay" style={style.overlay}>
					<h1>{header || "Header text here"}</h1>
					<h3>{paragraph || ""}</h3>
				</div>
			</div>
		);
	};

	useEffect(() => {
		getData();
	}, []);

	return <StaticBannerPanel />;
}

import React, { useEffect } from "react";

import Modal from "../Modal/Modal";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Mission() {
	const [res, getData] = useAPI("GET", urls.mission.read);
	const { mission } = res.data || {};
	const { header, paragraph, keyword_1, keyword_2, keyword_3, keyword_4 } = res.data.mission || {};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="container">
			<Modal getData={getData} data={mission} dataKey="mission" />
			<div className="mission-container">
				<div className="mission-wrapper">
					<div className="mission-header">
						<h2>{header || "Header goes here"}</h2>
						<p>{paragraph || "Paragraph text goes here"}</p>
					</div>
					<div className="mission-devider">
						<hr />
						<i className="fas fa-ellipsis-h fa-2x"></i>
						<hr />
					</div>
					<div className="mission-keywords">
						<ul>
							<li className="mission-keyword-container">{keyword_1 || ""}</li>
							<li className="mission-keyword-container">{keyword_2 || ""}</li>
							<li className="mission-keyword-container">{keyword_3 || ""}</li>
							<li className="mission-keyword-container">{keyword_4 || ""}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

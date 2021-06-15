import React, { useEffect } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Mission() {
	const [res, getData] = useAPI("GET", urls.missionStatement.read);
	const { loading, data, error } = res || {};
	const { header, keywords, paragraph } = data.mission || {};

	const CreateKeywords = () => {
		if (error) {
			return <li>Something went wrong</li>;
		}

		if (loading) {
			return <li>Loading...</li>;
		}

		return keywords.map((keyword, i) => {
			return (
				<li key={i}>
					<div className="mission-keyword-container">{keyword}</div>
				</li>
			);
		});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
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
						<CreateKeywords />
					</ul>
				</div>
			</div>
		</div>
	);
}

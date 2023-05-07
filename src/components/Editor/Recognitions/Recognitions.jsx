import React, { useEffect } from "react";

import ModalList from "../Modal/ModalList";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Recognitions() {
	const [panelRes, getPanelData] = useAPI("GET", urls.recognitionsPanel.read);
	const [recognitionsRes, getRecognitionsData] = useAPI("GET", urls.recognitions.read);

	const {
		loading: panelLoading,
		data: { recognitionsPanel },
		error: panelError,
	} = panelRes || {};

	const {
		loading: recognitionsLoading,
		data: { recognitions },
		error: recognitionsError,
	} = recognitionsRes || {};

	const { backgroundColor, header } = recognitionsPanel || {};

	const RecognitionsPanel = (props) => {
		if (panelError) {
			return <div>Something went wrong</div>;
		}

		if (panelLoading) {
			return <div>Loading...</div>;
		}

		const style = {
			background: backgroundColor || "#fff",
		};

		return (
			<div className="recognitions-container" style={style}>
				<h2>{header || "Header text here"}</h2>
				<ul>{props.children}</ul>
			</div>
		);
	};

	const RecognitionsList = () => {
		if (recognitionsError) {
			return <li>Something went wrong</li>;
		}

		if (recognitionsLoading) {
			return <li>Loading</li>;
		}

		return recognitions.map((recognition, i) => {
			return (
				<li key={recognition._id}>
					<a href={recognition.link}>
						<img src={recognition.image} alt="org" />
						<div>
							<p>{recognition.title}</p>
						</div>
					</a>
				</li>
			);
		});
	};

	useEffect(() => {
		getPanelData();
		getRecognitionsData();
	}, []);

	return (
		<div>
			<ModalList
				getData={{ getPanelData, getListData: getRecognitionsData }}
				data={{ panelData: recognitionsPanel, listData: recognitions }}
				dataKey={["recognitionsPanel", "recognitions"]}
			/>
			<RecognitionsPanel>
				<RecognitionsList />
			</RecognitionsPanel>
		</div>
	);
}

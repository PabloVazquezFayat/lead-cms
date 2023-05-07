import React from "react";

export default function Prompt(props) {;
	const {  setActive, action } = props || {};

	const handleCancelClick = () => {
		setActive(false);
	};

	const handleOkayClick = () => {
		setActive(false);
		action();
	};


	return (
		<div className="prompt-container">
			<div className="prompt">
				<h3>{props.children}</h3>
				<div className="prompt-buttons">
					<button className="button" onClick={handleCancelClick}>
						cancel
					</button>
					<button className="button deleteAsset" onClick={handleOkayClick}>
						okay
					</button>
				</div>
			</div>
		</div>
	);
}

import React, { useEffect, useState } from "react";

import AssetPage from "../../AssetsManager/AssetPage/AssetPage";
import Prompt from "../Prompt/Prompt";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Modal(props) {
	const [display, setDisplay] = useState("none");

	const handleInput = (e) => {};

	const toggleModal = (e) => {
		const action = e.target.attributes["data-role"].value;

		console.log(action);

		if (action === "open") {
			setDisplay("flex");
		}

		if (action === "close") {
			setDisplay("none");
		}
	};

	const handleSaveClick = async () => {};

	const style = {
		display: display,
	};

	return (
		<div className="modal-asset-container">
			<div className="create-new-asset">
				<p>Add Asset</p>
				<i className="fas fa-plus" data-role="open" onClick={toggleModal}></i>
			</div>
			<div className="modal-asset-wrapper" style={style}>
				<div className="modal-action-buttons">
					<div>
						<h3>Assets</h3>
					</div>
					<div>
						<i className="far fa-save" onClick={handleSaveClick}></i>
						<i className="fas fa-times-circle" data-role="close" aria-hidden="true" onClick={toggleModal}></i>
					</div>
				</div>
				<div className="asset-inputs-container">
					<input type="file" name="image" />
					<input type="file" name="" id="" />
				</div>
			</div>
		</div>
	);
}

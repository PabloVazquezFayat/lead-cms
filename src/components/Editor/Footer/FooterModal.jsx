import React, { useEffect, useState } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function FooterModal(props) {
	const data = props.data || [];
	const { _id } = props.data || {};
	const { dataKey } = props;

	const [res, updateData] = useAPI("PUT", urls[dataKey].update);
	const [newData, setNewData] = useState({});
	const [display, setDisplay] = useState("none");

	const handleInput = (e) => {
		const { name, value } = e.target;

		setNewData((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const ModalInputs = () => {
		return Object.keys(data)
			.filter((key) => key !== "_id" && key !== "__v")
			.map((key, i) => {
				return (
					<li key={i}>
						<label>
							{key} : {data[key]}
						</label>
						<input className="modal-input" type="text" name={data[key]} onChange={handleInput} />
					</li>
				);
			});
	};

	const toggleModal = (e) => {
		const action = e.target.attributes["data-role"].value;

		if (action === "open") {
			setDisplay("flex");
		}

		if (action === "close") {
			setDisplay("none");
		}
	};

	const handleSaveClick = async () => {
		updateData({ data: { ...newData, id: _id } });
	};

	const style = {
		display: display,
	};

	useEffect(() => {
		if (res.data[dataKey]) {
			props.getData();
		}
	}, [res.data[dataKey]]);

	console.log(dataKey);

	return (
		<div className="modal-footer">
			<div>
				<button className="modal-button" data-role="open" onClick={toggleModal}>
					Edit
				</button>
			</div>
			<div className="modal-wrapper" style={style}>
				<div className="modal-action-buttons">
					<div>
						<i className="fa fa-times fa-xs" data-role="close" aria-hidden="true" onClick={toggleModal}></i>
					</div>
				</div>
				<div className="modal-input-wrapper">
					<ul>
						<ModalInputs />
						<li>
							<label>thing</label>
							<input className="modal-input" type="text" name="thing" onChange={handleInput} />
						</li>
					</ul>
				</div>
				<div className="modal-actions-wrapper">
					<button className="modal-button modal-button-cancel" data-role="close" onClick={toggleModal}>
						Cancel
					</button>
					<button className="modal-button modal-button-save" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

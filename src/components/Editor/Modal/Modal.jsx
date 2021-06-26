import React, { useEffect, useState } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Modal(props) {
	const { _id } = props.data || {};
	const { data, dataKey } = props || {};

	const [res, updateData] = useAPI("PUT", urls[dataKey].update);
	const [display, setDisplay] = useState("none");

	const [newData, setNewData] = useState({});

	const handleInput = (e) => {
		const { name, value } = e.target;

		setNewData((prevState) => {
			return { ...prevState, [name]: value };
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

	return (
		<div className="modal-container">
			<i className="far fa-edit modal-button" data-role="open" onClick={toggleModal}></i>
			<div className="modal-wrapper" style={style}>
				<div className="modal-action-buttons">
					<i className="far fa-save " onClick={handleSaveClick}></i>
					<i className="fas fa-times-circle " data-role="close" aria-hidden="true" onClick={toggleModal}></i>
				</div>
				<ul className="modal-input-wrapper">
					{!data ? (
						<li>Loading...</li>
					) : (
						React.Children.toArray(
							Object.keys(data)
								.filter((key) => key !== "_id" && key !== "__v" && key !== "name")
								.map((key) => {
									return (
										<li>
											<label>{`${key} : ${data[key]}`}</label>
											<input className="modal-input" type="text" name={key} onChange={handleInput} />
										</li>
									);
								})
						)
					)}
				</ul>
			</div>
		</div>
	);
}

import React, { useState } from "react";

import { updateNavbarData } from "../../../utils/fetchData";

export default function NavbarModal(props) {
	//const setData = props.setData;

	const [newData, setNewData] = useState({});
	const [display, setDisplay] = useState("none");

	const { _id, logo, tagline, phone, facebook, instagram, linkedin, twitter } = props.data || {};

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
		const res = await updateNavbarData({ ...newData, id: _id });

		if (res) {
			console.log(res);
			//setData(res);
		}
	};

	const style = {
		display: display,
	};

	return (
		<div className="modal-navbar">
			<button className="modal-button" data-role="open" onClick={toggleModal}>
				Edit
			</button>
			<div className="modal-wrapper" style={style}>
				<div className="modal-input-wrapper">
					{logo ? (
						<div>
							<label>{logo}</label>
							<input className="modal-input" type="text" name="logo" onChange={handleInput} />
						</div>
					) : null}

					{tagline ? (
						<div>
							<label>{tagline}</label>
							<input className="modal-input" type="text" name="tagline" onChange={handleInput} />
						</div>
					) : null}

					{phone ? (
						<div>
							<label>{phone}</label>
							<input className="modal-input" type="text" name="phone" onChange={handleInput} />
						</div>
					) : null}

					{facebook ? (
						<div>
							<label>{facebook}</label>
							<input className="modal-input" type="text" name="facebook" onChange={handleInput} />
						</div>
					) : null}

					{instagram ? (
						<div>
							<label>{instagram}</label>
							<input className="modal-input" type="text" name="instagram" onChange={handleInput} />
						</div>
					) : null}

					{linkedin ? (
						<div>
							<label>{linkedin}</label>
							<input className="modal-input" type="text" name="linkedin" onChange={handleInput} />
						</div>
					) : null}

					{twitter ? (
						<div>
							<label>{twitter}</label>
							<input className="modal-input" type="text" name="twitter" onChange={handleInput} />
						</div>
					) : null}
				</div>
				<div className="modal-actions-wrapper">
					<button className="modal-button modal-button-cancel" data-role="close" onClick={toggleModal}>
						Cancel
					</button>
					<button id={_id} className="modal-button modal-button-save" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

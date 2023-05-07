import React, { useState, useEffect } from "react";

import Prompt from "../Prompt/Prompt";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function ModalCertifications(props) {
	const { getData, data } = props || {};

	const [resUpdate, updateCertification] = useAPI("PUT", urls.certifications.update);
	const [resCreate, createCertification] = useAPI("POST", urls.certifications.create);
	const [resDelete, deleteCertification] = useAPI("DELETE", urls.certifications.delete);

	const [newCertification, setNewCertification] = useState({});
	const [active, setActive] = useState({});
	const [certificationID, setCertificationID] = useState("");
	const [display, setDisplay] = useState("none");

	const [prompt, setPrompt] = useState(false);

	const toggleModal = (e) => {
		const action = e.target.attributes["data-role"].value;

		if (action === "open") {
			setDisplay("flex");
		}

		if (action === "close") {
			setDisplay("none");
			setActive({});
		}
	};

	const handleDataInput = (e) => {
		const { name, value } = e.target;

		setNewCertification((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleEditClick = (e) => {
		const selected = data.find((certification) => certification._id === e.target.id);
		setActive(selected);
	};

	const handleSaveClick = () => {
		if (Object.keys(newCertification).length > 0 && active._id) {
			updateCertification({ data: { ...newCertification, id: active._id } });
		}

		if (Object.keys(newCertification).length > 0 && !active._id) {
			createCertification({ data: { ...newCertification, index: active.index } });
		}
	};

	const handleNewClick = () => {
		setActive({
			text: "",
			index: data[data.length - 1].index + 1 || 1,
		});
	};

	const handleDeleteClick = (e) => {
		setPrompt(true);
		setCertificationID(e.target.id);
	};

	const handleDelete = () => {
		deleteCertification({ id: certificationID });
	};

	const style = {
		display: display,
	};

	useEffect(() => {
		if (resUpdate.data.certifications || resCreate.data.certifications || resDelete.data.certifications) {
			getData();
			setActive({});
		}
	}, [resUpdate.data.certifications, resCreate.data.certifications, resDelete.data.certifications]);

	return (
		<div className="modal-container">
			<i className="far fa-edit modal-button" data-role="open" onClick={toggleModal}></i>
			<div className="members-modal-wrapper" style={style}>
				{prompt ? (
					<Prompt active={prompt} setActive={setPrompt} action={handleDelete}>
						Are you sure you want to delete this certification?
					</Prompt>
				) : null}
				<div className="modal-action-buttons">
					<div>
						<h3>Certifications</h3>
					</div>
					<div>
						<i className="far fa-save " onClick={handleSaveClick}></i>
						<i className="fas fa-times-circle " data-role="close" aria-hidden="true" onClick={toggleModal}></i>
					</div>
				</div>
				<div className="modal-leadership-section">
					<ul className="members-list">
						{data
							? React.Children.toArray(
									data.map((certification, i) => {
										return (
											<li
												className="member-list-item"
												style={active.index === certification.index ? { background: "#badfff" } : null}
											>
												<div className="member-details">
													<p>index: {certification.index}</p>
													<h3>{certification.text}</h3>
												</div>
												<div className="member-actions">
													<i className="fas fa-edit" id={certification._id} onClick={handleEditClick}></i>
													<i className="far fa-trash-alt" id={certification._id} onClick={handleDeleteClick}></i>
												</div>
											</li>
										);
									})
							  )
							: null}
					</ul>
					<div className="create-new-member">
						<i className="fas fa-plus" onClick={handleNewClick}></i>
					</div>
				</div>
				<div className="modal-input-wrapper">
					{Object.keys(active).length > 0 ? (
						<div>
							<h2>Editing Certification : {active.index}</h2>
							<div className="member-content">
								<label>index: {active.index}</label>
								<input className="modal-input" type="text" name="index" onChange={handleDataInput} />
								<label>name: {active.text}</label>
								<input className="modal-input" type="text" name="text" onChange={handleDataInput} />
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

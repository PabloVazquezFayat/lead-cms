import React, { useEffect, useState } from "react";

import AssetPage from "../../AssetsManager/AssetPage/AssetPage";
import Prompt from "../Prompt/Prompt";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function ModalLeadership(props) {
	const { _id } = props.data || {};
	const { getData, data, dataKeys } = props || {};

	const [res, updateData] = useAPI("PUT", urls[dataKeys[0]].update);
	const [display, setDisplay] = useState("none");

	const [newData, setNewData] = useState({});
	const [activeMember, setActiveMember] = useState({});
	const [assetManagerToggle, setAssetManagerToggle] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [prompt, setPrompt] = useState(false);

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

	const handleEditClick = (e) => {
		const selectedMember = data.members.find((member) => member._id === e.target.id);
		setActiveMember(selectedMember);
		setAssetManagerToggle(false);
		setSelectedImage("");
	};

	const handleImageSelectClick = () => {
		if (assetManagerToggle) {
			setAssetManagerToggle(false);
			return;
		}

		setSelectedImage("");
		setAssetManagerToggle(true);
		return;
	};

	const handleSaveClick = async () => {
		updateData({ data: { ...newData, id: _id } });
	};

	const style = {
		display: display,
	};

	useEffect(() => {
		if (selectedImage) {
			setAssetManagerToggle(false);
			setNewData((prevState) => {
				return { ...prevState, image: selectedImage };
			});
		}
	}, [selectedImage]);

	// useEffect(() => {
	// 	setActiveMember({});
	// 	setSelectedImage("");
	// });

	return (
		<div className="modal-container">
			<i className="far fa-edit modal-button" data-role="open" onClick={toggleModal}></i>
			<div className="members-modal-wrapper" style={style}>
				{prompt ? (
					<Prompt active={prompt} setActive={setPrompt}>
						Are you sure you want to delete this member?
					</Prompt>
				) : null}
				<div className="modal-action-buttons">
					<div>
						<h3>{data[dataKeys[0]] ? data[dataKeys[0]].name : ""}</h3>
					</div>
					<div>
						<i className="far fa-save " onClick={handleSaveClick}></i>
						<i className="fas fa-times-circle " data-role="close" aria-hidden="true" onClick={toggleModal}></i>
					</div>
				</div>
				<div className="modal-header-editor">{data.leadershipBanner ? <h2>Edit Leadership Banner</h2> : null}</div>
				<div className="modal-leadership-section">
					<ul className="members-list">
						{data.members
							? React.Children.toArray(
									data.members.map((member, i) => {
										return (
											<li
												className="member-list-item"
												style={activeMember.index === i + 1 ? { background: "#badfff" } : null}
											>
												<div className="member-details">
													<p>index: {member.index}</p>
													<img className="member-image" src={member.image} alt="member" />
													<h3>{member.name}</h3>
												</div>
												<div className="member-actions">
													<i className="fas fa-edit" id={member._id} onClick={handleEditClick}></i>
													<i className="far fa-trash-alt" id={member._id}></i>
												</div>
											</li>
										);
									})
							  )
							: null}
					</ul>
				</div>
				<div className="modal-input-wrapper">
					{Object.keys(activeMember).length > 0 ? (
						<div>
							<div className="member-image-preview">
								<h3>Editing Member : {activeMember.name}</h3>
							</div>
							<div className="member-image-preview">
								{assetManagerToggle ? (
									<div className="modal-asset-selector">
										<button className="image-select-exit" onClick={handleImageSelectClick}>
											Exit
										</button>
										<AssetPage setSelectedImage={setSelectedImage} />
									</div>
								) : (
									<div className="member-image-selector">
										<img src={selectedImage || activeMember.image} alt="" />
										<i className="far fa-images" onClick={handleImageSelectClick}></i>
									</div>
								)}
							</div>
							<div className="member-content">
								<label>index: {activeMember.index}</label>
								<input className="modal-input" type="text" name="index" onChange={handleInput} />
								<label>name: {activeMember.name}</label>
								<input className="modal-input" type="text" name="name" onChange={handleInput} />
								<label>title: {activeMember.title}</label>
								<input className="modal-input" type="text" name="title" onChange={handleInput} />
								<label>bio: {activeMember.bio}</label>
								<textarea className="modal-input" type="text" name="bio" onChange={handleInput}></textarea>
								<label>social: {activeMember.social}</label>
								<input className="modal-input" type="text" name="social" onChange={handleInput} />
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

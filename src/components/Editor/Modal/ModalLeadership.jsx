import React, { useEffect, useState } from "react";

import AssetPage from "../../AssetsManager/AssetPage/AssetPage";
import Prompt from "../Prompt/Prompt";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function ModalLeadership(props) {
	const { _id: bannerID } = props.data && props.data.leadershipBanner ? props.data.leadershipBanner : {};
	const {
		getData: { getPanelData, getTeamData },
		data,
		dataKeys,
	} = props || {};

	const [resMembers, updateMemberData] = useAPI("PUT", urls.leadershipMembers.update);
	const [resNewMember, createNewMember] = useAPI("POST", urls.leadershipMembers.create);
	const [resDeletedMember, deleteMember] = useAPI("DELETE", urls.leadershipMembers.delete);
	const [resBanner, updateBannerData] = useAPI("PUT", urls.leadershipBanner.update);

	const [display, setDisplay] = useState("none");

	const [newBannerData, setNewBannerData] = useState({});
	const [newMemberData, setNewMemberData] = useState({});
	const [activeMember, setActiveMember] = useState({});
	const [assetManagerToggle, setAssetManagerToggle] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [prompt, setPrompt] = useState(false);
	const [memberID, setMemberID] = useState("");

	const handleDataInput = (e) => {
		const { name, value, attributes } = e.target;

		if (attributes["data-type"].value === "member") {
			setNewMemberData((prevState) => {
				return { ...prevState, [name]: value };
			});
		}

		if (attributes["data-type"].value === "banner") {
			console.log(value);
			setNewBannerData((prevState) => {
				return { ...prevState, [name]: value };
			});
		}
	};

	const toggleModal = (e) => {
		const action = e.target.attributes["data-role"].value;

		if (action === "open") {
			setDisplay("flex");
		}

		if (action === "close") {
			setDisplay("none");
			setActiveMember({});
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
		if (Object.keys(newMemberData).length > 0 && newMemberData._id) {
			updateMemberData({ data: { ...newMemberData, id: activeMember._id } });
		}

		if (Object.keys(newBannerData).length > 0) {
			updateBannerData({ data: { ...newBannerData, id: bannerID } });
		}

		if (Object.keys(newMemberData).length > 0 && !newMemberData._id) {
			createNewMember({ data: { ...newMemberData, index: activeMember.index } });
		}
	};

	const handleNewMemberClick = () => {
		setActiveMember({
			image: "",
			title: "",
			name: "",
			bio: "",
			social: "",
			index: data.members[data.members.length - 1].index + 1 || 1,
		});
	};

	const handleDeleteMemberClick = (e) => {
		setPrompt(true);
		setMemberID(e.target.id);
	};

	const handleDeleteMember = () => {
		deleteMember({ id: memberID });
	};

	const style = {
		display: display,
	};

	useEffect(() => {
		if (selectedImage) {
			setAssetManagerToggle(false);
			setNewMemberData((prevState) => {
				return { ...prevState, image: selectedImage };
			});
		}
	}, [selectedImage]);

	useEffect(() => {
		if (resMembers.data.members || resNewMember.data.members || resDeletedMember.data.members || resBanner.data) {
			getPanelData();
			getTeamData();
			setSelectedImage("");
			setActiveMember({});
		}
	}, [resMembers.data.members, resNewMember.data.members, resDeletedMember.data.members, resBanner.data]);

	return (
		<div className="modal-container">
			<i className="far fa-edit modal-button" data-role="open" onClick={toggleModal}></i>
			<div className="members-modal-wrapper" style={style}>
				{prompt ? (
					<Prompt active={prompt} setActive={setPrompt} action={handleDeleteMember}>
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
				<div className="modal-header-editor">
					{data.leadershipBanner ? (
						<div>
							<h2>Edit Leadership Banner</h2>
							<div className="modal-banner-editor">
								<label>background-color: {data.leadershipBanner.background}</label>
								<input
									className="modal-input"
									type="color"
									name="background"
									data-type="banner"
									onChange={handleDataInput}
									defaultValue={data.leadershipBanner.background}
								/>
								<label>header: {data.leadershipBanner.header}</label>
								<input
									className="modal-input"
									type="text"
									name="header"
									data-type="banner"
									onChange={handleDataInput}
								/>
								<label>paragraph: {data.leadershipBanner.paragraph}</label>
								<input
									className="modal-input"
									type="text"
									name="paragraph"
									data-type="banner"
									onChange={handleDataInput}
								/>
							</div>
						</div>
					) : null}
				</div>
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
													<i className="far fa-trash-alt" id={member._id} onClick={handleDeleteMemberClick}></i>
												</div>
											</li>
										);
									})
							  )
							: null}
					</ul>
					<div className="create-new-member">
						<i className="fas fa-plus" onClick={handleNewMemberClick}></i>
					</div>
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
								<input
									className="modal-input"
									type="number"
									name="index"
									data-type="member"
									onChange={handleDataInput}
								/>
								<label>name: {activeMember.name}</label>
								<input className="modal-input" type="text" name="name" data-type="member" onChange={handleDataInput} />
								<label>title: {activeMember.title}</label>
								<input className="modal-input" type="text" name="title" data-type="member" onChange={handleDataInput} />
								<label>bio: {activeMember.bio}</label>
								<textarea
									className="modal-input"
									type="text"
									name="bio"
									data-type="member"
									onChange={handleDataInput}
								></textarea>
								<label>social: {activeMember.social}</label>
								<input
									className="modal-input"
									type="text"
									name="social"
									data-type="member"
									onChange={handleDataInput}
								/>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

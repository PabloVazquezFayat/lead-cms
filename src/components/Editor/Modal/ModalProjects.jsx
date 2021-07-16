import React, { useState, useEffect } from "react";

import AssetPage from "../../AssetsManager/AssetPage/AssetPage";
import Prompt from "../Prompt/Prompt";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function ModalList(props) {
	const {
		getData: { getListData },
		data,
		dataKey,
	} = props || {};

	const [resUpdate, updateItem] = useAPI("PUT", urls[dataKey[1]].update);
	const [resCreate, createItem] = useAPI("POST", urls[dataKey[1]].create);
	const [resDelete, deleteItem] = useAPI("DELETE", urls[dataKey[1]].delete);

	const [newItem, setNewItem] = useState({});
	const [active, setActive] = useState({});
	const [activeImageID, setActiveImageID] = useState("");
	const [assetManagerToggle, setAssetManagerToggle] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [prompt, setPrompt] = useState(false);
	const [itemID, setItemID] = useState("");
	const [display, setDisplay] = useState("none");

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
		let { name, value, checked } = e.target;

		console.log(checked);

		if (checked === true) {
			value = true;
		} else if (checked === false) {
			value = false;
		}

		setNewItem((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleTitleImageSelect = (e) => {
		const { name, checked, attributes } = e.target;

		console.log(name, checked, attributes["data-image"].value);
	};

	const handleEditClick = (e) => {
		const selected = data.listData.find((item) => item._id === e.target.id);
		setNewItem("");
		setActive(selected);
	};

	const handleSaveClick = () => {
		if (Object.keys(newItem).length > 0 && active._id) {
			updateItem({ data: { ...newItem, id: active._id } });
		}

		if (Object.keys(newItem).length > 0 && !active._id) {
			createItem({ data: { ...newItem, index: active.index } });
		}
	};

	const handleNewClick = () => {
		setActive({
			text: "",
			index: data.listData[data.listData.length - 1].index + 1 || 1,
		});
	};

	const handleDeleteClick = (e) => {
		setPrompt(true);
		setItemID(e.target.id);
	};

	const handleDelete = () => {
		deleteItem({ id: itemID });
	};

	const handleImageSelectClick = (e) => {
		if (assetManagerToggle) {
			setAssetManagerToggle(false);
			return;
		}

		setSelectedImage("");
		setAssetManagerToggle(true);
		setActiveImageID(e.target.id);
	};

	const handleImageDeleteClick = (e) => {
		const { attributes } = e.target;
		console.log(attributes["data-type"].value);

		if (active) {
			setActive((prevState) => {
				const images = prevState.images.filter((image) => image !== attributes["data-type"].value);
				console.log(images);

				return { ...prevState, images };
			});
		}
	};

	const style = {
		display: display,
	};

	useEffect(() => {
		if (selectedImage) {
			setAssetManagerToggle(false);
			setActive((prevState) => {
				let images = [...active.images];
				images[activeImageID] = selectedImage;

				return { ...prevState, images };
			});
		}
	}, [selectedImage]);

	useEffect(() => {
		if (resUpdate.data[dataKey[1]] || resCreate.data[dataKey[1]] || resDelete.data[dataKey[1]]) {
			getListData();
			setActive({});
		}
	}, [resUpdate.data[dataKey[1]], resCreate.data[dataKey[1]], resDelete.data[dataKey[1]]]);

	return (
		<div className="modal-container">
			<i className="far fa-edit modal-button" data-role="open" onClick={toggleModal}></i>

			<div className="members-modal-wrapper" style={style}>
				{prompt ? (
					<Prompt active={prompt} setActive={setPrompt} action={handleDelete}>
						Are you sure you want to delete this project?
					</Prompt>
				) : null}

				<div className="modal-action-buttons">
					<div>
						<h3>Projects</h3>
					</div>
					<div>
						<i className="far fa-save " onClick={handleSaveClick}></i>
						<i className="fas fa-times-circle " data-role="close" aria-hidden="true" onClick={toggleModal}></i>
					</div>
				</div>

				<div className="modal-leadership-section">
					<ul className="members-list">
						{data && data.listData
							? React.Children.toArray(
									data.listData.map((data, i) => {
										return (
											<li
												className="member-list-item"
												style={active.index === data.index ? { background: "#badfff" } : null}
											>
												<div className="member-details">
													<p>index: {data.index}</p>
													<img className="modal-slide-image" src={data.titleImage} alt="icon" />
													<h3>{data.name}</h3>
												</div>
												<div className="member-actions">
													<i className="fas fa-edit" id={data._id} onClick={handleEditClick}></i>
													<i className="far fa-trash-alt" id={data._id} onClick={handleDeleteClick}></i>
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
							<div className="member-image-preview">
								<h3>Editing Project : {active.name}</h3>
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
									<div>
										<div className="project-image-selector">
											<ul className="project-image-list">
												{React.Children.toArray(
													active.images.map((image, i) => {
														return (
															<li className="projects-image-selector-item">
																<div className="projects-image-title-image-selector">
																	<label>Title image:</label>
																	<input
																		type="checkbox"
																		name="titleImage"
																		data-image={image}
																		onChange={handleTitleImageSelect}
																	/>
																</div>
																<div className="projects-current-image">
																	<img src={image} alt="image" />
																</div>
																<div className="projects-image-actions">
																	<button className="btn-action" id={i} onClick={handleImageSelectClick}>
																		Edit
																	</button>
																	<button
																		className="btn-action btn-delete"
																		data-type={image}
																		onClick={handleImageDeleteClick}
																	>
																		Delete
																	</button>
																</div>
															</li>
														);
													})
												)}
											</ul>
										</div>
										<div className="create-new-slide">
											<i className="fas fa-plus"></i>
										</div>
									</div>
								)}
							</div>

							<div>
								<label>featured: {active.featured}</label>
								<input
									className="modal-input"
									type="checkbox"
									name="featured"
									onChange={handleDataInput}
									checked={newItem.featured || active.featured}
								/>
							</div>

							<div className="member-content">
								<label>index: {active.index}</label>
								<input className="modal-input" type="text" name="index" onChange={handleDataInput} />
								<label>name: {active.name}</label>
								<input className="modal-input" type="text" name="name" onChange={handleDataInput} />
								<label>client: {active.client}</label>
								<input className="modal-input" type="text" name="client" onChange={handleDataInput} />
								<label>location: {active.location}</label>
								<input className="modal-input" type="text" name="location" onChange={handleDataInput} />
								<label>paragraph:</label>
								<textarea
									className="modal-input"
									rows="15"
									name="paragraph"
									onChange={handleDataInput}
									defaultValue={active.paragraph}
								></textarea>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

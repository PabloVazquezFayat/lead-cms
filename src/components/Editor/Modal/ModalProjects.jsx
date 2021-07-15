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

	const handleImageSelectClick = () => {
		if (assetManagerToggle) {
			setAssetManagerToggle(false);
			return;
		}

		setSelectedImage("");
		setAssetManagerToggle(true);
		return;
	};

	const style = {
		display: display,
	};

	useEffect(() => {
		if (selectedImage) {
			setAssetManagerToggle(false);
			setNewItem((prevState) => {
				return { ...prevState, image: selectedImage };
			});
		}
	}, [selectedImage]);

	useEffect(() => {
		if (resUpdate.data[dataKey[1]] || resCreate.data[dataKey[1]] || resDelete.data[dataKey[1]]) {
			getListData();
			setActive({});
		}
	}, [resUpdate.data[dataKey[1]], resCreate.data[dataKey[1]], resDelete.data[dataKey[1]]]);

	console.log("remount");

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
													<img className="modal-slide-image" src={data.image} alt="icon" />
													<h3>{data.title}</h3>
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
									<div className="member-image-selector">
										<ul>
											{React.Children.toArray(
												active.images.map((image) => {
													return (
														<li>
															<div>
																<label>Title image:</label>
																<input
																	type="checkbox"
																	name="titleImage"
																	data-image={image}
																	onChange={handleTitleImageSelect}
																/>
															</div>
															<img src={image} alt="image" />
															<div>
																<button>Edit</button>
																<button>Delete</button>
															</div>
														</li>
													);
												})
											)}
										</ul>
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
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

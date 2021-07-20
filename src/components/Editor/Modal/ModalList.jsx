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
		const { name, value } = e.target;

		setNewItem((prevState) => {
			return { ...prevState, [name]: value };
		});
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

	return (
		<div className="modal-container">
			<i className="far fa-edit modal-button" data-role="open" onClick={toggleModal}></i>
			<div className="members-modal-wrapper" style={style}>
				{prompt ? (
					<Prompt active={prompt} setActive={setPrompt} action={handleDelete}>
						Are you sure you want to delete this Recognition?
					</Prompt>
				) : null}
				<div className="modal-action-buttons">
					<div>
						<h3>Recognitions</h3>
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
								<h3>Editing Recognition : {active.index}</h3>
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
										<img src={selectedImage || active.image} alt="" />
										<i className="far fa-images" onClick={handleImageSelectClick}></i>
									</div>
								)}
							</div>
							<div className="member-content">
								<label>index: {active.index}</label>
								<input className="modal-input" type="text" name="index" onChange={handleDataInput} />
								<label>title: {active.title}</label>
								<input className="modal-input" type="text" name="title" onChange={handleDataInput} />
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

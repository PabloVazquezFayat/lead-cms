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

	const [activeProject, setActiveProject] = useState({});

	const [activeImageID, setActiveImageID] = useState("");
	const [newData, setNewData] = useState({});
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
			setActiveProject({});
		}
	};

	const handleDataInput = (e) => {
		const { name, value, checked } = e.target;

		if (checked === true && !value) {
			setActiveProject((prevState) => {
				return { ...prevState, [name]: true };
			});
			return;
		} else if (checked === false && !value) {
			setActiveProject((prevState) => {
				return { ...prevState, [name]: false };
			});
			return;
		}

		if (value && !checked) {
			setNewData((prevState) => {
				return { ...prevState, [name]: value };
			});
		}
	};

	const handleFeatureInput = (e) => {
		const { name, checked } = e.target;

		if (checked) {
			setActiveProject((prevState) => {
				return { ...prevState, [name]: true };
			});
			return;
		}

		setActiveProject((prevState) => {
			return { ...prevState, [name]: false };
		});
		return;
	};

	const handleTitleImageSelect = (e) => {
		const { checked, id } = e.target;

		if (checked === true) {
			setActiveProject((prevState) => {
				const images = [...prevState.images].map((image) => {
					if (image.index === parseInt(id)) {
						return { ...image, title: true };
					}
					return { ...image, title: false };
				});

				return { ...prevState, images, titleImage: prevState.images[id].url };
			});

			return;
		}

		setActiveProject((prevState) => {
			const images = [...prevState.images].map((image) => {
				return { ...image, title: false };
			});

			return { ...prevState, images, titleImage: "" };
		});
	};

	const handleEditClick = (e) => {
		const selectedProject = data.listData.find((item) => item._id === e.target.id);

		const transformedImagesArray = selectedProject.images.map((image, i) => {
			return { url: image, index: i, title: selectedProject.titleImage === image || false };
		});

		const updatedSelectedProject = { ...selectedProject, images: transformedImagesArray };

		setActiveProject(updatedSelectedProject);
	};

	const handleSaveClick = () => {
		const data = { ...activeProject, images: activeProject.images.map((image) => image.url), ...newData };

		if (data._id) {
			updateItem({ data });
			return;
		}

		createItem({ data });
		return;
	};

	const handleNewClick = () => {
		setActiveProject({
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

		if (e.target.id) {
			setActiveImageID(parseInt(e.target.id));
		} else {
			setActiveImageID(
				activeProject && activeProject.images && activeProject.images.length ? activeProject.images.length : 0
			);
		}
	};

	const handleImageDeleteClick = (e) => {
		const { id } = e.target;

		setActiveProject((prevState) => {
			const images = prevState.images.filter((image) => image.index !== parseInt(id));
			return { ...prevState, images };
		});
	};

	const style = {
		display: display,
	};

	useEffect(() => {
		if (selectedImage) {
			setAssetManagerToggle(false);
			setActiveProject((prevState) => {
				const images = prevState.images ? [...prevState.images] : [];

				if (!images[activeImageID]) {
					images.push({ url: selectedImage, index: activeImageID, title: false });
					return { ...prevState, images };
				}

				const updatedImages = (images[activeImageID].url = selectedImage);
				return { ...prevState, updatedImages };
			});
		}
	}, [selectedImage]);

	useEffect(() => {
		if (resUpdate.data[dataKey[1]] || resCreate.data[dataKey[1]] || resDelete.data[dataKey[1]]) {
			getListData();
			setActiveProject({});
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
												style={activeProject.index === data.index ? { background: "#badfff" } : null}
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
					{Object.keys(activeProject).length > 0 ? (
						<div>
							<div className="member-image-preview">
								<h3>Editing Project : {activeProject.name}</h3>
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
												{activeProject.images
													? React.Children.toArray(
															activeProject.images.map((image, i) => {
																return (
																	<li className="projects-image-selector-item">
																		<div className="projects-image-title-image-selector">
																			<label>Title image:</label>
																			<input
																				type="checkbox"
																				name="titleImage"
																				id={i}
																				onChange={handleTitleImageSelect}
																				checked={image.title}
																			/>
																		</div>
																		<div className="projects-current-image">
																			<img src={image.url} alt="project" />
																		</div>
																		<div className="projects-image-actions">
																			<button className="btn-action" id={image.index} onClick={handleImageSelectClick}>
																				Edit
																			</button>
																			<button
																				className="btn-action btn-delete"
																				id={image.index}
																				onClick={handleImageDeleteClick}
																			>
																				Delete
																			</button>
																		</div>
																	</li>
																);
															})
													  )
													: null}
											</ul>
										</div>

										<div className="create-new-slide">
											<i className="fas fa-plus" onClick={handleImageSelectClick}></i>
										</div>
									</div>
								)}
							</div>

							<div>
								<label>featured: {activeProject.featured}</label>
								<input
									className="modal-input"
									type="checkbox"
									name="featured"
									onChange={handleFeatureInput}
									defaultChecked={activeProject.featured}
								/>
							</div>

							<div className="member-content">
								<label>index: {activeProject.index}</label>
								<input className="modal-input" type="text" name="index" onChange={handleDataInput} defaultValue={""} />
								<label>name: {activeProject.name}</label>
								<input className="modal-input" type="text" name="name" onChange={handleDataInput} defaultValue={""} />
								<label>client: {activeProject.client}</label>
								<input className="modal-input" type="text" name="client" onChange={handleDataInput} defaultValue={""} />
								<label>location: {activeProject.location}</label>
								<input
									className="modal-input"
									type="text"
									name="location"
									onChange={handleDataInput}
									defaultValue={""}
								/>
								<label>paragraph:</label>
								<p>{activeProject.paragraph}</p>
								<textarea
									className="modal-input"
									rows="15"
									name="paragraph"
									onChange={handleDataInput}
									defaultValue={""}
								></textarea>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

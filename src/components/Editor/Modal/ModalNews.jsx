import React, { useState, useEffect } from "react";

import AssetPage from "../../AssetsManager/AssetPage/AssetPage";
import Prompt from "../Prompt/Prompt";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function ModalNews(props) {
	const { getData, data } = props || {};

	const [resUpdate, updateArticle] = useAPI("PUT", urls.newsArticle.update);
	const [resCreate, createArticle] = useAPI("POST", urls.newsArticle.create);
	const [resDelete, deleteArticle] = useAPI("DELETE", urls.newsArticle.delete);

	const [activeArticle, setActiveArticle] = useState({});
	const [newArticleData, setNewArticleData] = useState({});
	const [articleID, setArticleID] = useState("");
	const [display, setDisplay] = useState("none");
	const [assetManagerToggle, setAssetManagerToggle] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [prompt, setPrompt] = useState(false);

	const toggleModal = (e) => {
		const action = e.target.attributes["data-role"].value;

		if (action === "open") {
			setDisplay("flex");
		}

		if (action === "close") {
			setDisplay("none");
			setActiveArticle({});
		}
	};

	const handleDataInput = (e) => {
		const { name, value } = e.target;

		setNewArticleData((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleEditClick = (e) => {
		const selected = data.find((item) => item._id === e.target.id);
		setActiveArticle(selected);
		setSelectedImage("");
	};

	const handleSaveClick = () => {
		if (activeArticle._id) {
			updateArticle({ data: { ...activeArticle, ...newArticleData } });
			return;
		}

		createArticle({ data: { ...activeArticle, ...newArticleData } });
		return;
	};

	const handleNewClick = () => {
		setActiveArticle({
			title: "",
			summary: "",
			paragraph: "",
			featured: false,
			video: "",
			image: "",
			category: "",
		});
	};

	const handleDeleteClick = (e) => {
		setPrompt(true);
		setArticleID(e.target.id);
	};

	const handleDelete = () => {
		deleteArticle({ id: articleID });
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

	const handleFeatureInput = (e) => {
		const { name, checked } = e.target;

		if (checked) {
			setActiveArticle((prevState) => {
				return { ...prevState, [name]: true };
			});
			return;
		}

		setActiveArticle((prevState) => {
			return { ...prevState, [name]: false };
		});
		return;
	};

	const processDate = (date) => {
		return new Date(date).toString().substr(3, 12);
	};

	const style = {
		display: display,
	};

	useEffect(() => {
		if (selectedImage) {
			setAssetManagerToggle(false);
			setNewArticleData((prevState) => {
				if (selectedImage.indexOf("mp4") !== -1) {
					return { ...prevState, video: selectedImage, image: "" };
				}

				if (selectedImage.indexOf("mp4") === -1) {
					return { ...prevState, video: "", image: selectedImage };
				}
			});
		}
	}, [selectedImage]);

	useEffect(() => {
		if (resUpdate.data.newsArticles || resCreate.data.newsArticles || resDelete.data.newsArticles) {
			getData();
			setActiveArticle({});
			setNewArticleData({});
		}
	}, [resUpdate.data.newsArticles, resCreate.data.newsArticles, resDelete.data.newsArticles]);

	return (
		<div className="modal-container">
			<i className="far fa-edit modal-button" data-role="open" onClick={toggleModal}></i>

			<div className="members-modal-wrapper" style={style}>
				{prompt ? (
					<Prompt active={prompt} setActive={setPrompt} action={handleDelete}>
						Are you sure you want to delete this article?
					</Prompt>
				) : null}

				<div className="modal-action-buttons">
					<div>
						<h3>News Articles</h3>
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
									data.map((data, i) => {
										return (
											<li
												className="member-list-item"
												style={activeArticle._id === data._id ? { background: "#badfff" } : null}
											>
												<div className="member-details">
													<p>{processDate(data.date)}</p>
													{data.image ? <img className="modal-slide-image" src={data.image} alt="icon" /> : null}
													{data.video ? (
														<video controls className="modal-slide-image">
															<source src={data.video} type="video/mp4" />
															Your browser does not support this video.
														</video>
													) : null}

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
					{Object.keys(activeArticle).length > 0 ? (
						<div>
							<div className="member-image-preview">
								<h3>Editing Article : {activeArticle.title || "New Article"}</h3>
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
										{selectedImage && selectedImage.indexOf("mp4") === -1 ? <img src={selectedImage} alt="" /> : null}

										{activeArticle.image && !selectedImage ? <img src={activeArticle.image} alt="" /> : null}

										{selectedImage && selectedImage.indexOf("mp4") !== -1 ? (
											<video controls>
												<source src={selectedImage} type="video/mp4" />
												Your browser does not support this video.
											</video>
										) : null}

										{activeArticle.video && !selectedImage ? (
											<video controls>
												<source src={activeArticle.video} type="video/mp4" />
												Your browser does not support this video.
											</video>
										) : null}

										<i className="far fa-images" onClick={handleImageSelectClick}></i>
									</div>
								)}
							</div>

							<div>
								<label>featured: {activeArticle.featured}</label>
								<input
									className="modal-input"
									type="checkbox"
									name="featured"
									onChange={handleFeatureInput}
									defaultChecked={activeArticle.featured}
								/>
							</div>

							<div className="member-content">
								<label>title: {activeArticle.title}</label>
								<input className="modal-input" type="text" name="title" onChange={handleDataInput} defaultValue="" />

								<label>date: {processDate(activeArticle.date)}</label>
								<input className="modal-input" type="date" name="date" onChange={handleDataInput} defaultValue="" />

								<label>category: {newArticleData.category || activeArticle.category}</label>
								<select
									className="modal-input select-input"
									name="category"
									value={newArticleData.category || activeArticle.category}
									onChange={handleDataInput}
								>
									<option value="airport-civil">airport civil</option>
									<option value="ports-marine">ports &amp; marine</option>
									<option value="highway-bridge">highway &amp; bridge</option>
									<option value="sitework-development">sitework development</option>
									<option value="water-sewer">water &amp; sewer</option>
								</select>

								<label>summary:</label>
								<p>{activeArticle.summary}</p>
								<textarea
									className="modal-input"
									rows="10"
									name="summary"
									onChange={handleDataInput}
									defaultValue=""
								></textarea>

								<label>paragraph:</label>
								<p>{activeArticle.paragraph}</p>
								<textarea
									className="modal-input"
									rows="10"
									name="paragraph"
									onChange={handleDataInput}
									defaultValue=""
								></textarea>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

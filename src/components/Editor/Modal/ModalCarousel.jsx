import React, { useEffect, useState } from "react";

import AssetPage from "../../AssetsManager/AssetPage/AssetPage";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Modal(props) {
	const { _id } = props.data || {};
	const { data, dataKey } = props || {};

	const [res, updateData] = useAPI("PUT", urls[dataKey].update);
	const [display, setDisplay] = useState("none");

	const [newData, setNewData] = useState({});
	const [activeSlide, setActiveSlide] = useState({});
	const [assetManagerToggle, setAssetManagerToggle] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");

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
		console.log(newData);
		//updateData({ data: { ...newData, id: _id } });
	};

	const handleEditClick = (e) => {
		const selectedSlide = data.find((slide) => slide._id === e.target.id);
		setActiveSlide(selectedSlide);
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

	const style = {
		display: display,
	};

	const overlayStyle = {
		backgroundColor: activeSlide.overlayColor,
		opacity: "0.3",
	};

	useEffect(() => {
		if (selectedImage) {
			setAssetManagerToggle(false);
		}
	}, [selectedImage]);

	return (
		<div className="modal-carousel-container">
			<i className="far fa-edit modal-button" data-role="open" onClick={toggleModal}></i>
			<div className="modal-carousel-wrapper" style={style}>
				<div className="modal-action-buttons">
					<div>
						<h3>Carousel</h3>
					</div>
					<div>
						<i className="far fa-save" onClick={handleSaveClick}></i>
						<i className="fas fa-times-circle" data-role="close" aria-hidden="true" onClick={toggleModal}></i>
					</div>
				</div>
				<div className="modal-carousel-slides-container">
					<ol className="slides-list">
						{data
							? React.Children.toArray(
									data.map((slide, i) => {
										return (
											<li className="modal-slide">
												<div className="slide-details">
													<p>Slide: {i + 1}</p>
													<img className="modal-slide-image" src={slide.backgroundImage} alt="slide" />
													<h3>{slide.header}</h3>
												</div>
												<div className="slide-actions">
													<i className="fas fa-edit" id={slide._id} onClick={handleEditClick}></i>
													<i className="far fa-trash-alt"></i>
												</div>
											</li>
										);
									})
							  )
							: null}
					</ol>
					<div className="create-new-slide">
						<i className="fas fa-plus"></i>
					</div>
				</div>
				{Object.keys(activeSlide).length > 0 ? (
					<div className="modal-slide-preview">
						<div className="modal-slide-preview-title">
							<h3>Editing: Slide {activeSlide.index}</h3>
						</div>
						<div className="modal-slide-preview-container">
							<div className="slide-preview">
								<div className="slide-image-container">
									{assetManagerToggle ? (
										<div className="modal-asset-selector">
											<AssetPage setSelectedImage={setSelectedImage} />
										</div>
									) : (
										<div>
											<img src={selectedImage || activeSlide.backgroundImage} alt="slide" />
											<i class="far fa-images" onClick={handleImageSelectClick}></i>
										</div>
									)}
								</div>
								<div className="slide-preview-content">
									<label>overlay-color : {activeSlide.overlayColor}</label>
									<input className="modal-color-input" type="color" defaultValue={activeSlide.overlayColor} />
									<label>header : {activeSlide.header}</label>
									<input className="modal-input" type="text" />
									<label>paragraph : {activeSlide.paragraph}</label>
									<textarea className="modal-input" maxLength="300"></textarea>
									<label>button : {activeSlide.cta}</label>
									<input className="modal-input" type="text" />
									<label>button-link : {activeSlide.link}</label>
									<input className="modal-input" type="text" />
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

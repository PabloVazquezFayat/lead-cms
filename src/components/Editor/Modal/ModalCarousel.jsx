import React, { useEffect, useState, useRef } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Modal(props) {
	const { _id } = props.data || {};
	const { data, dataKey } = props || {};

	const [res, updateData] = useAPI("PUT", urls[dataKey].update);
	const [display, setDisplay] = useState("none");

	const [newData, setNewData] = useState({});
	const [activeSlide, setActiveSlide] = useState({});

	const slideImageRef = useRef();

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
		updateData({ data: { ...newData, id: _id } });
	};

	const handleEditClick = (e) => {
		const selectedSlide = data.find((slide) => slide._id === e.target.id);
		setActiveSlide(selectedSlide);
	};

	const style = {
		display: display,
	};

	const overlayStyle = {
		backgroundColor: activeSlide.overlayColor,
		width: slideImageRef.current ? `${slideImageRef.current.width}px` : null,
		height: slideImageRef.current ? `${slideImageRef.current.height}px` : null,
		opacity: "0.3",
	};

	useEffect(() => {
		if (res.data[dataKey]) {
			props.getData();
		}
	}, [res.data[dataKey]]);

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
						<i class="fas fa-plus"></i>
					</div>
				</div>
				{Object.keys(activeSlide).length > 0 ? (
					<div className="modal-slide-preview">
						<div className="modal-slide-preview-title">
							<h3>Slide Editor</h3>
						</div>
						<div className="modal-slide-preview-container">
							<div className="slide-preview">
								<div className="slide-image-container">
									<img ref={slideImageRef} src={activeSlide.backgroundImage} alt="slide" />
									<div className="slide-preview-overlay" style={overlayStyle}></div>
									{/* <i class="far fa-images"></i> */}
								</div>
								<div className="slide-preview-content">
									<h3>{activeSlide.header}</h3>
									<input type="text" />
									<p>{activeSlide.paragraph}</p>
									<input type="text" />
									<label>{activeSlide.cta}</label>
									<input type="text" />
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

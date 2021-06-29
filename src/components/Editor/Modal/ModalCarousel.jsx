import React, { useEffect, useState } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Modal(props) {
	const { _id } = props.data || {};
	const { data, dataKey } = props || {};

	const [res, updateData] = useAPI("PUT", urls[dataKey].update);
	const [display, setDisplay] = useState("none");

	const [newData, setNewData] = useState({});

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

	const handleEditClick = () => {
		console.log("edit");
	};

	const style = {
		display: display,
	};

	useEffect(() => {
		if (res.data[dataKey]) {
			props.getData();
		}
	}, [res.data[dataKey]]);

	console.log(props.data);

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
													<i className="fas fa-edit" onClick={handleEditClick}></i>
												</div>
											</li>
										);
									})
							  )
							: null}
					</ol>
				</div>
			</div>
		</div>
	);
}

{
	/* <li className="modal-slide">
	<div className="modal-slide-actions">
		<p>Slide: {i + 1}</p>
		<div>
			<i className="fas fa-edit"></i>
		</div>
	</div>
	<img className="modal-slide-image" src={slide.backgroundImage} alt="slide" />
	<div className="modal-slide-background" style={{ backgroundColor: slide.overlayColor }}></div>
	<div className="modal-slide-btns">
		<h5>{slide.header}</h5>
		<p>{slide.paragraph}</p>
		<label>{slide.cta}</label>
	</div>
</li> */
}

import React, { useEffect, useState } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Modal(props) {
	const { _id } = props.data || {};
	const { getData, data, dataKeys } = props || {};

	const [res, updateData] = useAPI("PUT", urls[dataKeys[0]].update);
	const [display, setDisplay] = useState("none");

	const [newData, setNewData] = useState({});
	const [activeItem, setActiveItem] = useState({});

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

	const style = {
		display: display,
	};

	// useEffect(() => {
	// 	if (res.data[dataKey]) {
	// 		props.getData();
	// 	}
	// }, [res.data[dataKey]]);

	console.log(data && data[dataKeys[1]] ? data[dataKeys[1]][0] : null);

	return (
		<div className="modal-container">
			<i className="far fa-edit modal-button" data-role="open" onClick={toggleModal}></i>
			<div className="modal-wrapper" style={style}>
				<div className="modal-action-buttons">
					<div>
						<h3>{data[dataKeys[0]] ? data[dataKeys[0]].name : ""}</h3>
					</div>
					<div>
						<i className="far fa-save " onClick={handleSaveClick}></i>
						<i className="fas fa-times-circle " data-role="close" aria-hidden="true" onClick={toggleModal}></i>
					</div>
				</div>
				<div className="modal-header-editor">{data[dataKeys[0]] ? <h3>{data[dataKeys[0]].name}</h3> : null}</div>
				<div className="modal-carousel-slides-container">
					<ul className="slides-list">
						{data.members
							? React.Children.toArray(
									data.members.map((member, i) => {
										return (
											<li className="modal-slide" style={activeItem.index === i + 1 ? { background: "#badfff" } : null}>
												<div className="slide-details">
													<p>index: {member.index}</p>
													<img className="modal-slide-image" src={member.image} alt="slide" />
													<h3>{member.name}</h3>
												</div>
												<div className="slide-actions">
													<i className="fas fa-edit" id={member._id}></i>
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
					{/* {data[dataKeys[1]]
							? React.Children.toArray(
									data[dataKeys[1]].map((item, i) => {
										return (
											<li>
												<div>
													<img src={item.image} />
												</div>
												<label>{item.index}</label>
												<input type="text" name="index" onChange={handleInput} />
												<label>{item.name}</label>
												<input type="text" name="name" onChange={handleInput} />
												<label>{item.title}</label>
												<input type="text" name="title" onChange={handleInput} />
												<label>{item.bio}</label>
												<textarea type="text" name="bio" onChange={handleInput}></textarea>
												<label>{item.social}</label>
												<input type="text" name="social" onChange={handleInput} />
											</li>
										);
									})
							  )
							: null} */}
				</div>
			</div>
		</div>
	);
}

import "./Carousel.css";
import React, { useState, useEffect } from "react";

import ModalCarousel from "../Modal/ModalCarousel";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Carousel() {
	const [slidesData, getSlidesData] = useAPI("GET", urls.slides.read);

	const { loading, data, error } = slidesData || {};
	const [current, setCurrentSlide] = useState({});

	const handleCarouselControlsClick = (e) => {
		const id = e.target.id;
		setCurrentSlide(data.slides[id]);
	};

	const CarouselControls = () => {
		if (error) {
			return;
		}

		if (loading) {
			return <li className="cms-carousel-btn"></li>;
		}

		return data.slides.map((slide, i) => {
			return <li key={i} id={i} className="cms-carousel-btn" onClick={handleCarouselControlsClick}></li>;
		});
	};

	const CarouselSlides = () => {
		if (error) {
			return <div>Something went wrong...</div>;
		}

		if (loading) {
			return <div>Loading...</div>;
		}

		const style = { backgroundColor: current.overlayColor };

		return (
			<li className="cms-slide-item">
				<img className="cms-slide-image" src={current.backgroundImage} alt="slide" />
				<div className="cms-slide-overlay" style={style}></div>
				<div className="cms-slide-caption">
					<h5>{current.header}</h5>
					<p>{current.paragraph}</p>
					<label>{current.cta}</label>
				</div>
			</li>
		);
	};

	useEffect(() => {
		getSlidesData();
	}, []);

	useEffect(() => {
		if (!loading) {
			setCurrentSlide(data.slides[0] || {});
		}
	}, [loading, data.slides]);

	return (
		<div>
			<ModalCarousel getData={getSlidesData} data={data.slides} dataKey="slides" />
			<div className="cms-carousel">
				<ul className="cms-carousel-body">
					<CarouselSlides />
				</ul>
				<ol className="cms-carousel-btns">
					<CarouselControls />
				</ol>
			</div>
		</div>
	);
}

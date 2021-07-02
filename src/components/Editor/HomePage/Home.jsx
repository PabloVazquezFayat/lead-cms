import "./Home.css";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Carousel from "../Carousel/Carousel";
import Mission from "../Mission/Mission";
import FeaturedProjects from "../FeaturedProjects/FeaturedProjects";
import RecentNews from "../RecentNews/RecentNews";
import Careers from "../Careers/Careers";
import Footer from "../Footer/Footer";

export default function Home() {
	return (
		<div className="home-page-container">
			{/* <Navbar /> */}
			<Carousel />
			<Mission />
			<FeaturedProjects />
			{/* <RecentNews /> */}
			{/* <Careers /> */}
			{/* <Footer /> */}
		</div>
	);
}

import React from "react";

//standard layout components
import Navbar from "../Navbar/Navbar";
import StaticBanner from "../StaticBanner/StaticBanner";
import Careers from "../Careers/Careers";
import Footer from "../Footer/Footer";

//page specific components
import NewsArticle from "../NewsArticle/NewsArticle";

export default function AboutPage() {
	return (
		<div className="news-page-container">
			<Navbar />
			<StaticBanner page="news" />

			<NewsArticle />

			<Careers />
			<Footer />
		</div>
	);
}

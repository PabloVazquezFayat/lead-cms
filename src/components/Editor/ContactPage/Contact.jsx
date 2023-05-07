import React from "react";

//import standard layout components
import Navbar from "../Navbar/Navbar";
import StaticBanner from "../StaticBanner/StaticBanner";
import Careers from "../Careers/Careers";
import Footer from "../Footer/Footer";

//import components specific to page
import Contact from "../Contact/Contact";

export default function AboutPage(props) {
	const { navbar, staticBanner, careers, footer, contact } = props.data || {};

	return (
		<div className="contact-page-container">
			<Navbar data={navbar} />
			<StaticBanner data={staticBanner} page="contact" />

			<Contact data={contact} />

			<Careers data={careers} />
			<Footer data={footer} />
		</div>
	);
}

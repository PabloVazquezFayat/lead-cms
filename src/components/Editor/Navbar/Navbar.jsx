import React, { useEffect } from "react";
import Modal from "../Modal/Modal";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Navbar() {
	const [data, getData] = useAPI("GET", urls.navbar.read);
	const { facebook, instagram, linkedin, tagline, twitter, logo } = data.data.navbar || {};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="component">
			<Modal getData={getData} data={data.data.navbar} dataKey="navbar" />
			<div className="navbar-container navbar-capture">
				<div className="navbar-header">
					<div className="navbar-header-content">
						<p>{tagline}</p>
						<div className="navbar-sm-links-container">
							<p>follow us</p>
							<ul>
								{facebook ? (
									<li>
										<i className="fab fa-facebook-f"></i>
									</li>
								) : (
									""
								)}
								{instagram ? (
									<li>
										<i className="fab fa-instagram"></i>
									</li>
								) : (
									""
								)}
								{twitter ? (
									<li>
										<i className="fab fa-twitter"></i>
									</li>
								) : (
									""
								)}
								{linkedin ? (
									<li>
										<i className="fab fa-linkedin-in"></i>
									</li>
								) : (
									""
								)}
							</ul>
						</div>
					</div>
				</div>

				<div className="navbar-content">
					<div className="navbar-logo-container">
						<img src={logo} alt="" />
						<h1>Lead Engineering Contractors</h1>
					</div>

					<div className="navbar-navigation">
						<ul>
							<li>Lead</li>
							<li>About Us</li>
							<li>Projects</li>
							<li>News</li>
							<li>Careers</li>
							<li>Contact</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

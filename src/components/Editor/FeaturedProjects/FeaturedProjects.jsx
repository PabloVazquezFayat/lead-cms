import React, { useEffect } from "react";

import Modal from "../Modal/Modal";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function FeaturedProjects() {
	const [resProjectsPanel, getProjectsPanelData] = useAPI("GET", urls.projectsPanel.read);
	const [resProjects, getProjectsData] = useAPI("GET", urls.projects.read);

	const {
		data: { projectsPanel },
	} = resProjectsPanel;

	const {
		loading: projectsLoading,
		data: { projects },
		error: projectsError,
	} = resProjects;

	const FeaturedProjects = () => {
		if (projectsError) {
			return <li>Something went wrong</li>;
		}

		if (projectsLoading) {
			return <li>Loading...</li>;
		}

		const style = (titleImage) => {
			return { backgroundImage: `url(${titleImage})` };
		};

		return projects.map((project, i) => {
			return (
				<li key={i} style={style(project.titleImage)}>
					<div className="project-overlay">
						<p>{project.name}</p>
						<div>see more</div>
					</div>
				</li>
			);
		});
	};

	const componentStyle = {
		background: projectsPanel && projectsPanel.background ? projectsPanel.background : "#fff",
	};

	useEffect(() => {
		getProjectsPanelData();
		getProjectsData();
	}, []);

	return (
		<div className="component">
			<Modal getData={getProjectsPanelData} data={projectsPanel} dataKey="projectsPanel" />
			<div className="latest-projects-panel-container" style={componentStyle}>
				<div className="latest-projects-panel-wrapper">
					<h2>{projectsPanel && projectsPanel.header ? projectsPanel.header : "Header Here"}</h2>
					<div className="projects-container">
						<ul>
							<FeaturedProjects />
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

import React, { useEffect } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function FeaturedProjects() {
	const [resProjectsPanel, getProjectsPanelData] = useAPI("GET", urls.projectsPanel.read);
	const [resProjects, getProjectsData] = useAPI("GET", urls.projects.read);

	const {
		loading: panelLoading,
		data: { projectsPanel },
		error: panelError,
	} = resProjectsPanel;

	const {
		loading: projectsLoading,
		data: { projects },
		error: projectsError,
	} = resProjects;

	const FeaturedProjectsPanel = (props) => {
		if (panelError) {
			return <div>Something went wrong</div>;
		}

		if (panelLoading) {
			return <div>Loading...</div>;
		}

		const componentStyle = {
			background: projectsPanel && projectsPanel.background ? projectsPanel.background : "#fff",
		};

		return (
			<div className="latest-projects-panel-container" style={componentStyle}>
				<div className="latest-projects-panel-wrapper">
					<h2>{projectsPanel && projectsPanel.header ? projectsPanel.header : "Header Here"}</h2>
					<div className="projects-container">
						<ul>{props.children}</ul>
					</div>
				</div>
			</div>
		);
	};

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

	useEffect(() => {
		getProjectsPanelData();
		getProjectsData();
	}, []);

	return (
		<FeaturedProjectsPanel>
			<FeaturedProjects />
		</FeaturedProjectsPanel>
	);
}

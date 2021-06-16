import React, { useEffect } from "react";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function Projects() {
	const [panelRes, getPanelData] = useAPI("GET", urls.projectsPanel.read);
	const [projectsRes, getProjectsData] = useAPI("GET", urls.projects.read);

	const {
		loading: panelLoading,
		data: { projectsPanel },
		error: panelError,
	} = panelRes || {};

	const {
		loading: projectsLoading,
		data: { projects },
		error: projectsError,
	} = projectsRes || {};

	const { header } = projectsPanel || {};

	const ProjectPanel = (props) => {
		if (panelError) {
			return <div>Something went wrong</div>;
		}

		if (panelLoading) {
			return <div>Loading...</div>;
		}

		return (
			<div className="latest-projects-panel-container">
				<div className="latest-projects-panel-wrapper">
					<h2>{header || "Header text here"}</h2>
					<div className="projects-container">
						<ul>{props.children}</ul>
					</div>
				</div>
			</div>
		);
	};

	const ProjectsList = () => {
		if (projectsError) {
			return <li>Something went wrong</li>;
		}

		if (projectsLoading) {
			return <li>Loading...</li>;
		}

		return projects.map((project, i) => {
			const projectStyle = {
				backgroundImage: `url(${project.titleImage})`,
			};

			return (
				<li key={i} style={projectStyle}>
					<div className="project-overlay">
						{project.featured ? <h3 className="project-featured-indicator">FEATURED</h3> : null}
						<p>{project.name}</p>
						<h3 className="project-priority-indicator">{project.priority || "missing priority"}</h3>
						<div className="project-crud-buttons">
							<button id={project._id} className="edit-project btn-action">
								edit
							</button>
							<button id={project._id} className="delete-project btn-action btn-delete">
								delete
							</button>
						</div>
					</div>
				</li>
			);
		});
	};

	useEffect(() => {
		getPanelData();
		getProjectsData();
	}, []);

	return (
		<ProjectPanel>
			<ProjectsList />
		</ProjectPanel>
	);
}

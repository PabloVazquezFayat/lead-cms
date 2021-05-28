import React from 'react'

export default function Projects(props) {

    const { projectsPanel, projects} = props.data || {};
    const {header} = projectsPanel || {};

    const createProjects = ()=> {
        
        if(!projects){
            return <li>No projects found</li>
        }

        return projects.map((project, i)=> {

            const projectStyle = {
                backgroundImage: `url(${project.titleImage})`
            }

            return  <li key={i} style={projectStyle}>
                        <div className='project-overlay'>
                            {project.featured ? <h3 className="project-featured-indicator">FEATURED</h3> : null}
                            <p>{project.name}</p>
                            <h3 className="project-priority-indicator">{project.priority || 'missing priority'}</h3>
                            <div className='project-crud-buttons'>
                                <button id={project._id} className="edit-project btn-action">edit</button>
                                <button id={project._id} className="delete-project btn-action btn-delete">delete</button>
                            </div>
                        </div>
                    </li>
        })

    }


    return (
        <div className="latest-projects-panel-container">
            <div className="latest-projects-panel-wrapper">
                <h2>{header || 'Header text here'}</h2>
                <div className="projects-container">
                    <ul>
                        {createProjects()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

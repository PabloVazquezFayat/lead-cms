import React from 'react'

export default function FeaturedProjects(props) {

    const {projectsPanel, projects} = props.data || {};

    const createFeaturedProjects = ()=> {
        
        if(!projects){
            return <li>No Featured Projects Found</li>
        }

        const style = (titleImage)=> {
            return {backgroundImage: `url(${titleImage})`};
        }

        return projects.map((project, i)=> {
            return <li key={i} style={style(project.titleImage)}>
                        <div className='project-overlay'>
                            <p>{project.name}</p>
                            <div>see more</div>
                        </div>
                    </li>
        });
    }

    const componentStyle = {background: projectsPanel &&  projectsPanel.background ? projectsPanel.background : null}

    return (
        <div className="latest-projects-panel-container" style={componentStyle}>
            <div className="latest-projects-panel-wrapper">
                <h2>{projectsPanel && projectsPanel.header ? projectsPanel.header : 'Header Here' }</h2>
                <div className="projects-container">
                    <ul>
                        {createFeaturedProjects()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

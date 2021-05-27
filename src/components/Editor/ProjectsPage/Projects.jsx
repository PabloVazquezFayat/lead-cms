import React from 'react'

//standard layout
import Navbar from '../Navbar/Navbar'
import StaticBanner from '../StaticBanner/StaticBanner'
import Careers from '../Careers/Careers'
import Footer from '../Footer/Footer'

//components unique to page
import Projects from '../Projects/Projects'

export default function AboutPage(props) {

    console.log(props.data);

    const {navbar, staticBanner, projectsPanel, projects, careers, footer} = props.data || {};

    return (
        <div className="projects-page-container">
            <Navbar data={ navbar }/>
            <StaticBanner data={ staticBanner } page="projects"/>

            <Projects data={ {projectsPanel, projects} }/>

            <Careers data={ careers }/> 
            <Footer data={ footer }/>
        </div>
    )
}

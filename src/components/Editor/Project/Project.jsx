import React from 'react'

//standard layout components
import Navbar from '../Navbar/Navbar'
import StaticBanner from '../StaticBanner/StaticBanner'
import Careers from '../Careers/Careers'
import Footer from '../Footer/Footer'

export default function Project(props) {

    const { navbar, staticBanner, careers, footer } = props.data || {};

    return (
        <div>
            <Navbar data={navbar}/>
            <StaticBanner data={staticBanner} page="project"/>

            <Careers data={careers}/> 
            <Footer data={footer}/>
        </div>
    )
}

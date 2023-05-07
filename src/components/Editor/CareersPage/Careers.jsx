import React from 'react'

//import standard layout components
import Navbar from '../Navbar/Navbar'
import StaticBanner from '../StaticBanner/StaticBanner'
import Careers from '../Careers/Careers'
import Footer from '../Footer/Footer';

export default function AboutPage(props) {

    const {navbar, staticBanner, careers, footer} = props.data || {};

    return (
        <div className="careers-page-container">
            <Navbar data={navbar}/>
            <StaticBanner data={staticBanner} page="careers"/>
            <Careers data={careers}/> 
            <Footer data={footer}/>
        </div>
    )
}

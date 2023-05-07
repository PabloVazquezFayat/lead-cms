import React from 'react'
import Navbar from '../Navbar/Navbar'
import StaticBanner from '../StaticBanner/StaticBanner'
import Careers from '../Careers/Careers'
import Footer from '../Footer/Footer'

export default function AboutPage(props) {

    const {navbar, staticBanner, careers, footer} = props.data || {};

    return (
        <div className="article-page-container">
            <Navbar data={navbar}/>
            <StaticBanner data={staticBanner} page="article"/>
            <Careers data={careers}/> 
            <Footer data={footer}/>
        </div>
    )
}

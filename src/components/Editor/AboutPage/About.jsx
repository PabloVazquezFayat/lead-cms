import React from 'react'

//standard layout
import Navbar from '../Navbar/Navbar'
import Careers from '../Careers/Careers'
import Footer from '../Footer/Footer';

//components unique to page
import Leadership from '../LeadershipTeam/Leadership'
import Certifications from '../Certifications/Certifications'
import Expertise from '../Expertise/Expertise'

export default function AboutPage(props) {

    // console.log(props.data);

    const {navbar, careers, footer, leadershipBanner, members, certifications, services, servicesPanel} = props.data || {};

    return (
        <div className="about-page-container">
            <Navbar data={navbar}/>

            <Leadership data={{leadershipBanner, members}}/>
            <Certifications data={certifications}/>
            <Expertise data={{services, servicesPanel}}/>

            <Careers data={careers}/> 
            <Footer data={footer}/>
        </div>
    )
}

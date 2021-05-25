import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Careers from '../Careers/Careers'
import Footer from '../Footer/Footer'

export default function AboutPage(props) {
    
    const { navbar, careers, footer} = props.data || {};

    return (
        <div className="contact-page-container">
            <Navbar data={navbar}/>
            <Careers data={careers}/> 
            <Footer data={footer}/>
        </div>
    )
}

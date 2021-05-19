import './Home.css'
import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Carousel from '../Carousel/Carousel'

import { 
    fetchNavbarData, 
    fetchCarouselData, 
    fetchMissionData,
    fetchFeaturedProjectsPanelData,
    fetchFeaturedProjectsData,
    fetchRecentNewsData,
    fetchCareersData,
    fetchFooterData
 } from '../../../utils/fetchData';

export default function Home() {

    const [data, setData] = useState({});

    const fetchHomePageData = async ()=> {

        const navbarData = await fetchNavbarData();
        const carouselData = await fetchCarouselData();
        const missionData = await fetchMissionData();
        const featuredProjectsPanelData = await fetchFeaturedProjectsPanelData();
        const featuredProjectsData = await fetchFeaturedProjectsData();
        const recentNewsData = await fetchRecentNewsData();
        const careersData = await fetchCareersData();
        const footerData = await fetchFooterData();
        
        const dataObject = {
            navbar: navbarData,
            carousel: carouselData,
            mission: missionData,
            featuredProjectsPanel: featuredProjectsPanelData,
            featuredProjects: featuredProjectsData,
            recentNews: recentNewsData,
            careers: careersData,
            footer: footerData,
        }

        setData(dataObject);
    };

    useEffect(()=>{
        fetchHomePageData();
    }, []);

    return (
        <div className="home-page-container">
            <Navbar data={data.navbar}/>
            <Carousel data={data.carousel}/>
        </div>
    )
}

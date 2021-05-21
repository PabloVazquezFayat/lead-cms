import './Home.css'
import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Carousel from '../Carousel/Carousel'
import Mission from '../Mission/Mission'
import RecentNews from '../RecentNews/RecentNews'

import { 
    fetchNavbarData, 
    fetchCarouselData, 
    fetchMissionData,
    fetchFeaturedProjectsPanelData,
    fetchFeaturedProjectsData,
    fetchRecentNewsData,
    fetchRecentNewsArticlesData,
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
        const newsArticlesData = await fetchRecentNewsArticlesData();
        const careersData = await fetchCareersData();
        const footerData = await fetchFooterData();
        
        const dataObject = {
            navbar: navbarData,
            carousel: carouselData,
            mission: missionData,
            featuredProjectsPanel: featuredProjectsPanelData,
            featuredProjects: featuredProjectsData,
            recentNews: recentNewsData,
            newsArticles: newsArticlesData,
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
            <Mission data={data.mission}/>
            <RecentNews data={{recentNews: data.recentNews, newsArticles: data.newsArticles}}/>
        </div>
    )
}

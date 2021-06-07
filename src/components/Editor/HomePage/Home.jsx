import './Home.css'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Carousel from '../Carousel/Carousel'
import Mission from '../Mission/Mission'
import FeaturedProjects from '../FeaturedProjects/FeaturedProjects'
import RecentNews from '../RecentNews/RecentNews'
import Careers from '../Careers/Careers'
import Footer from '../Footer/Footer'

export default function Home(props) {

    const { 
        navbar, 
        careers, 
        footer, 
        slides, 
        mission, 
        projectsPanel, 
        projects, 
        latestNews, 
        newsArticles 
    } = props.data || {};

    return (
        <div className="home-page-container">
            <Navbar data={navbar}/>
            <Carousel data={slides}/>
            <Mission data={mission}/>
            <FeaturedProjects data={{projectsPanel: projectsPanel, projects: projects}}/>
            <RecentNews data={{recentNews: latestNews, newsArticles: newsArticles}}/>
            <Careers data={careers}/> 
            <Footer data={footer}/>
        </div>
    )
}

import React from 'react'

//standard layout components
import Navbar from '../Navbar/Navbar'
import StaticBanner from '../StaticBanner/StaticBanner'
import Careers from '../Careers/Careers'
import Footer from '../Footer/Footer'

//page specific components
import NewsArticle from '../NewsArticle/NewsArticle'


export default function AboutPage(props) {

    const {navbar, staticBanner, careers, footer, newsArticles} = props.data || {};

    return (
        <div className="news-page-container">
            <Navbar data={navbar}/>
            <StaticBanner data={staticBanner} page="news"/>

            <NewsArticle data={newsArticles}/>

            <Careers data={careers}/> 
            <Footer data={footer}/>
        </div>
    )
}

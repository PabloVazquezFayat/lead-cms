import React from 'react'

export default function RecentNews(props) {

    const { recentNews, newsArticles} = props.data || {}

    const formatDate = (date)=> {
        const dateStrings = new Date(date).toString().split(' ');
        return `${dateStrings[0]} ${dateStrings[2]} ${dateStrings[3]}`
    }

    const createRecentNews = ()=> {
         if(!recentNews){
             return <li>Recent News Not Found</li>
         }

         const recentNewsArticles = newsArticles.filter( article => article.featured === true)

         return recentNewsArticles.map((news, i)=> {
             return <li key={i}>
                        <div> 
                            <div>
                                {
                                    news.image
                                    ?
                                    <div className="news-image-container">
                                        <img src={news.image} alt=""/>
                                    </div>
                                    :
                                    null
                                }
                                {
                                    news.video
                                    ?
                                    <video className="news-video-image-container" >
                                        <source src={`${news.video}#t=2`} type="video/mp4"/>
                                        Your browser does not support this video.
                                    </video>
                                    :
                                    null
                                }
                                <div className="news-date-container">
                                    <i className="far fa-calendar-alt mutate"></i>
                                    <p className='mutate'>{formatDate(news.date)}</p>
                                </div>
                            </div>
                            <div>
                                <h4>{news.title || 'Title'}</h4>
                                <p>{news.paragraph || 'Paragraph'}</p>
                            </div>
                        </div>
                    </li>
         });
    }

    return (
        <div className="latest-news-container capture">
            <div className="latest-news-wrapper">
                <h2>{recentNews && recentNews.header ? recentNews.header : 'Header Goes Here'}</h2>
                <div className="latest-news-panel-projects-container">
                    <ul>
                        {createRecentNews()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

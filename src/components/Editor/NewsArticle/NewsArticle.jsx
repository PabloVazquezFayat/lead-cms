import React from 'react'

export default function NewsArticle(props) {

    const newsArticles = props.data || [];

    const processDate = (date)=> {
        return new Date(date).toString().substr(3, 12);
    };

    const createNewsArticles = ()=> {

        if(!newsArticles){
            return <li>No news articles found</li>
        }

        return newsArticles.map((article, i)=> {
            return  <li key={i}>
                        {
                            article.image 
                            ? 
                            <img src={article.image} alt=""/>
                            : 
                            ''
                        }
                        {
                            article.video
                            ?
                            <video controls>
                                <source src={`${article.video}#t=1`} type="video/mp4"/>
                                Your browser does not support this video.
                            </video>
                            :
                            ''
                        }
                        <h2>{article.title}</h2>
                        <h4><i className="far fa-calendar-alt"></i> {processDate(article.date)}</h4>
                        <p>{article.paragraph}</p>
                        <p>category: {article.category}</p>
                        <p>featured: {article.featured}</p>
                        <div className='news-article-crud-buttons'>
                            <button id={article._id} className="edit-news-article">edit</button>
                            <button id={article._id} className="delete-news-article">delete</button>
                        </div>
                    </li>
        });

    }

    return (
        <div className='news-articles-container'>
            <div className='news-articles-wrapper'>
                <ul className='news-articles'>
                    {createNewsArticles()}
                </ul>
            </div>
        </div>
    )
}

import React, { useEffect } from "react";

import Modal from "../Modal/Modal";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function RecentNews() {
	const [resNewsPanel, getNewsPanelData] = useAPI("GET", urls.latestNews.read);
	const [resArticles, getArticleData] = useAPI("GET", urls.newsArticle.read);

	const { header } = resNewsPanel.data.latestNews || {};
	const { latestNews } = resNewsPanel.data || {};

	const {
		loading: articleLoading,
		data: { newsArticles },
		error: articleError,
	} = resArticles;

	const formatDate = (date) => {
		const dateStrings = new Date(date).toString().split(" ");
		return `${dateStrings[0]} ${dateStrings[2]} ${dateStrings[3]}`;
	};

	const NewsArticles = () => {
		if (articleError) {
			return <li>Something went wrong</li>;
		}

		if (articleLoading) {
			return <li>Loading...</li>;
		}

		const recentNewsArticles = newsArticles.filter((article) => article.featured === true);

		return React.Children.toArray(
			recentNewsArticles.map((news) => {
				return (
					<li>
						<div>
							<div>
								{news.image ? (
									<div className="news-image-container">
										<img src={news.image} alt="" />
									</div>
								) : null}
								{news.video ? (
									<video className="news-video-image-container">
										<source src={`${news.video}#t=2`} type="video/mp4" />
										Your browser does not support this video.
									</video>
								) : null}
								<div className="news-date-container">
									<i className="far fa-calendar-alt mutate"></i>
									<p className="mutate">{formatDate(news.date)}</p>
								</div>
							</div>
							<div>
								<h4>{news.title || "Title"}</h4>
								<p>{news.paragraph || "Paragraph"}</p>
							</div>
						</div>
					</li>
				);
			})
		);
	};

	useEffect(() => {
		getNewsPanelData();
		getArticleData();
	}, []);

	return (
		<div className="component">
			<Modal getData={getNewsPanelData} data={latestNews} dataKey="latestNews" />
			<div className="latest-news-container">
				<div className="latest-news-wrapper">
					<h2>{header || "Header Goes Here"}</h2>
					<div className="latest-news-panel-projects-container">
						<ul>
							<NewsArticles />
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

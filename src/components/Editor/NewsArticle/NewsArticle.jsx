import React, { useEffect } from "react";

import ModalNews from "../Modal/ModalNews";

import { urls } from "../../../API/urls";
import { useAPI } from "../../../API/services";

export default function NewsArticle() {
	const [res, getData] = useAPI("GET", urls.newsArticle.read);

	const {
		loading,
		data: { newsArticles },
		error,
	} = res || {};

	const processDate = (date) => {
		return new Date(date).toString().substr(3, 12);
	};

	const NewsArticles = () => {
		if (error) {
			return <li>Something went wrong</li>;
		}

		if (loading) {
			return <li>Loading...</li>;
		}

		return newsArticles.map((article, i) => {
			return (
				<li key={i}>
					{article.image ? <img src={article.image} alt="" /> : ""}
					{article.video ? (
						<video controls>
							<source src={`${article.video}#t=1`} type="video/mp4" />
							Your browser does not support this video.
						</video>
					) : (
						""
					)}
					<h2>{article.title}</h2>
					<h4>
						<i className="far fa-calendar-alt"></i> {processDate(article.date)}
					</h4>
					<p>{article.paragraph}</p>
					<p>category: {article.category}</p>
					<p>featured: {article.featured}</p>
				</li>
			);
		});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<ModalNews getData={getData} data={newsArticles} />
			<div className="news-articles-container">
				<div className="news-articles-wrapper">
					<ul className="news-articles">
						<NewsArticles />
					</ul>
				</div>
			</div>
		</div>
	);
}

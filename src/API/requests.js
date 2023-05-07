import { getService, putService } from "./services";
import { urls } from "./urls";

const getNavbarData = async () => {
	const { navbar } = await getService(urls.navbar.read);
	return navbar;
};

const getCarouselData = async () => {
	const { slides } = await getService(urls.carousel.read);
	return slides;
};

const getMissionData = async () => {
	const { mission } = await getService(urls.missionStatement.read);
	return mission;
};

const getFeaturedProjectsPanelData = async () => {
	const { projectsPanel } = await getService(urls.projectsPanel.read);
	return projectsPanel;
};

const getFeaturedProjectsData = async () => {
	const { projects } = await getService(urls.projects.read);
	return projects;
};

const getRecentNewsData = async () => {
	const { latestNews } = await getService(urls.latestNews.read);
	return latestNews;
};

const getRecentNewsArticlesData = async () => {
	const { newsArticles } = await getService(urls.newsArticle.read);
	return newsArticles;
};

const getCareersData = async () => {
	const { careers } = await getService(urls.careers.read);
	return careers;
};

const getFooterData = async () => {
	const { footer } = await getService(urls.footer.read);
	return footer;
};

const getMessagesData = async () => {
	const { messages } = await getService(urls.messages.read);
	return messages;
};

const getApplicationsData = async () => {
	const { applications } = await getService(urls.applications.read);
	return applications;
};

const checkAuth = async () => {
	const { auth } = await getService(urls.users.auth);
	return auth;
};

const putNavbarData = async (data) => {
	const { navbar } = await putService(urls.users.auth, data);
	return navbar;
};

export {
	getNavbarData,
	getCarouselData,
	getMissionData,
	getFeaturedProjectsPanelData,
	getFeaturedProjectsData,
	getRecentNewsData,
	getRecentNewsArticlesData,
	getCareersData,
	getFooterData,
	getMessagesData,
	getApplicationsData,
	checkAuth,
	putNavbarData,
};

const domain = "http://localhost:3001";

const urls = {
	applications: {
		read: "/cms/applications",
		delete: "/cms/applications",
	},
	assets: {
		create: "/cms/assets",
		read: "/cms/assets",
		delete: "/cms/assets",
	},
	careers: {
		read: "/cms/careers",
		update: "/cms/careers",
	},
	slides: {
		create: "/cms/carousel",
		read: "/cms/carousel",
		update: "/cms/carousel",
		delete: "/cms/carousel",
	},
	certifications: {
		create: "/cms/certification",
		read: "/cms/certification",
		update: "/cms/certification",
		delete: "/cms/certification",
	},
	contact: {
		read: "/cms/contact",
		update: "/cms/contact",
	},
	footer: {
		read: "/cms/footer",
		update: "/cms/footer",
	},
	latestNews: {
		read: "/cms/latestNews",
		update: "/cms/latestNews",
	},
	leadershipBanner: {
		read: "/cms/leadershipBanner",
		update: "/cms/leadershipBanner",
	},
	leadershipMembers: {
		create: "/cms/leadershipMember",
		read: "/cms/leadershipMember",
		update: "/cms/leadershipMember",
		delete: "/cms/leadershipMember",
	},
	messages: {
		read: "/cms/messages",
		delete: "/cms/messages",
	},
	mission: {
		read: "/cms/missionStatement",
		update: "/cms/missionStatement",
	},
	navbar: {
		read: "/cms/navbar",
		update: "/cms/navbar",
	},
	newsArticle: {
		create: "/cms/newsArticle",
		read: "/cms/newsArticle",
		update: "/cms/newsArticle",
		delete: "/cms/newsArticle",
	},
	projects: {
		create: "/cms/projects",
		read: "/cms/projects",
		update: "/cms/projects",
		delete: "/cms/projects",
	},
	projectsPanel: {
		read: "/cms/projectsPanel",
		update: "/cms/projectsPanel",
	},
	recognitions: {
		create: "/cms/recognitions",
		read: "/cms/recognitions",
		update: "/cms/recognitions",
		delete: "/cms/recognitions",
	},
	recognitionsPanel: {
		read: "/cms/recognitionsPanel",
		update: "/cms/recognitionsPanel",
	},
	services: {
		create: "/cms/services",
		read: "/cms/services",
		update: "/cms/services",
		delete: "/cms/services",
	},
	servicesPanel: {
		read: "/cms/servicesPanel",
		update: "/cms/servicesPanel",
	},
	staticBanner: {
		read: "/cms/staticBanner",
		update: "/cms/staticBanner",
	},
	users: {
		create: "/cms/users",
		read: "/cms/users",
		update: "/cms/users",
		delete: "/cms/users",
		login: "/cms/login",
		logout: "/cms/logout",
		auth: "/cms/auth",
	},
};

const allReadUrls = () => {
	return Object.values(urls).map((value) => `${domain}${value["read"]}`);
};

export { domain, urls, allReadUrls };

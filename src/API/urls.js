const domain = "http://localhost:3001";

const urls = {
	applications: {
		read: "/cms/read/applications",
		delete: "/cms/delete/applications",
	},
	assets: {
		create: "/cms/create/assets",
		read: "/cms/read/assets",
		delete: "/cms/delete/assets",
	},
	careers: {
		read: "/cms/read/careers",
		update: "/cms/update/careers",
	},
	carousel: {
		create: "/cms/create/carousel",
		read: "/cms/read/carousel",
		update: "/cms/update/carousel",
		delete: "/cms/delete/carousel",
	},
	certifications: {
		create: "/cms/create/certification",
		read: "/cms/read/certification",
		update: "/cms/update/certification",
		delete: "/cms/delete/certification",
	},
	contact: {
		read: "/cms/read/contact",
		update: "/cms/update/contact",
	},
	footer: {
		read: "/cms/read/footer",
		update: "/cms/update/footer",
	},
	latestNews: {
		read: "/cms/read/latestNews",
		update: "/cms/update/latestNews",
	},
	leadershipBanner: {
		read: "/cms/read/leadershipBanner",
		update: "/cms/update/leadershipBanner",
	},
	leadershipMembers: {
		create: "/cms/create/leadershipMember",
		read: "/cms/read/leadershipMember",
		update: "/cms/update/leadershipMember",
		delete: "/cms/delete/leadershipMember",
	},
	messages: {
		read: "/cms/read/messages",
		delete: "/cms/delete/messages",
	},
	missionStatement: {
		read: "/cms/read/missionStatement",
		update: "/cms/update/missionStatement",
	},
	navbar: {
		read: "/cms/read/navbar",
		update: "/cms/update/navbar",
	},
	newsArticle: {
		create: "/cms/create/newsArticle",
		read: "/cms/read/newsArticle",
		update: "/cms/update/newsArticle",
		delete: "/cms/delete/newsArticle",
	},
	projects: {
		create: "/cms/create/projects",
		read: "/cms/read/projects",
		update: "/cms/update/projects",
		delete: "/cms/delete/projects",
	},
	projectsPanel: {
		read: "/cms/read/projectsPanel",
		update: "/cms/update/projectsPanel",
	},
	recognitions: {
		create: "/cms/create/recognitions",
		read: "/cms/read/recognitions",
		update: "/cms/update/recognitions",
		delete: "/cms/delete/recognitions",
	},
	recognitionsPanel: {
		read: "/cms/read/recognitionsPanel",
		update: "/cms/update/recognitionsPanel",
	},
	services: {
		create: "/cms/create/services",
		read: "/cms/read/services",
		update: "/cms/update/services",
		delete: "/cms/delete/services",
	},
	servicesPanel: {
		read: "/cms/read/servicesPanel",
		update: "/cms/update/servicesPanel",
	},
	staticBanner: {
		read: "/cms/read/staticBanner",
		update: "/cms/update/staticBanner",
	},
	users: {
		create: "/cms/create/users",
		read: "/cms/read/users",
		update: "/cms/update/users",
		delete: "/cms/delete/users",
		login: "/cms/login",
		logout: "/cms/logout",
		auth: "/cms/auth",
	},
};

const allReadUrls = () => {
	return Object.values(urls).map((value) => `${domain}${value["read"]}`);
};

export { domain, urls, allReadUrls };

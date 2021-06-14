import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Login from "./components/Login/Login";

import EditorNav from "./components/Editor/EditorNav/EditorNav";
import AssetPage from "./components/AssetsManager/AssetPage/AssetPage";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Editor/HomePage/Home";
import About from "./components/Editor/AboutPage/About";
import Projects from "./components/Editor/ProjectsPage/Projects";
import Project from "./components/Editor/Project/Project";
import News from "./components/Editor/NewsPage/News";
import Article from "./components/Editor/ArticlePage/Article";
import Careers from "./components/Editor/CareersPage/Careers";
import Contact from "./components/Editor/ContactPage/Contact";
import Messages from "./components/Editor/Messages/Messages";
import Applications from "./components/Editor/Applications/Applications";
import { checkAuth } from "./utils/fetchData";

function App() {
	const [auth, setAuth] = useState(false);

	const authenticate = async () => {
		const { auth } = (await checkAuth()) || false;
		setAuth(auth);
	};

	useEffect(() => {
		authenticate();
	}, []);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						{auth ? <Redirect to="/editor/home" /> : <Redirect to="/login" />}
					</Route>

					<Route exact path="/login">
						{auth ? <Redirect to="/editor/home" /> : <Login setAuth={setAuth} />}
					</Route>

					<Auth auth={auth}>
						<EditorNav setAuth={setAuth} />

						<Route exact path="/editor/home">
							<Home />
						</Route>

						<Route exact path="/editor/about">
							<About />
						</Route>

						<Route exact path="/editor/projects">
							<Projects />
						</Route>

						<Route exact path="/editor/project">
							<Project />
						</Route>

						<Route exact path="/editor/news">
							<News />
						</Route>

						<Route exact path="/editor/article">
							<Article />
						</Route>

						<Route exact path="/editor/careers">
							<Careers />
						</Route>

						<Route exact path="/editor/contact">
							<Contact />
						</Route>

						<Route exact path="/editor/assets">
							<AssetPage />
						</Route>

						<Route exact path="/editor/messages">
							<Messages />
						</Route>

						<Route exact path="/editor/applications">
							<Applications />
						</Route>
					</Auth>

					<Route>
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

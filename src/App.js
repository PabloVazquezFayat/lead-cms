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
						<Route exact path="/editor/home">
							<EditorNav setAuth={setAuth} />
							<Home />
						</Route>

						<Route exact path="/editor/about">
							<EditorNav setAuth={setAuth} />
							<About />
						</Route>

						<Route exact path="/editor/projects">
							<EditorNav setAuth={setAuth} />
							<Projects />
						</Route>

						<Route exact path="/editor/project">
							<Auth auth={auth}>
								<EditorNav setAuth={setAuth} />
								<Project />
							</Auth>
						</Route>

						<Route exact path="/editor/news">
							<EditorNav setAuth={setAuth} />
							<News />
						</Route>

						<Route exact path="/editor/article">
							<EditorNav setAuth={setAuth} />
							<Article />
						</Route>

						<Route exact path="/editor/careers">
							<EditorNav setAuth={setAuth} />
							<Careers />
						</Route>

						<Route exact path="/editor/contact">
							<EditorNav setAuth={setAuth} />
							<Contact />
						</Route>

						<Route exact path="/editor/assets">
							<EditorNav setAuth={setAuth} />
							<AssetPage />
						</Route>

						<Route exact path="/editor/messages">
							<EditorNav setAuth={setAuth} />
							<Messages />
						</Route>

						<Route exact path="/editor/applications">
							<EditorNav setAuth={setAuth} />
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

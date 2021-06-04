import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Auth from './components/Auth/Auth'
import Login from './components/Login/Login'
import Editor from './components/Editor/Editor/Editor'
import AssetPage from './components/AssetsManager/AssetPage/AssetPage'
import NotFound from './components/NotFound/NotFound'

import Home from './components/Editor/HomePage/Home'
import About from './components/Editor/AboutPage/About'
import Projects from './components/Editor/ProjectsPage/Projects'
import Project from './components/Editor/Project/Project'
import News from './components/Editor/NewsPage/News'
import Article from './components/Editor/ArticlePage/Article'
import Careers from './components/Editor/CareersPage/Careers'
import Contact from './components/Editor/ContactPage/Contact'

import Messages from './components/Editor/Messages/Messages'
import Applications from './components/Editor/Applications/Applications'

import { auth } from './utils/auth'
import { fetchAll } from './utils/fetchData';

function App() {

  const [data, setData] = useState();

  const getAllData = async ()=> {
    const res = await fetchAll();
    setData(res);
  }

  useEffect(()=> {
    if(auth()){
      getAllData();
    }
  }, []);

  console.log(data);

  return (
    <div className="App">
       <Router>
        <Switch>

              <Route exact path="/">
                  <Redirect to='/login'/>
              </Route>

              <Route exact path="/editor">
                  <Auth>
                    <Redirect to='/editor/home'/>
                  </Auth>
              </Route>

              <Route exact path="/login">
                  <Auth>
                    <Login/>
                  </Auth>
              </Route>

              <Route exact path="/editor/home">
                  <Auth>
                    <Editor>
                      <Home data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/about">
                  <Auth>
                    <Editor>
                      <About data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/projects">
                  <Auth>
                    <Editor>
                      <Projects data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/project">
                  <Auth>
                    <Editor>
                      <Project data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/news">
                  <Auth>
                    <Editor>
                      <News data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/article">
                  <Auth>
                    <Editor>
                      <Article data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/careers">
                  <Auth>
                    <Editor>
                      <Careers data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/contact">
                  <Auth>
                    <Editor>
                      <Contact data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/assets">
                  <Auth>
                    <Editor>
                      <AssetPage data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/messages">
                  <Auth>
                    <Editor>
                      <Messages data={data} />
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/applications">
                  <Auth>
                    <Editor>
                      <Applications data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route>
                <NotFound/>
              </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;

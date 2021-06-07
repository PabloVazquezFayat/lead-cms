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

import { fetchAll, checkAuth } from './utils/fetchData';

function App() {

  const [data, setData] = useState();
  const [auth, setAuth] = useState(false);
  const [navData, setNavdata] = useState({messages: [], applications: []});

  const getAllData = async ()=> {
    const res = await fetchAll();
    setData(res);
  }

  const authenticate = async ()=>{
    const { auth } = await checkAuth() || false;

    if(auth){
     return setAuth(auth)
    }

    setAuth(auth)
  }

  useEffect(()=> {
    if(!auth){
      authenticate();
    }else{
      getAllData();
    }
  }, [auth]);

  useEffect(()=> {
    if(data){
      setNavdata({messages: data.messages, applications: data.applications})
    }
  }, [data]);

  return (
    <div className="App">
       <Router>
        <Switch>

              <Route exact path="/">
                  {
                    auth
                    ?
                    <Redirect to='/editor/home'/>
                    :
                     <Redirect to='/login'/>
                  }
              </Route>

              <Route exact path="/login">
                  {
                    auth
                    ?
                    <Redirect to='/editor/home'/>
                    :
                    <Login setAuth={setAuth}/>
                  }
              </Route>

              <Route exact path="/editor/home">
                  <Auth auth={auth}>
                    <Editor setAuth={setAuth} data={navData}>
                      <Home data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/about">
                  <Auth auth={auth} >
                  <Editor setAuth={setAuth} data={navData}>
                      <About data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/projects">
                  <Auth auth={auth}>
                    <Editor setAuth={setAuth} data={navData}>
                      <Projects data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/project">
                  <Auth auth={auth}>
                    <Editor setAuth={setAuth} data={navData}>
                      <Project data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/news">
                  <Auth auth={auth} >
                    <Editor setAuth={setAuth} data={navData}>
                      <News data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/article">
                  <Auth auth={auth}>
                    <Editor setAuth={setAuth} data={navData}>
                      <Article data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/careers">
                  <Auth auth={auth}>
                    <Editor setAuth={setAuth} data={navData}>
                      <Careers data={data} />
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/contact">
                  <Auth auth={auth}>
                    <Editor setAuth={setAuth} data={navData}>
                      <Contact data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/assets">
                  <Auth auth={auth}>
                    <Editor setAuth={setAuth} data={navData}>
                      <AssetPage data={data}/>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/messages">
                  <Auth auth={auth}>
                    <Editor setAuth={setAuth} data={navData}>
                      <Messages data={data} />
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/applications">
                  <Auth auth={auth}>
                    <Editor setAuth={setAuth} data={navData}>
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

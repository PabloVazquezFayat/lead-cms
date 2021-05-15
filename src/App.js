import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { fetchAll } from './utils/fetchData';
import Auth from './components/Auth/Auth';
import Login from './components/Login/Login';
import Editor from './components/Editor/Editor/Editor';
import AssetPage from './components/AssetsManager/AssetPage/AssetPage';
import NotFound from './components/NotFound/NotFound';

function App() {

  const [data, setData] = useState();

  const loadData = async ()=> {
    const data = await fetchAll();
    setData(data);
  }

  useEffect(()=> {
    loadData();
  }, []);

  if(data){
    console.log(data.assets[0]);
  }

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
                      <div className="editor-home-page">
                          <h1>EDIT HOME PAGE</h1>
                      </div>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/about">
                  <Auth>
                    <Editor>
                      <div className="editor-home-page">
                          <h1>EDIT ABOUT PAGE</h1>
                      </div>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/projects">
                  <Auth>
                    <Editor>
                      <div className="editor-home-page">
                          <h1>EDIT PROJECTS PAGE</h1>
                      </div>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/news">
                  <Auth>
                    <Editor>
                      <div className="editor-home-page">
                          <h1>EDIT NEWS PAGE</h1>
                      </div>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/careers">
                  <Auth>
                    <Editor>
                      <div className="editor-home-page">
                          <h1>EDIT CAREERS PAGE</h1>
                      </div>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/contact">
                  <Auth>
                    <Editor>
                      <div className="editor-home-page">
                          <h1>EDIT CONTACT PAGE</h1>
                      </div>
                    </Editor>
                  </Auth>
              </Route>

              <Route exact path="/editor/assets">
                  <Auth>
                    <Editor>
                      <AssetPage/>
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

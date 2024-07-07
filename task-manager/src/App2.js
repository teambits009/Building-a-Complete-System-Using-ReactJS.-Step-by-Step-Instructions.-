"Handling Routing - React Router is a popular library for handling navigation"
"in React Applications. It allows you to define routes and navigate between the different Views"
"Setting up the Routes"
"Install React Router; npm install react-router-dom"

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from './components/Auth';
import TaskManager from './components/TaskManager';

import React from 'react'

const App2 = () => {
  return (
    <Router>
        <div classname = "App">
            <Header/>
            <Switch>
                <Route path="/login" component={Auth}/>
                <Route path="/register" component={Auth}/>
                <Route path="/" component={TaskManager}/>
            </Switch>
        </div>
    </Router>
    
  );
};

export default App2

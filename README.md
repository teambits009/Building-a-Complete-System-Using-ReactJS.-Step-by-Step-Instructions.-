# Building-a-Complete-System-Using-ReactJS.-Step-by-Step-Instructions.-
This Repository contains a Step By Step Process to building a Complete ReactJS system. It Involves Multiple steps from setting up the development environment to designing the architecture, creating the components, manaaging the state, handling routing, integrating with the backend services (EcpressJS/NodeJS) and deploying the application. 

Table Of Contents

1. Introduction to ReactJS 
2. Setting Up the Development Environment
3. Creating the React Application 
4. Desiging the Component Architecture 
5. Managing State
6. Handling Routing 
7. Integrating with Backend Services 
8. Handling Authentication 
9. Implementing User Interface and UX 
10. Testing and Debugging 
11. Optimizing Performance 
12. Deploying the Application 
13. Maintaining and Scaling the System 

1. Introduction to ReactJS 
ReactJS is a powerful JavaScript library developed by Facebook for building user interfaces, particularly single page applications where you need a fast and interactive user experience. React allows developers to create large web applications that can change data without reloading the page. The main advantages of React include its component-based architecture, the Virtual DOM for efficient updates, and strong ecosystem. 

Setting Up the Development Environment 
1. Install Node.js and npm - Download and install NodeJS from nodejs.org npm is included with NodeJS
2. Create a React Application 

  npx create-react-app task manager 
  cd task-manager 
  npm start 

3. public/; Contains the public assets like 'index.html'
   src/;Contains the React Components and styles
   src/index.js; The entry point for the react application 
   src/App.js; The root component

4. Component Hierarchy for Task Manager 
   App; Root Component 
   - Header; Displays the app's title and navigation links
   - Auth; Handles user authentication (Login/Register)
   - TaskList; Displays the list of tasks 
        - TaskItems; Represents a single task 
   - TaskForm; Form for creating and editing tasks 
   - Filter; Filters tasks based on categories 

5. Management State 
  State management is a critical aspect of React Applications. React provides the 'Use State' and 'Use Reducer' hooks for manageing component state. For larger applications, you might use a state management library like Redux or Mobx 

  Using React Context for Global State; React Context Provides a way to share state across the entire application without prop drilling. 

  - Create the Context 
  import React, {createContext, useReducer} from 'react';
  const TaskContentext = createContext();

  const taskReducer = (state, action) =>{
    switch (action.type) {
        case 'ADD_TASK':
          return [...state, action.payload];
         case 'REMOVE_TASK':
          return state.filter (task=> task.id !==action.payload);
         default:
           return state;      
    }
  };

  const TaskProvider = ({children}) => {
    const [task, dispatch] = useReducer(taskReducer, []);

    return (
        <TaskContext.Provider value= {{ tasks, dispatch}}>
        {children}
        </TaskContext.Provider>
    );
  };

  export {TaskContext, TaskProvider};


  2. Use Context In Components 

  import React from 'react';
  import {TaskProvider} from './context/TaskContext';
  import TaskList from './components/TaskList';

  const App = () => {
    return (
        <TaskProvider>
        <div ClassName="App">
        <Header/>
        <TaskForm/>
        <Filter/>
        <TaskList/>
        </div>
        </TaskProvider>
    );
  };

  export default App;

6. Handling Routing 
React Router is a popular library for handling navigation in React Applications. It allows you to define routes and navigate between the different views. 

 - Install React Router 
 npm install react-router-dom 
 -Set Up Routes 
 import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
 import Auth from './component/Auth';
 import TaskManager from './components/TaskManager';

 const App = () = > {
    return 
    <Router>
    <div className= "App">
    <Header/>
    <Switch>
      <Route path = "/login" component={Auth}/>
      <Route path = "/register" component={Auth}/>
      <Route path = "/" component={TaskManager}/>

      </Switch>
      </div>
      </Router>
    );
 };
  
  export default App;

Integrating with Backend Services 
For a complete system, you need a backend to data persistence, user authentication, and other server-side logic. You can build your backend using technologies like NodeJS, Express, and MongoDB, or use a Backend as a Service (Baas) like Firebase.

Set Up Express Server
mkdir backend 
cd backend
npm init-y 
npm install express mongoose 

- Create Server 
const express=require('express')
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://localhost:27017/task-manager', {userNewUrlParser:true, useUnifiedTology: true});

app.use (express.json());

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


- Define the Models and the Routes

const mongoose = require ("mongoose");

title: String,
description: String, 
completed: Boolean, 

});

module.exports = mongoose.model('Task', taskSchema);

"backend/routes/taskRoutes.js"
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get ('/tasks', async(req, res) => {
    const tasks=await Task.find();
    res.json(tasks);
});

router.post('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.delete('/tasks/:id', async(req, res)=> {
    await Task.findByAndDeelete(req.params.id);
    res.json({message: 'Task deleted'});

});

module.exports=router;

- Integrate the Routes into Server 

const taskRoutes=require('./routes/taskRouter');
app.use('/api', taskRoutes);


Handling Authentication
Authentication is a crucial part of any web application. You can implement authentication using JWT (JSON Web Tokens) for stateless sessions. 
-Install Dependencies
npm install bcryptjs jsonwebtoken

-Set Up User Model and Routes 
const mongoose=require('mongoose');
const bcrypt = require ('bcryptjs');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(password,salt);
    next();
});

userSchema.methods.comparPassword=funtion (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);

};

module.exports=mongoose.model('User', userSchema);

//backend/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require ('../models/User');
const router = express.Router();

router.pass('/login', async(req, res) => 
const {username, password} = req.body;
const user = await User.findOne ({username});
if (!User){
    return res.status(400).send ('Invalid Credentials');
}
const isMatch = await user.comparePassword(password);
if (!isMatch) {
    return res.status(400).send ('Invalid Credentials')
}
const token =jwt.sign({userId:user._id}, 'SECRET_KEY');
res.json ({token});

});

module.exports=router;

- Protect the Routes with Middleware 

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer',"");
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const decoded = jwt.verify(token, 'SECRET KEY');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
    
};

module.exports = authMiddleware;


- Apply Middleware to Protected Routes:

const authMiddleware = require('../middleware/authMiddleware');

router.get('/tasks', authMiddleware, async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post ('/tasks', authMiddlware, async (req, res) => {
    const newTask = new Task (req.body);
    await newTask.save();
    res.json(newTask);
});

router.delete('/tasks/:id', authMiddleware, async(req, res) => {
    await Task.findByInAndDelete(req.params.id);
    res.json({message: 'Task deleted'});
});



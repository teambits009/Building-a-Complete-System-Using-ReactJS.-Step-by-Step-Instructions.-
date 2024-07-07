"Using Context In Components"
import {TaskProvider} from './context/TaskContext';
import TaskList from './components/TaskList';

import React from 'react';

const App = () => {
  return (
    <TaskProvider>
      <div className = "App">
        <Headers/>
        <TaskForm/>
        <Filter/>
        <TaskList/>
        </div>
    </TaskProvider>
  );
};

export default App;

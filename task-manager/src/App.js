import React, {Suspense, lazy} from 'react';
const TaskList = lazy(() => import('./components/TaskList'));

import React from 'react'

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Suspense fallback={<div>Loading ...</div>}>
      <TaskList/>
      </Suspense>
      </div>
  );
};

export default App;

     
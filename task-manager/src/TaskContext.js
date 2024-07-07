"React context provides a way to share state across the entire application without prop drilling"
"state management is a critical aspect of react applications. React provides the useState and the useReducer"
"hooks for managing the component state. For larger applications,you might use a state management library like Redux or Mobx"


import React, {createContext, useReducer} from 'react';

const TaskContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type){
        case "ADD_TASK":
            return[...state, action.payload];
            case 'REMOVE_TASK':
                return state.filter(task=> task.id!== action.payload);
                default:
                    return state;
    }

    };

    const TaskProvider = ({children}) => {
        const [tasks,dispatch] = useReducer(taskReducer, []);

    }
  return (
    <TaskContext.Provider value = {{tasks,dispatch}}>
        {children}
    </TaskContext.Provider>
  ); 

export {TaskContext,TaskProvider};




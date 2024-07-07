import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
    const { dispatch } = useContext(TaskContext);

    const handleDelete = () => {
        dispatch({ type: 'REMOVE_TASK', payload: task.id });
    };

    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TaskItem;

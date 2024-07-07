import React, {useState, useContext} from 'react';
import {TaskContext} from '../context/TaskContext';

const Filter = () => {
    const [category, setCategory] = useState('')
    const {task} = useContext (TaskContext);

    const filterTasks = tasks.filter(task =>
        task.category.includes(category)
    );
    
    return(
        <div> 
            <input
            type="text"
            placeholder="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
            <div>
                {filteredTasks.map(task => 
                    <div key ={task.id}>
                        <h3>{task.title}</h3>
                        <P>{task.description}</P>
                        </div>
                )}
            </div>

        </div>
    );
};

export default Filter;

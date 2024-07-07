"writing Tests"
import React from 'react';
import {render, fireEvent} from '@testing-library/React';
import TaskItem from '../TaskItem';

test('render task item correctly', () => {
    const task = {id: 1, title: 'Test Task', description: 'Test Description'};
    const {getByText} = render(<TaskItem task = {task} />);
    expect(getByText('Test Task')).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
});

test('calls handleDelete on delete button click', () => {
    const task = {id: 1, title: 'Test Task', description: 'Test Description'};
    const mockDispatch = jest.fn();
    const {getByText} = render(
        <TaskContext.Provider value={{dispatch: mockDispatch}}>
            <TaskItem task={task}/>
            </TaskContext.Provider>
    );
    
    fireEvent.click(getByText('Delete'));
    expect(mockDispatch).toHaveBeenCalledWith({type:'REMOVE_TASK' ,payload:1});
});
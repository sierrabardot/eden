import React from 'react';
import { observer } from 'mobx-react';
import store, { Todo } from '../store/store';

function TodoListItems() {
    return (
        <>
            {store.todos.map((todo: Todo) => (
                <div key={todo.id}>
                    <div className='d-flex flex-row justify-content-center gap-5 align-items-center mb-4'>
                        <input
                            type='text'
                            value={todo.text}
                            onChange={(evt) => (todo.text = evt.target.value)}
                        />
                        <button
                            className='btn btn-primary'
                            onClick={() => store.removeTodo(todo.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}

const ToDoListItemsObserver = observer(TodoListItems);

export function TodoList() {
    store.load(
        'https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json'
    );
    return (
        <>
            <h2>To Do List</h2>
            <ToDoListItemsObserver />
        </>
    );
}

export default TodoList;

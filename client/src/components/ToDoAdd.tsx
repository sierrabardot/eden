import React from 'react';
import { observer } from 'mobx-react';
import store from '../store/store';

function TodoAdd() {
    return (
        <>
            <input
                type='text'
                placeholder='New Todo'
                value={store.newTodo}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    store.setNewTodo(evt.target.value)
                }
            />
            <button className='btn btn-primary' onClick={() => store.addTodo()}>
                Add Todo
            </button>
        </>
    );
}

export default observer(TodoAdd);

import { makeAutoObservable, runInAction } from 'mobx';

// Standard interface and functions
export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

const removeTodo = (todos: Todo[], id: number): Todo[] =>
    todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
    ...todos,
    {
        id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
        text,
        done: false,
    },
];

// MobX implementation
class Todos {
    todos: Todo[] = [];
    newTodo: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    load(url: string) {
        runInAction(() => {
            fetch(url).then((res) =>
                res.json().then((data) => (this.todos = data))
            );
        });
    }

    removeTodo(id: number) {
        this.todos = removeTodo(this.todos, id);
    }

    setNewTodo(newTodo: string) {
        runInAction(() => {
            this.newTodo = newTodo;
        });
    }

    addTodo() {
        runInAction(() => {
            this.todos = addTodo(this.todos, this.newTodo);
            this.newTodo = '';
        });
    }
}

const store = new Todos();

export default store;

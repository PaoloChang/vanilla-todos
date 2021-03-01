import { createStore } from 'redux';

const ADD = 'ADD';
const DELETE = 'DELETE';

const addTodo = (text) => {
    return {
        type: ADD,
        text
    }
}

const deleteTodo = (id) => {
    return {
        type: DELETE,
        id: parseInt(id)
    }
}

const saveToLocalStorage = (state) => {
    try {
        const data = JSON.stringify(state);
        localStorage.setItem('persistantState', data);
    }
    catch (e) {
        console.warn(e);
    }
}

const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('persistantState');
        if (data == null) return undefined;
        return JSON.parse(data);
    }
    catch (e) {
        console.warn(e);
        return undefined;
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [{ id: Date.now(), text: action.text }, ...state];
        case DELETE:
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}

const store = createStore(reducer, loadFromLocalStorage());
store.subscribe(() => saveToLocalStorage(store.getState()));

export const actionCreators = {
    addTodo,
    deleteTodo
}

export default store;
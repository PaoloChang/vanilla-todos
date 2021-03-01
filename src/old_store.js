import { createStore } from 'redux';

/** Action Creator without redux-toolkit */

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

/** Reducer without redux-toolkit */
const reducer = (state = [], action) => {
    switch (action.type) {
        /**
         * by using redux-toolkit, Action definition has been replaced by createAction
         */
        // case ADD:
        case addTodo.type:
            return [{ id: Date.now(), text: action.payload }, ...state];
        // case DELETE:
        case deleteTodo.type:
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
}

// store MUST BE one and only
// const store = createStore(reducer);


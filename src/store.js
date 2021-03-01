import { createStore } from 'redux';
import { createAction, createReducer, configureStore, createSlice } from '@reduxjs/toolkit';

/** With redux-toolkit 
 * Which replace Action definitions and Action Creators
 **/
// const addTodo = createAction('ADD');
// const deleteTodo = createAction('DELETE');

/** Reducer with redux-toolkit */
// const reducer = createReducer([], {
//     [addTodo]: (state, action) => {
//         state.push({ id: Date.now(), text: action.payload })
//     },
//     [deleteTodo]: (state, action) => state.filter(todo => todo.id !== action.payload)
// })

// const store = configureStore({reducer});

// export const actionCreators = {
//     addTodo,
//     deleteTodo
// }

/** Make the code even shorter with createSlice from redux toolkit */
const todos = createSlice({
    name: 'todosReducer',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({ id: Date.now(), text: action.payload })
        },
        remove: (state, action) => state.filter(todo => todo.id !== action.payload)
    }
})

const store = configureStore({ reducer: todos.reducer });

export const {
    add,
    remove
} = todos.actions;

/** Using localStorage */
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

// const store = createStore(reducer, loadFromLocalStorage());
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
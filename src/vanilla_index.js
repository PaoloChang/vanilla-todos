import { createStore } from 'redux';

// /** Vanilla JS without redux */
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

// const createTodo = todo => {
//   const li = document.createElement('li');
//   li.innerText = todo;
//   ul.appendChild(li);
// }

const onSubmit = e => {
  e.preventDefault();
  const todo = input.value;
  input.value = '';
  // createTodo(todo);
  dispatchAddTodo(todo);
}

form.addEventListener('submit', onSubmit);

const ADD_TODO = 'index/ADD_TODO';
const DELETE_TODO = 'index/DELETE_TODO';

const todos = [];

const addTodo = (text) => {
  return { type: ADD_TODO, text };
};

const deleteTodo = (id) => {
  return { type: DELETE_TODO, id: id };
};

const reducer = (state = [], action) => {
  console.log(`reducer -> action.id: ${action.id}`);
  switch (action.type) {
    case ADD_TODO:
      /**
       * MUST return new state objects, instead of mutating the previous state
       * 기존 data 에 새로운 data 를 직접 더하는 것이 아니라 새로운 배열을 리턴한다
       * 
       * WRONG: return state.push(action.text)
       **/
      return [...state, { id: Date.now(), text: action.text }];
    case DELETE_TODO:
      console.log(DELETE_TODO)
      return state.filter(todo => todo.id !== action.id);
    default:
      return todos;
  }
}

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

const listTodos = () => {
  const todos = store.getState();
  ul.innerText = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = "DEL";
    btn.addEventListener('click', dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

const store = createStore(reducer);
store.subscribe(() => listTodos());


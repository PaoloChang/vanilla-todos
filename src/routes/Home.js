import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import Todo from '../components/Todo';

function Home({ todos, dispatch, addTodo }) {
    const [text, setText] = useState('');
    function onSubmit(e) {
        e.preventDefault();
        addTodo(text)
        setText('');
        /**
         * Since we have control on mapDispatchToProps function
         * Let's use dispatch in mapDispatchToProps function
         */
        // dispatch(addTodo(text))
    }
    function onChange(e) {
        setText(e.target.value);
    }
    return (
        <>
            <h1>React-Redux Todo</h1>
            <form onSubmit={onSubmit}>
                <input type='text' value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {todos.map(todo => 
                    <Todo key={todo.id} {...todo} />
                )}
            </ul>
        </>
    );
};

function mapStateToProps(state, ownProps) {
    return { todos: state };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addTodo: text => dispatch(actionCreators.addTodo(text))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
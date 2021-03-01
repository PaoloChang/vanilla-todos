import React from 'react';
import { connect } from 'react-redux';
/** without redux-toolkit: use actionCreator  */
// import { actionCreators } from '../store';
/** with redux-toolkit: use new function defined in store */
import { remove } from '../store';
import { Link } from 'react-router-dom';

const Todo = ({ text, onBtnClick, id }) => {
    return (
        <li>
            <Link to={`/${id}`}>
                {text}
            </Link>
            <button onClick={onBtnClick}>DEL</button>
        </li>
    );
};

function mapDispatchToProps(dispatch, ownProps) {
    console.log('Todo.js / mapDispatchToProps(dispatch, ownProps)')
    console.log(ownProps)
    return { 
        // onBtnClick: () => dispatch(actionCreators.deleteTodo(ownProps.id))
        onBtnClick: () => dispatch(remove(ownProps.id))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Todo);
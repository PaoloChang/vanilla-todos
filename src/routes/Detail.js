import React from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
/** without redux-toolkit: use actionCreator  */
// import { actionCreators } from '../store';
/** with redux-toolkit: use new function defined in store */
import { remove } from '../store';

const Detail = ({ todo, removeTodo }) => {
    // const id = useParams();
    // console.log(id)

    const history = useHistory();

    const routeChange = () => {
        removeTodo();
        history.push('/');
    }

    const created = new Date(todo.id)
    return (
        <>
            <h1>{ todo?.text ? todo.text : "Can't find todo item." }</h1>
            <h4>Created at: { todo?.id ? created.toString() : "Not available" }</h4>
            <button onClick={routeChange}>DEL</button>
        </>
    );
};

function mapStateToProps(state, ownProps) {
    // console.log(ownProps)
    const { 
        match: { 
            params: { id } 
        } 
    } = ownProps;
    console.log(id) 
    return { todo: state.find(todo => todo.id === parseInt(id)) };
}

function mapDispatchToProps(dispatch, ownProps) {
    // console.log('Detail.js / mapDispatchToProps(dispatch, ownProps)')
    // console.log(ownProps)
    // console.log(`ownProps.id(${typeof ownProps.id}): ${ownProps.id}`)
    const { 
        match: { 
            params: { id } 
        } 
    } = ownProps;
    return { 
        // removeTodo: () => dispatch(actionCreators.deleteTodo(parseInt(id)))
        removeTodo: () => dispatch(remove(parseInt(id)))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';

import { LOGIN, LOGOUT } from './actions';

const initialUserState = {
    username: null,
    loggedIn: false
}

const loginReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                username: action.username,
                loggedIn: true
            };
        case LOGOUT:
            return {
                username: action.username,
                loggedIn: false
            };
        default:
            return state;
    }
}

const reducer = combineReducers({
    user: loginReducer
});


const store = createStore(reducer, applyMiddleware(
    thunks
));


export default store;
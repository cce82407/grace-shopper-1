import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';

import { LOGIN, LOGOUT, LOADING, LOADED } from './actions';

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
                username: null,
                loggedIn: false
            };
        default:
            return state;
    }
}

const initialLoadingState = {
    loading: true,
    payload: null
}
const loadingReducer = (state = initialLoadingState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
            };
        case LOADED:
            return {
                loading: false,
                payload: action.payload
            };
        default:
            return state;
    }
}

const reducer = combineReducers({
    user: loginReducer,
    loading: loadingReducer
});


const store = createStore(reducer, applyMiddleware(
    thunks
));


export default store;
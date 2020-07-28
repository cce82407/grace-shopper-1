import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';

import { LOGIN, LOGOUT, LOGIN_FAIL, LOADING, LOADED, GET_PRODUCTS } from './actions';

const initialUserState = {
    username: null,
    loggedIn: false,
    message: ''
}

const loginReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                username: action.username,
                loggedIn: true
            };
        case LOGOUT:
            return {
                ...state,
                username: null,
                loggedIn: false
            };
        case LOGIN_FAIL: {
            return {
                username: null,
                loggedIn: false,
                message: action.message
            }
        }
        default:
            return state;
    }
}

const loadingReducer = (state = true, action) => {
    switch (action.type) {
        case LOADING:
            return true
        case LOADED:
            return false
        default:
            return state;
    }
}

const productsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}

const reducer = combineReducers({
    user: loginReducer,
    loading: loadingReducer,
    products: productsReducer
});


const store = createStore(reducer, applyMiddleware(
    thunks
));


export default store;
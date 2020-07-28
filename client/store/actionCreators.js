import { LOGIN, LOGOUT, LOGIN_FAIL, LOADED, LOADING } from './actions';
import axios from 'axios';

const login = (username) => {
    return {
        type: LOGIN,
        username
    }
}
const logout = () => {
    return {
        type: LOGOUT
    }
}

const loginFail = (message) => {
    return {
        type: LOGIN_FAIL,
        message
    }
}

export const loading = () => {
    return {
        type: LOADING
    }
}

export const loaded = () => {
    return {
        type: LOADED
    }
}

const getProducts = (products) => {
    return {
        products
    }
}

export const loginThunk = (username, password) => {
    return (dispatch) => {
        dispatch(loading());
        return axios.post('/api/login', { username, password })
            .then((res) => {
                console.log(res.data)
                dispatch(login(username));
                dispatch(loaded());
            })
            .catch((res) => {
                dispatch(loginFail('Incorrect username or password'));
                dispatch(loaded());
            })
    }
}
export const whoami = () => {
    return (dispatch) => {
        dispatch(loading());
        return axios.get('/api/whoami')
            .then(({ data }) => {
                if (data.loggedIn) {
                    dispatch(login(data.username));
                } else {
                    dispatch(logout())
                }
                dispatch(loaded());
            })
    }
}

export const logoutThunk = () => {
    return (dispatch) => {
        dispatch(loading());
        return axios.get('/api/logout')
            .then(() => {
                dispatch(logout());
                dispatch(loaded());
            })
            .catch(console.log)
    }
}

export const getProductsThunk = () => {
    return (dispatch) => {
        dispatch(loading());
        return axios.get('/api/products')
            .then(({ data }) => {
                dispatch(getProducts(data));
                dispatch(loaded());
            })
            .catch((e) => {
                console.error(e);
                dispatch(loaded());
                return 'Error fetching products'
            })
    }
}

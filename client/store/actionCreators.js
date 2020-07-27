import { LOGIN, LOGOUT, LOADED, LOADING } from './actions';
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

export const loginThunk = (username, password) => {
    return (dispatch) => {
        dispatch(loading());
        return axios.post('/api/login', { username, password })
            .then(() => {
                dispatch(login(username));
                dispatch(loaded());
                return 'Login Successful'
            })
    }
}
export const whoami = () => {
    return (dispatch) => {
        dispatch(loading());
        return axios.get('/api/whoami')
            .then(({ data }) => {
                console.log(data)
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
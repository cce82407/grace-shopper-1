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

export const loaded = (payload) => {
    return {
        type: LOADED,
        payload
    }
}

export const loginThunk = (username, password) => {
    return (dispatch) => {
        dispatch(loading());
        return axios.post('/api/login', { username, password })
            .then((res) => {
                console.log(res.data)
                dispatch(login(username));
                dispatch(loaded(null));
            })
            .catch((res) => {
                dispatch(loaded({ message: 'Incorrect Username or Password' }));
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
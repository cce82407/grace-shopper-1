import { LOGIN, LOGOUT } from './actions';
import axios from 'axios';

const login = (username) => {
    return {
        type: LOGIN,
        username
    }
}

export const loginThunk = (username, password) => {
    return (dispatch) => {
        return axios.post('/api/login', { username, password })
            .then(() => {
                dispatch(login(username));
                return 'Login Successful'
            })
            .catch(e => e)
    }
}
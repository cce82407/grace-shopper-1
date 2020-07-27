import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginThunk } from '../store/actionCreators';
const Login = ({ user, login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
            .then((res) => setMessage(res))
            .catch(() => setMessage('Login Failed'))
    }
    return (
        <form>
            <label>
                Username:
        <input
                    type='text'
                    value={username}
                    id='username'
                    onChange={
                        e => setUsername(e.target.value)
                    }
                />
            </label>
            <label>
                Password:
            <input
                    type='password'
                    value={password}
                    id='password'
                    onChange={
                        e => setPassword(e.target.value)
                    }
                />
            </label>
            <button
                type='submit'
                onClick={handleSubmit}
            >
                Login
            </button>
            <p>{message}</p>
            {
                !!user.loggedIn && <h1>you're logged in</h1>
            }
        </form>
    );
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(loginThunk(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
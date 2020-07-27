import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginThunk } from '../store/actionCreators';
const Login = ({ login, loading }) => {
    console.log(loading)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
            .catch(console.log)
    }

    const loginMessage = () => {
        if (loading && loading.payload && loading.payload.message) {
            return loading.payload.message;
        }
        return null;
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
            <p>{loginMessage()}</p>
        </form>
    );
}

const mapStateToProps = ({ loading }) => ({ loading });
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(loginThunk(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
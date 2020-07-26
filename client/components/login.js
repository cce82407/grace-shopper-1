import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', { username, password })
            .then(() => setMessage('logged in'))
            .catch(() => setMessage('login failed'))
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
                Username:
            <input
                    type='password'
                    value={password}
                    id='username'
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
        </form>
    );
}

export default Login;
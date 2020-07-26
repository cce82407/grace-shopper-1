import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';

const App = () => {
    console.log('app component')
    return (
        <Login />
    )
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app)
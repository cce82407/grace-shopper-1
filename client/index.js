import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    console.log('app component')
    return (
        <h1>Hello World</h1>
    )
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app)
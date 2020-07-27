import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
    return (
        <Provider store={store}>
            <Login />
        </Provider>
    )
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app)